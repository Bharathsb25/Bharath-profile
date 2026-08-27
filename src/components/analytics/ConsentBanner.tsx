"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  hasSeenConsentBanner,
  hasOptedOut,
  markConsentBannerSeen,
  setOptedOut,
} from "@/lib/analytics/consent";

export default function ConsentBanner() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAdminRoute && !hasSeenConsentBanner() && !hasOptedOut()) setVisible(true);
  }, [isAdminRoute]);

  if (!visible || isAdminRoute) return null;

  function dismiss(optOut: boolean) {
    if (optOut) setOptedOut(true);
    markConsentBannerSeen();
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4">
      <div className="card mx-auto flex max-w-2xl flex-col gap-3 p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted">
          This site uses anonymous, first-party analytics to see which pages
          and sections get used — no ads, no cross-site tracking. Read the{" "}
          <a href="/privacy" className="font-medium text-accent hover:underline">
            privacy policy
          </a>{" "}
          or change this anytime there.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => dismiss(true)}
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Opt out
          </button>
          <button
            type="button"
            onClick={() => dismiss(false)}
            className="rounded-full accent-bar px-4 py-2 text-xs font-semibold text-on-accent"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
