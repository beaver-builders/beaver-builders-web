import 'server-only';
import { sql } from 'drizzle-orm';
import { getDb } from './db';
import type { Catalog, Img, Project, Role, Service } from './types';

const TIMEOUT_MS = 20_000;
const TTL_MS = process.env.NODE_ENV === 'production' ? 30_000 : 2_000;

let chain: Promise<unknown> = Promise.resolve();
const serial = <T>(fn: () => Promise<T>): Promise<T> => {
  const p = chain.then(fn, fn);
  chain = p.catch(() => {});
  return p;
};

function withTimeout<T>(p: Promise<T>, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const limit = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(
      `Supabase query "${label}" took longer than ${TIMEOUT_MS / 1000}s. Use the Transaction pooler string as DATABASE_URL and run: npx tsx scripts/db-check.ts`,
    )), TIMEOUT_MS);
  });
  return Promise.race([p, limit]).finally(() => clearTimeout(timer));
}

function memo<T>(label: string, run: () => Promise<T>): () => Promise<T> {
  let value: { at: number; data: T } | undefined;
  let inflight: Promise<T> | undefined;
  return async () => {
    if (value && Date.now() - value.at < TTL_MS) return value.data;
    inflight ??= withTimeout(serial(run), label)
      .then(data => { value = { at: Date.now(), data }; return data; })
      .catch(err => { if (value) { console.error(`[data] ${label} refresh failed, serving the previous copy`, err); return value.data; } throw err; })
      .finally(() => { inflight = undefined; });
    return inflight;
  };
}

type Row = Record<string, unknown>;

/** All published projects, in register order, with their gallery. */

export const getProjects = memo('projects', async (): Promise<Project[]> => {
  const db = getDb();

  const rows = (await db.execute(sql`
    select p.*,
      coalesce((
        select json_agg(
          json_build_object(
            'src', i.src,
            'width', i.width,
            'height', i.height,
            'bg', i.bg
          ) order by i.position
        )
        from project_images i
        where i.project_slug = p.slug
      ), '[]'::json) as gallery
    from projects p
    where p.published
    order by p.sort_order, p.slug
  `)) as unknown as Row[];

  return rows.map(r => {
    const image: Img = {
      src: r.image_src as string,
      width: r.image_width as number,
      height: r.image_height as number,
      bg: r.image_bg as string,
    };

    const gallery = r.gallery as Img[];

    return {
      slug: r.slug as string,
      title: r.title as string,
      place: r.place as string,
      when: r.year_label as string,
      client: r.client as string,
      role: r.role as Role,
      tags: (r.tags as string[]) ?? [],
      status: r.status as Project['status'],
      statusLabel: r.status_label as string,
      value: (r.value as string | null) ?? undefined,
      image,
      summary: r.summary as string,
      scope: (r.scope as string[]) ?? [],
      roleNote: (r.role_note as string) ?? '',
      duration: (r.duration as string | null) ?? undefined,
      statusText: r.status_text as string,
      sectorText: r.sector_text as string,
      gallery: gallery.length ? gallery : [image],
    };
  });
});


export const getProject = async (slug: string) => (await getProjects()).find(p => p.slug === slug);

/** All published services, in order, with their scope-of-works rows. */

export const getServices = memo('services', async (): Promise<Service[]> => {
  const db = getDb();

  const rows = (await db.execute(sql`
    select s.*,
      coalesce((
        select json_agg(
          json_build_object(
            'code', i.code,
            'name', i.name,
            'covers', i.covers,
            'projects', i.project_slugs
          ) order by i.position
        )
        from service_items i
        where i.service_slug = s.slug
      ), '[]'::json) as items
    from services s
    where s.published
    order by s.sort_order, s.slug
  `)) as unknown as Row[];

  return rows.map(r => ({
    slug: r.slug as string,
    title: r.title as string,
    icon: r.icon as string,
    formService: r.form_service as string,
    enquiry: r.enquiry as string,
    scope: r.scope as string,
    forWho: r.for_who as string,
    delivered: r.delivered as string,
    intro: r.intro as string,
    homeText: r.home_text as string,
    homeCta: r.home_cta as string,
    homePoints: (r.home_points as string[]) ?? [],
    homeImage:
      r.home_image_src && r.home_image_width && r.home_image_height
        ? {
            src: r.home_image_src as string,
            alt: (r.home_image_alt as string | null) ?? (r.title as string),
            width: r.home_image_width as number,
            height: r.home_image_height as number,
          }
        : undefined,
    items: r.items as Service['items'],
    catalog: (r.catalog as Catalog | null) ?? undefined,
    steps: (r.steps as string[]) ?? [],
    built: {
      title: (r.built_title as string[]) ?? [],
      intro: (r.built_intro as string) ?? '',
      slugs: (r.built_slugs as string[]) ?? [],
      more: (r.built_more as string | null) ?? undefined,
    },
  }));
});


export const getService = async (slug: string) => (await getServices()).find(s => s.slug === slug);