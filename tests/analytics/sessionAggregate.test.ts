import { test } from "node:test";
import assert from "node:assert/strict";
import { deriveSessionUpdate } from "../../src/lib/analytics/sessionAggregate.ts";
import type { AnalyticsEvent } from "../../src/lib/analytics/types.ts";

function ev(partial: Partial<AnalyticsEvent> & { event_name: AnalyticsEvent["event_name"] }): AnalyticsEvent {
  return { page: "/", ts: Date.now(), ...partial };
}

test("counts page_view events into pageViewIncrement", () => {
  const update = deriveSessionUpdate([
    ev({ event_name: "page_view" }),
    ev({ event_name: "page_view" }),
    ev({ event_name: "cta_click" }),
  ]);
  assert.equal(update.pageViewIncrement, 2);
});

test("takes the max active_seconds across heartbeat/end events in a batch", () => {
  const update = deriveSessionUpdate([
    ev({ event_name: "session_heartbeat", metadata: { active_seconds: 20 } }),
    ev({ event_name: "session_heartbeat", metadata: { active_seconds: 45 } }),
    ev({ event_name: "session_end", metadata: { active_seconds: 30 } }),
  ]);
  assert.equal(update.activeSeconds, 45);
});

test("takes the max scroll_depth across the batch", () => {
  const update = deriveSessionUpdate([
    ev({ event_name: "session_heartbeat", metadata: { scroll_depth: 40 } }),
    ev({ event_name: "session_heartbeat", metadata: { scroll_depth: 15 } }),
  ]);
  assert.equal(update.maxScrollDepth, 40);
});

test("last_section from a section_view event, overridden by an explicit heartbeat last_section", () => {
  const update = deriveSessionUpdate([
    ev({ event_name: "section_view", section: "about" }),
    ev({ event_name: "section_view", section: "projects" }),
    ev({ event_name: "session_heartbeat", metadata: { last_section: "contact" } }),
  ]);
  assert.equal(update.lastSection, "contact");
});

test("marks the session ended only when a session_end event is present", () => {
  assert.equal(deriveSessionUpdate([ev({ event_name: "page_view" })]).ended, false);
  assert.equal(deriveSessionUpdate([ev({ event_name: "session_end" })]).ended, true);
});

test("returns nulls for fields with no data in the batch", () => {
  const update = deriveSessionUpdate([ev({ event_name: "page_view" })]);
  assert.equal(update.activeSeconds, null);
  assert.equal(update.maxScrollDepth, null);
  assert.equal(update.lastSection, null);
});
