import { writeFileSync } from 'node:fs';

if (!process.env.DATABASE_URL) {
  console.log('snapshot: no DATABASE_URL, keeping the committed lib/snapshot.json');
  process.exit(0);
}

const { getProjects, getServices } = await import('../lib/data');

const projects = await getProjects();
const services = await getServices();
writeFileSync(
  new URL('../lib/snapshot.json', import.meta.url),
  JSON.stringify({ projects, services }),
);
console.log(`snapshot: ${projects.length} projects, ${services.length} services`);
process.exit(0);