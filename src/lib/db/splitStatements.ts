/**
 * Splits a .sql file into individual statements — the Neon HTTP driver runs
 * one statement per call. Full-line `--` comments are removed before splitting:
 * filtering chunks that *start* with a comment would also discard the statement
 * that follows the comment inside the same chunk.
 */
export function splitStatements(sqlText: string): string[] {
  return sqlText
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("--"))
    .join("\n")
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
