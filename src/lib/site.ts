/**
 * Canonical origin for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production if the project uses a custom domain.
 * On Vercel, VERCEL_PROJECT_PRODUCTION_URL is set automatically.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteName = "Bharath Sathiskumar";

export const defaultTitle = "Bharath Sathiskumar — Implementation Specialist";

export const defaultDescription =
  "Implementation Specialist & Product Analyst — SaaS delivery, education CRM & admissions, client onboarding, API integrations, testing, and workflow automation. Open to full-time roles and freelance projects.";
