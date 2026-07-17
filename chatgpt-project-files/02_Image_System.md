# P.S. Coffee Image System

Source of truth for photography direction, composition, lighting, camera/lens guidance, styling rules, negative prompts, and aspect ratios.
Generated from the current P.S. Coffee repo on 2026-07-17.

## Photography Direction

P.S. Coffee imagery should feel caught, warm, tactile, and useful. It should show a real product, Pod, hand-off, pour, cup, counter, sleeve, pass card, or location state. Avoid generic coffee-shop mood imagery.

## Core Rules

- Natural light always: window light or open shade. No flash or obvious studio strobe.
- Warm the shadows. Avoid cold, blue, clinical grading.
- Shallow depth of field: 35-50mm equivalent, wide open where possible.
- One plane sharp; background can fall away.
- Texture over polish: crema, crumb, paper grain, condensation, milk texture, matcha foam.
- Caught, not posed: pour mid-stream, hand-off, pick-up, counter interaction, app-before-arrival moment.
- Avoid smiling-at-camera stock setups.
- Avoid high-gloss studio product shots unless a packaging reference specifically calls for it.

## Coffee & Bakery Look

Mood:

- Warm
- Lifted
- Morning light
- Amber highlights
- Everyday but premium by restraint, not by staging

Use for:

- Coffee menu
- Bakery/food
- Pods
- P.S. Pass coffee packs
- About and brand story
- Partnership/corporate coffee contexts

Colour profile:

- Terracotta `#E8400C`
- Steam Cream `#FAF6EE`
- Oat `#F2EBD9`
- Dark Roast/Espresso only for text, not large fills

## Matcha Look

Mood:

- Cool but not blue
- Quiet
- More negative space
- Deeper greens
- Deliberate whisk/pour/calm ritual

Use for:

- Matcha page
- Matcha menu cards
- Green Pack
- Matcha-specific social or product visuals

Colour profile:

- Deep Ceremonial `#3D6B4A`
- Bright Whisk `#8FB87A`
- Pale Froth `#EAF2E0`
- Steam Cream `#FAF6EE`

## Composition

Preferred compositions:

- Product in first viewport, large enough to inspect.
- Countertop product with clear brand mark or sleeve.
- Compact Pod inside a real daily location.
- Menu item against warm neutral or matching profile background.
- Human hands are acceptable when they show action, not lifestyle posing.
- Use negative space when text must overlay an image.

Avoid:

- Dark, blurred, generic cafe interiors.
- Crops where the product cannot be identified.
- Overly busy flat-lays.
- Stock cafe scenes with anonymous cups.
- Latte art as the only signifier of quality.
- AI-looking perfect foam or impossible cup geometry.

## Text Over Photography

Contrast decides the text colour:

- Dark, moody, or backlit image: use Steam Cream text.
- Bright, high-key image: use Dark Roast text.

Always add a scrim behind text zones. A 40-55% black gradient is approved where needed. Colour choice alone is not enough.

Buttons should not float directly on top of photography. Put the button on a scrim strip, solid chip, or quiet panel.

## Image Slots And Aspect Ratios

Live website images are usually served through `image-slot` with a desktop `src` and, where needed, a `mobile-src`.

Common slot patterns:

- Hero landscape: desktop and mobile versions where crop matters.
- Card rectangle: product/location card imagery.
- Pass cards: fixed vertical `300 x 476` card language.
- Blog imagery: desktop/mobile pairs for hero, grid, and spotlight images.
- Footer/banner: wide image bands.

When producing new image assets, deliver:

- Desktop WebP when the image appears on desktop.
- Mobile WebP when the crop needs to change on mobile.
- Keep names descriptive and route-scoped, such as `menu-coffee-cappuccino-desktop.webp`.

## Current Site Image Naming Pattern

Examples:

- `assets/photos/site/home-hero-coffee-desktop.webp`
- `assets/photos/site/home-hero-pod-mobile.webp`
- `assets/photos/site/menu-coffee-cappuccino-desktop.webp`
- `assets/photos/site/menu-matcha-iced-mobile.webp`
- `assets/photos/site/pack-hero-desktop.webp`
- `assets/photos/site/pods-location-coworking-mobile.webp`
- `assets/photos/site/story-founder-portrait-desktop.webp`

## Negative Prompt

Use these as negative prompt constraints for generated or sourced imagery:

- No generic cafe stock photo.
- No blue, grey, teal, cold corporate palette.
- No pure white background.
- No pure black background.
- No neon.
- No plastic-looking cups.
- No impossible cup geometry.
- No fake unreadable logos.
- No extra brand names.
- No smiling-at-camera stock people.
- No over-polished studio gloss unless packaging-specific.
- No latte art as the main subject unless the drink itself requires it.
- No cluttered cafe interiors.
- No dark moody crop where product is not inspectable.

## Prompt Template

Use this structure:

```text
P.S. Coffee [subject], [coffee/matcha/Pod/pass/food context], real product clearly visible, warm natural window light, shallow depth of field, 35-50mm equivalent, tactile texture, Steam Cream and Terracotta palette, editorial but not stock, caught moment, clean negative space for copy, no blue grey tones, no generic cafe, no fake logos.
```

For matcha:

```text
P.S. Coffee ceremonial-grade matcha [subject], Deep Ceremonial and Steam Cream palette, quiet negative space, natural window light, visible whisked matcha texture, shallow depth of field, calm editorial composition, no blue grey tones, no generic cafe, no fake logos.
```
