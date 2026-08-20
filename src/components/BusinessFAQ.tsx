"use client";

import Link from "next/link";
import { useCopy } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/**
 * Native <details> accordion — keeps this a client component simple, works
 * without JS, and stays keyboard accessible for free.
 */
export default function BusinessFAQ() {
  const { faq } = useCopy();

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <SectionHeading index="05" kicker={faq.kicker} title={faq.title} />
      </Reveal>

      <div className="space-y-3">
        {faq.items.map((item, i) => (
          <Reveal key={item.q} delay={(i % 3) * 70}>
            <details className="card group p-5 [&[open]]:border-accent/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-semibold text-foreground">
                {item.q}
                <span className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 text-center text-sm text-muted">
          {faq.footerText}{" "}
          <Link href="/freelance" className="font-semibold text-accent hover:underline">
            {faq.footerCta}
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
