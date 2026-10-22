import { relations, sql } from 'drizzle-orm';
import { boolean, index, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import type { Catalog } from '../types';

const textArray = (name: string) => text(name).array().notNull().default(sql`'{}'::text[]`);
const stamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
};

/* ---------- enquiries (contact form) ---------- */
export const enquiries = pgTable('enquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  ref: text('ref'),                                   // shown to the visitor, e.g. BB-261006-AB12
  name: text('name').notNull(),
  email: text('email'),                               // email OR phone is required (checked in the API route)
  phone: text('phone'),
  service: text('service'),
  message: text('message').notNull(),
  company: text('company'),
  island: text('island'),
  status: text('status').notNull().default('new'),    // new | replied | closed (update by hand)
  notifiedAt: timestamp('notified_at', { withTimezone: true }), // set when the notification email was sent
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, t => [index('enquiries_created_at_idx').on(t.createdAt)]).enableRLS();

/* ---------- projects (project register, drawer, /projects/<slug>) ---------- */
export const projects = pgTable('projects', {
  slug: text('slug').primaryKey(),                    // used in the URL: /projects/<slug>
  sortOrder: integer('sort_order').notNull().default(0), // register order, lowest first
  published: boolean('published').notNull().default(true), // untick to hide a project without deleting it
  title: text('title').notNull(),
  place: text('place').notNull(),
  yearLabel: text('year_label').notNull(),            // 'Ongoing', '2016', '2018–2019'
  client: text('client').notNull(),
  role: text('role').notNull(),                       // direct | sub | via
  tags: textArray('tags'),                            // resort, public, utilities, aviation, marine, education
  status: text('status').notNull(),                   // ongoing | complete | started
  statusLabel: text('status_label').notNull(),        // badge text, e.g. 'Completed', 'Awarded 2020'
  value: text('value'),
  imageSrc: text('image_src').notNull(),              // card image: '/images/...' or a full https URL
  imageWidth: integer('image_width').notNull(),
  imageHeight: integer('image_height').notNull(),
  imageBg: text('image_bg').notNull().default('#8f9296'),
  summary: text('summary').notNull(),
  scope: textArray('scope'),
  roleNote: text('role_note').notNull().default(''),
  duration: text('duration'),
  statusText: text('status_text').notNull(),
  sectorText: text('sector_text').notNull(),
  ...stamps,
}, t => [index('projects_sort_idx').on(t.sortOrder)]).enableRLS();

export const projectImages = pgTable('project_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectSlug: text('project_slug').notNull().references(() => projects.slug, { onDelete: 'cascade', onUpdate: 'cascade' }),
  position: integer('position').notNull().default(0), // 0 = cover on the project page
  src: text('src').notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  bg: text('bg').notNull().default('#8f9296'),
}, t => [index('project_images_slug_idx').on(t.projectSlug)]).enableRLS();

/* ---------- services (home cards + /services/<slug>) ---------- */
export const services = pgTable('services', {
  slug: text('slug').primaryKey(),
  sortOrder: integer('sort_order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  title: text('title').notNull(),
  icon: text('icon').notNull(),                       // symbol id in /public/icons.svg
  formService: text('form_service').notNull(),        // value preselected in the contact form
  enquiry: text('enquiry').notNull(),                 // sign board button label
  scope: text('scope').notNull(),
  forWho: text('for_who').notNull(),
  delivered: text('delivered').notNull(),
  intro: text('intro').notNull(),
  homeText: text('home_text').notNull(),
  homeCta: text('home_cta').notNull(),
  homePoints: textArray('home_points'),               // bullet list on the big home card (Construction)
  homeImageSrc: text('home_image_src'),
  homeImageAlt: text('home_image_alt'),
  homeImageWidth: integer('home_image_width'),
  homeImageHeight: integer('home_image_height'),
  steps: textArray('steps'),                          // "How a job runs" titles
  catalog: jsonb('catalog').$type<Catalog | null>(),  // Product lines / Equipment / Developments table (optional)
  builtTitle: textArray('built_title'),
  builtIntro: text('built_intro').notNull().default(''),
  builtSlugs: textArray('built_slugs'),               // project slugs shown as cards
  builtMore: text('built_more'),
  ...stamps,
}).enableRLS();

export const serviceItems = pgTable('service_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  serviceSlug: text('service_slug').notNull().references(() => services.slug, { onDelete: 'cascade', onUpdate: 'cascade' }),
  position: integer('position').notNull().default(0),
  code: text('code').notNull(),                       // C-01
  name: text('name').notNull(),
  covers: text('covers').notNull(),
  projectSlugs: textArray('project_slugs'),           // "Delivered on" links
}, t => [index('service_items_slug_idx').on(t.serviceSlug)]).enableRLS();

export const projectsRelations = relations(projects, ({ many }) => ({ images: many(projectImages) }));
export const servicesRelations = relations(services, ({ many }) => ({ items: many(serviceItems) }));
