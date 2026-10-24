"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/services", label: "For Business" },
  { href: "/freelance", label: "Hire Me" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#blog", label: "Blog" },
  { href: "/samples", label: "IPO Analysis" },
  { href: "/#contact", label: "Contact" },
];

/**
 * `extra` is an optional slot rendered next to ThemeToggle, for page-specific
 * controls that don't belong in every page's header (e.g. the language
 * toggle on /services). Navbar itself stays fully generic — it renders
 * whatever it's given without knowing what that control does or needs.
 */
export default function Navbar({ extra }: { extra?: React.ReactNode } = {}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-line bg-background/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a
          href="/#top"
          className="font-display text-sm font-extrabold tracking-[-0.02em] text-foreground"
        >
          Bharath Sathiskumar
        </a>

        {/* Desktop nav starts at xl. Nine links plus the logo and "Let's talk"
            button don't fit before that — lg wraps the logo, same failure
            mode this had at md before Blog/Samples were added back in.
            Below xl: hamburger. */}
        <ul className="hidden gap-5 font-display text-sm font-medium text-muted xl:flex xl:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-track-event="nav_click"
                data-track-label={link.label}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {extra}
          <ThemeToggle />
          <a
            href="/#contact"
            data-track-event="cta_click"
            data-track-label="Let's talk (nav)"
            className="accent-bar hidden rounded-sm px-4 py-2 font-display text-sm font-bold tracking-tight text-on-accent transition-colors hover:brightness-110 xl:inline-block"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-line text-foreground xl:hidden"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col border-t border-line bg-background px-6 py-2 font-display text-sm font-medium text-muted xl:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                data-track-event="nav_click"
                data-track-label={link.label}
                className="block border-b border-line py-2.5"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              data-track-event="cta_click"
              data-track-label="Let's talk (nav mobile)"
              className="accent-bar mt-3 block rounded-sm px-4 py-2.5 text-center font-display text-sm font-bold tracking-tight text-on-accent"
            >
              Let&apos;s talk
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
