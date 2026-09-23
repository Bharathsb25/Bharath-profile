import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { splitStatements } from "../../src/lib/db/splitStatements.ts";

test("keeps a statement whose chunk begins with a comment line", () => {
  const sql = "-- visitors table\nCREATE TABLE a (id int);\n-- index\nCREATE INDEX i ON a(id);";
  assert.deepEqual(splitStatements(sql), ["CREATE TABLE a (id int)", "CREATE INDEX i ON a(id)"]);
});

test("a semicolon inside a full-line comment does not split a statement", () => {
  const sql = "-- note; not a terminator\nSELECT 1;";
  assert.deepEqual(splitStatements(sql), ["SELECT 1"]);
});

test("the real init migration yields every CREATE TABLE before its indexes", () => {
  const sql = readFileSync(new URL("../../src/lib/db/migrations/0001_init.sql", import.meta.url), "utf8");
  const statements = splitStatements(sql);
  const tables = statements.filter((s) => s.startsWith("CREATE TABLE"));
  assert.equal(tables.length, 4);
  const firstIndex = statements.findIndex((s) => s.startsWith("CREATE INDEX"));
  const lastTable = statements.findLastIndex((s) => s.startsWith("CREATE TABLE"));
  assert.ok(lastTable < firstIndex, "all tables must be created before any index references them");
});
