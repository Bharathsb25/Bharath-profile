import type { AnalyticsEvent } from "./types.ts";

export interface SessionUpdate {
  pageViewIncrement: number;
  /** Max active-seconds value seen across heartbeat/end events in this batch, if any. */
  activeSeconds: number | null;
  /** Max scroll-depth percentage seen in this batch, if any. */
  maxScrollDepth: number | null;
  lastSection: string | null;
  ended: boolean;
}

/**
 * Reduces one batch of events into the aggregate fields the `sessions` row
 * needs updated. Pure and DB-free so the engagement-time/scroll-depth math
 * is unit-testable without a database.
 */
export function deriveSessionUpdate(events: AnalyticsEvent[]): SessionUpdate {
  let pageViewIncrement = 0;
  let activeSeconds: number | null = null;
  let maxScrollDepth: number | null = null;
  let lastSection: string | null = null;
  let ended = false;

  for (const event of events) {
    if (event.event_name === "page_view") pageViewIncrement += 1;

    if (event.event_name === "section_view" && event.section) {
      lastSection = event.section;
    }

    if (event.event_name === "session_heartbeat" || event.event_name === "session_end") {
      const meta = event.metadata ?? {};
      if (typeof meta.active_seconds === "number") {
        activeSeconds =
          activeSeconds === null ? meta.active_seconds : Math.max(activeSeconds, meta.active_seconds);
      }
      if (typeof meta.scroll_depth === "number") {
        maxScrollDepth =
          maxScrollDepth === null ? meta.scroll_depth : Math.max(maxScrollDepth, meta.scroll_depth);
      }
      if (typeof meta.last_section === "string") {
        lastSection = meta.last_section;
      }
    }

    if (event.event_name === "session_end") ended = true;
  }

  return { pageViewIncrement, activeSeconds, maxScrollDepth, lastSection, ended };
}
