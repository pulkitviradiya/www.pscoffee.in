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
- Ran an SEO/GEO keyword research pass (grab-and-go coffee category, Ahmedabad/Gandhinagar/GIFT
  City, B2B corporate/co-working/university placement, AI-search visibility) and saved it as
  `docs/seo-keyword-strategy.md`. Found the same core thesis twice, independently: the defensible
  territory is grab-and-go + daily habit + workplace/campus presence + B2B partnership, not
  competing on generic "best coffee in Ahmedabad" volume. Confirmed KhanePe (a RoomPe company) as
  the single most relevant partner lead — same two cities (Ahmedabad + Gandhinagar), same
  buildings, complementary category (corporate catering, not coffee).
- User then shared a second, independently-produced research doc covering the same territory.
  Merged its genuinely new findings into `docs/seo-keyword-strategy.md` (SmartQ/Pluxee added to
  the ecosystem table, the Pod→"coffee kiosk" plain-text translation idea, high-footfall verticals
  — malls/game zones/tech parks/hospitals/airports — a franchise/investor keyword cluster kept
  explicitly secondary, and a keyword-database column schema for a future 300-500 row sheet).
  Deliberately did **not** carry over that document's proposed core search-entity definition
  ("100% Arabica... accessible pricing...") — it predates Master Copy v4 and directly contradicts
  the retired species claim and banned affordability framing; wrote a corrected entity definition
  in §1 instead (specialty-grade, range-as-differentiator, no price framing). Flagged the
  meta-title-vs-visible-body-copy split explicitly, since several real high-volume search terms
  ("affordable," "100% Arabica") are words banned from P.S. Coffee's own visible copy but still
  valid to target in meta tags/schema.

### 2026-09-21 (SEO implementation plan + metadata pass)
- Wrote `docs/seo-implementation-plan.md` (phase 2): category-wise placement of every keyword
  cluster across FAQ, blogs, footer, Partnership page, schema, and a visible/"invisible" page
  architecture. **Key structural finding that governs all future SEO work:** Master Copy v4
  specifies the W1 headline for every page (locked, approved copy) but says *nothing* about meta
  titles, meta descriptions, or slugs — so the SEO layer lives in metadata, FAQ question text,
  schema and new pages, and the brand-voice layer keeps the H1 and body copy. Never rewrite an
  approved H1 to chase a keyword.
- Implemented (low-risk, metadata only): rewrote `<title>` on all 15 live indexed root pages,
  standardising on `Keyword-led phrase | P.S. Coffee` at 41-55 chars, no banned words, no H1 or
  visible-copy changes. Biggest win was `partnership.html` (highest commercial-value page, had
  zero B2B keywords in its title). Left `og:title`/`twitter:title` alone deliberately — social
  cards are a brand-voice surface, not a keyword surface.
- Fixed a real bug found during the audit: `blog/why-coworking-spaces-ahmedabad-need-better-coffee`
  was live and indexable but missing from `sitemap.xml` (13 of 14 posts listed). Sitemap now 29
  entries, XML validated, all 14 blog posts present.
- Flagged two conflicts for the brand owner, **not** silently fixed: (1)
  `blog/what-is-arabica-coffee-india` carries a species claim in its slug/title/copy that Master
  Copy v4 retires — recommended softening the copy while keeping the slug's search equity;
  (2) `matcha.html`'s H1 is a flagship P.S. line used as a headline, which the Handbook says a
  P.S. line must never be. Both need a call from the brand owner, not an agent.
- Then executed steps 3-4 of the plan: added 10 FAQ questions to `faq.html` (25→35) and 20 across
  the 10 blog posts that have FAQ blocks, all 40-60 words for AI extraction, all brand-voice
  checked (no banned words, no em dashes, no species claims, no price arguments, pre-launch
  framing). **Method worth reusing: the FAQPage JSON-LD is regenerated from the visible HTML
  rather than hand-maintained as a second list** — schema that disagrees with visible text is
  penalised, and two hand-kept copies always drift. Sitewide FAQ schema now carries 116 questions.
- Found and parked: the four posts written after Master Copy v4
  (`join-ps-coffee-team-cofounder`, `ps-pass-coffee-subscription-india`,
  `specialty-vs-regular-coffee-no-jargon`, `what-is-a-barista-history-word-craft`) have **no FAQ
  block and no FAQPage schema at all**, so they are invisible to the AI-citation path. Adding one
  is a new visible section on v4-spec pages, so it needs review rather than a silent add.
- Still deferred pending approval: 8 new blog posts, Partnership-page FAQ block, and Tier-2
  "indexed but not in nav" landing pages — the last carries real doorway-page risk if shipped
  thin or all at once, so the plan phases it two pages at a time.

Older entries (2026-06-29 through 2026-07-08) moved to [ARCHIVE.md](ARCHIVE.md) to stay under the
150-line hygiene limit.
