"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

type NavLink = { href: string; label: string };

const primary: NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
];

const work: NavLink[] = [
  { href: "/#projects", label: "Projects" },
  { href: "/#blog", label: "Blog" },
  { href: "/samples", label: "IPO Analysis" },
];

const hire: NavLink[] = [
  { href: "/#services", label: "Services" },
  { href: "/services", label: "For Business" },
  { href: "/freelance", label: "Hire Me" },
];

function MenuLink({
  href,
  label,
  onNavigate,
  className,
}: NavLink & { onNavigate?: () => void; className?: string }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={className ?? "transition-colors hover:text-foreground"}
    >
      {label}
    </Link>
  );
}

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li className="relative" ref={wrapRef}>
      <button
        type="button"
        className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <svg
          className={`h-3 w-3 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 min-w-[11.5rem] rounded-xl border border-line bg-background p-1.5 shadow-lg"
        >
          {items.map((item) => (
            <li key={item.href} role="none">
              <Link
                role="menuitem"
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-card hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * `extra` is an optional slot rendered next to ThemeToggle, for page-specific
 * controls that don't belong in every page's header (e.g. the language
 * toggle on /services). Navbar itself stays fully generic — it renders
 * whatever it's given without knowing what that control does or needs.
 */
export default function Navbar({ extra }: { extra?: React.ReactNode } = {}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <Link
          href="/#top"
          className="font-display text-sm font-bold tracking-tight text-foreground"
        >
          Bharath<span className="text-gradient"> Sathiskumar</span>
        </Link>

        {/* Grouped links fit from lg (1024px). Below that: hamburger. */}
        <ul className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex lg:gap-7">
          {primary.map((link) => (
            <li key={link.href}>
              <MenuLink {...link} />
            </li>
          ))}
          <DesktopDropdown label="Work" items={work} />
          <DesktopDropdown label="Hire" items={hire} />
          <li>
            <MenuLink href="/#contact" label="Contact" />
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {extra}
          <ThemeToggle />
          <Link
            href="/#contact"
            className="hidden rounded-full accent-bar px-4 py-2 text-sm font-semibold text-on-accent shadow-sm transition-transform hover:-translate-y-0.5 lg:inline-block"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id={menuId}
          className="flex flex-col gap-1 border-t border-line bg-background px-6 py-3 text-sm font-medium text-muted lg:hidden"
        >
          {primary.map((link) => (
            <li key={link.href}>
              <MenuLink {...link} onNavigate={close} className="block py-2" />
            </li>
          ))}
          <li className="pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted/80">
            Work
          </li>
          {work.map((link) => (
            <li key={link.href}>
              <MenuLink {...link} onNavigate={close} className="block py-2" />
            </li>
          ))}
          <li className="pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted/80">
            Hire
          </li>
          {hire.map((link) => (
            <li key={link.href}>
              <MenuLink {...link} onNavigate={close} className="block py-2" />
            </li>
          ))}
          <li>
            <MenuLink
              href="/#contact"
              label="Contact"
              onNavigate={close}
              className="block py-2"
            />
          </li>
          <li>
            <Link
              href="/#contact"
              onClick={close}
              className="mt-1 block rounded-full accent-bar px-4 py-2 text-center font-semibold text-on-accent"
            >
              Let&apos;s talk
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
