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

Older entries (2026-06-29 through 2026-07-08) moved to [ARCHIVE.md](ARCHIVE.md) to stay under the
150-line hygiene limit.
