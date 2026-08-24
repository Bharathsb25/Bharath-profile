"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { businessCopy, type BusinessCopy, type Lang } from "@/data/businessCopy";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
} | null>(null);

/**
 * Scoped to /services. Server-rendered HTML is always English — SSR has no
 * way to know a saved preference, and starting client state at anything
 * other than "en" would mismatch the server markup on hydration. A returning
 * Tamil-preference visitor briefly sees English before this effect fires and
 * swaps it; that's an accepted, deliberate trade-off (see the plan's SEO
 * risk note), not a bug to chase. There's nothing equivalent to the theme
 * toggle's blocking inline script to add here: that script exists because
 * first paint could otherwise show the wrong THEME (a real stored
 * preference). First paint is always English by construction, so there's no
 * wrong-language flash to prevent — only this one legitimate post-hydration
 * swap for returning visitors.
 */
export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("services-lang");
    // Restore a saved EN/TA preference after hydration (SSR is always English).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only
    if (saved === "en" || saved === "ta") setLangState(saved);
  }, []);

  // Kept in sync with `lang` so the CSS font rule (html[lang="ta"] in
  // globals.css) always matches what's actually on screen.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem("services-lang", next);
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

export function useCopy(): BusinessCopy {
  const { lang } = useLanguage();
  return businessCopy[lang];
}
