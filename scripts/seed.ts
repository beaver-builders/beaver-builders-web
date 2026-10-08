// One-time import: copies the projects and services that are currently written in code into Supabase.
// Run:  npx tsx scripts/seed.ts
// Safe to re-run: a table that already has rows is left alone, so your edits in Supabase are never overwritten.
import { loadEnvConfig } from '@next/env';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as t from '../lib/db/schema';
import { projects, services as homeServices } from '../lib/site-data';
import { details } from '../lib/project-details';
import { servicePages } from '../lib/service-pages';

loadEnvConfig(process.cwd());

const slugOf = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

async function main() {
  const url = process.env.DATABASE_URL_MIGRATE ?? process.env.DATABASE_URL;
  if (!url) throw new Error('Set DATABASE_URL (or DATABASE_URL_MIGRATE) in .env.local');
  const client = postgres(url, { max: 1, prepare: false });
  const db = drizzle(client);

  // ---- projects ----
  if ((await db.select({ s: t.projects.slug }).from(t.projects).limit(1)).length) {
    console.log('projects: table already has rows, skipped');
  } else {
    for (const [i, p] of projects.entries()) {
      const d = details[p.slug];
      if (!d) throw new Error(`No details for project "${p.slug}" in lib/project-details.ts`);
      await db.insert(t.projects).values({
        slug: p.slug, sortOrder: (i + 1) * 10, title: p.title, place: p.place, yearLabel: p.when, client: p.client, role: p.role,
        tags: p.tags, status: p.status, statusLabel: p.statusLabel, value: p.value ?? null,
        imageSrc: p.image.src, imageWidth: p.image.width, imageHeight: p.image.height, imageBg: p.image.bg,
        summary: d.summary, scope: d.scope, roleNote: d.roleNote, duration: d.duration ?? null,
        statusText: d.statusText, sectorText: d.sectorText,
      });
      if (d.gallery.length) {
        await db.insert(t.projectImages).values(d.gallery.map((g, pos) => ({
          projectSlug: p.slug, position: pos, src: g.src, width: g.width, height: g.height, bg: g.bg,
        })));
      }
    }
    console.log(`projects: inserted ${projects.length}`);
  }

  // ---- services ----
  if ((await db.select({ s: t.services.slug }).from(t.services).limit(1)).length) {
    console.log('services: table already has rows, skipped');
  } else {
    for (const [i, sp] of servicePages.entries()) {
      const h = homeServices.find(x => slugOf(x.title) === sp.slug);
      if (!h) throw new Error(`No home-page card for service "${sp.slug}" in lib/site-data.ts`);
      await db.insert(t.services).values({
        slug: sp.slug, sortOrder: (i + 1) * 10, title: sp.title, icon: sp.icon, formService: sp.formService, enquiry: sp.enquiry,
        scope: sp.scope, forWho: sp.for, delivered: sp.delivered, intro: sp.intro,
        homeText: h.text, homeCta: h.cta, homePoints: h.points ?? [],
        homeImageSrc: h.image?.src ?? null, homeImageAlt: h.image?.alt ?? null,
        homeImageWidth: h.image?.width ?? null, homeImageHeight: h.image?.height ?? null,
        steps: sp.steps, catalog: sp.catalog ?? null,
        builtTitle: sp.built.title, builtIntro: sp.built.intro, builtSlugs: sp.built.slugs, builtMore: sp.built.more ?? null,
      });
      if (sp.items.length) {
        await db.insert(t.serviceItems).values(sp.items.map((it, pos) => ({
          serviceSlug: sp.slug, position: pos, code: it.code, name: it.name, covers: it.covers, projectSlugs: it.projects ?? [],
        })));
      }
    }
    console.log(`services: inserted ${servicePages.length}`);
  }
  await client.end();
}

main().catch(e => { console.error(e); process.exit(1); });
