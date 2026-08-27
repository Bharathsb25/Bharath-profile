"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "./track.ts";

/** Fires `page_view` on first load and every SPA route change (this app has no client router state beyond Next's own navigation). */
export function useRouteTracking(disabled = false) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (disabled) return;
    const url = searchParams?.toString() ? `${pathname}?${searchParams}` : pathname;
    if (lastTracked.current === url) return;
    lastTracked.current = url;
    trackEvent("page_view", { page: pathname });
  }, [pathname, searchParams, disabled]);
}
