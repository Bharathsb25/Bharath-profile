import { test } from "node:test";
import assert from "node:assert/strict";
import { computeRateLimitDecision } from "../../src/lib/analytics/rateLimit.ts";

test("first request in a fresh window is always allowed", () => {
  const decision = computeRateLimitDecision(null, new Date(), 60, 5);
  assert.equal(decision.allowed, true);
  assert.equal(decision.count, 1);
});

test("increments and allows requests under the limit within the same window", () => {
  const windowStart = new Date("2026-01-01T00:00:00Z");
  const now = new Date("2026-01-01T00:00:10Z"); // 10s later, window is 60s
  const decision = computeRateLimitDecision({ count: 2, window_start: windowStart }, now, 60, 5);
  assert.equal(decision.allowed, true);
  assert.equal(decision.count, 3);
});

test("blocks once the count exceeds the limit within the window", () => {
  const windowStart = new Date("2026-01-01T00:00:00Z");
  const now = new Date("2026-01-01T00:00:10Z");
  const decision = computeRateLimitDecision({ count: 5, window_start: windowStart }, now, 60, 5);
  assert.equal(decision.allowed, false);
  assert.equal(decision.count, 6);
});

test("starts a fresh window once the window has elapsed", () => {
  const windowStart = new Date("2026-01-01T00:00:00Z");
  const now = new Date("2026-01-01T00:01:01Z"); // 61s later, window is 60s
  const decision = computeRateLimitDecision({ count: 5, window_start: windowStart }, now, 60, 5);
  assert.equal(decision.allowed, true);
  assert.equal(decision.count, 1);
  assert.equal(decision.windowStart.getTime(), now.getTime());
});

test("exactly at the window boundary starts a fresh window", () => {
  const windowStart = new Date("2026-01-01T00:00:00Z");
  const now = new Date("2026-01-01T00:01:00Z"); // exactly 60s later
  const decision = computeRateLimitDecision({ count: 5, window_start: windowStart }, now, 60, 5);
  assert.equal(decision.allowed, true);
  assert.equal(decision.count, 1);
});
