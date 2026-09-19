# P.S. Coffee — Full Design System Reference

This is the durable, in-repo mirror of the P.S. Coffee brand kit ("P.S. Coffee - Design system" —
a 45-section Claude Design export covering brand voice through print production). It exists so
that any future session — Claude or Codex, this repo or a fresh one — can audit against the full
design system **without the file being re-attached**. If you're asked to "audit for X" and X is
covered below, work from this file first.

`docs/design.md` is the shorter, implementation-focused companion (how the tokens/CSS actually
work in this specific codebase, organized by viewport). This file is the complete spec the
implementation is measured against, organized the way the brand kit itself is organized.

**Keeping this current:** see [the last section](#keeping-this-file-current) — this is not a
one-time snapshot, it's meant to be updated in place when a newer brand kit export is shared.

---

## Brand Foundation (01–05)

### 01 · Brand positioning and pillars
Updated from Master Copy System v4. The positioning line is “We take coffee very seriously, as well as the drama.” Use it on Home and About. Quality, range and reachability lead customer copy; pricing arguments do not.

The menu has two layers: The Letter, with Black, White, Green and Strong, and The P.S., the numbered variants behind them. Existing website menu items and prices are retained at the user's instruction; examples in the copy document are not new confirmed products.

### 02 · Brand psychology
Build for the daily cup: a familiar usual with a range worth returning to. Pods are planned in and around workplaces, campuses, gyms and nearby corners. Ahmedabad first. Do not imply the Pods, app or Pass are live.

### 03 · Voice and tone
Two registers: plain functional information and a brief, dry postscript. Direct, warm and specific. No price defence, competitor comparisons, species-based quality claims or invented operational proof. Use “honest specialty coffee” where stronger sourcing claims are not substantiated.

### 04 · Naming and brand language
Always Pods. The permitted P.S. readings are Postscript, Pretty Serious and Plain & Simple. Retire Perfectly Sourced, Pour Slowly, Proudly Specialty, Precisely Steeped and Personal sign-off. The app uses The Usual; the three-tap phrase is withdrawn. The Pass is still taking shape. Editorial is The P.S. Journal; existing URLs and classes stay intact.

### 05 · Signature copy system
P.S. followed by a space, with no colon or dash. At most three sign-offs per page, at the end of a section. Never force a sign-off onto every card. Family names such as P.S. Black are product labels, not sign-offs. Prices belong on the Menu as data, not in homepage headlines.

Full source: [Master Copy System v4](master-copy-system-v4.md). Website amendments: [copy-system.md](copy-system.md). The visual sections below are unchanged.

---

## Colour System (06–15)

### 06 · Colour Profiles
Two paired profiles, each lead colour always paired with Steam Cream:
- **Profile A — Coffee & Bakery**: Terracotta `#E8400C` + Steam Cream `#FAF6EE`. The everyday face.
- **Profile B — Matcha**: Deep Ceremonial `#3D6B4A` + Steam Cream `#FAF6EE`. Reserved for matcha only.

**Core palette**: Electric Terracotta `#E8400C` (hero) · Deep Ceremonial `#3D6B4A` (matcha hero) · Steam Cream `#FAF6EE` (background) · Oat Off-white `#F2EBD9` (cards) · Linen `#E8DCC8` (borders) · Brick Deep `#B8300A` (pressed) · Espresso Brown `#5C3518` (body text) · Dark Roast `#3D2010` (headings).

**Matcha ramp** (matcha context only): Deep Ceremonial `#3D6B4A` → Shade Grove `#5A8C5E` → Bright Whisk `#8FB87A` → Light Pour `#C8DDB8` → Pale Froth `#EAF2E0`.

**Never in the system**: pure white, any blue/grey/teal/cool neutral, black. Need lighter-than-Cream or darker-than-Dark-Roast? It doesn't exist — reach for Terracotta.
**Cream buffer, always**: Deep Ceremonial never sits directly against Terracotta, even edge-to-edge in a photo grid.

### 07 · Complete Colour System
- Dark Roast / Espresso Brown stay **type only** — a background fill only on a genuinely tiny panel (badge/swatch/strip no wider than a button); anything bigger is Terracotta, Ceremonial, or neutral.
- The two moods (Coffee/Matcha) never share a single panel, but a long page can pivot mood section-by-section (a coffee hero, then a matcha/quiet-pause section further down) — cream always buffers between. A page should never run Terracotta-and-Cream only, top to bottom, with zero Ceremonial beat.

### 08 · Colour Ratios & Contrast
- **Section rhythm**: on pages longer than 3–4 sections, let roughly one section per screenful pivot to Ceremonial where content earns it — a visible beat every few scrolls, not a 50/50 split (Terracotta still leads overall).
- **Ratio**: 60% Steam Cream / 30% lead colour / 10% remainder, for both profiles.
- **Contrast pass/fail** (the single most common build error to QA for): Steam Cream on Terracotta/Ceremonial — every text weight, not just display — PASS; Dark Roast/Espresso Brown text on Terracotta/Ceremonial, any size — **NEVER**; Terracotta on Steam Cream — large display only, not body; Bright Whisk/Light Pour on Cream — decorative/icons only, never text; Terracotta on Ceremonial or reverse — never combine.

### 09 · Nectar: Highlights & Ramp
Warm honey-gold family, the one accent allowed in **either** profile — a bridge, not a third brand colour.
**Ramp**: Nectar Gold `#D98F1F` (core) · Toffee Deep `#A66815` (hover/pressed) · Honey Bright `#F0B44A` (badges) · Nectar Cream `#F6D998` (card wash) · Nectar Wash `#FBEFD4` (section wash).
Used for: secondary CTAs (pair with Dark Roast text, never cream), tags/badges, highlight numbers/stats. **Never** a hero fill, never primary CTA, never nav-bar background; avoid 3+ Nectar elements in one viewport.

### 10 · Nectar Highlight — the Signature Move
Mark the one word/phrase a headline is *really about*, like a highlighter, not a tag — rare and precise.
- **Pick the argument, not the first word.** Read the whole sentence for what it's actually arguing, then mark that phrase (the twist, the trade-off, the number) — defaulting to the first word/noun is the most common misuse.
- **Matcha context**: swap fill to Bright Whisk `#8FB87A` + Dark Roast text (never Nectar Gold on matcha content).
- **Neutral ground only**: never on a Terracotta/Ceremonial bold panel — fights the reversed cream type instead of joining it. This is implemented at runtime in this repo via `nectarSignature()`/`sitsOnBoldGround()` in `ps.js` — see [conventions.md](conventions.md).
- **Wrapped-line safety**: every inline highlight/mark that uses background + padding must include
  `box-decoration-break:clone` and `-webkit-box-decoration-break:clone`. Without both properties,
  wrapped phrases can paint as one merged box instead of clean per-line rounded boxes.

### 11 · Terracotta × Ceremonial in Practice
1. One full-bleed bold block per screen, maximum (hero counts as one; one mid-page callout can be the second — that's the ceiling).
2. Bold blocks touch neutral, never each other — cream/oat gap always separates them.
3. Everything around a bold block returns to Cream immediately — boldness reads as landmark because the rest stays quiet.
4. On mobile, a bold hero can shrink to 60–70vh but stays edge-to-edge, never card-inset.
5. Matcha earns its own colour budget on matcha-specific pages only, with one standing exception: **the site-wide Deep Ceremonial footer** is a fixed closing ritual, not a content decision, and sits outside this budget entirely.

### 12 · Colour Play: Together
The one composition where both hero colours share a frame: two panels never touch directly, a 10px Steam Cream seam runs between them, monogram centred on the seam in cream. This is the *only* layout where both moods appear together — everywhere else, one leads and the other stays offstage.

### 13 · Semantic States
Four states, warm and quiet rather than generic:
- **Success**: Sprout `#7A8B3E` — a deliberate olive one-off so it never reads as matcha green. Transactional only.
- **Warning**: Nectar Gold `#D98F1F` — already in the system (pack running low, session expiring).
- **Error**: Chilli `#A81C2E` — shifted toward crimson so it never collides with pressed-Terracotta `#B8300A`. The rarest colour in the system; real failures only, never validation-as-you-type.
- **Info**: Oat Off-white `#F2EBD9` + Espresso text — no new colour needed.

### 14 · Semantic States: UI Patterns
Toast/snackbar (Cream/Oat card, left accent bar in semantic colour, auto-dismiss) · site banner (thin Nectar-wash or Oat strip, never full-bleed Terracotta/Ceremonial for a passive notice) · order-status badge (Nectar Gold in-progress, Sprout ready) · inline validation (small text below field, semantic colour, no icon needed).

### 15 · Nectar by Component
Five components that reach for Nectar: secondary/ghost button, badge/tag, table-cell/column wash, stat/number emphasis, pack balance/progress meter. **Never**: page background, primary CTA, nav bar, or 3+ Nectar elements in one viewport.

---

## Typography (16–17)

### 16 · Typography
Three typefaces, clearly ranked:
- **Bricolage Grotesque** (display/wordmark) — weights 600/700/800. Headlines, wordmark, "P.S." monogram.
- **Instrument Serif** (accent) — italic only. Pull-quotes, taglines, editorial flourishes, used sparingly.
- **Space Grotesk** (body/labels) — weights 400–700. Menus, receipts, captions, tracked micro-labels.

**Type scale**: Display Bricolage 800·82px/-2.5px · H1 Bricolage 800·48px/-1px · H2 Bricolage 700·30px/-.5px · Accent quote Instrument Serif italic·22–34px · Body Space Grotesk 400·16px/1.5 · Micro label Space Grotesk 600·11–12px/+3px tracked.

### 17 · Typography by Component
Hero H1: Bricolage 800, 32–56px · Section H2/card H3: Bricolage 700–800, 18–30px · Nav/buttons/labels/table cells/menu items: Space Grotesk 500–600, 13–15px · Body paragraphs: Space Grotesk 400, 14–16px, 1.5–1.6 line-height · Eyebrow/tag/badge: Space Grotesk 600–700, 10–12px tracked uppercase · Pull-quote/tagline: Instrument Serif italic, 18–34px (the only serif use) · Price/stat/number: Bricolage 800 + small Space Grotesk unit label · FAQ Q: Space Grotesk 600 Dark Roast, A: Space Grotesk 400 Espresso Brown.

**Price currency glyph**: the `₹` symbol is treated separately from the number. Wrap only the
glyph, for example `<span class="ps-price-currency">₹</span>89`, and keep the rest of the number in
its original price colour. On Steam Cream, Oat, and light neutral grounds, the glyph is Deep
Ceremonial `#3D6B4A`; on Dark Roast, Terracotta, Deep Ceremonial, and other bold/dark grounds, it is
Steam Cream `#FAF6EE`. If the whole price line is already Steam Cream on a dark panel, leave it as
is.

**Menu card cap**: four levels max — name (Bricolage 700) → one-line description (Space Grotesk 400) → one Terracotta P.S. note (Space Grotesk 600) → divider + price row. Fold any second subtitle into the single description line.

**"Weight is a budget, not a default"**: Bricolage 800 reserved for heroes/page titles/the one number that matters; section/card headings run 600–700. If a component isn't listed above, it's Space Grotesk — there is no fourth font.

---

## Spacing, Radius & Core Components (18–23)

### 18 · Spacing Scale
One 8px grid, nine steps: `4·xs` (icon-to-label gap) · `8·sm` (form field to helper text) · `12·md` (list-row gap) · `16·base` (default related-element gap, menu-card padding) · `24·lg` (card-grid gap, mobile section padding) · `32·xl` (heading-to-grid gap, panel padding) · `48·2xl` (subsection heading space) · `64·3xl` (desktop section side padding) · `96·4xl` (vertical space between full sections).
**Website placement**: 64px side padding desktop / 24px mobile; 32–96px between sections; 24px card-grid gap.

### 19 · Corner Roundness
Six steps, chosen by element size: `6px` (highlight mark/chip) · `9px` (buttons/inputs) · `12px` (list rows/small tiles) · `16px` (cards/panels/modals) · `22px` (outer page/app frame) · `999px`/full (avatars/dots/pill badges). Never mix two radius steps on nested elements of similar size.

### 20 · Buttons: Variants & Sizes
Variants: Primary · Secondary · Ghost/Text · Disabled. Sizes: Large 48px/14px label · Medium 40px/13px · Small 32px/12px · Icon-only 40px square.
**Website placement**: Large for hero CTAs, Medium everywhere else, Ghost for inline "Learn more."
**Website hover rule**: solid Terracotta CTAs darken the fill to the Terracotta hover token and
keep Steam Cream label/arrow text. Never invert a pressed Terracotta button to Terracotta text.

### 21 · Badges, Icon Buttons, Avatars & Eyebrow
- **Badge**: pill radius, uppercase tracked label. Two sizes only — standard (5px/10px) and status (6px/12px).
- **Icon button**: 32/40/48px squares. Default Oat fill (secondary); solid Terracotta for primary icon action; hover darkens to `#B8300A`.
- **Avatar**: 24/32/48/96px. Monogram on Terracotta/Ceremonial only, or a masked photo — never a placeholder grey circle.
- **Eyebrow**: Space Grotesk 700, 10–12px tracked uppercase, sits above a headline; colour follows the page's profile, Espresso Brown when neither applies.

### 22 · Forms: Colour Scheme
Default (Linen border on Steam Cream) · Focus (1.5px Terracotta border, never browser-default blue) · Disabled (not editable, muted) · Error (Chilli border + small Chilli helper text, never generic red). Checkbox: 5px radius, 18px square. Switch: 999px pill track, 20px tall. All of it — submit button, checkbox fill, switch "on" state — swaps to Deep Ceremonial on matcha-context forms only.

### 23 · Navigation Tabs & Matcha Hover States
Active tab: 2px underline + label in profile colour. Hover (non-active): label darkens to the profile's hover shade (Terracotta → `#B8300A`, Ceremonial → `#2C4F37`) + soft rounded-top background wash (Nectar-tinted `#F6DCD2` coffee / Pale Froth `#EAF2E0` matcha) — no underline yet, never a solid fill on hover (that's reserved for buttons).
**Matcha hover by component**: solid button fill darkens `#3D6B4A`→`#2C4F37` (no wash, the darker fill is the whole effect); outline/ghost darkens border+label to `#2C4F37` with a faint `#EAF2E0` wash; tab/nav link same darken + wash; inline text link underline-only, colour stays `#3D6B4A`, no wash; icon button/avatar same darkening rule as solid buttons.

---

## Identity & Iconography (24–29)

### 24 · The Logo Suite: Original Marks
Every lockup ships in both profiles (Terracotta / Deep Ceremonial). Naming: `ps-coffee_[mark]_[profile]_[treatment]`.
- **Primary Wordmark** — everyday signature.
- **P.S. Monogram** — tight spaces/stamps; flat / circle-fill / circle-outline treatments.
- **Circle Seal** — stamps, stickers, cup tops.
- **Reversed (Cream on Colour)** — signage, cups, full-bleed fills. The lockup never appears on a Dark Roast/Espresso Brown panel.
- **Favicon & App Icon** — monogram, 512→16px, exported from a 1024px master (never re-drawn smaller).
- **Square Logo** (solid / framed-inset) — social avatars, grid tiles.
- **Rectangle Logo** — storefront monogram+wordmark, headers, receipts.

### 25 · Logo Clear-Space & Misuse
- Both full stops in "P.S." are structural — never dropped, italicised, or swapped.
- No ligature: P, period, S, period stay four distinct marks — never fused.
- No literal imagery (no cup/steam/bean icon in or touching the mark) — the wordmark carries the brand alone.
- Clear-space = X (the monogram disc's height) on every side.
- **Minimum sizes**: print/packaging 0.5in diameter · on-screen UI 32px · favicon 16px (monogram only).
- **Don't**: stretch/distort, recolour off-palette, rotate/tilt, place on low-contrast background, add shadows/effects, reorder the lockup, fill with a gradient.

### 26 · Logo Usage Matrix
Which lockup for which background (Cream / Terracotta / Deep Ceremonial / Photography): fuller lockups (seal, monogram) survive noisier surfaces better than the primary wordmark. On photography, a mark needs a solid plate behind it — never set loose directly on the photo.

### 27 · Logo by Touchpoint
Nav bar: wordmark ≥480px viewport, monogram only below it · Favicon: monogram, cream on Terracotta · App splash: monogram only, centred, no spinner · Footer: monogram + wordmark, small, always Terracotta · Email/transactional: monogram only, 32px · Social avatar: square logo lockup, monogram centred · Empty states: monogram at ~40% opacity, never full wordmark or an illustration · 404/error page: monogram + one honest line of copy, no illustration/mascot · Print (receipts/invoices): rectangle logo lockup.
**Website implementation note**: the live footer uses the served Steam Cream wordmark file
`assets/icons/ps-coffee_wordmark_steam cream.png` on the Deep Ceremonial footer. The about
manifesto's first card uses the served Terracotta circle-outline monogram file, not live "PS"
text, so the mark remains optically consistent with the logo suite.

### 28 · Iconography & Graphic Language
No dedicated icon font/SVG set exists in the source materials. Three recurring motifs built from the monogram/seal's circle-and-rule vocabulary: **Grid Overlay** (faint ruled grid — menu boards, packaging, dividers), **Ruled Lockup** (hairline rules bracketing the wordmark — stationery), **Circle Motif** (tonal dot field — cup sleeves, wrapping, loyalty cards). If real icons are ever needed, match the brand's confident/geometric character (e.g. Lucide/Phosphor at a consistent stroke weight) and flag the substitution rather than hand-drawing bespoke ones.

### 29 · Photography & Imagery Direction
- **Natural light always** — window/open shade only, no flash/studio strobes; warm the shadows, never cold/blue.
- **Shallow depth of field** — 35–50mm equivalent, wide open; one plane sharp, rest dissolves.
- **Texture over polish** — crumb, crema, grain, condensation; a little film grain welcome, clean studio look is not.
- **Caught, not posed** — real motion (a pour mid-stream, a hand-off), never smiling-at-camera stock setups.
- **Contrast-aware type over photography**: dark/moody/backlit → Steam Cream text; bright/high-key → Dark Roast text. Either way, add a scrim (~40–55% black gradient) behind the text zone — colour choice alone isn't enough. Applies to hero captions, Pack cards, any price/headline over an image.
- **Grading by profile**: Coffee & Bakery = warm/lifted/golden-hour (amber highlights, morning light). Matcha = cool/quiet/deliberate (deeper greens, more negative space, "the ceremony of the whisk, not the crowd around it").

---

## Digital (30–35)

### 30 · Digital (social presence + interface colour)
- **Social avatar**: monogram only, centred, generous padding, 400×400 min — coffee account runs Terracotta, matcha account runs Ceremonial.
- **UI buttons & links**: same two-profile primary/hover-pressed/secondary/disabled/link-text logic as everywhere; disabled state is identical across both profiles (Oat fill + muted text) so it never reads as a third brand colour.
- **Button/link background eligibility**: on Steam Cream/Oat — everything works as designed. On a Terracotta or Ceremonial fill — primary flips to a solid Steam Cream button with the fill's colour as the label; secondary becomes a Steam Cream outline; links are Steam Cream underlined. On photography — never float a button directly on the image; scrim strip or solid chip behind it first.
- **Never**: a button whose fill and label are the same colour family, at any opacity — this is what makes a CTA disappear (a real build defect this system catches for).

### 31 · Header & Footer Colour
- **Header** stays quiet on purpose: Steam Cream bar, Terracotta wordmark, Espresso Brown links, Terracotta active underline. On scroll: 1px Linen bottom border only — never a shadow, never a colour change. On matcha pages, active link/CTA swap to Deep Ceremonial; the bar itself stays Cream.
- **Footer**: **Deep Ceremonial is the default footer background site-wide** — every page, coffee or matcha profile alike. Newsletter row Deep Ceremonial `#3D6B4A` with Steam Cream heading/input/submit; body row a shade darker `#2C4F37` with Sage Cream `#DBDDD2` wordmark/links and Bright Whisk for the one italic P.S. line. Terracotta never appears in the footer. Per the cream-buffer rule, if the last content module above the footer is Terracotta, keep a Cream/Oat section between them.
- **Why the footer alone gets to go bold**: not a carve-out, it's the meaning — "every page ends the way the day should: quietly, in Deep Ceremonial, at rest." Sits outside the one-bold-block-per-screen budget (11) as a fixed ritual, not a content decision.

### 32 · Header & Mid-Page Scrolling Ribbon
A thin, continuously-scrolling announcement strip, one glyph (✦) apart. Never carries the newsletter module.
- **Web, above header**: Terracotta fill + Steam Cream text on coffee pages (38px tall, flush above header, no gap/shadow); Deep Ceremonial fill on `/matcha.html` — header bar itself stays Cream either way.
- **App, pinned under status bar**: same fill/glyph rule, scaled to 28px tall, 9.5px type, 1px tracking, respects safe-area inset. Tapping deep-links to that message's own screen; dismiss lasts one session only (reappears next app open) — never permanent.
- **Mid-page section break**: the *one* place Nectar Gold may run full-width as a solid fill (it's a divider, not a content block, so it also sits outside the one-bold-block budget) — full-bleed edge to edge, Dark Roast text.
- **Specs**: heights web-header 38px / mid-page 44px / app 28px. Type: Space Grotesk 600 uppercase, 1–1.5px tracking — never Bricolage/Instrument Serif, it's a utility strip. Motion: linear right-to-left, one loop per 26–32s, no easing/bounce, pauses on hover (web) / touch (app).

### 33 · Web: Breakpoints, Grid & Page States
- **Breakpoints**: Desktop ≥1280 (max-width 1180, 12-col, 24px gutter, 64px side padding) · Laptop 1024–1279 (12-col, 20px gutter, 48px padding) · Tablet 768–1023 (6-col, 16px gutter, 32px padding, cards drop to two-up) · Mobile <768 (4-col, 16px gutter, 24px padding, single-column, display type caps 40px, bold heroes 60–70vh edge-to-edge).
- **Marketing page bold panels**: coffee-profile page heroes, quality/promise panels, app
  download strips, and pass/pack overlays use Terracotta or image-backed bold grounds with Steam
  Cream type. If body copy or labels compute to Dark Roast/Espresso on those grounds, it is a
  defect even if the source rule appears lower in the file.
- **404**: Cream page, one Bricolage headline with the one highlight mark, an Instrument Serif "P.S.: The coffee's this way," one primary button home — never an illustration hunt.
- **Loading**: Oat skeleton blocks matching final layout shapes, gentle opacity pulse — no spinners, no blue progress bars.
- **Empty states**: Bricolage one-liner + Space Grotesk explanation + one action, warm tone, never apologetic.
- **Modal/sheet**: Steam Cream panel, 16px radius, Dark Roast scrim at 40% opacity — never a pure-black scrim.
- **Toast**: Dark Roast chip, Steam Cream text, 12px radius, bottom-centre, success/error dot from the semantic set.
- **Cookie/consent bar**: Oat bar, Espresso Brown copy, one Terracotta accept button, one plain-text decline link — quiet, never a bold panel.
- **Focus ring**: 2px Terracotta outline, 2px offset, on every focusable element (Deep Ceremonial on matcha pages) — never the browser-default blue.
- **Favicon/OG**: favicon = Terracotta circle monogram legible at 16px; OG/share card 1200×630, Cream ground, one Bricolage headline with its Nectar mark, monogram bottom-left.

### 34 · Motion & Interaction
Three durations, one curve: `150ms` quick (hover states) · `250ms` standard (accordion/tab/toast/switch) · `400ms` deliberate (modals/sheets/page reveals) — nothing moves slower. **One curve**: `cubic-bezier(0.2, 0, 0, 1)` everywhere, no bounce/spring/elastic.
**Never animates**: the logo, the Nectar highlight, body text, colour-profile swaps. Scroll entrances: one subtle 12px fade-up per section max, no staggered cascades. `prefers-reduced-motion`: all transitions drop to opacity-only at 150ms — non-negotiable.

### 35 · App: Icon, Splash & System Moments
_(Native mobile app — not yet built in this repo; see [design.md](design.md)'s App section. Recorded here for completeness/future reference only.)_
App icon: Terracotta ground, cream monogram, nothing else, no wordmark/cup/gradient. Splash: Steam Cream screen, centred monogram, no tagline/spinner. Push notifications: functional-first, one "P.S.:" construction max, never two exclamation marks or emoji, marketing pushes cap at one/week. **Dark mode ("First Light")**: Dark Roast ground, Sage Cream body text, Steam Cream headings, Terracotta/Ceremonial hold their hues, Nectar Gold steps down to `#A66815` to avoid glare — follows OS setting, never a flat programmatic invert. Tab bar: four tabs max, outlined 2px icons filled when active, Terracotta active tint. Haptics: light tap on add-to-cart, success pattern on order confirmed, nothing on navigation — money moments only.

---

## Product & Content (36–38)

### 36 · P.S. Pass: Subscription Tiers
`pack.html` is the source of truth for active Pass categories, names, prices, cup counts, and validity. Current categories are **Core Packs** (Black, Starter, Habit, Full Pour), **Unlimited days** (Daily, Open Tab), and the additional First Sip, Week, Green, Team, Office Tab, and P.S. Note offers represented there.

Homepage previews the four Core Packs using fixed `300 × 476px` vertical cards with minimal captions. Every card uses a `22px` outer radius, `7px` Pale Oat frame, `15px` inner radius, `2px` profile-colour inner frame, and `0 18px 46px rgba(42,26,14,.18)` shadow. Coffee and bakery profiles use Terracotta (`#E8400C`); the Matcha/Green Pack alone uses Deep Ceremonial (`#3D6B4A`). The profile colour also owns the bottom photo scrim, outlined title and price, and tag text.

On every card, “The” is a 26px/800 label above a balanced 46px/800 Bricolage name, both profile-coloured with a 2.5px Steam Cream stroke. Price uses 46px italic Instrument Serif with a 2px Steam Cream stroke. Steam Cream tags use profile-coloured 8.5px/800 uppercase Space Grotesk text and a 6px radius. The dedicated Pass page reuses this exact card language and places Included, Use It For, Exclusions, and GST inside semantic collapsed `<details>` elements. Savings and per-item arithmetic stay in Pass contexts only.

Background carries each Pass identity through the approved photography or colour profile; never invent a new accent colour or identify a Pass by badge alone.

### 37 · Blog Section Types
- **Index hero row**: the one place two featured cards may sit side by side, hard edge (no gap) between them.
- **Grid cards**: stay on Cream, Terracotta/Ceremonial tag only marks topic — never a filled card.
- **Key Takeaway box**: Oat background, thin Terracotta left accent bar (not a full border), Bricolage bold label, Space Grotesk bullets.
- **Comparison table**: alternating Cream/Oat rows on neutral; the P.S. column gets a thin Terracotta top border to mark "this one" — never a filled colour column.
- **FAQ-within-article**: same accordion as the FAQ page, nested on an Oat module, never full-bleed colour inside a running article.
- **Related posts/byline**: 3-card row on Cream; byline small tracked Space Grotesk Espresso Brown under the H1.
- **FAQ accordion**: active category Terracotta fill, inactive Cream + Linen outline — categories never switch to Ceremonial on the FAQ page even for a matcha question. Collapsed chevron: plain outline circle, no tint. Expanded: filled Terracotta circle (rotated), Terracotta left border, Nectar Wash background — the state change is the colour, not just the chevron.

### 38 · Applied: Sample Layouts
Reference compositions showing the system in practice — one website hero in Terracotta mood (home hero: wordmark nav, "Honest specialty coffee," opening-waitlist CTA), one app screen in Ceremonial mood (matcha order screen) — same bold-colour logic, two different chapters.

---

## Print & Physical Collateral (39–44)

**Out of scope for this repo** — this is a static website + 2 serverless functions; there is no
print production, signage, packaging, or social-media publishing pipeline in the codebase. Noted
here only so a future audit knows these sections exist in the source kit and aren't missing by
oversight:

- **39 · Print Production** — CMYK/Pantone conversions for the palette, margin specs for press runs.
- **40 · Signage & Pod Wayfinding** — physical Pod fascia system, matte-only finish rules.
- **41 · Packaging, Uniforms & Email** — cups, bags/boxes, staff uniforms, the one recurring email template.
- **42 · Social Media System** — Story/Reel/Feed format specs, caption voice, page furniture.
- **43 · Documents & Stationery** — letterhead, signature block, receipt layout, font fallbacks.
- **44 · Pitch Decks & Data Visualisation** — slide masters, chart palette.

If work ever touches an actual print/signage/social deliverable, pull the relevant section fresh
from a current brand-kit export rather than relying on a summary — these weren't condensed above.

---

## 45 · Do / Don't: Quick Checklist
**Do**: Steam Cream as the default background everywhere · one mood (Terracotta or Ceremonial) per screen · Nectar for secondary signals only · a solid plate behind any logo on a photo · Dark Roast/Espresso Brown as text or tiny chips only.
**Don't**: pure white or any blue/grey/cool tone · green anywhere outside a matcha context except the site-wide Deep Ceremonial footer · gradients/shadows/3D effects on the logo · Dark Roast/Espresso Brown as a large background panel · default browser blue focus rings or generic red error states.

---

## Keeping this file current

This file mirrors a point-in-time brand kit export. When a **new or updated design-system file is
shared** in any future session (a `.dc.html` export, a docx, a zip of the Claude Design project,
or anything the user describes as "the design system"/"brand kit"):

1. **Read the new source fully first** — don't skim. Extract its section structure the same way
   this file is organized (numbered sections, brand foundation → colour → typography → components
   → identity → digital → product/content → print).
2. **Diff against this file section by section** — for each section, decide: unchanged (leave it),
   changed (update the text here, and note what changed + when in
   [MEMORY.md](../MEMORY.md)), or new (append it in the right numbered position, renumbering only
   if the source kit itself renumbered).
3. **Never blindly overwrite the whole file.** A wholesale rewrite loses the distinction between
   "this was always true" and "this changed today," which is exactly the context a future session
   needs. Targeted edits only.
4. **Cross-check against the live site** before assuming a change requires a code fix — a change
   in the source kit doesn't necessarily mean the current implementation is now wrong; confirm via
   the cascade-resolution methodology in [conventions.md](conventions.md) before touching CSS.
5. **Update [design.md](design.md) too** if the change affects an actual CSS token/rule already
   documented there (design.md is the "as-implemented" companion to this file's "as-specified").
6. Log the update in `MEMORY.md` under a dated entry, same as any other session decision.
