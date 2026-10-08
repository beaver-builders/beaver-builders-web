import "server-only";

import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import * as t from "./db/schema";
import type { Img, Project, Role, Service } from "./types";

export async function getProjects(): Promise<Project[]> {
  const [rows, imgs] = await Promise.all([
    db
      .select()
      .from(t.projects)
      .where(eq(t.projects.published, true))
      .orderBy(asc(t.projects.sortOrder), asc(t.projects.slug)),

    db
      .select()
      .from(t.projectImages)
      .orderBy(
        asc(t.projectImages.projectSlug),
        asc(t.projectImages.position)
      ),
  ]);

  const gallery = new Map<string, Img[]>();

  for (const i of imgs) {
    const list = gallery.get(i.projectSlug) ?? [];

    list.push({
      src: i.src,
      width: i.width,
      height: i.height,
      bg: i.bg,
    });

    gallery.set(i.projectSlug, list);
  }

  return rows.map((r) => {
    const image: Img = {
      src: r.imageSrc,
      width: r.imageWidth,
      height: r.imageHeight,
      bg: r.imageBg,
    };

    return {
      slug: r.slug,
      title: r.title,
      place: r.place,
      when: r.yearLabel,
      client: r.client,
      role: r.role as Role,
      tags: r.tags,
      status: r.status as Project["status"],
      statusLabel: r.statusLabel,
      value: r.value ?? undefined,

      image,

      summary: r.summary,
      scope: r.scope,
      roleNote: r.roleNote,
      duration: r.duration ?? undefined,

      statusText: r.statusText,
      sectorText: r.sectorText,

      gallery:
        gallery.get(r.slug)?.length
          ? gallery.get(r.slug)!
          : [image],
    };
  });
}

export async function getProject(slug: string) {
  const projects = await getProjects();

  return projects.find((p) => p.slug === slug);
}

export async function getServices(): Promise<Service[]> {
  const [rows, items] = await Promise.all([
    db
      .select()
      .from(t.services)
      .where(eq(t.services.published, true))
      .orderBy(asc(t.services.sortOrder), asc(t.services.slug)),

    db
      .select()
      .from(t.serviceItems)
      .orderBy(
        asc(t.serviceItems.serviceSlug),
        asc(t.serviceItems.position)
      ),
  ]);

  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    icon: r.icon,
    formService: r.formService,
    enquiry: r.enquiry,

    scope: r.scope,
    forWho: r.forWho,
    delivered: r.delivered,
    intro: r.intro,

    homeText: r.homeText,
    homeCta: r.homeCta,
    homePoints: r.homePoints,

    homeImage:
      r.homeImageSrc &&
      r.homeImageWidth &&
      r.homeImageHeight
        ? {
            src: r.homeImageSrc,
            alt: r.homeImageAlt ?? r.title,
            width: r.homeImageWidth,
            height: r.homeImageHeight,
          }
        : undefined,

    items: items
      .filter((i) => i.serviceSlug === r.slug)
      .map((i) => ({
        code: i.code,
        name: i.name,
        covers: i.covers,
        projects: i.projectSlugs,
      })),

    catalog: r.catalog ?? undefined,

    steps: r.steps,

    built: {
      title: r.builtTitle,
      intro: r.builtIntro,
      slugs: r.builtSlugs,
      more: r.builtMore ?? undefined,
    },
  }));
}

export async function getService(slug: string) {
  const services = await getServices();

  return services.find((s) => s.slug === slug);
}