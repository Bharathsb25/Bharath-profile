import { test } from "node:test";
import assert from "node:assert/strict";
import { resumeActiveSeconds } from "../../src/lib/analytics/activeTime.ts";

const SESSION = "aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa";

test("resumes the count a previous page load stored for the same session", () => {
  assert.equal(resumeActiveSeconds(JSON.stringify({ sessionId: SESSION, seconds: 42 }), SESSION), 42);
});

test("starts from zero when the stored count belongs to an earlier session", () => {
  const stored = JSON.stringify({ sessionId: "bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb", seconds: 300 });
  assert.equal(resumeActiveSeconds(stored, SESSION), 0);
});

test("starts from zero with nothing stored, no session, or unreadable data", () => {
  assert.equal(resumeActiveSeconds(null, SESSION), 0);
  assert.equal(resumeActiveSeconds(JSON.stringify({ sessionId: SESSION, seconds: 9 }), null), 0);
  assert.equal(resumeActiveSeconds("{not json", SESSION), 0);
  assert.equal(resumeActiveSeconds(JSON.stringify({ sessionId: SESSION, seconds: "9" }), SESSION), 0);
  assert.equal(resumeActiveSeconds(JSON.stringify({ sessionId: SESSION, seconds: -5 }), SESSION), 0);
});
