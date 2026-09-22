# P.S. Coffee — Project Memory

Read this at the start of every session. Use silently to inform work.

---

## Asset Versions (current)

| File | Version |
|---|---|
| `assets/ps.js` | v53 |
| `assets/image-slot.js` | v3 |
| `assets/wh.css` | v120 |
| `assets/mobile.css` | v90 |
| `assets/mobile.js` | v5 |

Letter-concept pages also carry `home-letter.css?v=14` plus one per-page stylesheet:
`solutions-letter.css?v=1` (the Tier-2 solution and locality pages), `pods-letter.css?v=2`,
`partnership-letter.css?v=3`, and one each for home/menu/about/app/matcha/pack/join/events/blogs.

Always read the current version from any `*.html` before bumping.

## Homepage State (2026-09-20)

- The letter-led Coffee/Matcha concept is now `index.html`; the previous homepage is retained as the no-indexed `home-legacy.html` backup. `/home-letter` redirects to `/`, and promotion remains local until the user approves push and deployment.

---

## Menu State (last synced 2026-06-29)

- **43 items** across 4 categories: Coffee (27), Matcha (10), Protein (3), Food (6)
- Price range: ₹89–₹289
- Source of truth for items and prices: COGS_Master sheet in the COGS xlsx (see below)
- Protein is a standalone `data-cat="protein"` section with its own filter tab — not a subcategory of Coffee

### Menu categories (filter tabs + sections)
| `data-cat` | Section ID | Filter button |
|---|---|---|
| `coffee` | `#menu-coffee` | Coffee. |
| `matcha` | `#menu-matcha` | Matcha. NEW |
| `protein` | `#menu-protein` | Protein. |
| `food` | `#menu-food` | Food. |

---

## COGS Master File

- Path: `/Users/pulkit/Documents/P S Coffee | Financials/outputs/coffee_qsr_v20_cogs_master_formatted/coffee_qsr_v20_cogs_master_formatted.xlsx`
- Sheet to read: `COGS_Master` → Block B (Recipe Card) → column `SP ₹` = selling price
- Claude sandbox **cannot access Documents directly** — copy the file to repo root first, use it, then delete it before committing

---

## House Favourites (homepage)

- Section is auto-populated by JS in `index.html` that fetches `menu.html` at runtime
- Categories fetched (order matters): `['coffee', 'matcha', 'protein', 'food']`
- Shows first 6 items per category
- Nav tabs live in `.wh-favourites nav` — one `<a data-fav-cat="X">` per category

---

## Analytics State

- GA4 is live sitewide with measurement ID `G-5TS0QMZ55W`; every new public HTML page must include
  the standard Google tag before `</head>`.
- New forms must be added to the server allowlist and to `PS_CONVERSION_EVENTS` in `assets/ps.js`;
  conversion payloads must stay privacy-safe and avoid PII/free-text fields.

---

## Session Decisions

### Current deployment state (2026-07-13)
- GitHub-to-Vercel integration is not confirmed healthy. Until it is restored, production completion requires `git push origin main`, `vercel --prod --yes`, and `vercel inspect <deployment-url>` showing `Ready`; a successful GitHub push alone is not proof of deployment.


### 2026-09-21 (SEO/GEO keyword research — phase 1)
- `docs/seo-keyword-strategy.md`, two research passes merged. Core thesis, reached twice
  independently: the defensible territory is grab-and-go plus daily habit plus workplace/campus
  plus B2B partnership, not generic "best coffee in Ahmedabad" volume.
- Key rule recorded there: banned words can live in meta and schema for targeting, never in
  visible copy. The second pass's entity definition was not carried over, since it predates
  Master Copy v4.

### 2026-09-21 (SEO implementation plan + metadata pass)
- `docs/seo-implementation-plan.md` (phase 2): category-wise keyword placement across FAQ, blogs,
  footer, Partnership page, schema, and a visible/"invisible" page architecture. **Rule that
  governs all future SEO work:** Master Copy v4 locks the W1 headline on every page but says
  nothing about meta titles, descriptions or slugs — SEO lives in metadata, FAQ question text,
  schema and new pages; brand voice keeps the H1 and body copy. Never rewrite an approved H1.
- Rewrote `<title>` on all 15 live indexed root pages; later front-loaded keywords into the
  menu/pods/partnership meta descriptions (first 65 chars is all a sitelink shows) and added the
  `og:title`/`og:description` that `partnership.html` was missing entirely. Fixed the co-working
  blog post being indexable but absent from `sitemap.xml`.
- Flagged for the brand owner, not silently fixed: `blog/what-is-arabica-coffee-india` carries a
  species claim v4 retires, and `matcha.html`'s H1 is a flagship P.S. line used as a headline,
  which the Handbook forbids.


### 2026-09-22 (FAQ expansion, Tier-2 pages, keyword database)
- FAQ sections plus FAQPage schema added to `pods`, `partnership` and `menu`. Sitewide FAQ schema
  is now 155 questions across 20 pages. No new accordion CSS was needed: `ps.css` styles `.faq-item`
  globally and `ps.js` binds it at load.
- **The kiosk conflict is resolved** at the user's direction: `kiosk` stays off the never-say list
  in visible copy, but appears as FAQ *question* text on `pods.html`, with an answer that never
  adopts the word. Keyword indexed, voice intact. The keyword database records this per row.
- Shipped the first two Tier-2 pages, `/coffee-for-offices` and `/coffee-for-coworking-spaces`:
  unique content, 5-question FAQ each, `Service` plus `FAQPage` schema, in `sitemap.xml`, linked
  from the footer's "Pods & people" column and a new complementary-vendor line on `partnership.html`.
  The remaining four Tier-2 pages are deliberately held 4-6 weeks — six thin locality pages at once
  is the doorway-page pattern.
- `docs/data/seo-keyword-database.csv` (336 rows) plus `docs/seo-keyword-database.md`. Demand and
  competition are labelled estimates, not tool data; the load-bearing columns are Recommended page,
  Schema type, Brand-voice check and Priority.
- `docs/partner-ecosystem-outreach.md`: KhanePe and RoomPe first, MealPe and GoKhana once a Pod is
  live, enterprise tier later. Plan only, explicitly not authorised to send.
- `docs/briefs/` now holds 8 briefs and a README with the house format. Writers deliver prose; the
  markup, schema and link notes in a brief are build instructions, not writing instructions.


### 2026-09-22 (design language correction)
- The first three Tier-2 pages were built on the legacy `.wh-page`/`mobile.css` system and looked
  like legal pages beside the rest of the site. Rebuilt in the **letter concept**, which is the
  current design language for every primary page: `data-page="letter-concept"`, `lc-nav`,
  `home-letter.css` plus a per-page stylesheet, `letter-pages.js` reveals, and the
  letterhead/hero/ticker/statement/rows/note/FAQ/dark-band section vocabulary.
- New shared stylesheet `assets/solutions-letter.css` with the `slp-` prefix, used by all three
  solution and locality pages. Reveals piggyback on `plp-reveal` so `letter-pages.js` needs no edit.
- Recorded in `docs/design.md` (the full scaffold and section vocabulary), `docs/conventions.md`
  (the seven build steps) and as a standing instruction in `CLAUDE.md`/`AGENTS.md`, so the legacy
  system is not reached for again. Two honest deviations noted there: letter pages use Dark Roast
  as a full-bleed fill, and `nectarSignature()` highlights the first clause of a two-line headline
  sitewide.

Older entries (2026-06-29 through 2026-07-08) moved to [ARCHIVE.md](ARCHIVE.md) to stay under the
150-line hygiene limit.
