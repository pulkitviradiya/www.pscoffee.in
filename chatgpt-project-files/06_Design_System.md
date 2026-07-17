# P.S. Coffee Design System

Source of truth for typography, spacing, iconography, graphic treatments, and layout rules for marketing creatives.
Generated from the current P.S. Coffee repo on 2026-07-17.

## Design Principle

P.S. Coffee should feel useful, direct, warm, and habit-forming. The brand is not decorative cafe theatre. It is specialty-grade coffee and matcha made accessible through compact Pods, clear pricing, and a calm daily rhythm.

## Typography

Three typefaces only:

| Role | Typeface | Use |
|---|---|---|
| Display | Bricolage Grotesque | Headlines, wordmark-like moments, prices, hero numbers |
| Body | Space Grotesk | Body copy, nav, labels, buttons, menu details, tables |
| Accent | Instrument Serif Italic | Pull-quotes, taglines, editorial flourishes |

Rules:

- Bricolage 800 is reserved for heroes, page titles, and the one number that matters.
- Section and card headings usually use Bricolage 700.
- Functional text uses Space Grotesk.
- Instrument Serif is italic only and used sparingly.
- Do not introduce a fourth font.
- Replace any hardcoded Inter, Lora, Archivo, Hanken Grotesk, or unrelated font with the correct brand font.

## Type Scale

- Display: Bricolage 800, roughly 82px desktop for the largest moments.
- H1: Bricolage 800, roughly 48px desktop.
- H2: Bricolage 700, roughly 30px.
- Accent quote: Instrument Serif italic, 22-34px.
- Body: Space Grotesk 400, 14-16px, 1.5-1.6 line height.
- Micro label: Space Grotesk 600-700, 10-12px, uppercase/tracked.
- Price/stat number: Bricolage 800, with smaller Space Grotesk unit label.

## Colour

Core palette:

| Role | Name | Hex |
|---|---|---|
| Coffee lead | Electric Terracotta | `#E8400C` |
| Matcha lead | Deep Ceremonial | `#3D6B4A` |
| Main background | Steam Cream | `#FAF6EE` |
| Card background | Oat Off-white | `#F2EBD9` |
| Border | Linen | `#E8DCC8` |
| Body text | Espresso Brown | `#5C3518` |
| Heading text | Dark Roast | `#3D2010` |
| Accent | Nectar Gold | `#D98F1F` |

Rules:

- Default page ground is Steam Cream.
- Coffee profile uses Terracotta.
- Matcha profile uses Deep Ceremonial.
- Never place Terracotta and Ceremonial directly against each other.
- Never use pure white, pure black, blue, grey, teal, or cool-neutral colours.
- Nectar is only for badges, secondary highlights, stats, progress accents, or one marked phrase.
- Avoid three or more Nectar elements in one viewport.

## Spacing

Use an 8px grid.

Common steps:

- 4px: icon-to-label gap.
- 8px: helper-text gap.
- 12px: compact row gap.
- 16px: default related-element gap and compact card padding.
- 24px: card-grid gap and mobile section padding.
- 32px: heading-to-grid gap and panel padding.
- 48px: subsection spacing.
- 64px: desktop side padding.
- 96px: vertical space between major sections.

Website defaults:

- Desktop side padding: 64px.
- Mobile side padding: 24px.
- Card grid gap: 24px.
- Major section spacing: 32-96px depending on density.

## Radius

Choose radius by element size:

- 6px: highlights/chips.
- 9px: buttons/inputs.
- 12px: small tiles/list rows.
- 16px: cards, panels, modals.
- 22px: outer app/pass frames.
- 999px: badges, avatars, pills.

Do not mix two radius steps on nested elements of similar size.

## Buttons

Variants:

- Primary: solid Terracotta or Ceremonial, Steam Cream label.
- Secondary: Nectar or outline depending on context.
- Ghost/text: inline secondary actions.
- Disabled: Oat fill with muted text.

Rules:

- Hero CTAs use large buttons.
- Most other CTAs use medium buttons.
- Terracotta hover darkens to Brick Deep `#B8300A`; label remains Steam Cream.
- Matcha solid buttons darken to `#2C4F37`.
- Never invert a pressed Terracotta CTA to Terracotta text.

## Forms

- Default: Linen border on Steam Cream.
- Focus: 1.5px Terracotta border. Matcha forms use Ceremonial.
- Error: Chilli border and helper text.
- Disabled: Oat fill and muted text.
- Checkbox: 18px square, 5px radius.
- Switch: pill track, 20px high.
- No browser-default blue focus rings.

## Layout

Breakpoints:

- Desktop >=1280: 12-column grid, max width around 1180px, 24px gutter, 64px side padding.
- Laptop 1024-1279: 12-column grid, 20px gutter, 48px padding.
- Tablet 768-1023: 6-column grid, 16px gutter, 32px padding.
- Mobile <768: 4-column/single-column, 24px padding, bold heroes 60-70vh edge-to-edge.

Rules:

- Do not make marketing cards inside cards.
- Use full-width bands or unframed layouts for page sections.
- Cards are for repeated items, modals, or genuinely framed tools.
- A page should not be Terracotta-and-Cream only from top to bottom; one Ceremonial beat is allowed when content earns it.
- One bold full-bleed block per screen is the ceiling, excluding the fixed Ceremonial footer.

## Iconography And Graphic Language

There is no dedicated icon font/SVG set in the source materials.

Approved motifs:

- Grid overlay: faint ruled grid for menus, packaging, dividers.
- Ruled lockup: hairline rules bracketing the wordmark.
- Circle motif: tonal dot field from the monogram/seal language.

If real icons are needed:

- Use a clean geometric line icon family such as Lucide or Phosphor.
- Keep stroke weight consistent.
- Do not hand-draw bespoke icons unless a full icon system is commissioned.
- Do not introduce mascots, beans, cup doodles, steam doodles, or decorative illustrations.

## Logo Rules

- Use wordmark for nav/header where space allows.
- Use monogram below narrow mobile widths.
- Use reversed Cream marks on Terracotta/Ceremonial.
- On photography, put the logo on a solid plate.
- Never add shadows, gradients, or effects to the logo.
- Never use the logo on low-contrast or busy backgrounds without a plate.

## P.S. Pass Card System

Base card:

- 300px x 476px.
- 22px outer radius.
- 7px Linen/Oat frame.
- 15px inner radius.
- 2px profile-colour inner frame.
- Shadow: `0 18px 46px rgba(42,26,14,.18)`.

Text:

- Pack name: Bricolage 800, large, profile-coloured, with Steam Cream stroke.
- Price: Instrument Serif italic, large, profile-coloured, with Steam Cream stroke.
- Tags: Steam Cream chips, profile-coloured uppercase Space Grotesk.

Colour:

- Default pack colour: Terracotta.
- Green/Matcha pack colour: Deep Ceremonial.

Savings and per-item arithmetic belong only in Pass contexts.

## Marketing Creative Rules

Do:

- Lead with the product, Pod, pass, menu, or concrete business outcome.
- Keep copy short and useful.
- Use Steam Cream as the quiet default ground.
- Use Terracotta for the everyday coffee face.
- Use Ceremonial for matcha and the fixed closing/footer mood.
- Use real or generated bitmap imagery, not abstract SVG decoration.
- Keep prices honest and visible where approved.

Do not:

- Build a one-colour Terracotta-only or beige-only world.
- Use blue/grey/teal/cold corporate palettes.
- Use generic coffee stock imagery.
- Use oversized decorative cards for every section.
- Use savings copy outside Pass contexts.
- Use pure white or pure black.
- Add gradients, bokeh blobs, or ornamental orbs.

## Motion

- Quick hover: 150ms.
- Standard UI transition: 250ms.
- Deliberate modal/sheet/reveal: 400ms max.
- Curve: `cubic-bezier(0.2, 0, 0, 1)`.

Never animate:

- Logo
- Nectar highlight
- Body text
- Colour-profile swaps

Reduced motion:

- Drop custom motion to opacity-only at 150ms.
