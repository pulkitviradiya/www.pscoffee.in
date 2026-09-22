# Content brief — "Ceremonial grade matcha: what it means and why we whisk it"

**Status:** brief only, not written · **Type:** Journal post
**Proposed slug:** `/blog/ceremonial-grade-matcha-explained`
**Owner:** unassigned · **Brief written:** 2026-09-22

---

## 1. Why this page exists

Matcha demand in India is rising fast and the supply of honest, non-marketing explanation is
close to zero, particularly in Gujarat. Most of what ranks is either a wellness listicle or a
product page for a sweetened powder mix.

It is also the one place the brand can make a **grade** claim at full strength without breaking
any rule. Master Copy v4 retires species claims for coffee, but ceremonial grade is exactly the
kind of claim v4 §0.8 says to make: the grade, stated plainly, per lot.

P.S. Green is a whole quarter of The Letter and currently has one page and no explainer.

---

## 2. Target keywords

| Role | Term | Notes |
| --- | --- | --- |
| Primary | ceremonial grade matcha | Rising demand, thin Indian supply |
| Primary | ceremonial vs culinary matcha | The comparison everyone searches and few answer plainly |
| Secondary | what is ceremonial grade matcha · whisked matcha vs powder mix · matcha Ahmedabad · specialty matcha India | |
| Adjacent | hojicha India · is matcha better than coffee | Second-order, one paragraph each at most |
| Question form | "What is ceremonial grade matcha?" · "What is the difference between ceremonial and culinary matcha?" · "Is matcha better than coffee?" | Use verbatim as FAQ question text |

**Intent:** informational, with a commercial exit to `matcha.html` and the Menu.

---

## 3. Governing copy rules

| Rule | Source | Applies here because |
| --- | --- | --- |
| **Claim the grade, plainly.** Ceremonial grade, properly whisked | v4 §0.8, B2.02 | This is the approved claim. Use it. Do not inflate it into a health claim |
| Describe what the drink does, not where it came from | v4 B2.03, Handbook | A matcha post is the single strongest pull toward origin and terroir language. Resist it. One line on origin at most |
| Two registers never mix in one sentence | v4 §0.5 | Whisking temperature is serious register. The asides are drama. Separate sentences |
| **No health claims.** No metabolism, no detox, no calm-energy promises, no L-theanine pitch | Handbook, moralising ban plus India's food-labelling reality | This is the biggest legal and voice risk on the page |
| Matcha is Profile B: never framed as a coffee substitute for people who "can't handle" coffee | v4 H6, design.md | The approved framing is *"Not a trend. A second habit."* |
| Pre-launch framing. P.S. Green is planned, not pouring | v4 Part I | |
| One P.S. sign-off, last | v4 §0.6 | |

**Banned words that specifically threaten this page:** superfood, detox, wellness journey,
antioxidant-rich, clean energy, ritualistic, authentic, artisanal, ceremonial-grade-adjacent
puffery such as "the finest". Also: never criticise the sweetened powder category by brand.

---

## 4. Structure

| Block | Content | Notes |
| --- | --- | --- |
| H1 | Plain and searchable. "Ceremonial grade matcha: what it means and why we whisk it" | Not a P.S. line |
| Lede, W2 | The answer in two sentences: what the grade is and what it changes in the cup | The paragraph an AI assistant will quote |
| H2 · What the grade actually describes | Leaf selection, shade growing, stone milling, the fact that grades are a trade convention rather than a legal standard. Say that last part plainly, because it is true and almost nobody does | Serious register |
| H2 · Ceremonial and culinary, side by side | The comparison table. What each is built for, and why the culinary one is not worse, only different | Anti-format, never anti-brand |
| H2 · Why whisked, not stirred | The mechanical answer: powder does not dissolve, it suspends. Deadpan, factual | Best paragraph on the page if written plainly |
| H2 · What a sweetened powder mix actually is | Category explanation, no brand names, no sneering | The single most-searched confusion |
| H2 · P.S. Green | What the family is, that hojicha sits behind it, that the opening rotation is still being developed | Link `matcha.html` and `menu.html` |
| FAQ block, 5-6 Q | Standard Journal markup | `FAQPage` schema |
| Close | One P.S. sign-off. v4 H6 has four approved options | |

**Length:** 800-1,100 words. This one earns the extra length because the comparison is the value.

---

## 5. FAQ questions to include

40-60 words each, mirrored exactly into `FAQPage` JSON-LD regenerated from the visible HTML.

- What is ceremonial grade matcha?
- What is the difference between ceremonial and culinary matcha?
- Why does matcha have to be whisked?
- Is matcha the same as green tea?
- Is matcha better than coffee?
- Where can I get ceremonial grade matcha in Ahmedabad?

That last one is the local hook. The honest answer is "nowhere from us yet" — say so, and point
at the waitlist. An FAQ answer that admits a gap is more citable than one that dodges it.

---

## 6. Internal links

**In:** `matcha.html`, `menu.html` (from the matcha section), `blogs.html` index

**Out:** `matcha.html` (primary), `menu.html`, `pods.html`

---

## 7. The risk on this page

Two, and they pull in opposite directions.

1. **Wellness drift.** The matcha category's entire content ecosystem is health claims. A writer
   absorbing the ambient register will produce them without noticing. Every sentence about what
   matcha *does to you* should be cut unless it is about taste.
2. **Snob drift.** The opposite failure: altitude, cultivar, first harvest, Uji versus Nishio. One
   sentence of provenance is generous. The Handbook's worked example is explicit that the brand
   describes what the drink does, not where it came from.

The test: would this read as honest to someone who already drinks matcha, and as clear to someone
who has never had it? Both, or it is not finished.

---

## 8. What this page must not do

- Make any health, medical or nutritional claim
- Name or criticise another matcha brand or product
- Claim P.S. Green is available
- Use origin or cultivar detail as a quality argument
- Frame matcha as what you drink when you cannot have coffee
- Carry more than one P.S. sign-off

---

## 9. How to deliver

**Format:** plain prose, any format you already use. Not HTML.

**What to hand over:** the H1 and lede; the body with H2s marked in order, including the
ceremonial-versus-culinary comparison as a simple two-column table or a clearly labelled list;
the FAQ as six question-and-answer pairs, 40-60 words each, each written to stand alone; the
single P.S. sign-off at the close.

**Word count:** 800-1,100 words, excluding the FAQ block.

**What not to try to write:** meta title, meta description, slug, kicker line, schema or
internal-link markup.

**If you are unsure whether a sentence is a health claim, it is.** Flag it rather than softening
it, and it will be decided rather than quietly shipped.
