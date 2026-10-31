import { readFileSync, writeFileSync } from 'node:fs';

const contentUrl = new URL('../lib/content.json', import.meta.url);
const snapshotUrl = new URL('../lib/snapshot.json', import.meta.url);

const content = JSON.parse(readFileSync(contentUrl, 'utf8'));

if (
  !Array.isArray(content.projects) ||
  !Array.isArray(content.services) ||
  content.projects.length === 0 ||
  content.services.length === 0
) {
  throw new Error('Invalid content.json: projects or services are missing.');
}

writeFileSync(snapshotUrl, JSON.stringify(content));

console.log(
  `snapshot: ${content.projects.length} projects, ${content.services.length} services (local files)`,
);
