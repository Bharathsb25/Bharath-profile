import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import RevealPhoneButton from "@/components/RevealPhoneButton";
import BusinessHero from "@/components/BusinessHero";
import BusinessBundle from "@/components/BusinessBundle";
import BusinessWebsites from "@/components/BusinessWebsites";
import BusinessCatalogue from "@/components/BusinessCatalogue";
import BusinessProcess from "@/components/BusinessProcess";
import BusinessFAQ from "@/components/BusinessFAQ";
import { businessServices, profile } from "@/data/profile";

const title = "Business Solutions for Small & Local Businesses";
const description =
  "Websites from ₹500, plus CRM setup, business automation, dashboards, MIS and financial reporting, WhatsApp & SMS, and branding — for shops, clinics, schools, small firms and individual professionals. Fixed price in writing before any work starts.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "website design for small business",
    "affordable website India",
    "CRM setup Zoho HubSpot Freshsales",
    "WhatsApp Business API setup",
    "Google Business Profile setup",
    "business automation India",
    "small business software",
    "brand identity kit",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title: `${title} — Bharath Sathiskumar`,
    description,
  },
};

// Bookable services, not just page copy.
// NOTE: only the Basic website tier carries a number, and it is a FROM price —
// so it uses PriceSpecification.minPrice, never `price`. Every other offer
// omits price entirely (a priceless Offer is valid schema).
const catalogueSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bharath Sathiskumar — Business Solutions for Small Businesses",
  description,
  provider: {
    "@type": "Person",
    name: profile.name,
    email: profile.email,
    url: profile.linkedin,
  },
  areaServed: { "@type": "Country", name: "India" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "/services#start",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business solutions",
    itemListElement: [
      {
        "@type": "Offer",
        name: businessServices.bundle.headline,
        url: "/services#bundle",
        itemOffered: {
          "@type": "Service",
          name: businessServices.bundle.headline,
          description: businessServices.bundle.intro,
          serviceType: businessServices.bundle.items
            .map((item) => item.title)
            .join(", "),
        },
      },
      {
        "@type": "OfferCatalog",
        name: businessServices.websites.kicker,
        itemListElement: businessServices.websites.tiers.map((tier) => ({
          "@type": "Offer",
          name: `Website — ${tier.name}`,
          url: "/services#websites",
          itemOffered: {
            "@type": "Service",
            name: `${tier.name} website`,
            description: tier.ideal,
          },
          ...(tier.name === "Basic" && {
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "INR",
              minPrice: 500,
              valueAddedTaxIncluded: false,
            },
          }),
        })),
      },
      ...businessServices.categories.map((category) => ({
        "@type": "OfferCatalog",
        name: category.title,
        itemListElement: category.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.title,
            description: item.desc,
          },
        })),
      })),
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: businessServices.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([catalogueSchema, faqSchema]),
          }}
        />

        <BusinessHero />
        <BusinessBundle />
        <BusinessWebsites />
        <BusinessCatalogue />
        <BusinessProcess />
        <BusinessFAQ />

        {/* Enquiry */}
        <section id="start" className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line accent-bar px-6 py-12 sm:px-10 sm:py-14">
              <div className="glow pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-30" />
              <div className="glow pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 opacity-20" />

              <div className="relative grid items-start gap-10 md:grid-cols-2">
                <div className="text-on-accent">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-on-accent">
                    Start here
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {businessServices.cta.title}
                  </h2>
                  <p className="mt-4 max-w-md text-on-accent">
                    {businessServices.cta.text}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${profile.email}?subject=Business%20services%20enquiry`}
                      className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5"
                    >
                      ✉ {profile.email}
                    </a>
                    <RevealPhoneButton />
                  </div>

                  <p className="mt-6 text-xs text-on-accent">
                    {businessServices.cta.note}
                  </p>
                </div>

                <ContactForm
                  subject="🏢 New BUSINESS SERVICES enquiry"
                  formName="Portfolio — Business Services"
                  messageLabel="What's slowing you down?"
                  messagePlaceholder="What your business does, what's taking too much time, and when you need it…"
                  submitLabel="Send my enquiry"
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
