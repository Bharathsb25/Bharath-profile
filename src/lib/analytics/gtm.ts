"use client";

import type { AnalyticsEvent } from "./types.ts";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Pushes the same event our first-party analytics tracks into GTM's
 * dataLayer, so any GA4 (or other) tag configured in the GTM container can
 * pick it up as a custom event — no separate instrumentation to maintain.
 *
 * This only feeds the dataLayer; turning a pushed event into an actual GA4
 * event still requires a matching Trigger + Tag in the GTM container itself
 * (tagmanager.google.com) — that part isn't something code can configure.
 *
 * Safe to call even if GTM hasn't loaded yet (or at all): pushing to
 * `dataLayer` is just an array operation, and `@next/third-parties`'s
 * GoogleTagManager component initializes `window.dataLayer` itself, but we
 * fall back to creating it here too in case this fires first.
 */
export function pushToDataLayer(event: AnalyticsEvent) {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event.event_name,
      page_path: event.page,
      section: event.section,
      element_id: event.element_id,
      label: event.label,
      destination_url: event.destination_url,
      ...event.metadata,
    });
  } catch {
    // Analytics must never break the app.
  }
}
