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
- **Contact form** — front-end only. Wire to Webflow Forms, Formspree or a CRM.
- **Virtual tour** — flagged "Coming Soon"; no asset exists yet.
- **Video hosting** — 20MB is acceptable for a prototype; use a CDN or streaming
  provider (Mux, Cloudflare Stream, Vimeo) in production.
- **Social links** — none confirmed by the client, so the footer omits them.
