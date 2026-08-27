"use client";

import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, trackEvent } from "@/lib/analytics/track";
import { useEngagement } from "@/lib/analytics/useEngagement";
import { useSectionObserver } from "@/lib/analytics/useSectionObserver";
import { useRouteTracking } from "@/lib/analytics/useRouteTracking";
import type { EventName } from "@/lib/analytics/types";
import ConsentBanner from "./ConsentBanner";

/**
 * Delegated click listener for the `data-track-*` attribute convention —
 * lets existing components opt into click tracking with plain HTML
 * attributes instead of importing a hook everywhere. E.g.:
 *   <button data-track-event="cta_click" data-track-label="Download CV">
 */
function useDelegatedClickTracking(disabled: boolean) {
  useEffect(() => {
    if (disabled) return;
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-track-event]",
      );
      if (!target) return;
      const eventName = target.dataset.trackEvent as EventName | undefined;
      if (!eventName) return;
      const href = target instanceof HTMLAnchorElement ? target.href : undefined;
      trackEvent(eventName, {
        section: target.dataset.trackSection,
        element_id: target.id || target.dataset.trackElement,
        label: target.dataset.trackLabel,
        destination_url: target.dataset.trackDestination || href,
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [disabled]);
}

function Tracking() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (!isAdminRoute) analytics.start();
  }, [isAdminRoute]);
  useEngagement(isAdminRoute);
  useSectionObserver(isAdminRoute);
  useRouteTracking(isAdminRoute);
  useDelegatedClickTracking(isAdminRoute);
  return null;
}

/**
 * Mounted once in the root layout. Purely side-effecting (no context, no
 * visible output besides the consent banner) so it never changes how the
 * rest of the page renders or hydrates.
 */
export default function AnalyticsProvider() {
  return (
    <>
      <Suspense fallback={null}>
        <Tracking />
      </Suspense>
      <ConsentBanner />
    </>
  );
}
