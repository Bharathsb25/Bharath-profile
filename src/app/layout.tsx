import type { Metadata } from "next";
import { Sora, Inter, Noto_Sans_Tamil } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Only reachable via the /services language toggle — Inter has no Tamil
// glyphs, so without this Tamil falls back to a system font and looks
// broken. Applied through the html[lang="ta"] rule in globals.css, not a
// className here, since which font is active depends on client-side state.
const notoSansTamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const title = "Bharath Sathiskumar — Implementation Specialist";
const description =
  "Implementation Specialist & Product Analyst — SaaS delivery, education CRM & admissions, client onboarding, API integrations, testing, and workflow automation. Open to full-time roles and freelance projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Bharath Sathiskumar",
  },
  description,
  keywords: [
    "Implementation Specialist",
    "SaaS implementation",
    "Education CRM",
    "Admissions funnel",
    "Meritto",
    "Camu",
    "LeadSquared",
    "Client onboarding",
    "Product Analyst",
    "Workflow automation",
    "UAT testing",
    "Power BI",
    "Bharath Sathiskumar",
  ],
  authors: [{ name: "Bharath Sathiskumar" }],
  creator: "Bharath Sathiskumar",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Bharath Sathiskumar",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data so search engines understand who this is.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bharath Sathiskumar",
  jobTitle: "Implementation Specialist",
  url: siteUrl,
  email: "Sbharath23@outlook.com",
  sameAs: ["https://www.linkedin.com/in/bharath-sb-4a9834146"],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "AI Tools & ChatGPT Workshop",
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: "be10x" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Power BI",
      credentialCategory: "certificate",
      identifier: "559407733",
      recognizedBy: { "@type": "Organization", name: "Mind Luster" },
    },
  ],
  knowsAbout: [
    "SaaS Implementation",
    "Education CRM & Admissions",
    "Client Onboarding",
    "Workflow Automation",
    "Functional & UAT Testing",
    "Power BI",
  ],
};

// Runs before paint so the saved/system theme is applied with no flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${notoSansTamil.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
