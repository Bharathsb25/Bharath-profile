import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isUuid,
  sanitizeString,
  validateEvent,
  validateSessionMeta,
  validatePayload,
} from "../../src/lib/analytics/validate.ts";

const VISITOR_ID = "11111111-1111-4111-8111-111111111111";
const SESSION_ID = "22222222-2222-4222-8222-222222222222";

test("isUuid accepts well-formed UUIDs and rejects everything else", () => {
  assert.equal(isUuid(VISITOR_ID), true);
  assert.equal(isUuid("not-a-uuid"), false);
  assert.equal(isUuid(12345), false);
  assert.equal(isUuid(null), false);
});

test("sanitizeString trims, strips control characters, and caps length", () => {
  assert.equal(sanitizeString("  hello  "), "hello");
  assert.equal(sanitizeString("a\x00b\x1fc"), "abc");
  assert.equal(sanitizeString("x".repeat(10), 5), "xxxxx");
  assert.equal(sanitizeString(""), undefined);
  assert.equal(sanitizeString("   "), undefined);
  assert.equal(sanitizeString(42), undefined);
});

test("validateEvent accepts a well-formed event", () => {
  const event = validateEvent({
    event_name: "page_view",
    page: "/services",
    section: "hero",
    metadata: { active_seconds: 12, ok: true, note: "fine" },
  });
  assert.notEqual(event, null);
  assert.equal(event?.event_name, "page_view");
  assert.equal(event?.page, "/services");
  assert.deepEqual(event?.metadata, { active_seconds: 12, ok: true, note: "fine" });
});

test("validateEvent rejects unknown event names", () => {
  assert.equal(validateEvent({ event_name: "totally_made_up", page: "/" }), null);
});

test("validateEvent rejects a missing/empty page", () => {
  assert.equal(validateEvent({ event_name: "page_view" }), null);
  assert.equal(validateEvent({ event_name: "page_view", page: "" }), null);
});

test("validateEvent drops oversized metadata keys beyond the cap", () => {
  const metadata: Record<string, number> = {};
  for (let i = 0; i < 20; i++) metadata[`k${i}`] = i;
  const event = validateEvent({ event_name: "page_view", page: "/", metadata });
  assert.ok(Object.keys(event!.metadata!).length <= 10);
});

test("validateSessionMeta defaults an invalid device_type to desktop", () => {
  const meta = validateSessionMeta({ entry_page: "/", device_type: "spaceship" });
  assert.equal(meta?.device_type, "desktop");
});

test("validateSessionMeta rejects a missing entry_page", () => {
  assert.equal(validateSessionMeta({}), null);
});

test("validatePayload accepts a well-formed collect request", () => {
  const payload = validatePayload({
    visitor_id: VISITOR_ID,
    session_id: SESSION_ID,
    events: [{ event_name: "page_view", page: "/" }],
  });
  assert.notEqual(payload, null);
  assert.equal(payload?.visitor_id, VISITOR_ID);
  assert.equal(payload?.events.length, 1);
});

test("validatePayload rejects malformed visitor/session ids", () => {
  assert.equal(
    validatePayload({ visitor_id: "bad", session_id: SESSION_ID, events: [{ event_name: "page_view", page: "/" }] }),
    null,
  );
});

test("validatePayload rejects an empty or oversized event batch", () => {
  assert.equal(validatePayload({ visitor_id: VISITOR_ID, session_id: SESSION_ID, events: [] }), null);
  const tooMany = Array.from({ length: 30 }, () => ({ event_name: "page_view", page: "/" }));
  assert.equal(validatePayload({ visitor_id: VISITOR_ID, session_id: SESSION_ID, events: tooMany }), null);
});

test("validatePayload rejects the whole batch if any single event is invalid", () => {
  const payload = validatePayload({
    visitor_id: VISITOR_ID,
    session_id: SESSION_ID,
    events: [{ event_name: "page_view", page: "/" }, { event_name: "not_real", page: "/" }],
  });
  assert.equal(payload, null);
});
