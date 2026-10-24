
import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config({ path: ".env.local" });

const oldUrl = process.env.OLD_DATABASE_URL;
const newUrl = process.env.NEW_DATABASE_URL;

if (!oldUrl || !newUrl) {
  throw new Error(
    "OLD_DATABASE_URL and NEW_DATABASE_URL must be set in .env.local"
  );
}

if (oldUrl === newUrl) {
  throw new Error("Old and new database URLs must be different.");
}

const tables = [
  "projects",
  "services",
  "project_images",
  "service_items",
] as const;

async function main() {
  const source = postgres(oldUrl!, {
    ssl: "require",
    prepare: false,
    max: 1,
  });

  const destination = postgres(newUrl!, {
    ssl: "require",
    prepare: false,
    max: 1,
  });

  try {
    // Read all required data from the old database.
    const data: Record<string, Record<string, unknown>[]> = {};

    for (const table of tables) {
      data[table] = await source.unsafe(
        `SELECT * FROM public."${table}"`
      );

      console.log(`Old DB: ${table} = ${data[table].length} rows`);
    }

    // Safety check: do not overwrite existing company data.
    for (const table of tables) {
      const result = await destination.unsafe(
        `SELECT COUNT(*)::int AS count FROM public."${table}"`
      );

      if (Number(result[0].count) !== 0) {
        throw new Error(
          `Company table "${table}" is not empty. Stopping without copying.`
        );
      }
    }

    // Insert all rows in one transaction.
    await destination.begin(async (tx) => {
      for (const table of tables) {
        const rows = data[table];

        for (const row of rows) {
          const columns = Object.keys(row);

          if (columns.length === 0) continue;

          const quote = (name: string) =>
            `"${name.replace(/"/g, '""')}"`;

          const columnSql = columns.map(quote).join(", ");
          const placeholders = columns
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          const query =
            `INSERT INTO public.${quote(table)} ` +
            `(${columnSql}) VALUES (${placeholders})`;

          const values = columns.map((column) => row[column]);
                await tx.unsafe(query, values as never[]);
        }

        console.log(`Copied ${rows.length} rows into ${table}`);
      }
    });

    console.log("\nData copy completed successfully.");
  } finally {
    await Promise.all([source.end(), destination.end()]);
  }
}

main().catch((error) => {
  console.error("\nData copy failed:", error.message ?? error);
  process.exitCode = 1;
});
