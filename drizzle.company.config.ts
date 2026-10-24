
import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: '.env.local' });

if (!process.env.NEW_DATABASE_URL) {
  throw new Error('NEW_DATABASE_URL is missing from .env.local');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.NEW_DATABASE_URL,
  },
});
