import { neon } from "@neondatabase/serverless";

function connectionString(): string {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      "Missing DATABASE_URL (or POSTGRES_URL) environment variable — see docs/analytics-setup.md",
    );
  }
  return url;
}

/**
 * Lazily created so importing this module never throws when the env var is
 * unset (e.g. during `next build` static analysis) — only actually
 * connecting does.
 */
let cached: ReturnType<typeof neon> | null = null;

export function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  if (!cached) cached = neon(connectionString());
  return cached(strings, ...values);
}

export function dbQuery<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (!cached) cached = neon(connectionString());
  return cached.query(text, params) as Promise<T[]>;
}
