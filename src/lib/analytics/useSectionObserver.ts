"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "./track.ts";

/**
 * Fires one `section_view` per `id`-bearing element inside `<main>` the
 * first time it crosses 50% visibility — matches the anchor-link sections
 * the site already uses (#about, #services, #experience, #projects, ...).
 * Re-attaches on route change since the DOM under <main> is swapped.
 */
export function useSectionObserver(disabled = false) {
  const pathname = usePathname();
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (disabled) return;
    const main = document.querySelector("main");
    if (!main) return;

    const sections = Array.from(main.querySelectorAll<HTMLElement>("[id]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !seenRef.current.has(id)) {
            seenRef.current.add(id);
            trackEvent("section_view", { section: id, label: id });
          }
        }
      },
      { threshold: [0.5] },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [pathname, disabled]);
}
