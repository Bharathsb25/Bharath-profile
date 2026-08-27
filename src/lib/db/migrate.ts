// Run with: npm run db:migrate
// (loads .env.local via `node --env-file-if-exists`, see package.json)
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dbQuery } from "./client.ts";

const migrationsDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "migrations",
);

/** Splits a .sql file into individual statements — the Neon HTTP driver runs one statement per call. */
function splitStatements(sqlText: string): string[] {
  return sqlText
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));
}

async function main() {
  await dbQuery(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  const applied = new Set(
    (await dbQuery<{ name: string }>("SELECT name FROM _migrations")).map(
      (r) => r.name,
    ),
  );

  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  let ranAny = false;
  for (const file of files) {
    if (applied.has(file)) continue;
    ranAny = true;
    console.log(`Applying ${file}...`);
    const contents = readFileSync(path.join(migrationsDir, file), "utf8");
    for (const statement of splitStatements(contents)) {
      await dbQuery(statement);
    }
    await dbQuery("INSERT INTO _migrations (name) VALUES ($1)", [file]);
    console.log(`  done.`);
  }

  console.log(ranAny ? "Migrations complete." : "Already up to date.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exitCode = 1;
});
