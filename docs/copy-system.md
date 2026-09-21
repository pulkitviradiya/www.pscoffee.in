# P.S. Coffee Copy System

The website follows [Master Copy System v4](master-copy-system-v4.md), supplied September 2026 — the exact approved wording for every surface. For anything the Master Copy System does not cover verbatim (new campaign copy, captions, notifications, staff language, or *why* a rule exists), use the [Brand Language Handbook](brand-language-handbook.md), supplied 2026-09-19 — where the two disagree on wording, the Handbook explicitly defers to the Master Copy System. The visual language, colours, typography and existing page components remain governed by [design.md](design.md) and [design-system.md](design-system.md).

**The core idea (from the Handbook):** the day is the letter, the coffee is the P.S. — a postscript is always short, always last, always chosen, never the headline. The voice runs in two registers that never mix inside one sentence: **serious** (beans, dose, price, hours — flat declaratives, no wordplay) and **drama** (sign-offs, captions, notifications — dry, deadpan, gossipy). Governing rule: dramatic content, deadpan delivery. See the Handbook for the full precedence order (speed → price legibility → first-timer clarity → voice consistency → cleverness), the P.S. line tests, and the quality/price claim rules — this file only tracks *website-specific* implementation decisions layered on top.

## Website implementation decisions

- User instruction: retain every existing menu item, recipe and price. Change copy, family labels and variant labels only. The Menu retains 43 items, including six food items.
- Black, White, Green and Strong organise the drinks. The Letter has a familiar starting point in each family; The P.S. contains the existing remaining recipes with numbered labels. Original drink names remain visible for recognition. Numbering describes this website draft, not a confirmed opening rotation.
- Use pre-launch wording throughout. Ahmedabad first; no confirmed Pod addresses, dates, live ordering or downloads.
- Keep prices on the Menu as data. Do not invent prices, ingredients, nutrition, provenance, guaranteed timings or operational promises from illustrative source examples.
- User correction: preserve the existing Pass page structure, all 12 options, prices, cup counts, validity, inclusions/exclusions and terms. Keep “Still taking shape” as its headline; describe the options as a prelaunch proposal and retain the interest form without taking payment. This overrides the source document’s parked-Pass direction.
- Use honest specialty coffee until stronger lot-specific claims can be substantiated. No species-based quality promise or criticism of another species.
- P.S. sign-offs have no colon or dash, and appear at most three times per page. A sign-off finishes a section; family names are not sign-offs.
- Journal is the visible editorial name. Keep existing URLs and journal CSS classes.
- Keep English UK and avoid em dashes in public copy.
- Preserve waitlist/form field contracts and privacy-safe analytics. Copy edits must not remove required fields or bypass validation.

## Review before publishing

Check the page title, visible copy, CTA destination and structured data together. Confirm that product inventories and prices match the existing Menu, that planned features read as plans, and that changed text fits both desktop and mobile layouts.

- User correction: retain the original App-page and landing-page prototype GIFs and photos. Keep updated surrounding brand copy; do not replace the prototypes to enforce current copy inside historic mockups.
