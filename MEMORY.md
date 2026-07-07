# P.S. Coffee — Project Memory

Read this at the start of every session. Use silently to inform work.

---

## Asset Versions (current)

| File | Version |
|---|---|
| `assets/ps.js` | v37 |
| `assets/wh.css` | v52 |
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
- Audited the repo's documentation structure end-to-end and found `CLAUDE.md`/`AGENTS.md` had
  grown into a single 371-line file holding architecture, API, conventions, and design-system
  detail all at once — no `docs/` split existed, and `ARCHIVE.md` was referenced by CLAUDE.md's
  own memory-hygiene rules but never actually created. Restructured into the standard set: created
  `docs/architecture.md` (tech stack + reasons, folder structure, data model, third-party
  services), `docs/api-reference.md` (both Vercel functions — `POST /api/submit-form`,
  `GET /api/form-status` — with full request/response contracts), `docs/conventions.md` (naming
  rules, nav/blog/menu/form structure patterns, the CSS cascade-resolution methodology, mobile
  traps, and the full "What NOT to do" list), `docs/design.md` (colour/typography/spacing/motion
  tokens, split into Common/Desktop/Tablet/Mobile/App sections as requested), and `ARCHIVE.md`
  (empty stub, ready for MEMORY.md overflow). Slimmed `CLAUDE.md`/`AGENTS.md` down to a lean
  pointer file: one-paragraph project description, tech stack summary, exact run/build/deploy
  commands, an `@`-syntax reference map to each `docs/` file, and the standing instructions —
  all the detailed rules that used to live inline now live in the matching `docs/` file so a
  future session can fetch only what's relevant instead of reading the whole history. Mirrored
  identically into `AGENTS.md` (Codex's copy), matching this repo's established Claude/Codex
  naming-substitution pattern. Updated `README.md`'s pointer line to mention `docs/`. Deviated
  from the requested reference-map text in one place: used `@docs/design.md` instead of the
  literal `@DESIGN.md` given in the instructions, since the design content was written to
  `docs/design.md` per the file-creation spec earlier in the same instructions — keeping both
  the location and the reference map internally consistent seemed more useful than a literal
  match; flagged to the user for review.
- Extracted from the codebase directly (no invention): no `TODO`/`FIXME` comments exist anywhere
  in the repo (grepped `*.js`/`*.html`/`*.css`); the matcha solid-button hover fix is wired but
  currently unreachable (no live `<button>` in matcha context yet); 4 legacy font files
  (`Balto-*.otf`, `TiemposHeadline-Medium.otf`, `WatchHouseSerif-Medium.otf`) are still
  `@font-face`'d in `wh.css` but fully masked by a later `:root` override — dead weight, flagged
  as a cleanup candidate in `docs/tasks.md` rather than removed (out of scope for a docs-only
  pass). 12 `assets/photos/site/ps-pass-*.webp` files are untracked but live-referenced in HTML —
  flagged in `docs/tasks.md` as needing a `git add`, not fixed automatically since it wasn't part
  of this task.

### 2026-07-07
- Audited Content & Layout (kit sections 37-38: Blog Section Types, Applied Sample Layouts) across the 8 blog posts sharing an identical inline-`<style>` structure (`why-specialty-coffee-costs-300-rupees-india`, `building-specialty-coffee-brand-without-cafe`, `morning-coffee-ritual-vs-routine`, `pre-workout-coffee-gym-ahmedabad`, `what-we-are-building-ps-coffee-gujarat`, `india-coffee-market-2030-opportunity`, `why-coworking-spaces-ahmedabad-need-better-coffee`, `what-is-arabica-coffee-india`). Fixed: `.kt` "Key Takeaway" box was a plain Linen block with no accent — rebuilt to match the already-correct `.qa` pattern (Oat fill + 4px Terracotta left border, asymmetric radius). Added a `.ctab-vs` marker class + Terracotta top-border rule to the 2 posts with a genuine head-to-head "P.S. vs competitor" comparison table (the other `.ctab` tables are data/market tables, not a which-one-is-us comparison, so left unmarked) — needed `!important` since wh.css's blanket `.journal-post-body table th,td{border-color:...!important}` otherwise wins. Replaced 11 hardcoded `font-family:'Lora',Georgia,serif`/`'Inter',sans-serif` declarations per file (`.vv` stat values, `.toc-num`, `.div-ps .mark`, `h2.st`, `h3.sub`, `.stat-num`, `.imgph .ico`, `.psline`, `.faqs h2`, `.pncard .pn-title`, `.ctab-box h2`) with the correct token per component — mostly `var(--font-display)` for headings/stat emphasis, `var(--font-body)` for labels, and `var(--font-accent)` + `font-style:italic` for `.psline`'s tagline (matching the footer's `.f-radhe` pattern). Verified live via `getComputedStyle` on multiple posts. Investigated `.pnnav`/`.pncard` (blog prev/next nav) reported as "unstyled" by an earlier audit pass — false alarm, it already has full inline styling (background/border/hover/disabled/mobile-stack) in all 8 files that use it; confirmed rendering correctly via `getComputedStyle` and screenshot, no fix needed. These are inline blog-post `<style>` edits, not wh.css — no version bump required this round.

### 2026-07-06
- Received an updated "P.S. Coffee Brand Kit.zip" (a newer export of the same Claude Design "P.S. Coffee - Design system" project) and audited it against the live site — supersedes the 2026-07-05 footer/announce-bar decision below. Fixed: footer bg → Deep Ceremonial site-wide (not Oat, not Dark Roast) with new `--color-sage-cream` (#DBDDD2) and `--color-ceremonial-deep` (#2C4F37) tokens; `.f-radhe` now Bright Whisk italic Instrument Serif (the kit's "one italic P.S. line"); added distinct `--color-chilli` (#A81C2E) error token so error state no longer collides with pressed-Terracotta; `.marquee` default fill Terracotta (was Dark Roast); nav tabs now get a rounded hover wash (`--color-terracotta-wash` coffee / pale-froth matcha) instead of growing the underline on hover; all custom `cubic-bezier` curves site-wide consolidated to the kit's one curve `cubic-bezier(.2,0,0,1)`, all transition durations capped at 400ms; `.wh-announce` rebuilt as a true continuously-scrolling ribbon (was a static bar) with Terracotta/Ceremonial profile fill, pausing on hover — bumped ps.js v34, wh.css v39, mobile.css v28 in the same commit.
- Deferred: consolidating ps.css/wh.css's ~14 ad-hoc breakpoints down to the kit's documented 768/1024/1280 grid — high regression risk for a purely cosmetic-consistency gain, no live defect, left as-is.
- Audited the colour system (kit sections 06-15) and fixed: `.f-email` newsletter card was a stale solid-Terracotta block sitting directly in the Deep Ceremonial footer with zero cream buffer, contradicting the stylesheet's own comment — now transparent, sits on the footer's own Ceremonial ground. `#ps-toast` was a solid Terracotta pill; rebuilt as a Cream/Oat card with a left 4px Sprout-green accent bar per the kit's toast spec, and its checkmark icon no longer uses pure `#fff`. The Nectar auto-highlight (`nectarSignature()` in ps.js) now swaps to Bright Whisk on matcha pages instead of always Nectar Gold, is guarded against ever appearing on bold Terracotta/Ceremonial hero/banner panels (previously only `.wh-page-hero` was guarded, not `.wh-banner-heading`, and the new matcha-swap rule accidentally reopened the hero case via higher CSS specificity — fixed by adding an explicit `body[data-page="matcha"] .wh-page-hero .nectar-highlight` neutralizer), and its "pick the argument, not the first word" fallback was rewritten to prefer a sentence's last clause instead of its first 1-2 words, plus curated phrase entries for the site's real headlines (menu.html → "Nothing to hide", about.html → "a question", matcha.html → "the surprise", etc.). Added a Cream buffer strip between two consecutive full-bleed Terracotta sections on the homepage (`.ps-app-callout` → `.ps-our-story`) and made bold (non-`.is-light`) mobile heroes edge-to-edge instead of card-inset. Fixed small Terracotta captions failing AA contrast (`.catcard .cc-no` → the darker `--tc-deep`), the `.f-radhe` footer tagline's Bright Whisk text failing contrast entirely (2.74:1 → now `--color-light-pour`, still in the matcha-green family but legible), and the invalid-field border colour (was pressed-Terracotta, now `--color-error`/Chilli, matching the error text next to it). Menu-card kcal badges dropped off the Nectar ramp (routine nutrition info isn't a promotional tag) to a quiet translucent-cream chip, freeing Nectar for moments that actually earn it. **Correction**: `.f-radhe` is no longer Bright Whisk (see 2026-07-06 first entry above) — Bright Whisk measured 2.74:1 against the Ceremonial footer and fails contrast even for large text; Light Pour reads as the same "whisk-green" family at a legible weight. Bumped ps.js v36, wh.css v42, mobile.css v31 in the same commit.
- Fixed the 11 remaining `"Hanken Grotesk"` font-family declarations in ps.css (form labels/inputs, drawer page numbers, trust-bar labels, loader caption, `#ps-tweaks` dev panel) → `var(--font-body)`, same pattern as the Archivo fix. No version bump needed (ps.css isn't cache-bust versioned in this repo).
- Spot-fixes from manual review of the live preview: (1) `.menu-hero-wh .nectar-highlight` wasn't in the "never on a bold panel" guard list (only `.wh-page-hero`/`.wh-banner-heading` were) — menu.html's "Nothing to hide" was rendering as a mismatched Nectar-Gold chip on the Terracotta hero; added to the guard. (2) The menu filter tabs (`.menu-filter-wh button`) permanently tinted Coffee/Matcha/Protein/Food in their category colours regardless of selection state, while "All." correctly dimmed to 62%-opacity Espresso when inactive — made every tab look either permanently "active" or permanently "disabled" with no reliable selected-state signal. Fixed: all tabs now share one solid-Espresso resting colour, and only the *active* tab takes its category colour (Terracotta for coffee, Ceremonial-deep for matcha, Dark Roast for the rest) — also un-clobbered the matcha tab's colour from a stray `--ps-nectar-deep` override so it's Ceremonial-green again, with the "NEW" chip staying Bright Whisk. (3) `#menu-matcha`'s section-disclaimer footer (`.menu-section-footer-matcha`) had genuinely invisible text — Ceremonial-on-Ceremonial for the bold "P.S." lead-in and dark Espresso-on-Ceremonial for the body copy, because the child `p`/`strong` rules had their own un-important color that beat the container's `!important` cream override; also had a pure-`#000` border (banned colour). Fixed both; the other three section footers (coffee/protein/food, transparent bg) were already correct. Bumped wh.css v43.
- User found a THIRD instance of the "nectar-highlight on a bold panel" bug (about.html's `.wh-about-quality` section, via `.wh-page-list-copy h2` — not in the guard list) and correctly called out that hand-patching one CSS selector at a time wasn't a real audit. Fixed at the root instead: `nectarSignature()` in ps.js now walks up from each heading at runtime and checks the actual computed `background-color` against the known bold fills (Terracotta/Brick-Deep/Ceremonial/Ceremonial-deep/Dark-Roast) before ever wrapping a highlight — skips entirely on bold ground, so any current or future bold section is covered automatically, no more per-class blocklist to maintain. Also caught and fixed a side-effect: the old CSS-level guard (`.wh-page-hero .nectar-highlight{background:transparent}`) was unconditional on `.is-light`, so it had been silently suppressing legitimate highlights on genuinely light hero pages (faq/copyright/terms/etc.) — scoped to `:not(.is-light)` (matcha's hero, which is `.is-light` but forced Ceremonial-bold by `body[data-page="matcha"]`, keeps its own explicit rule). Manually re-verified every page + several blog posts after this fix — zero bold-ground violations, no over-suppression. Bumped ps.js v37, wh.css v44.
- Audited the site's logo/iconography (kit sections 24-28) and fixed: nav now swaps the wordmark to the monogram below 480px width (was resizing the same wordmark image at every size, never swapping) — matcha pages correctly get the Ceremonial-profile wordmark/monogram in nav; footer now pairs the monogram with the wordmark (was wordmark-alone), always Terracotta even on matcha per spec; mobile nav logo bumped 29px→32px to clear the on-screen-UI minimum; JSON-LD `"logo"` fields on 17 pages switched from the wide wordmark to the square lockup (`ps-coffee_square_terracotta_framed.png`) to match Google's Knowledge Panel guidance; deleted orphaned `ps-favicon-2026.png`/`ps-logo-2026.png`; removed dead `.nav.over` CSS (targeted old markup that no longer exists); added `404.html` (monogram + one honest line, per the kit's touchpoint spec) — copied `ps-coffee_monogram_terracotta_flat.png`/`_ceremonial_flat.png` into `assets/icons/` for this. Bumped ps.js v35, wh.css v40, mobile.css v29 in the same commit.
- Audited typography (kit sections 16-17) and found the site was carrying a hidden 4th font system left over from the "WatchHouse" template it was built on. Fixed: `--wh-logo-serif` (drove the nav + footer wordmark on every page) was never remediated when `--wh-serif`/`--wh-sans` got corrected to Bricolage/Space Grotesk — now resolves to Bricolage Grotesque too; replaced all 31 hardcoded `font-family:"Archivo"` declarations in ps.css with `var(--font-display)`/`var(--font-body)` per component (2 were live-rendering on join.html's `.chip`/`.marquee`, the rest were dead-but-latent); capped a few Space Grotesk/Bricolage selectors that had weight 800/900 down to their fonts' actual loaded max (700/800). Folded menu cards' separate `dt/dd` "Brew." line into the single description paragraph across all 43 items (was a 5th type style, spec caps cards at 4) and removed the now-dead `dl/dt/dd` CSS — bumped `.menu-recipe`'s line-clamp 2→3 to fit the merged text without truncating. Reduced the blanket `font-weight:800` on ordinary section/card H2s (`.wh-page h2`, `.journal-card h2`, `.journal-post-body h2`, etc.) to 700, reserving 800 for true hero H1s per the kit's "weight is a budget, not a default" rule. Bumped wh.css v41, mobile.css v30 in the same commit (ps.js untouched this pass).
- Audited components (kit sections 18-23: spacing, corner roundness, buttons, badges/icon-buttons/avatars/eyebrow, forms, nav-tabs/matcha-hover) and fixed: `--wh-gut` (the site's core side-padding token, feeding 100+ rules) was silently broken by a stale, unconditional `:root` redefinition left over from the WatchHouse template — desktop was rendering ~20px padding instead of the spec's 64-72px, mobile ~10px instead of 24px; removed the stale override, confirmed live via `getComputedStyle`/`getBoundingClientRect` (the screenshot tool was unreliable this session — flip-flopped between stale/fresh renders even after cache-busted reloads — so verification leaned on direct DOM measurement instead, which was consistent every time). Footer newsletter submit button was a bare arrow with no fill at all (a dead, non-winning CSS rule had described it as a translucent-cream chip, but the actual winning "compact footer pass" rule was fully transparent/borderless) — gave it a real Steam-Cream filled chip with a Ceremonial-green arrow and 9px radius (kept it off Terracotta deliberately: the footer's own documented rule is "Terracotta never appears in the footer"). Fixed all three enquiry-form submit buttons (event/pack/partnership) from 56px/zero-radius to 48px/9px-radius, and their inline `.err` text from a hardcoded `#cf3b1c` red to the actual `--color-error`/Chilli token. Matcha's solid-button hover-darken was wired to `--color-shade-grove` (a lighter olive) instead of `--color-ceremonial-deep` — the correct token already existed (its own comment says "solid-button pressed shade") but was never wired into this rule; fixed, though currently unreachable in the live site since no real `<button>` exists in matcha context yet. `.menu-kcal` and the unused `.tag` component had 6-20px radii instead of pill/999px (zero visual difference for `.menu-kcal` since its radius already exceeded half its own height, but fixed for correctness). Bumped wh.css v48.
- Two more user-found bugs from live inspection: (1) `.wh-loc-list` (homepage locations module, text over a photo scrim) was unreadable — a later "unify all body text" blanket rule (`p,li,dd,dt{color:espresso!important}`) stomped the component's own `!important`-free cream-text rule; added a targeted cream override after the blanket rule. Checked for the same setup elsewhere (`.wh-pod-cta-card p`, `.wh-pack-feats p` have the identical vulnerability but are dead CSS, unused in any HTML — not live bugs). (2) `.wh-page-card a` links on events.html/partnership.html (e.g. "Plan a pop-up", "Host a Pod") had Terracotta text on a Terracotta background — invisible. Root cause: a copy-paste bug bundled `.wh-page-card a`/`button` into a `body[data-page="X"] .wh-page-kicker{color:terracotta}` rule meant only for kicker text, on about/partnership/events pages. Removed the link/button selectors from that bundle (about.html has no live `.wh-page-card` so was latent there too). The matcha-context equivalent has the same sloppy bundling but a later, correct rule already wins there, so left alone. Bumped wh.css v50, mobile.css v32 (also fixed the `.ps-app-callout`→`.ps-our-story` cream buffer from the previous entry: it never got a mobile `order` value in the homepage's flex-reorder system, so on mobile it rendered after `.ps-our-story` instead of between the two panels — gave it `order:-1` and moved `.ps-our-story` to `order:0`, confirmed the buffer now sits exactly between both panels at both mobile and desktop widths).
- Documentation + hygiene pass: rewrote CLAUDE.md's CSS architecture table (`wh.css` was still described as "Blog posts + misc" — it's actually the ~7,700-line dominant stylesheet driving most of the site), fixed two stale "current values are in memory (`project_pscoffee_mobile.md`)" references (that file never existed in this repo's memory system — repointed both to MEMORY.md), added a permanent "Design system — reference" section (colour profiles, Nectar rules, 3-font typography, spacing/radius scale, button/form rules) and a "wh.css cascade gotchas" section (multiple `:root` blocks, check-all-occurrences methodology) distilling this week's five audits, and added `What NOT to do` bullets for the `order`-value, missing-`!important`, and kicker-bundling bug classes found this week. Mirrored all of it into AGENTS.md (Codex's copy). Rewrote README.md's stale architecture section (also said wh.css was blog-specific; blog post count was wrong: 10 not 6). Removed confirmed-dead CSS: `.badge`/`.callout`/the whole unused `.hero` slider component (ps.css), `.wh-pod-cta-card`, `.wh-pack-feats`, `.journal-card-tag`, `.wh-fav-badge` (wh.css) — all verified via exhaustive grep across every HTML file with zero matches before removal; `.tag` and `.ps-plan-badge` were initially miscategorized as dead (an earlier session's grep missed `blog/*.html`) but are confirmed live and were left untouched. Deleted the stray `.DS_Store`; left the untracked `Logo Files/` folder alone per user's explicit choice. Bumped wh.css v51, mobile.css v33.

### 2026-07-05 (second pass)
- Purged all off-system colours from rendered pages: no pure white/black text or fills, no dark-roast/espresso background fills anywhere. Verified with a computed-style audit across all 14 key pages. (Footer/announce-bar colour choices from this pass were superseded 2026-07-06 — see above.)

### 2026-07-05
- Implemented the canonical design-system token layer (from the Claude Design "P.S. Coffee - Design system" project, local export in `~/Downloads/design-system-export/`): `--color-*`, `--space-*`, `--radius-*`, `--text-*` tokens live in `ps.css` and all site palettes (`--tc`, `--ps-*`) alias them. Radii now come from the token scale (buttons 9px, cards 14px, panels 16px) and a "Design-system contrast layer" at the end of `wh.css` enforces Steam-Cream-on-colour text and button flips.

### 2026-06-29
- Synced menu to COGS_Master v20: 43 items, removed 5 (Pour Over, French Press, South Indian Filter Coffee, Vienna Coffee, Cheese Toastie), added 16 new items
- Added Protein as standalone category (not a subcategory inside Coffee)
- Fixed menu filter grid layout (5-button nav requires 5 auto columns)
- Fixed P.S. note vertical symmetry across cards (margin-top:auto moved to .menu-product-note)
