# Tasks

## Current Sprint
_(empty — fill in manually)_

---

## TODO comments found in code
None. A repo-wide grep for `TODO`/`FIXME`/`XXX:` across `*.js`, `*.html`, `*.css` returned zero
matches as of 2026-07-07.

## Known incomplete / in-progress items (found in code, not from a TODO comment)
- **Tablet breakpoint consolidation deferred.** The site has ~14 ad-hoc `@media` breakpoints
  scattered across `wh.css`/`mobile.css` instead of a documented 768/1024/1280 grid. Evaluated
  and explicitly deferred (2026-07-06) as high-regression-risk for a cosmetic-only gain — no live
  defect exists. Needs a fresh tablet-range audit before this is worth revisiting.

## Housekeeping / loose ends (not code TODOs, but worth a decision)
_(none open)_

## Current SEO/GEO workstream — open items
- **Step 7: eight new Journal posts.** Briefed, not written. With the writer. See `docs/briefs/`.
- **Step 8: remaining four Tier-2 pages** (`/coffee-for-campus`, `/coffee-for-gyms`,
  `/coffee-catering-ahmedabad`, `/coffee-gift-city-gandhinagar`). Deliberately held for 4-6 weeks
  until the first two index and hold — shipping six thin locality pages at once is the
  doorway-page pattern.
- **Brand-owner read** on the visible copy added to `coffee-for-offices`,
  `coffee-for-coworking-spaces` and the Partnership page's complementary-vendor line.
- **Two brand-owner decisions still open:** `blog/what-is-arabica-coffee-india` carries a species
  claim Master Copy v4 retires, and `matcha.html`'s H1 is a flagship P.S. line used as a headline,
  which the Handbook forbids.
- **Deferred until Pod addresses exist:** `LocalBusiness` schema per Pod.
- **Re-score the keyword database** once Search Console has 90 days of real data.
- **Journal card image missing.** `blogs.html`'s card for `the-letter-and-the-ps-explained` uses an
  `<image-slot>` with a placeholder and no `src`, because no asset exists for it yet. It renders as
  a grey slot beside neighbours that have photos. Needs
  `assets/photos/site/blog-letter-and-ps-{desktop,mobile}.webp`, then the slot wired to them.

## Completed (recent, for context — see MEMORY.md for full history)
- Tier-2 landing pages `/coffee-for-offices` and `/coffee-for-coworking-spaces`, the
  complementary-vendor line and Tier-2 footer links, the 336-row keyword database, the ecosystem
  outreach angle, and an explicit AI-crawler policy in `robots.txt` — 2026-09-22.
- Browser-reviewed design-system polish pass across homepage/menu/pack/app/about/footer: rupee
  glyph colour rule, Nectar highlight clone hardening, footer wordmark/monogram assets, pack/app/
  about typography and CTA hover computed-style fixes — 2026-07-08.
- Desktop and mobile app prototype export artifacts committed under `output/` as reference
  material — 2026-07-08.
- Cleaned `wh.css` in safe, computed-style-verified slices: removed dead legacy WatchHouse
  sections and exact duplicate live selector groups; `wh.css` duplicate scan now reports zero
  exact duplicate rule groups — 2026-07-08.
- Full brand-kit audit across colour system, typography, iconography, components, and content
  layout (blog post structure) — completed across sessions 2026-07-05 through 2026-07-07.
- `Logo Files/` (root) is now tracked in git (2026-07-07) — reverses the earlier 2026-07-06
  decision to leave it untracked.
- Documentation restructuring into `docs/` (this file and its siblings) — completed 2026-07-07.
- Removed the 4 dead legacy font files (`Balto-Book.otf`, `Balto-Medium.otf`,
  `TiemposHeadline-Medium.otf`, `WatchHouseSerif-Medium.otf`) and their `@font-face`/token
  declarations from `wh.css` — 2026-07-07.
- Removed the dead, unreachable `.wh-btn.matcha` component (never used in any HTML, and fully
  superseded anyway by the working `body[data-page="matcha"] .wh-btn.dark` rule) — 2026-07-07.
- Committed the 12 previously-untracked `assets/photos/site/ps-pass-*.webp` files — 2026-07-07.
