# P.S. Coffee — Project Memory

Read this at the start of every session. Use silently to inform work.

---

## Asset Versions (current)

| File | Version |
|---|---|
| `assets/ps.js` | v40 |
| `assets/image-slot.js` | v3 |
| `assets/wh.css` | v71 |
| `assets/mobile.css` | v33 |

Always read the current version from any `*.html` before bumping.

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

## Session Decisions

### 2026-07-08 (wh.css cleanup)
- Cleaned `assets/wh.css` in safe, computed-style-verified slices: removed dead legacy WatchHouse sections plus redundant legal/blog, homepage banner, menu-card, and about-pillar duplicate rules without changing rendered computed styles.
- Bumped `wh.css` through v57 and verified brace balance plus exact duplicate scan (`exactDuplicateRuleGroups: 0`); `docs/architecture.md` and `docs/tasks.md` now reflect the cleanup.

### 2026-07-07 (full design-system reference doc)
- User had attached the "P.S. Coffee - Design system" brand kit (a 45-section Claude Design
  export: `.dc.html` + `guidelines/`/`tokens/`/`components/`/`ui_kits/` folders, session-local
  under scratchpad) at the start of a session and asked for it to be permanently captured in the
  repo's docs so future sessions (Claude or Codex, this repo or fresh) never need it re-attached.
  Extracted all 45 numbered sections directly from the `.dc.html` (brand philosophy/voice through
  colour/type/spacing/components/logo/photography/digital/motion/product through print/signage/
  social/stationery/decks) and wrote them into a new `docs/design-system.md` — organized by the
  same section numbers as the source kit, condensed to the actionable rule per section rather
  than the full prose. Sections 39–44 (print production, signage, packaging, social, stationery,
  pitch decks) are explicitly flagged as out of scope for this repo (a static website has no
  print/signage/social pipeline) rather than fully documented, so a future session knows they
  exist in the source but weren't condensed. `docs/design.md` (the existing, shorter
  "as-implemented" doc) now points to `docs/design-system.md` as the full spec; kept both rather
  than merging, since design.md is organized by viewport/implementation and this new file by the
  kit's own section numbers — different lookup needs. Added a standing instruction to
  `CLAUDE.md`/`AGENTS.md`: whenever a *new* design-system/brand-kit export is shared in any future
  session, merge it into `docs/design-system.md` section-by-section (update changed, append new,
  leave unchanged alone) rather than overwriting the file wholesale — the procedure itself is
  also written into `design-system.md`'s own closing section so it survives even if CLAUDE.md is
  restructured again later. Added a Reference Map line pointing to it from both contributor guides.

### 2026-07-07 (font source provenance)
- User supplied a Google Fonts zip (Bricolage Grotesque, Instrument Serif, Space Grotesk) and
  asked for it to be kept in `assets/` and mapped into docs. Confirmed the production site
  already self-hosts optimised `.woff2` subsets of exactly these 3 families in
  `assets/fonts/brand/` — no `@font-face`/CSS change needed. What was actually missing was
  licence/source provenance (no `OFL.txt` existed anywhere in the repo for these fonts). Added
  `assets/fonts/source/` holding each family's variable `.ttf` + `OFL.txt` + `README.txt`;
  deliberately dropped the ~120 unused static per-weight/width `.ttf` instances from the zip
  (9.4MB of dead weight for Bricolage alone, never referenced by any CSS) to keep the source drop
  lean (712KB total). Documented the new folder in `docs/architecture.md` (folder structure) and
  `docs/design.md` (typography section, as the regeneration source if the `brand/` woff2s ever
  need to change). No asset-version bump needed (no CSS touched).

### 2026-07-07 (docs-flagged cleanup)
- Fixed the 3 items flagged in the documentation audit as needing a decision, not just a doc note.
  (1) Removed the 4 dead legacy font files (`assets/fonts/Balto-Book.otf`, `Balto-Medium.otf`,
  `TiemposHeadline-Medium.otf`, `WatchHouseSerif-Medium.otf`) plus their `@font-face` blocks and
  the 3 font-token lines (`--wh-serif`/`--wh-logo-serif`/`--wh-sans`) that fed them in `wh.css` —
  confirmed dead first via the cascade methodology (grepped every `--wh-serif`/`--wh-sans`/
  `--wh-logo-serif` declaration; all 3 in this block were always beaten by a later, unconditional
  `:root` block at ~line 6291 resolving to Bricolage Grotesque/Space Grotesk). Left the rest of
  that same `:root` block untouched (`--wh-announce-h`, `--wh-nav-h`, `--wh-header-h`,
  `--wh-grid-gap`, `--wh-section-gap` have no later override and are genuinely load-bearing —
  confirmed before touching anything nearby, not just the flagged lines). (2) Investigated the
  "matcha button hover unreachable" item and found it wasn't just unreachable — `.wh-btn.matcha`/
  `.wh-btn.matcha:hover` (wh.css) is never applied by any HTML in the repo (grepped `wh-btn` across
  every page and `ps.js`) and even if it were, a later `!important`, higher-specificity
  `body[data-page="matcha"] .wh-btn.dark:hover` rule already wins and correctly darkens to
  `--color-ceremonial-deep` for any real matcha-context button (confirmed live on `matcha.html`'s
  actual "Add to cart" buttons: `rgb(61,107,74)`, the Ceremonial token, both before and after this
  change). Removed the dead `.wh-btn.matcha` rule and its selector from the shared group rule
  instead of leaving it as a no-op — the real matcha button styling doesn't depend on it. (3)
  Committed the 12 previously-untracked, live-referenced `assets/photos/site/ps-pass-*.webp`
  files. Bumped `wh.css` v51→v52 (only file touched this round) across all 32 HTML files; verified
  live via browser preview (no console errors, no 404s on the removed .otf files, matcha button
  colour unchanged). Updated `docs/tasks.md` to move these three items from "flagged" to
  "completed."

### 2026-07-07 (documentation restructure)
- Split the single 371-line `CLAUDE.md`/`AGENTS.md` into the standard `docs/` set
  (architecture/api-reference/conventions/tasks/design) plus `ARCHIVE.md` (previously referenced
  by the memory-hygiene rules but never created), and slimmed the two contributor guides down to
  lean pointer files with an `@`-syntax reference map. Docs-only pass: flagged (didn't yet fix) 4
  dead legacy font files, the matcha button hover fix's unreachable dead-code status, and 12
  untracked-but-referenced `ps-pass-*.webp` photos — all three fixed in the very next session
  entry below.

### 2026-07-07
- Audited Content & Layout (kit sections 37-38: Blog Section Types, Applied Sample Layouts) across the 8 blog posts sharing an identical inline-`<style>` structure (`why-specialty-coffee-costs-300-rupees-india`, `building-specialty-coffee-brand-without-cafe`, `morning-coffee-ritual-vs-routine`, `pre-workout-coffee-gym-ahmedabad`, `what-we-are-building-ps-coffee-gujarat`, `india-coffee-market-2030-opportunity`, `why-coworking-spaces-ahmedabad-need-better-coffee`, `what-is-arabica-coffee-india`). Fixed: `.kt` "Key Takeaway" box was a plain Linen block with no accent — rebuilt to match the already-correct `.qa` pattern (Oat fill + 4px Terracotta left border, asymmetric radius). Added a `.ctab-vs` marker class + Terracotta top-border rule to the 2 posts with a genuine head-to-head "P.S. vs competitor" comparison table (the other `.ctab` tables are data/market tables, not a which-one-is-us comparison, so left unmarked) — needed `!important` since wh.css's blanket `.journal-post-body table th,td{border-color:...!important}` otherwise wins. Replaced 11 hardcoded `font-family:'Lora',Georgia,serif`/`'Inter',sans-serif` declarations per file (`.vv` stat values, `.toc-num`, `.div-ps .mark`, `h2.st`, `h3.sub`, `.stat-num`, `.imgph .ico`, `.psline`, `.faqs h2`, `.pncard .pn-title`, `.ctab-box h2`) with the correct token per component — mostly `var(--font-display)` for headings/stat emphasis, `var(--font-body)` for labels, and `var(--font-accent)` + `font-style:italic` for `.psline`'s tagline (matching the footer's `.f-radhe` pattern). Verified live via `getComputedStyle` on multiple posts. Investigated `.pnnav`/`.pncard` (blog prev/next nav) reported as "unstyled" by an earlier audit pass — false alarm, it already has full inline styling (background/border/hover/disabled/mobile-stack) in all 8 files that use it; confirmed rendering correctly via `getComputedStyle` and screenshot, no fix needed. These are inline blog-post `<style>` edits, not wh.css — no version bump required this round.

Older entries (2026-06-29 through 2026-07-06) moved to [ARCHIVE.md](ARCHIVE.md) to stay under the
150-line hygiene limit.
