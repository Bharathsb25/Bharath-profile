"use client";

import { trackingAllowed } from "./consent.ts";
import type { AnalyticsEvent, EventName, SessionMeta } from "./types.ts";

const VISITOR_KEY = "analytics_visitor_id";
const SESSION_KEY = "analytics_session";
const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const COLLECT_URL = "/api/analytics/collect";
const FLUSH_INTERVAL_MS = 5000;
const MAX_QUEUE_SIZE = 20;

interface StoredSession {
  id: string;
  lastActivity: number;
}

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for very old browsers — still a valid v4-shaped UUID.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function safeStorage(kind: "localStorage" | "sessionStorage"): Storage | null {
  try {
    return typeof window !== "undefined" ? window[kind] : null;
  } catch {
    return null;
  }
}

function getVisitorId(): string {
  const storage = safeStorage("localStorage");
  if (!storage) return uuid();
  let id = storage.getItem(VISITOR_KEY);
  if (!id) {
    id = uuid();
    storage.setItem(VISITOR_KEY, id);
  }
  return id;
}

/** Returns the current session id, rotating to a new one (and reporting isNew) after 30 minutes of inactivity. */
function getOrRotateSession(): { id: string; isNew: boolean } {
  const storage = safeStorage("sessionStorage");
  const now = Date.now();
  if (!storage) return { id: uuid(), isNew: true };

  const raw = storage.getItem(SESSION_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as StoredSession;
      if (now - parsed.lastActivity < SESSION_IDLE_TIMEOUT_MS) {
        storage.setItem(SESSION_KEY, JSON.stringify({ id: parsed.id, lastActivity: now }));
        return { id: parsed.id, isNew: false };
      }
    } catch {
      // fall through to create a new session
    }
  }
  const id = uuid();
  storage.setItem(SESSION_KEY, JSON.stringify({ id, lastActivity: now }));
  return { id, isNew: true };
}

function touchSession() {
  const storage = safeStorage("sessionStorage");
  const raw = storage?.getItem(SESSION_KEY);
  if (!storage || !raw) return;
  try {
    const parsed = JSON.parse(raw) as StoredSession;
    storage.setItem(SESSION_KEY, JSON.stringify({ id: parsed.id, lastActivity: Date.now() }));
  } catch {
    /* ignore */
  }
}

function detectDeviceType(): SessionMeta["device_type"] {
  const width = typeof window !== "undefined" ? window.innerWidth : 1024;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function detectBrowserOs(): { browser: string; os: string } {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  let browser = "Other";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = "Safari";

  let os = "Other";
  if (/Windows/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua) && !/iPhone|iPad/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";

  return { browser, os };
}

function buildSessionMeta(): SessionMeta {
  const { browser, os } = detectBrowserOs();
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  return {
    referrer: typeof document !== "undefined" ? document.referrer : "",
    utm_source: params?.get("utm_source") ?? undefined,
    utm_medium: params?.get("utm_medium") ?? undefined,
    utm_campaign: params?.get("utm_campaign") ?? undefined,
    utm_term: params?.get("utm_term") ?? undefined,
    utm_content: params?.get("utm_content") ?? undefined,
    browser,
    os,
    device_type: detectDeviceType(),
    screen_width: typeof screen !== "undefined" ? screen.width : 0,
    screen_height: typeof screen !== "undefined" ? screen.height : 0,
    language: typeof navigator !== "undefined" ? navigator.language : "unknown",
    entry_page: typeof window !== "undefined" ? window.location.pathname : "/",
  };
}

class AnalyticsClient {
  private queue: AnalyticsEvent[] = [];
  private pendingSessionMeta: SessionMeta | undefined;
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private started = false;

  start() {
    if (this.started || typeof window === "undefined") return;
    this.started = true;

    const { isNew } = getOrRotateSession();
    if (isNew) {
      this.pendingSessionMeta = buildSessionMeta();
      this.track("session_start");
    }

    this.flushTimer = setInterval(() => this.flush(), FLUSH_INTERVAL_MS);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") this.flush(true);
    });
    window.addEventListener("pagehide", () => this.flush(true));
  }

  track(
    eventName: EventName,
    opts: Partial<Omit<AnalyticsEvent, "event_name" | "ts">> = {},
  ) {
    try {
      if (!trackingAllowed() || typeof window === "undefined") return;
      touchSession();
      this.queue.push({
        event_name: eventName,
        page: opts.page ?? window.location.pathname,
        section: opts.section,
        element_id: opts.element_id,
        label: opts.label,
        destination_url: opts.destination_url,
        metadata: opts.metadata,
        ts: Date.now(),
      });
      if (this.queue.length >= MAX_QUEUE_SIZE) this.flush();
    } catch {
      // Analytics must never break the app.
    }
  }

  flush(useBeacon = false) {
    try {
      if (!trackingAllowed()) {
        this.queue = [];
        return;
      }
      if (this.queue.length === 0) return;
      const { id: sessionId } = getOrRotateSession();
      const body = JSON.stringify({
        visitor_id: getVisitorId(),
        session_id: sessionId,
        session: this.pendingSessionMeta,
        events: this.queue,
      });
      this.queue = [];
      this.pendingSessionMeta = undefined;

      if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(COLLECT_URL, blob);
        return;
      }
      fetch(COLLECT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        /* swallow — analytics failures must never surface to the app */
      });
    } catch {
      // Analytics must never break the app.
    }
  }
}

export const analytics = new AnalyticsClient();

export function trackEvent(
  eventName: EventName,
  opts?: Partial<Omit<AnalyticsEvent, "event_name" | "ts">>,
) {
  analytics.track(eventName, opts);
}
