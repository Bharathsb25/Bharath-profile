const ACTIVE_KEY = "analytics_active_seconds";

/**
 * Active seconds already accrued by this session on earlier page loads. The
 * counter lives in memory per document, and the site navigates with full page
 * loads, so without this every page would restart the session's count at zero.
 */
export function resumeActiveSeconds(raw: string | null, sessionId: string | null): number {
  if (!raw || !sessionId) return 0;
  try {
    const stored = JSON.parse(raw) as { sessionId?: unknown; seconds?: unknown };
    return stored.sessionId === sessionId && typeof stored.seconds === "number" && stored.seconds >= 0
      ? stored.seconds
      : 0;
  } catch {
    return 0;
  }
}

export function loadActiveSeconds(sessionId: string | null): number {
  try {
    return resumeActiveSeconds(window.sessionStorage.getItem(ACTIVE_KEY), sessionId);
  } catch {
    return 0;
  }
}

export function saveActiveSeconds(sessionId: string | null, seconds: number) {
  if (!sessionId) return;
  try {
    window.sessionStorage.setItem(ACTIVE_KEY, JSON.stringify({ sessionId, seconds }));
  } catch {
    // Storage unavailable (private mode, quota): fall back to per-page counting.
  }
}
