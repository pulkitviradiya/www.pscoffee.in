# P.S. Coffee — Project Memory

Read this at the start of every session. Use silently to inform work.

---

## Asset Versions (current)

| File | Version |
|---|---|
| `assets/ps.js` | v50 |
| `assets/image-slot.js` | v3 |
| `assets/wh.css` | v118 |
| `assets/mobile.css` | v88 |
| `assets/mobile.js` | v5 |

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

### 2026-09-21 (blog post content/structure rollback)
- Commit `3a0d21f` ("Apply Master Copy v4") had gutted 14 blog posts by ~3,000 lines, stripping
  the TOC/key-takeaways/stat-grid/comparison-table/FAQ+schema structure down to a 6-paragraph
  skeleton while leaving the CSS in place. Restored the 10 pre-v4 posts to their full pre-`3a0d21f`
  body (commit `27b7444`), keeping current title/H1/kicker branding so they stay in sync with
  `blogs.html`, keeping current images spliced in by matching `<image-slot>` id, and rebuilding
  each post's FAQPage JSON-LD. The 4 posts written after v4 have no old version and were untouched.

### 2026-09-21 (Brand Language Handbook captured)
- User shared Master Copy System v4 (byte-identical to the stored copy, no change needed) and a
  genuinely new Brand Language Handbook, added verbatim as `docs/brand-language-handbook.md`:
  the reasoning behind the copy system (the letter/P.S. idea, the two registers that never mix in
  one sentence, P.S. sign-off rules, quality/price claim doctrine, channel playbooks, worked
  rewrites, failure modes). Wired into `docs/copy-system.md`, the Reference Map, and a new
  "keep it current" standing instruction in `CLAUDE.md`/`AGENTS.md`. No conflicts with existing
  website decisions. Did not re-audit live copy: the site was already migrated to v4 per
  `docs/brand-copy-v4-audit.md`, and the Handbook explains those same rules rather than changing them.

### 2026-09-21 (SEO/GEO keyword strategy — phase 1 research)
- `docs/seo-keyword-strategy.md`: grab-and-go category, Ahmedabad/Gandhinagar/GIFT City, B2B
  placement, AI-search visibility. Core thesis, reached twice independently: the defensible
  territory is grab-and-go + daily habit + workplace/campus + B2B partnership, not generic
  "best coffee in Ahmedabad" volume. Best partner lead is KhanePe (a RoomPe company) — same two
  cities, same buildings, complementary category.
- Merged a second provider's research pass into the same doc (SmartQ/Pluxee, the Pod→"coffee
  kiosk" translation, high-footfall verticals, franchise cluster, a keyword-DB schema). Did
  **not** carry over its entity definition ("100% Arabica... accessible pricing") — it predates
  Master Copy v4 and contradicts the retired species claim and banned price framing. Key rule
  recorded there: banned words can live in meta/schema for targeting, never in visible copy.

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

### 2026-09-22 (homepage brand schema — sitelinks groundwork)
- User asked how to get Google sitelinks (the sub-page list under a brand result, as abCoffee and
  First Coffee have). **Sitelinks cannot be forced** — Google generates them algorithmically, no
  markup nominates a page, and they generally need brand-search volume a pre-launch site lacks.
  What is controllable: homepage entity schema, and the per-page title/meta description, which
  become the sitelink's label and description when granted (they truncate near 65 chars).
- **Real bug found and fixed:** all five brand schema blocks (`Organization`, `WebSite`,
  `SiteNavigationElement`, `CafeOrCoffeeShop`, `DataFeed`) were on `home-legacy.html`, which is
  `noindex,nofollow`, while the live `index.html` had **zero structured data**. The letter-led
  redesign replaced the homepage without carrying the schema across, so Google could see none of
  it. Added a consolidated `@graph` (Organization + WebSite + SiteNavigationElement + WebPage) to
  `index.html`, using the corrected entity wording (no species claim, no price framing).
- Deliberately not ported: the `SearchAction` (it claimed a `/blogs?q=` search that does not
  exist — false markup) and `CafeOrCoffeeShop` (a LocalBusiness subtype with no address or hours;
  per plan §6, LocalBusiness ships per Pod once real addresses exist).

- Still deferred pending approval: 8 new blog posts, Partnership-page FAQ block, and Tier-2
  "indexed but not in nav" landing pages — the last carries real doorway-page risk if shipped
  thin or all at once, so the plan phases it two pages at a time.

### 2026-09-22 (FAQ expansion to money pages + first content briefs)
- Added FAQ sections + FAQPage schema to `pods`, `partnership` and `menu` (the three highest-intent
  pages that had none). Questions written per page rather than copied from `faq.html`, since a
  host evaluating a site asks different things than a general visitor. Sitewide FAQ schema now
  **145 questions across 18 pages**. No new accordion CSS needed: `ps.css` already styles
  `.faq`/`.faq-item`/`.faq-q .pm`/`.faq-a` globally and `ps.js` binds `.faq-item` at load;
  `home-letter.css` gained only the section frame (v13→v14 across 39 files).
- **Resolved the kiosk conflict** at the user's direction: `kiosk` is on the brand's never-say
  list, but it is the term people search. Put it on `pods.html` as an FAQ *question* ("Is a P.S.
  Pod a coffee kiosk?") whose answer never adopts the word as self-description — the same
  contrastive construction v4 itself uses in B3.02. Keyword indexed, voice intact.
- Started `docs/briefs/`: GIFT City locality page and "The Letter and The P.S., explained".
  House format set (see plan §8b). Key rule: every constraint cites its v4/Handbook source, and
  locality briefs must answer "what makes this page different" in four concrete points or not
  ship — that section is what separates a locality page from a doorway page.

Older entries (2026-06-29 through 2026-07-08) moved to [ARCHIVE.md](ARCHIVE.md) to stay under the
150-line hygiene limit.
