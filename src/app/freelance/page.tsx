import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import RevealPhoneButton from "@/components/RevealPhoneButton";
import FreelanceHero from "@/components/FreelanceHero";
import FreelancePackages from "@/components/FreelancePackages";
import FreelanceProcess from "@/components/FreelanceProcess";
import FreelanceFAQ from "@/components/FreelanceFAQ";
import { freelance, profile } from "@/data/profile";

const title = "Freelance Implementation & Automation";
const description =
  "Hire me for a project: education CRM & admissions funnels, client onboarding design, workflow automation, and implementation rescue. Fixed scope, fixed price, quoted after a short scoping call.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/freelance" },
  openGraph: {
    type: "website",
    url: "/freelance",
    title: `${title} — Bharath Sathiskumar`,
    description,
  },
};

// Tells search engines these are bookable services, not just page copy.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bharath Sathiskumar — Freelance Implementation Specialist",
  description,
  provider: {
    "@type": "Person",
    name: profile.name,
    jobTitle: "Implementation Specialist",
    email: profile.email,
  },
  areaServed: "Worldwide",
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "/freelance#start",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Freelance engagements",
    itemListElement: freelance.packages.map((pkg) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: pkg.name, description: pkg.ideal },
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: freelance.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FreelancePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([serviceSchema, faqSchema]),
          }}
        />

        <FreelanceHero />
        <FreelancePackages />
        <FreelanceProcess />
        <FreelanceFAQ />

        {/* Enquiry */}
        <section id="start" className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line accent-bar px-6 py-12 sm:px-10 sm:py-14">
              <div className="glow pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-30" />
              <div className="glow pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 opacity-20" />

              <div className="relative grid items-start gap-10 md:grid-cols-2">
                <div className="text-on-accent">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-on-accent">
                    Start a project
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {freelance.cta.title}
                  </h2>
                  <p className="mt-4 max-w-md text-on-accent">
                    {freelance.cta.text}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${profile.email}?subject=Freelance%20project%20enquiry`}
                      className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5"
                    >
                      ✉ {profile.email}
                    </a>
                    <RevealPhoneButton />
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-on-accent/40 px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-on-accent/10"
                    >
                      in LinkedIn
                    </a>
                  </div>

                  <p className="mt-6 text-xs text-on-accent">
                    {freelance.responseTime} · NDA on request · No obligation
                    after the scoping call
                  </p>
                </div>

                <ContactForm
                  subject="🧾 New FREELANCE project enquiry"
                  formName="Portfolio — Freelance Page"
                  messageLabel="What's stuck?"
                  messagePlaceholder="Platform you're on, what isn't working, and when you need it live…"
                  submitLabel="Send project enquiry"
                />
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
