"use client";

import { useEffect, useState } from "react";
import { hasOptedOut, setOptedOut, markConsentBannerSeen } from "@/lib/analytics/consent";

export default function PrivacyAnalyticsToggle() {
  const [optedOut, setOptedOutState] = useState<boolean | null>(null);

  useEffect(() => {
    setOptedOutState(hasOptedOut());
  }, []);

  function toggle() {
    const next = !optedOut;
    setOptedOut(next);
    markConsentBannerSeen();
    setOptedOutState(next);
  }

  if (optedOut === null) return null; // avoid a hydration flash before localStorage is read

  return (
    <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-line bg-background p-4">
      <div>
        <p className="text-sm font-medium text-foreground">
          Anonymous analytics: {optedOut ? "off" : "on"}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          You can change this anytime — it takes effect immediately, on this
          device.
        </p>
      </div>
      <button
        type="button"
        onClick={toggle}
        className="shrink-0 rounded-full border border-line px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {optedOut ? "Turn on" : "Opt out"}
      </button>
    </div>
  );
}
