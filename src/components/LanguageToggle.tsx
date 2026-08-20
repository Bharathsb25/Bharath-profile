"use client";

import { useLanguage } from "@/components/LanguageProvider";

/**
 * EN / த switch, styled to match ThemeToggle's footprint so the two sit
 * evenly in the navbar. Only rendered on /services (LanguageProvider isn't
 * mounted anywhere else), so it never appears on pages without a copy tree.
 */
export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Choose language"
      className="flex items-center overflow-hidden rounded-full border border-line text-xs font-semibold"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "en"
            ? "accent-bar text-on-accent"
            : "text-muted hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ta")}
        aria-pressed={lang === "ta"}
        lang="ta"
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "ta"
            ? "accent-bar text-on-accent"
            : "text-muted hover:text-foreground"
        }`}
      >
        த
      </button>
    </div>
  );
}
