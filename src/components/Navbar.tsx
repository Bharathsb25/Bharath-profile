"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#education", label: "Education" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

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

        <ul className="hidden gap-8 text-sm font-medium text-muted sm:flex">
          {links.map((link) => (
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

        <div className="hidden sm:block">
          <a
            href="/#contact"
            className="rounded-full accent-bar px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-foreground sm:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-line bg-background px-6 py-3 text-sm font-medium text-muted sm:hidden">
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
              className="mt-1 block rounded-full accent-bar px-4 py-2 text-center font-semibold text-white"
            >
              Let&apos;s talk
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
