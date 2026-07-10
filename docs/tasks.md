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

## Completed (recent, for context — see MEMORY.md for full history)
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
