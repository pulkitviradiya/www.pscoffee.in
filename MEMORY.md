# P.S. Coffee — Project Memory

Read this at the start of every session. Use silently to inform work.

---

## Asset Versions (current)

| File | Version |
|---|---|
| `assets/ps.js` | v35 |
| `assets/wh.css` | v41 |
| `assets/mobile.css` | v30 |

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

### 2026-07-06
- Received an updated "P.S. Coffee Brand Kit.zip" (a newer export of the same Claude Design "P.S. Coffee - Design system" project) and audited it against the live site — supersedes the 2026-07-05 footer/announce-bar decision below. Fixed: footer bg → Deep Ceremonial site-wide (not Oat, not Dark Roast) with new `--color-sage-cream` (#DBDDD2) and `--color-ceremonial-deep` (#2C4F37) tokens; `.f-radhe` now Bright Whisk italic Instrument Serif (the kit's "one italic P.S. line"); added distinct `--color-chilli` (#A81C2E) error token so error state no longer collides with pressed-Terracotta; `.marquee` default fill Terracotta (was Dark Roast); nav tabs now get a rounded hover wash (`--color-terracotta-wash` coffee / pale-froth matcha) instead of growing the underline on hover; all custom `cubic-bezier` curves site-wide consolidated to the kit's one curve `cubic-bezier(.2,0,0,1)`, all transition durations capped at 400ms; `.wh-announce` rebuilt as a true continuously-scrolling ribbon (was a static bar) with Terracotta/Ceremonial profile fill, pausing on hover — bumped ps.js v34, wh.css v39, mobile.css v28 in the same commit.
- Deferred: consolidating ps.css/wh.css's ~14 ad-hoc breakpoints down to the kit's documented 768/1024/1280 grid — high regression risk for a purely cosmetic-consistency gain, no live defect, left as-is.
- Audited the site's logo/iconography (kit sections 24-28) and fixed: nav now swaps the wordmark to the monogram below 480px width (was resizing the same wordmark image at every size, never swapping) — matcha pages correctly get the Ceremonial-profile wordmark/monogram in nav; footer now pairs the monogram with the wordmark (was wordmark-alone), always Terracotta even on matcha per spec; mobile nav logo bumped 29px→32px to clear the on-screen-UI minimum; JSON-LD `"logo"` fields on 17 pages switched from the wide wordmark to the square lockup (`ps-coffee_square_terracotta_framed.png`) to match Google's Knowledge Panel guidance; deleted orphaned `ps-favicon-2026.png`/`ps-logo-2026.png`; removed dead `.nav.over` CSS (targeted old markup that no longer exists); added `404.html` (monogram + one honest line, per the kit's touchpoint spec) — copied `ps-coffee_monogram_terracotta_flat.png`/`_ceremonial_flat.png` into `assets/icons/` for this. Bumped ps.js v35, wh.css v40, mobile.css v29 in the same commit.
- Audited typography (kit sections 16-17) and found the site was carrying a hidden 4th font system left over from the "WatchHouse" template it was built on. Fixed: `--wh-logo-serif` (drove the nav + footer wordmark on every page) was never remediated when `--wh-serif`/`--wh-sans` got corrected to Bricolage/Space Grotesk — now resolves to Bricolage Grotesque too; replaced all 31 hardcoded `font-family:"Archivo"` declarations in ps.css with `var(--font-display)`/`var(--font-body)` per component (2 were live-rendering on join.html's `.chip`/`.marquee`, the rest were dead-but-latent); capped a few Space Grotesk/Bricolage selectors that had weight 800/900 down to their fonts' actual loaded max (700/800). Folded menu cards' separate `dt/dd` "Brew." line into the single description paragraph across all 43 items (was a 5th type style, spec caps cards at 4) and removed the now-dead `dl/dt/dd` CSS — bumped `.menu-recipe`'s line-clamp 2→3 to fit the merged text without truncating. Reduced the blanket `font-weight:800` on ordinary section/card H2s (`.wh-page h2`, `.journal-card h2`, `.journal-post-body h2`, etc.) to 700, reserving 800 for true hero H1s per the kit's "weight is a budget, not a default" rule. Bumped wh.css v41, mobile.css v30 in the same commit (ps.js untouched this pass).

### 2026-07-05 (second pass)
- Purged all off-system colours from rendered pages: no pure white/black text or fills, no dark-roast/espresso background fills anywhere. Verified with a computed-style audit across all 14 key pages. (Footer/announce-bar colour choices from this pass were superseded 2026-07-06 — see above.)

### 2026-07-05
- Implemented the canonical design-system token layer (from the Claude Design "P.S. Coffee - Design system" project, local export in `~/Downloads/design-system-export/`): `--color-*`, `--space-*`, `--radius-*`, `--text-*` tokens live in `ps.css` and all site palettes (`--tc`, `--ps-*`) alias them. Radii now come from the token scale (buttons 9px, cards 14px, panels 16px) and a "Design-system contrast layer" at the end of `wh.css` enforces Steam-Cream-on-colour text and button flips.

### 2026-06-29
- Synced menu to COGS_Master v20: 43 items, removed 5 (Pour Over, French Press, South Indian Filter Coffee, Vienna Coffee, Cheese Toastie), added 16 new items
- Added Protein as standalone category (not a subcategory inside Coffee)
- Fixed menu filter grid layout (5-button nav requires 5 auto columns)
- Fixed P.S. note vertical symmetry across cards (margin-top:auto moved to .menu-product-note)
