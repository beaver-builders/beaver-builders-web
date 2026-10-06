import type { MetadataRoute } from 'next';
import { site, projects } from '@/lib/site-data';
import { servicePages } from '@/lib/service-pages';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    ...projects.map(p => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: 'yearly' as const, priority: 0.6 })),
    ...servicePages.map(s => ({ url: `${site.url}/services/${s.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}