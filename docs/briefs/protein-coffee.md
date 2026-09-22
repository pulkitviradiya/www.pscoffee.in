# Content brief — "Protein coffee: 20g of protein without wrecking the cup"

**Status:** brief only, not written · **Type:** Journal post
**Proposed slug:** `/blog/protein-coffee-explained`
**Owner:** unassigned · **Brief written:** 2026-09-22

---

## 1. Why this page exists

P.S. Strong is a quarter of The Letter and the least explained part of the menu. Protein coffee is
also a genuinely rising search category in India with very little honest writing behind it: most
results are supplement-brand pages selling a tub.

The defensible angle is not "protein is good for you". It is the harder, more interesting claim
in the menu line itself: **20g of protein, the same coffee, no compromise on either.** That is a
formulation claim about taste, and nobody else is making it.

---

## 2. Target keywords

| Role | Term | Notes |
| --- | --- | --- |
| Primary | protein coffee · protein coffee India | Rising, thin supply |
| Secondary | 20g protein coffee · post workout coffee · pre workout coffee · gym coffee drink | |
| Adjacent | protein shake vs protein coffee · high protein cold coffee | One section, not the whole post |
| Question form | "What is protein coffee?" · "Does protein coffee actually taste good?" · "Should I drink coffee before or after a workout?" | Use verbatim as FAQ question text |

**Intent:** informational, with an exit to the Menu.

---

## 3. Governing copy rules

| Rule | Source | Applies here because |
| --- | --- | --- |
| **No health, fitness or nutrition claims.** State the gram count as data, nothing more | v4 §0.7's "price as data" logic applied to nutrition; Handbook's moralising ban | The category's whole content ecosystem is claims. This post must not join it |
| Describe what the drink does in the cup, not what it does to the drinker | v4 B2.03 | Texture, sweetness, whether it tastes chalky. That is the honest territory |
| No moralising about training, discipline or goals | v4 §0.6 | Gym content is the worst offender in the brand's banned register |
| Two registers never mix in one sentence | v4 §0.5 | The formulation facts are serious register. The gym observations are drama |
| Pre-launch framing. P.S. Strong is planned | v4 Part I | |
| Do not invent a recipe, a protein source or a nutrition panel | copy-system.md | Nothing about the formulation is confirmed. Say what the family is for, not what is in it |
| One P.S. sign-off, last | v4 §0.6 | |

**Banned words that specifically threaten this page:** gains, shredded, fuel, crush your workout,
beast mode, clean protein, macros as a motivational device, "no excuses", any exclamation mark.

---

## 4. Structure

| Block | Content | Notes |
| --- | --- | --- |
| H1 | Plain and searchable. "Protein coffee: 20g of protein without wrecking the cup" | Not a P.S. line |
| Lede, W2 | What protein coffee is, in two sentences, for someone who has never seen one | |
| H2 · What protein coffee actually is | Category explanation. Coffee with a protein source blended in, as distinct from a shake with coffee flavouring | |
| H2 · Why most of it tastes bad | The honest section, and the reason this post exists: chalkiness, curdling, over-sweetening to hide both. Explain the mechanism plainly | Serious register. Best paragraph on the page |
| H2 · What we are building instead | P.S. Strong: 20g, the same coffee standard as the rest of the board. What is being solved, not what is in it | Do not specify a protein source |
| H2 · Before or after | The timing question, answered without prescribing. Observe what people do, do not advise | **No advice.** This is the line the post must not cross |
| H2 · Where it sits on the menu | P.S. Strong as one of the four families. Link `menu.html` | |
| FAQ block, 5 Q | Standard Journal markup | `FAQPage` schema |
| Close | One P.S. sign-off. Link to `menu.html` | |

**Length:** 700-1,000 words.

---

## 5. FAQ questions to include

40-60 words each, mirrored exactly into `FAQPage` JSON-LD regenerated from the visible HTML.

- What is protein coffee?
- Does protein coffee taste chalky?
- How much protein is in a P.S. Strong?
- Is protein coffee the same as a protein shake?
- Should I drink protein coffee before or after training?

The last one's honest answer is that it depends on the person and we are not in a position to
advise. Say that. A refusal to prescribe is more trustworthy than a confident guess, and it keeps
the brand out of nutrition-advice territory entirely.

---

## 6. Internal links

**In:** `menu.html` (from the protein section), `blogs.html` index,
`blog/pre-workout-coffee-gym-ahmedabad.html`

**Out:** `menu.html` (primary), `pods.html`, `partnership.html` (the gym-host angle, one link)

---

## 7. The risk on this page

`blog/pre-workout-coffee-gym-ahmedabad.html` already exists. **This post is about the drink; that
one is about the occasion.** If a draft turns into advice about training windows, it has become
the other post and will compete with it.

Second risk: the gram count doing motivational work. "20g of protein" is data. "20g of protein to
power your session" is a claim, a moral and a banned register in one clause.

---

## 8. What this page must not do

- Make a health, fitness, nutrition or performance claim
- Specify a protein source, recipe or nutrition panel that has not been confirmed
- Advise on training, timing or intake
- Name or imply another brand or supplement
- Claim P.S. Strong is available
- Carry more than one P.S. sign-off

---

## 9. How to deliver

**Format:** plain prose, any format you already use. Not HTML.

**What to hand over:** the H1 and lede; the body with H2s marked in order; the FAQ as five
question-and-answer pairs, 40-60 words each, each written to stand alone; the single P.S.
sign-off at the close.

**Word count:** 700-1,000 words, excluding the FAQ block.

**What not to try to write:** meta title, meta description, slug, kicker line, schema or
internal-link markup.

**Flag, do not soften.** If a sentence might read as nutrition advice, mark it and hand it over
flagged rather than hedging it into something vaguer.
