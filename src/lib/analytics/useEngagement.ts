"use client";

import { useEffect, useRef } from "react";
import { analytics, trackEvent } from "./track.ts";

const IDLE_THRESHOLD_MS = 15_000;
const TICK_MS = 1_000;
const HEARTBEAT_MS = 20_000;

function computeScrollDepth(): number {
  const doc = document.documentElement;
  const total = doc.scrollHeight - doc.clientHeight;
  if (total <= 0) return 100;
  const ratio = (window.scrollY / total) * 100;
  return Math.max(0, Math.min(100, Math.round(ratio)));
}

/**
 * Tracks *active* engagement time (tab visible + recent input), not just
 * "tab is open". Mounted once, near the root, alongside the other analytics
 * hooks.
 */
export function useEngagement(disabled = false) {
  const lastInputRef = useRef(0);
  const activeSecondsRef = useRef(0);
  const maxScrollRef = useRef(0);

  useEffect(() => {
    if (disabled) return;
    lastInputRef.current = Date.now();
    const markActive = () => {
      lastInputRef.current = Date.now();
    };
    const onScroll = () => {
      markActive();
      maxScrollRef.current = Math.max(maxScrollRef.current, computeScrollDepth());
    };

    window.addEventListener("mousemove", markActive, { passive: true });
    window.addEventListener("keydown", markActive);
    window.addEventListener("touchstart", markActive, { passive: true });
    window.addEventListener("click", markActive);
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = setInterval(() => {
      const isVisible = document.visibilityState === "visible";
      const recentlyActive = Date.now() - lastInputRef.current < IDLE_THRESHOLD_MS;
      if (isVisible && recentlyActive) activeSecondsRef.current += 1;
    }, TICK_MS);

    const heartbeat = setInterval(() => {
      trackEvent("session_heartbeat", {
        metadata: {
          active_seconds: activeSecondsRef.current,
          scroll_depth: maxScrollRef.current,
        },
      });
    }, HEARTBEAT_MS);

    const endSession = () => {
      trackEvent("session_end", {
        metadata: {
          active_seconds: activeSecondsRef.current,
          scroll_depth: maxScrollRef.current,
        },
      });
      analytics.flush(true);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") endSession();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", endSession);

    return () => {
      window.removeEventListener("mousemove", markActive);
      window.removeEventListener("keydown", markActive);
      window.removeEventListener("touchstart", markActive);
      window.removeEventListener("click", markActive);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", endSession);
      clearInterval(tick);
      clearInterval(heartbeat);
    };
  }, [disabled]);
}
