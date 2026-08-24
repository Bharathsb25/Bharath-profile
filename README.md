# Bharath Sathiskumar — portfolio

Personal site for **Bharath Sathiskumar**, Implementation Specialist (SaaS delivery, education CRM & admissions, client onboarding, testing, and workflow automation).

Built with Next.js (App Router), React, and Tailwind CSS.

| Path | What it is |
| --- | --- |
| `/` | Portfolio homepage |
| `/freelance` | Freelance / contract engagements |
| `/services` | Small-business solutions (English / Tamil) |
| `/samples` | IPO analysis work samples |
| `/privacy` | Privacy policy |

Content is data-driven. Do not invent testimonials or unhide the testimonials block until real quotes exist.

## Prerequisites

- Node.js 20+
- npm

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run lint` | ESLint |
| `npm run build` | Production build (webpack, as configured) |
| `npm run start` | Serve the production build |

## Editing content

**[EDITING-GUIDE.md](./EDITING-GUIDE.md)** is the source of truth for day-to-day edits:

- Copy, contact details, experience → `src/data/profile.ts`
- Small-business page (EN/TA) → `src/data/businessCopy.ts`
- IPO samples → `src/data/samples.ts` and `src/content/samples/`
- Photo → `public/profile.jpg`
- CV PDF → `public/Bharath-Sathiskumar-CV.pdf` (source in `cv-source/`)
- Favicon letter → `src/app/icon.svg`

## Social preview

Open Graph and Twitter cards use `src/app/opengraph-image.png` (and the matching Twitter image). Next.js serves these automatically.

Set `NEXT_PUBLIC_SITE_URL` to the live origin (no trailing slash) so canonical URLs, JSON-LD, and `sitemap.xml` are not `localhost`.

## Deploy

Connect this Git remote to [Vercel](https://vercel.com) (or another Next.js host). After the first project is created, pushing to `main` rebuilds the site.

Until a production domain is attached, set `NEXT_PUBLIC_SITE_URL` (and/or rely on Vercel’s `VERCEL_PROJECT_PRODUCTION_URL`) so metadata does not fall back to localhost.

Framework notes for this Next.js version live under `node_modules/next/dist/docs/` after install.
