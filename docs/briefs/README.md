# Content briefs

One brief per page or post that has been commissioned but not written. Each is self-contained: a
writer should be able to work from a single file without reading the rest of this folder.

**House format** (set 2026-09-22, see [seo-implementation-plan.md](../seo-implementation-plan.md) §8b):

1. Why this page exists · 2. Target keywords · 3. Governing copy rules · 4. Structure ·
5. FAQ questions · 6. Internal links · 7. The risk on this page · 8. What this page must not do ·
9. How to deliver

**Two rules that make the format work:**

- **Every constraint cites its source** — the Master Copy System v4 section or the Handbook rule
  it comes from. A constraint a writer cannot trace is a constraint they will argue with.
- **Section 7 is the one that decides whether the page ships.** For a locality page it is "what
  makes this different from the same page with the name swapped". For a post it is the specific
  way this one could go wrong. A brief without a real answer there is a brief for a page that
  should not be written.

---

## The set

| Brief | Type | Plan ref | Priority |
| --- | --- | --- | --- |
| [the-letter-and-the-ps-explained](the-letter-and-the-ps-explained.md) | Journal post | §4 post 1 | P0 — best GEO asset available, no competitor can answer it |
| [what-is-a-coffee-pod](what-is-a-coffee-pod.md) | Journal post | §4 post 2 | P0 — anchors the Pod entity, carries the kiosk translation |
| [ceremonial-grade-matcha](ceremonial-grade-matcha.md) | Journal post | §4 post 3 | P0 — rising demand, near-zero Gujarat supply |
| [coffee-near-the-office](coffee-near-the-office.md) | Journal post | §4 post 4 | P1 — consumer twin of the offices landing page |
| [protein-coffee](protein-coffee.md) | Journal post | §4 post 5 | P1 |
| [what-a-coworking-space-needs-from-coffee](what-a-coworking-space-needs-from-coffee.md) | Journal post | §4 post 7 | P1 — B2B lead magnet |
| [pantry-machine-and-the-counter](pantry-machine-and-the-counter.md) | Journal post | §4 post 8 | P2 — highest voice risk of the eight |
| [gift-city-gandhinagar](gift-city-gandhinagar.md) | Tier-2 landing page | §5, and §4 post 6 (see its §11) | P1 — held until the first two Tier-2 pages index |

Plan §4's post 6 is deliberately not a separate brief: it overlaps the GIFT City page, and §11 of
that brief sets out the split and the sequencing.

## What the writer does not do

Briefs mention markup classes, schema types and internal-link targets. **Those are build
instructions for whoever ships the page, not for the writer.** Every brief's §9 says so. Writers
deliver prose.

## What happens after a draft arrives

1. Check it against the brief's §8 list first. That is faster than reading for voice.
2. Run the five checks in the Handbook's quick reference: register, P.S. density, the exclamation
   test, the three-hundred-readings test, the precedence order.
3. Build the page, then **regenerate the `FAQPage` schema from the visible HTML** rather than
   hand-writing a second copy. Schema that disagrees with visible text is penalised and
   hand-maintained duplicates always drift.
4. Add the page to `sitemap.xml` and give it at least one contextual internal link. An orphan
   does not rank.
