# Visitor analytics — setup & deployment

A first-party, privacy-conscious analytics system for this portfolio:
anonymous visitor/session tracking, real engagement-time measurement,
click/download/form/section event tracking, and a private
`/admin/analytics` dashboard. Built directly on the existing Next.js App
Router + Vercel hosting stack, with one new dependency
(`@neondatabase/serverless`).

## 1. Provision the database

1. Vercel Dashboard → your project → **Storage** → **Create Database** →
   **Postgres** (Neon). This auto-injects `DATABASE_URL` (and a few
   related vars) into your Vercel project's environment for all
   environments (Production/Preview/Development).
2. Pull it locally for development:
   ```bash
   vercel env pull .env.local
   ```
   Or, if you'd rather not install the Vercel CLI, copy the connection
   string from the Neon console (linked from the Storage tab) into
   `.env.local` yourself as `DATABASE_URL=...` (see `.env.example`).

## 2. Set the remaining environment variables

Copy `.env.example` to `.env.local` and fill in:

- `ADMIN_PASSWORD` — the password for `/admin/login`.
- `SESSION_SECRET` — `openssl rand -hex 32`
- `ANALYTICS_IP_HASH_SECRET` — `openssl rand -hex 32`
- `ANALYTICS_STORE_RAW_IP` — leave `false` unless you have a specific
  reason to keep raw IPs (see [Privacy design](#privacy-design) below).
- `ANALYTICS_IP_ENCRYPTION_KEY` — only if the above is `true`.
- `ANALYTICS_RETENTION_DAYS` — optional, defaults to 400.
- `ANALYTICS_INTERNAL_IPS` — optional, your own IP(s) to exclude.
- `CRON_SECRET` — required for the daily retention cron to authenticate
  itself (Vercel sets this automatically for Cron Jobs on paid plans; on
  Hobby, set it yourself and it still works — see step 5).

Set the same variables in **Vercel → Project → Settings → Environment
Variables** for Production (and Preview, if you want analytics on preview
deployments too — it's usually better to leave Preview untracked).

## 3. Run the database migration

```bash
npm install        # pulls in @neondatabase/serverless
npm run db:migrate  # creates visitors/sessions/events/rate_limits tables + indexes
```

Safe to re-run — it tracks applied migrations in a `_migrations` table and
skips ones already applied. Run it once against the production
`DATABASE_URL` after your first deploy (or before, against the same Neon
database Vercel provisioned).

## 4. Deploy

Push to your Vercel-connected branch as usual. Nothing else changes about
the build — `npm run build` is untouched.

## 5. Retention cron

`vercel.json` schedules `/api/admin/retention` daily at 03:00 UTC, which
deletes visitor/session/event rows older than `ANALYTICS_RETENTION_DAYS`.
Vercel Cron Jobs are enabled automatically once `vercel.json` is deployed;
no extra setup beyond `CRON_SECRET` being set (Vercel sets it for you on
paid plans — on Hobby, set any random string yourself as a Project env var
and Vercel will send it as the `Authorization: Bearer` header).

## Google Tag Manager (dataLayer mirroring)

`NEXT_PUBLIC_GTM_ID` loads GTM (`src/app/layout.tsx`). Every event this
system tracks — page views, section views, clicks, downloads, form
outcomes, everything — is also pushed to `window.dataLayer`
(`src/lib/analytics/gtm.ts`, called from the single choke point in
`src/lib/analytics/track.ts`), gated by the same opt-out as the rest of
this analytics system. This is **one instrumentation point feeding two
places** — no separate `gtag()`/`dataLayer.push()` calls scattered through
components.

Pushing to `dataLayer` is necessary but not sufficient: to turn a pushed
event into an actual GA4 event, add a matching **Trigger** (Custom Event,
matching the `event` field, e.g. `download`) and **Tag** (GA4 Event, with
whatever fields off the pushed object you want as event parameters — e.g.
`page_path`, `label`, `destination_url`) in the GTM container itself at
tagmanager.google.com. That configuration lives in Google's UI, not in
this repo.

## Privacy design

- IPs are **hashed** (HMAC-SHA256) by default and never stored raw. The
  hash is one-way — it can't be turned back into an IP — and is used only
  as an internal join key.
- Raw-IP storage is **off by default**. Turning on
  `ANALYTICS_STORE_RAW_IP` additionally AES-256-GCM encrypts the IP into
  an admin-only column (`visitors.ip_encrypted`), which is purged by the
  same retention job as everything else. When it's on, the decrypted IP
  is shown to the logged-in admin in the sessions table and CSV export —
  visitors are never shown their own or anyone else's IP.
- Geolocation (country/region/city/timezone) comes from Vercel's edge
  request headers — no external API call, no third-party data sharing.
- Bots/crawlers/known tooling User-Agents are flagged (`is_bot`) and
  excluded from every dashboard aggregate.
- The site owner's own visits (once logged into `/admin`) are never
  tracked — the collect endpoint recognizes the admin session cookie and
  no-ops.
- A consent banner appears once per visitor with an **opt-out** button;
  the choice is stored in `localStorage` and checked before every
  analytics request. `navigator.doNotTrack` is also honored.
- Visitors never have personal form-field contents, passwords, or free
  text captured — only event names, page/section/element identifiers, and
  small numeric/boolean metadata (e.g. scroll depth, active seconds).

## Architecture at a glance

- **Client** (`src/lib/analytics/`): generates anonymous visitor/session
  UUIDs, batches events, flushes via `fetch(keepalive)` and
  `navigator.sendBeacon` on exit. Tracks *active* engagement time (tab
  visible + recent input, not just "tab open"), scroll depth, section
  views (`IntersectionObserver`), and route changes.
- **Collection endpoint** (`POST /api/analytics/collect`): validates and
  sanitizes every field server-side, rate-limits by hashed IP, filters
  bots/internal traffic, resolves geo from Vercel headers, upserts
  visitor/session rows, and inserts events — all wrapped so a failure here
  can never break the site (it always responds fast and never throws
  into the caller).
- **Database** (`src/lib/db/`): hand-written SQL migrations (no ORM) for
  `visitors`, `sessions`, `events`, `rate_limits`, with indexes on every
  column the dashboard filters or groups by.
- **Dashboard** (`/admin/analytics`): password-protected
  (`ADMIN_PASSWORD` + a signed HttpOnly session cookie, enforced by
  `src/proxy.ts`), server-rendered from direct SQL aggregate
  queries (`src/lib/db/queries/analytics.ts`), with date-range/event/page/
  device/country filters, CSV export, and a recent-sessions table with a
  per-session event timeline. The sessions table and CSV export also show a
  visitor's real IP address, decrypted server-side, **only when**
  `ANALYTICS_STORE_RAW_IP=true` and `ANALYTICS_IP_ENCRYPTION_KEY` are both
  set — otherwise that column just shows "—". Sessions recorded before
  those were set stay blank permanently (the encrypted value was never
  written for them).

## Manual verification checklist

- [ ] Load the homepage in a private window → consent banner appears once.
- [ ] Click "Opt out" → reload → no `/api/analytics/collect` requests fire
      (check the Network tab).
- [ ] Click "OK" (or don't opt out) → browse a few sections → confirm
      `page_view` and `section_view` requests appear in the Network tab.
- [ ] Download the CV, reveal/copy the phone number, copy the email, submit
      the contact form → confirm the corresponding events fire
      (`download`, `copy_phone`, `copy_email`, `form_start`/`form_submit`/
      `form_success`).
- [ ] Close the tab after browsing for ~30s → a `session_end` beacon should
      have gone out (visible briefly in the Network tab before the tab
      closes, or confirm the session's `active_seconds` in the DB/dashboard
      afterward).
- [ ] Visit `/admin/analytics` while logged out → redirected to
      `/admin/login`.
- [ ] Log in with the wrong password 6 times quickly → 6th attempt is
      rate-limited (429).
- [ ] Log in with the correct password → dashboard loads with real numbers
      once a few events have been collected.
- [ ] Apply date-range/device/country filters → numbers narrow accordingly.
- [ ] Click "Export CSV" → a CSV downloads with the filtered sessions.
- [ ] Confirm a bot-looking User-Agent (e.g. curl) is excluded from
      dashboard totals (check `sessions.is_bot` in the DB, or just note the
      dashboard's totals don't move when you `curl` the collect endpoint).
- [ ] Confirm `ANALYTICS_STORE_RAW_IP` is unset/`false` in production
      unless you deliberately opted in.
- [ ] If `ANALYTICS_STORE_RAW_IP=true`: browse the site once, then confirm
      the "IP address" column in the sessions table (and the CSV export)
      shows a real IP for that new session — older sessions from before the
      flag was set will correctly show "—".

## Automated tests

```bash
npm test
```

Runs `tests/analytics/*.test.ts` on Node's built-in test runner (no new
devDependency) — covers bot detection, IP hashing/encryption round-trips,
the rate limiter's window math, server-side payload validation/
sanitization, active-seconds/scroll-depth aggregation, and the admin
session token's sign/verify/expiry logic.

## Files added

```
src/lib/db/{client,schema.sql,migrate}.ts
src/lib/db/migrations/0001_init.sql
src/lib/db/queries/analytics.ts
src/lib/analytics/{types,validate,ip,geo,botDetect,rateLimit,
  sessionAggregate,consent,track,useEngagement,useSectionObserver,
  useRouteTracking}.ts
src/lib/auth/session.ts
src/components/analytics/{AnalyticsProvider,ConsentBanner,
  PrivacyAnalyticsToggle}.tsx
src/components/CopyEmailButton.tsx
src/proxy.ts
src/app/api/analytics/collect/route.ts
src/app/api/admin/{login,logout,export,retention}/route.ts
src/app/api/admin/sessions/[id]/events/route.ts
src/app/admin/login/page.tsx
src/app/admin/analytics/{page,loading,error,FilterBar,StatCard,
  TopListCard,GeoCard,DeviceCard,SessionsTable,LogoutButton}.tsx
vercel.json
.env.example
docs/analytics-setup.md
tests/analytics/*.test.ts
```

## Files modified

```
src/app/layout.tsx          — mounts AnalyticsProvider next to <Analytics/>
src/app/privacy/page.tsx    — describes first-party analytics + opt-out
src/components/ContactForm.tsx      — form_start/submit/success/failure
src/components/DownloadCVButton.tsx — download event
src/components/RevealPhoneButton.tsx — reveal/call/copy_phone events
src/components/Navbar.tsx   — data-track-* on nav links
src/components/Footer.tsx   — data-track-* on footer/social links, copy email
src/components/Projects.tsx — data-track-* on the project CTA
package.json                 — @neondatabase/serverless, db:migrate/test scripts
tsconfig.json                 — allowImportingTsExtensions (Node test runner needs
                                 explicit .ts extensions in relative imports)
```
