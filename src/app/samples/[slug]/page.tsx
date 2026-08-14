import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SampleDisclaimer from "@/components/SampleDisclaimer";
import { samples, getSample } from "@/data/samples";

/**
 * Report viewer. The HTML is read from src/content/samples at build time and
 * injected with iframe srcDoc — there is no URL that serves the raw file, and
 * no download or print control anywhere on this page.
 *
 * The iframe is not decoration: these reports carry their own body{} rules and
 * A4 @page print CSS, which would fight the site's globals if inlined.
 */

export function generateStaticParams() {
  return samples.map((sample) => ({ slug: sample.slug }));
}

export const dynamicParams = false;

function readReport(file: string) {
  const filePath = path.join(process.cwd(), "src/content/samples", file);
  return fs.readFileSync(filePath, "utf8");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sample = getSample(slug);
  if (!sample) return {};

  const description = `${sample.summary} Personal analysis published as a work sample — not investment advice.`;
  return {
    title: sample.title,
    description,
    alternates: { canonical: `/samples/${sample.slug}` },
    openGraph: {
      type: "article",
      url: `/samples/${sample.slug}`,
      title: `${sample.title} — Bharath Sathiskumar`,
      description,
    },
  };
}

export default async function SampleViewerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sample = getSample(slug);
  if (!sample) notFound();

  const html = readReport(sample.file);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-12">
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-muted">
            <Link href="/samples" className="transition-colors hover:text-accent">
              Sample work
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-foreground">{sample.company}</span>
          </nav>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {sample.company}
          </h1>
          <p className="mt-2 text-sm font-medium text-muted">
            {sample.kind} · {sample.date}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            {sample.summary}
          </p>

          <div className="mt-8">
            <SampleDisclaimer />
          </div>

          {/* The report itself. Sandboxed: no scripts, but citation links can
              still open in a new tab. */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
            <iframe
              srcDoc={html}
              title={sample.title}
              sandbox="allow-popups allow-popups-to-escape-sandbox"
              loading="lazy"
              className="h-[80vh] w-full border-0"
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            Scroll inside the frame to read the full report.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/samples"
              className="rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              ← All samples
            </Link>
            <Link
              href="/services#start"
              className="rounded-full accent-bar px-6 py-3 text-sm font-semibold text-on-accent shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Talk about your own numbers →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
