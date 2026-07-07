# Architecture

## What this is
Static multi-page marketing site for P.S. Coffee (pscoffee.in), a pre-launch specialty-coffee
"Pod" brand. No framework, no build step, no bundler — plain HTML/CSS/JS files served directly
by Vercel, plus two serverless functions for form submission.

## Tech stack

| Layer | Choice | Why (inferred from code) |
|---|---|---|
| Markup | Static HTML, one file per page | No routing/build complexity needed for a ~25-page marketing site |
| Styling | Plain CSS, 3 files, no preprocessor | `assets/ps.css` (tokens), `assets/wh.css` (layout, inherited from a "WatchHouse" template), `assets/mobile.css` (responsive overrides) — see below |
| Behaviour | Vanilla JS, no framework | `assets/ps.js` (nav/footer/forms/highlight system), `assets/mobile.js`, `assets/image-slot.js` |
| Fonts | Self-hosted `.woff2`, `@font-face` in `ps.css` | Bricolage Grotesque, Space Grotesk, Instrument Serif — avoids a Google Fonts network request |
| Backend | 2 Vercel serverless functions (Node ESM) | `api/submit-form.js`, `api/form-status.js` — see [api-reference.md](api-reference.md) |
| Data store | Google Sheets (via `googleapis` npm package) | Free, human-readable form-submission store for a pre-launch site with no real database needs |
| Hosting/deploy | Vercel, auto-deploy on push to `main` | `vercel.json` sets `cleanUrls:true`, `trailingSlash:false`, cache headers, and legacy redirects |
| Dependencies | `googleapis` only (`package.json`) | No test runner, no bundler, no lint config exist in this repo |

## Folder structure

```
/                       Every page as a flat .html file (index, menu, pack, about, join, etc.)
api/                    Vercel serverless functions (Node ESM) — form submission + admin status
assets/
  ps.css                Canonical design-system layer: :root tokens (colour/spacing/radius/type),
                         @font-face declarations, nav/footer base structure, buttons, badges, forms
                         (~600 lines, NOT cache-bust versioned)
  wh.css                The dominant stylesheet (~7,600 lines). Named after the "WatchHouse"
                         template this site was originally built on — despite the name it drives
                         most real layout: heroes, page cards, menu, footer overrides, blog posts,
                         matcha colour swaps. Cache-busted with ?v=N in every blog HTML file.
  mobile.css             Responsive overrides (~1,400 lines), @media (max-width:760px) for most
                         rules. Cache-busted with ?v=N.
  ps.js                  Site-wide behaviour: nav/footer HTML injection (PAGES array), FAQ toggle,
                         forms, the Nectar auto-highlight system (nectarSignature()). Cache-busted
                         with ?v=N.
  mobile.js               Mobile-only scripts.
  image-slot.js           Responsive image-loading utility.
  fonts/brand/             Self-hosted Bricolage Grotesque / Space Grotesk / Instrument Serif (woff2) —
                           the 3 fonts actually in use, referenced by ps.css @font-face.
  fonts/ (root)            4 legacy .otf files (Balto-Book, Balto-Medium, TiemposHeadline-Medium,
                           WatchHouseSerif-Medium) left over from the original template. Still
                           @font-face'd in wh.css and fed into --wh-serif/--wh-sans/--wh-logo-serif,
                           but a later :root block in wh.css (~line 6291) overrides all three
                           tokens back to Bricolage/Space Grotesk — so these 4 files are currently
                           unused in the rendered site. See docs/tasks.md.
  icons/                   Favicons, app-store badges, logo/monogram lockups (Terracotta + Ceremonial
                           colour profiles).
  photos/site/             Optimised site images, webp, cached immutably by Vercel for 1 year.
  photos/ (root)           P.S. Pass product images (webp), used only on pack.html.
blog/                     10 individual blog post HTML files (flat, no further nesting).
docs/                     This documentation set.
Logo Files/               Untracked raw logo-source drop (PNGs) — kept out of git deliberately,
                          not part of the deployed site.
```

## Data model / schema

There is no database. Form submissions are appended as rows to a Google Sheet, one tab per form:

- Sheet is identified by `process.env.GOOGLE_SHEETS_ID`.
- Each form name (`newsletter`, `pack-enquiry`, `event-enquiry`, `partnership-enquiry`,
  `app-waitlist`, `join-barista`, `join-ops`, `join-craft`, `join-trade`, `join-founders`,
  `join-investor`) gets its own sheet tab, created on first submission if it doesn't exist.
- Row shape: `[Timestamp, ...formFieldValues]` — the header row (`Timestamp`, then each field key)
  is written once, on the tab's first submission.
- No fixed schema beyond that — whatever keys the submitting HTML form sends become columns,
  up to a 30-field / 64-char-key / 2000-char-value cap enforced in `api/submit-form.js`.

See [api-reference.md](api-reference.md) for the full request/response contract.

## Third-party services

- **Vercel** — hosting, deploy (push to `main` auto-deploys), serverless function runtime,
  clean URLs, cache headers, and 3 permanent redirects (`/careers`→`/join`, `/jobs`→`/join`,
  `/story`→`/about`, plus 3 legacy `/journal/*`→`/blog/*` redirects) — see `vercel.json`.
- **Google Sheets API** (`googleapis` npm package) — the form-submission datastore. Auth via a
  base64-encoded service-account JSON in `GOOGLE_CREDENTIALS_B64`.
- No analytics, CMS, payment, or auth provider is wired into the codebase at this time.

## Load order (every page)

```html
<link rel="stylesheet" href="assets/ps.css">
<link rel="stylesheet" href="assets/wh.css?v=N">
<link rel="stylesheet" href="assets/mobile.css?v=N">
<script src="assets/ps.js?v=N"></script>
```
Later files win ties in the cascade — see [conventions.md](conventions.md) for the full cascade
rules and gotchas that come from this ordering.
