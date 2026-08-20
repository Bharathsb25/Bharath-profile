import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanguageProvider from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";
import BusinessHero from "@/components/BusinessHero";
import BusinessBundle from "@/components/BusinessBundle";
import BusinessWebsites from "@/components/BusinessWebsites";
import BusinessCatalogue from "@/components/BusinessCatalogue";
import BusinessProcess from "@/components/BusinessProcess";
// BusinessTestimonials: kept, currently not rendered — see page body below.
import BusinessFAQ from "@/components/BusinessFAQ";
import BusinessClosing from "@/components/BusinessClosing";
import { businessCopy } from "@/data/businessCopy";
import { profile } from "@/data/profile";

// Metadata and JSON-LD are server-rendered, so they always use the English
// tree — this is what search engines see regardless of what a visitor's
// browser later toggles to. See businessCopy.ts / the plan's SEO note: a
// client-side language toggle can't put Tamil into the indexed HTML.
const copy = businessCopy.en;

const title = "Website Design, CRM & WhatsApp Setup for Small Business India";
const description =
  "Websites from ₹500, CRM setup (Zoho, HubSpot, Freshsales), SMS & WhatsApp Business API integration, payment gateways, dashboards and financial reporting, and branding — for shops, clinics, schools, small firms and individual professionals in India. Fixed price in writing before any work starts.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "website design for small business India",
    "affordable website India",
    "CRM setup Zoho HubSpot Freshsales",
    "WhatsApp Business API setup",
    "SMS integration DLT registration India",
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
        name: copy.bundle.headline,
        url: "/services#bundle",
        itemOffered: {
          "@type": "Service",
          name: copy.bundle.headline,
          description: copy.bundle.intro,
          serviceType: copy.bundle.items.map((item) => item.title).join(", "),
        },
      },
      {
        "@type": "OfferCatalog",
        name: copy.websites.kicker,
        itemListElement: copy.websites.tiers.map((tier) => ({
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
      ...copy.categories.map((category) => ({
        "@type": "OfferCatalog",
        name: category.title,
        itemListElement: category.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.title,
            description: item.outcome,
          },
        })),
      })),
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: copy.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ServicesPage() {
  return (
    <LanguageProvider>
      <Navbar extra={<LanguageToggle />} />
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
        {/* Hidden until real client quotes replace the TODO placeholders —
            component and its copy stay in place, just not rendered. See
            BusinessTestimonials.tsx / businessCopy.ts testimonials. */}
        {/* <BusinessTestimonials /> */}
        <BusinessFAQ />
        <BusinessClosing />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
