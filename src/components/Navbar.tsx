"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

// The explicit annotation matters: without it TS infers a union where only the
// Blog member has `mobileOnly`, and reading it off the others is an error.
const links: { href: string; label: string; mobileOnly?: boolean }[] = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/services", label: "For Business" },
  { href: "/freelance", label: "Hire Me" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#blog", label: "Blog", mobileOnly: true },
  { href: "/#contact", label: "Contact" },
];

// Blog is dropped from the desktop row purely for width — it stays in the
// mobile menu and the footer.
const desktopLinks = links.filter((link) => !link.mobileOnly);

export default function Navbar() {
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/#top"
          className="font-display text-sm font-bold tracking-tight text-foreground"
        >
          Bharath<span className="text-gradient"> Sathiskumar</span>
        </a>

        {/* Desktop nav starts at lg, not md. At md the link row plus the logo
            and the "Let's talk" button are wider than the viewport, which
            silently wraps the logo onto two lines. Below lg: hamburger. */}
        <ul className="hidden gap-6 text-sm font-medium text-muted lg:flex lg:gap-8">
          {desktopLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/#contact"
            className="hidden rounded-full accent-bar px-4 py-2 text-sm font-semibold text-on-accent shadow-sm transition-transform hover:-translate-y-0.5 lg:inline-block"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-line bg-background px-6 py-3 text-sm font-medium text-muted lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-full accent-bar px-4 py-2 text-center font-semibold text-on-accent"
            >
              Let&apos;s talk
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
