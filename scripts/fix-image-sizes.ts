import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { imageSize } from 'image-size';
import { sql } from 'drizzle-orm';
import { getDb } from '../lib/db';

type Row = { project_slug: string; position: number; src: string; width: number; height: number };

const db = getDb();
const rows = (await db.execute(
  sql`select project_slug, position, src, width, height from project_images`,
)) as unknown as Row[];

let fixed = 0;
for (const r of rows) {
  const file = join(process.cwd(), 'public', r.src.split('?')[0]);
  if (!existsSync(file)) {
    console.log(`SKIP (file not found): ${r.src}`);
    continue;
  }
  const { width, height } = imageSize(readFileSync(file));
  if (width && height && (width !== r.width || height !== r.height)) {
    await db.execute(sql`
      update project_images set width = ${width}, height = ${height}
      where project_slug = ${r.project_slug} and position = ${r.position}
    `);
    console.log(`FIXED ${r.src}: ${r.width}x${r.height} -> ${width}x${height}`);
    fixed++;
  }
}
console.log(`done, ${fixed} fixed of ${rows.length}`);
process.exit(0);