/** Every event name the client is allowed to send — anything else is rejected server-side. */
export const EVENT_NAMES = [
  "page_view",
  "section_view",
  "cta_click",
  "nav_click",
  "link_click",
  "external_link_click",
  "project_view",
  "project_click",
  "download",
  "form_start",
  "form_submit",
  "form_success",
  "form_failure",
  "social_click",
  "copy_email",
  "copy_phone",
  "session_start",
  "session_heartbeat",
  "session_end",
  "client_error",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/** One tracked interaction. Never include form field values, passwords, or other free-text PII. */
export interface AnalyticsEvent {
  event_name: EventName;
  page: string;
  section?: string;
  element_id?: string;
  label?: string;
  destination_url?: string;
  /** Small, non-PII extras only (e.g. scroll depth %, active seconds). */
  metadata?: Record<string, string | number | boolean>;
  /** Client timestamp (ms epoch) — informational only, server also stamps created_at. */
  ts: number;
}

/** Sent once, on the first event of a session (session_start). */
export interface SessionMeta {
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  browser: string;
  os: string;
  device_type: "mobile" | "tablet" | "desktop";
  screen_width: number;
  screen_height: number;
  language: string;
  entry_page: string;
}

/** POST body for /api/analytics/collect. */
export interface CollectPayload {
  visitor_id: string;
  session_id: string;
  session?: SessionMeta;
  events: AnalyticsEvent[];
}

export const MAX_EVENTS_PER_BATCH = 25;
export const MAX_STRING_LENGTH = 512;
export const MAX_METADATA_KEYS = 10;
