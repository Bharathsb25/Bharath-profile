const OPT_OUT_KEY = "analytics_opt_out";
const BANNER_SEEN_KEY = "analytics_consent_seen";

function safeLocalStorage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    // Storage can throw in locked-down/private-browsing contexts.
    return null;
  }
}

export function hasOptedOut(): boolean {
  return safeLocalStorage()?.getItem(OPT_OUT_KEY) === "true";
}

export function setOptedOut(value: boolean): void {
  const storage = safeLocalStorage();
  if (!storage) return;
  if (value) storage.setItem(OPT_OUT_KEY, "true");
  else storage.removeItem(OPT_OUT_KEY);
}

export function hasSeenConsentBanner(): boolean {
  return safeLocalStorage()?.getItem(BANNER_SEEN_KEY) === "true";
}

export function markConsentBannerSeen(): void {
  safeLocalStorage()?.setItem(BANNER_SEEN_KEY, "true");
}

/** Whether tracking should run at all right now — checked before every send. */
export function trackingAllowed(): boolean {
  if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return false;
  return !hasOptedOut();
}
