import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SampleDisclaimer from "@/components/SampleDisclaimer";
import { samples, samplesIntro } from "@/data/samples";

const title = "Sample Work — IPO Validation Reports";
const description =
  "Three worked examples of research: IPO validation reports pulling apart company filings, financials and risk disclosures. Personal analysis published as samples — not investment advice.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/samples" },
  openGraph: {
    type: "website",
    url: "/samples",
    title: `${title} — Bharath Sathiskumar`,
    description,
  },
};

export default function SamplesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <div className="glow pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 opacity-20" />

          <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-16 sm:pt-20">
            <span className="rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {samplesIntro.kicker}
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              {samplesIntro.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              {samplesIntro.subhead}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              {samplesIntro.note}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20">
          <Reveal>
            <SampleDisclaimer />
          </Reveal>

          <div className="mt-10">
            <Reveal>
              <SectionHeading
                index="01"
                kicker="The reports"
                title="IPOs, taken apart"
              />
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-3">
              {samples.map((sample, i) => (
                <Reveal key={sample.slug} delay={i * 90}>
                  <article className="card card-hover flex h-full flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      {sample.date}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-bold text-foreground">
                      {sample.company}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-muted">
                      {sample.kind}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {sample.summary}
                    </p>

                    <ul className="mt-4 space-y-1.5">
                      {sample.covers.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-xs leading-5 text-muted"
                        >
                          <span className="text-accent" aria-hidden="true">
                            ·
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/samples/${sample.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-accent transition-colors hover:underline"
                    >
                      Read the report →
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="mt-12 rounded-2xl border border-line bg-card p-6 text-center">
              <p className="font-display text-base font-bold text-foreground">
                Want this kind of analysis for your own business?
              </p>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
                The same method works on your own numbers — financial statement
                analysis, budgeting and forecasting, or research before a
                decision you can&apos;t easily undo.
              </p>
              <Link
                href="/services#insight"
                className="mt-5 inline-block rounded-full accent-bar px-6 py-3 text-sm font-semibold text-on-accent shadow-sm transition-transform hover:-translate-y-0.5"
              >
                See what I offer →
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
