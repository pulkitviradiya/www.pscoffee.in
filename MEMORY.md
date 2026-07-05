# P.S. Coffee — Project Memory

Read this at the start of every session. Use silently to inform work.

---

## Asset Versions (current)

| File | Version |
|---|---|
| `assets/ps.js` | v31 |
| `assets/wh.css` | v34 |
| `assets/mobile.css` | v24 |

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

### 2026-07-05
- Implemented the canonical design-system token layer (from the Claude Design "P.S. Coffee - Design system" project, local export in `~/Downloads/design-system-export/`): `--color-*`, `--space-*`, `--radius-*`, `--text-*` tokens live in `ps.css` and all site palettes (`--tc`, `--ps-*`) alias them. Radii now come from the token scale (buttons 9px, cards 14px, panels 16px) and a "Design-system contrast layer" at the end of `wh.css` enforces Steam-Cream-on-colour text and button flips.

### 2026-06-29
- Synced menu to COGS_Master v20: 43 items, removed 5 (Pour Over, French Press, South Indian Filter Coffee, Vienna Coffee, Cheese Toastie), added 16 new items
- Added Protein as standalone category (not a subcategory inside Coffee)
- Fixed menu filter grid layout (5-button nav requires 5 auto columns)
- Fixed P.S. note vertical symmetry across cards (margin-top:auto moved to .menu-product-note)
