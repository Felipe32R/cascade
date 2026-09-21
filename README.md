# Cascade Residences — Website

Marketing site for the Cascade Residences launch (Negril, Jamaica).
React 19 + TypeScript + Vite, with hand-written semantic CSS.

## Running locally

```bash
npm install     # first time only
npm run dev     # http://localhost:5173
```

Or double-click `Run Cascade Website.command` in the parent folder.

```bash
npm run build   # typecheck + production bundle into dist/
npm run preview # serve the production build
```

## Architecture

```
src/
  content/site.ts        All copy, in one file. Sourced from the brochure.
  components/
    layout/              Header (+ overlay menu), Footer
    sections/            One component per page section, in page order
    ui/                  Reveal, SectionHead, Figure
  hooks/                 useInView, useScrolled, useBodyLock
  styles/                base.css (tokens) + one stylesheet per section
public/
  images/                Web-optimised renders (2400px, ~85MB → 14MB)
  video/                 Compressed film (184MB → 20MB)
  brochure/              Downloadable PDF
  brand/                 Logo
```

**`src/content/site.ts` is the single source of truth for copy.** Every string is
taken from the official brochure or the client brief. Nothing is invented — there
is no pricing, unit count, square footage, rental yield or completion date on the
site, because none of those exist in the supplied project materials.

**CSS load order matters.** `base.css` is imported in `main.tsx` *before* `App`, so
that section stylesheets (same specificity) win over base utility classes.

## Leads: form, database and dashboard

The contact form posts to `/api/leads` (a Cloudflare Pages Function in `functions/`),
which validates the data and stores it in a Cloudflare D1 (SQLite) table named `leads`.
The team reviews leads at `/admin/`: search, filter by status
(new / contacted / archived), and export to CSV for mailing tools.

```
functions/api/leads.ts              POST — public, used by the form
functions/api/admin/_middleware.ts  rejects requests not signed in through Cloudflare Access
functions/api/admin/leads.ts        GET list, PATCH status
functions/api/admin/export.ts       GET CSV export
migrations/                         D1 schema
```

**Local development**

```bash
npm run db:migrate:local   # once, creates the local SQLite DB in .wrangler/
npm run cf:dev             # builds and serves site + functions on http://localhost:8788
```

`npm run dev` (Vite) still works for front-end work, but `/api` is not available
there, so the form shows its error state. Locally, `/admin/` needs Cloudflare
Access's header, which only exists in production; test the admin API with
`curl -H "cf-access-authenticated-user-email: you@example.com" localhost:8788/api/admin/leads`.

**First deploy**

1. `npx wrangler login`
2. `npx wrangler d1 create cascade-leads` and paste the returned `database_id` into `wrangler.toml`.
3. `npm run db:migrate:remote`
4. `npm run deploy`, or connect the repo in Cloudflare Pages (build `npm run build`, output `dist`).
5. **Protect the dashboard:** Cloudflare Zero Trust → Access → Applications → Add →
   Self-hosted. Add two paths, `<domain>/admin` and `<domain>/api/admin`, with an
   "Allow" policy listing the client's emails (one-time PIN login). Until this is
   done, the admin API refuses every request, so the data stays closed.

**Brochure email**

After a lead is saved, `functions/_lib/brochure-email.ts` emails them a link to
`/brochure/cascade-residences-brochure.pdf` through [Resend](https://resend.com), and
the dashboard's "Brochure" column shows whether it went out. If the email fails,
the lead is still saved.

The PDF is a web-compressed copy (100 ppi images, ~9 MB) of
`BROCHURE/Brochure - Whatsapp and web version.pdf`; the original is 25.8 MB, over
the Pages 25 MiB file limit. To regenerate it:

```bash
gs -q -sDEVICE=pdfwrite -dCompatibilityLevel=1.6 -dNOPAUSE -dBATCH -dDetectDuplicateImages=true \
  -dDownsampleColorImages=true -dColorImageResolution=100 -dColorImageDownsampleThreshold=1.2 \
  -dDownsampleGrayImages=true -dGrayImageResolution=100 -dGrayImageDownsampleThreshold=1.2 \
  -sOutputFile=public/brochure/cascade-residences-brochure.pdf "../BROCHURE/Brochure - Whatsapp and web version.pdf"
```

Setup:

1. Create a Resend account and an API key (Sending access).
2. `npx wrangler pages secret put RESEND_API_KEY --project-name cascade-residences`
3. For local testing, copy `.dev.vars.example` to `.dev.vars` and fill in the key.
4. `EMAIL_FROM` lives in `wrangler.toml`. Resend's test sender `onboarding@resend.dev`
   only delivers to your own Resend account email. To email real leads, verify a
   domain in Resend (add its DNS records) and change `EMAIL_FROM` to an address on it.
   Replies go to `brand.email` in `src/content/site.ts`.

New schema changes go in a new `migrations/000N_*.sql` file, applied with the
`db:migrate:*` scripts.

## Notes for the Webflow rebuild

The CSS uses semantic class names (`.rooms__item`, `.floor-plans__tab`) rather than
utility classes, so each one maps directly onto a Webflow class. Design tokens live
in `:root` in `base.css` — those become Webflow variables. All motion is
IntersectionObserver + CSS transitions, which maps onto native Webflow Interactions
(scroll into view → add class).

Sections that would become Webflow CMS Collections: Gallery, Floor Plans, Amenities.

## Outstanding items before launch

- **Floor plans B, C and D** — only Type A exists in the supplied materials; the
  other three render a "Detailed plan in preparation" state.
- **Hero video** — the hero currently uses a still frame (`coast.jpg`) with a slow
  drift. The brief calls for a looping ocean video; drop in the client's clip and
  swap the `<img>` for a muted autoplay `<video>` with this image as `poster`.
- **Brochure email sender** — uses Resend's test sender until a domain is verified,
  which only delivers to the Resend account owner. See "Brochure email" above.
- **Virtual tour** — flagged "Coming Soon"; no asset exists yet.
- **Video hosting** — 20MB is acceptable for a prototype; use a CDN or streaming
  provider (Mux, Cloudflare Stream, Vimeo) in production.
- **Social links** — none confirmed by the client, so the footer omits them.
