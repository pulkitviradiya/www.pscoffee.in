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

### 2026-07-13 (copy and component contracts)
- Added `docs/copy-system.md` as the repository copy authority for Master Copy v3 plus approved website amendments, and documented unique media-slot naming, the shared hero typography contract, and the current Pass-card system.

### 2026-09-21 (blog post content/structure rollback)
- User reported "content issue" and "structure issue" on all internal blog posts. Root cause: commit `3a0d21f` ("Apply Master Copy v4 across pages, metadata and artwork") gutted 14 blog files by ~3,000 lines total, stripping the rich TOC/key-takeaways/stat-grid/pros-cons/comparison-table/FAQ+schema/keyword-tags structure down to a bare 6-paragraph skeleton per post, while leaving all the now-unused CSS classes in place.
- Restored the 10 pre-existing posts (excluded the 4 written fresh after `3a0d21f` with no old version to restore: `join-ps-coffee-team-cofounder`, `ps-pass-coffee-subscription-india`, `specialty-vs-regular-coffee-no-jargon`, `what-is-a-barista-history-word-craft`) to their full pre-`3a0d21f` body content (commit `27b7444`), per explicit user decision: **kept current title/H1/kicker branding** ("The P.S. Journal.") so posts stay in sync with `blogs.html` (left untouched per instruction), but **restored old date/read-time** (they describe the restored, longer body) and the full old body/FAQ/schema. Kept all current image `src`/`mobile-src` values (the in-progress `-v4-*.jpg` refresh) spliced into the old `<image-slot>` structure by matching `id` — verified 1:1 id parity between old and current on every file. Rebuilt each restored post's FAQPage JSON-LD from the old FAQ content (some old files nested it inside the Article schema; normalized all to a standalone FAQPage script) since the current files had none. `why-we-built-pods-not-cafes.html` used an older, structurally distinct template (no inline `<style>`, `<details>`-based FAQ) and was restored by hand rather than via the shared script. Verified: JSON-LD validity, div/section/article tag balance, image-slot id parity, and every internal link/anchor referenced by the restored content still resolves on the live site. No CSS/JS files touched, so no asset-version bump needed. `blogs.html` and the 4 new-since-v4 posts were left untouched, matching the user's explicit scope.

### 2026-09-21 (Brand Language Handbook captured)
- User shared two files: `PS_Coffee_Master_Copy_System_v4.md` and `P.S. Coffee Brand Language
  Handbook.md`, describing them as an update to brand language/tone/direction. Diffed the first
  against the already-stored `docs/master-copy-system-v4.md` — byte-identical, no change needed.
  The Handbook was genuinely new (not in the repo), so added it verbatim as
  `docs/brand-language-handbook.md`: the reasoning/voice guide behind the Master Copy System
  (the letter/P.S. idea, the two registers — serious vs. drama, never mixed in one sentence — the
  P.S. sign-off rules, quality/price claim rules, channel playbooks, worked rewrites, common
  failure modes). Wired it into `docs/copy-system.md` (now points to both the Master Copy System
  for exact wording and the Handbook for reasoning/anything not covered verbatim) and into the
  Reference Map + a new "keep it current" standing instruction in `CLAUDE.md`/`AGENTS.md`,
  mirroring the pattern already used for `docs/design-system.md`. No conflicts found between the
  Handbook and `docs/copy-system.md`'s existing website-specific decisions. Did not re-audit the
  live site's copy against it — the site was already fully migrated to Master Copy v4 per
  `docs/brand-copy-v4-audit.md` (2026-09-19), and the Handbook elaborates the same v4 rules rather
  than introducing new ones; a copy audit is separate, explicit work if wanted.

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
- Deferred pending approval: FAQ expansion, 8 new blog posts, Partnership-page FAQ block, and
  Tier-2 "indexed but not in nav" landing pages — the last carries real doorway-page risk if
  shipped thin or all at once, so the plan phases it two pages at a time.

Older entries (2026-06-29 through 2026-07-08) moved to [ARCHIVE.md](ARCHIVE.md) to stay under the
150-line hygiene limit.
