import Link from "next/link";
import { freelance } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/**
 * Native <details> accordion — keeps this a server component, works without JS,
 * and stays keyboard accessible for free.
 */
export default function FreelanceFAQ() {
  return (
    <section id="faq" className="border-y border-line bg-card/40 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionHeading
            index="03"
            kicker="Before you ask"
            title="Practical questions"
          />
        </Reveal>

        <div className="space-y-3">
          {freelance.faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={(i % 3) * 70}>
              <details className="card group p-5 [&[open]]:border-accent/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-semibold text-foreground">
                  {faq.q}
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
                <p className="mt-3 text-sm leading-7 text-muted">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-muted">
            Hiring for a permanent role instead?{" "}
            <Link
              href="/#experience"
              className="font-semibold text-accent hover:underline"
            >
              See my full-time profile →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
