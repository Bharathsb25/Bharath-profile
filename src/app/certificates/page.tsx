import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CertificateGallery from "@/components/CertificateGallery";
import { awards, certifications, education } from "@/data/profile";

const title = "Certificates & Awards";
const description =
  "Every certificate and award Bharath Sathiskumar has earned, in full: Power BI, AI tools, the Camu Star Award and the Foodpreneur Growth Summit 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/certificates" },
  openGraph: {
    type: "website",
    url: "/certificates",
    title: `${title} — Bharath Sathiskumar`,
    description,
  },
};

// Newest first; the gallery skips entries without an image.
const withImage = [...certifications, ...awards].filter((cert) => cert.image);
const textOnly = certifications.filter((cert) => !cert.image);

export default function CertificatesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="streaks" />
          <div className="glow pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 opacity-20" />

          <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-20">
            <span className="rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Certificates
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Proof, <span className="text-gradient">not just claims.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              Every certificate and award, in full. Click one to view it large, then use the
              arrow keys to move between them.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <Reveal>
            <SectionHeading index="01" kicker="Certificates & awards" title="Earned along the way" />
          </Reveal>
          <Reveal>
            <CertificateGallery items={withImage} />
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <Reveal>
            <SectionHeading index="02" kicker="Also completed" title="Education & more" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((item) => (
              <Reveal key={item.degree}>
                <div className="card h-full p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    Education
                  </p>
                  <p className="mt-2 font-display text-base font-semibold text-foreground">
                    {item.degree}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {item.school} · {item.period}
                  </p>
                </div>
              </Reveal>
            ))}
            {textOnly.map((cert) => (
              <Reveal key={cert.name}>
                <div className="card h-full p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    Certificate · {cert.date}
                  </p>
                  <p className="mt-2 font-display text-base font-semibold text-foreground">
                    {cert.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
