# Content brief — "The Letter and The P.S., explained"

**Status:** brief only, not written · **Type:** Journal post
**Proposed slug:** `/blog/the-letter-and-the-ps-explained`
**Owner:** unassigned · **Brief written:** 2026-09-22

---

## 1. Why this page exists

This is the **best GEO asset available to P.S. Coffee**, and the reasoning is worth stating
because it is not obvious.

Every other keyword in the strategy is contested — somebody else already ranks for "grab and go
coffee" or "specialty coffee Ahmedabad". "The Letter" and "The P.S." are P.S. Coffee's own
invented menu structure. **No competitor's content can ever answer this better**, because it is
not their structure to explain. When someone asks ChatGPT or Google "what is The Letter and The
P.S. on the P.S. Coffee menu", this page should be the only serious answer in existence.

It also does load-bearing work for the rest of the site: the range is the brand's stated
differentiator (v4 §0.3, A6), and right now no single page explains it properly.

---

## 2. Target keywords

| Role | Term | Notes |
| --- | --- | --- |
| Primary | The Letter The P.S. menu | Zero competition by definition. Owns the brand entity |
| Secondary | P.S. Coffee menu explained · rotating coffee menu · numbered coffee variants | |
| Adjacent | what is P.S. Black · what is P.S. Green · what is P.S. Strong | Family-name queries that will grow with the brand |
| Question form | "What is The Letter and what is The P.S.?" · "Why are there only four drinks?" · "What does P.S. Black No. 2 mean?" | Use verbatim as FAQ question text |

**Intent:** almost entirely informational, with one commercial exit (view the Menu). Do not
force a conversion. Someone reading this is already interested.

---

## 3. Governing copy rules

| Rule | Source | Applies here because |
| --- | --- | --- |
| **The range is the differentiator, not the price.** Lead with range | v4 §0.3, A6, §0.7 | This is the single most important framing on this page |
| Variants are **numbered, never given invented names**. "P.S. Black No. 3", never "The Midnight Rebellion" | v4 B2.03, Handbook | If a writer proposes poetic variant names, the answer is no, and the reason is the queue |
| **Describe what the drink does, not where it came from.** Origin and process live on the app detail screen | v4 B2.03 | A writer will be tempted into origin/tasting-note language here. That is the snob register |
| The scope rule for the americano: any line naming it **carries the whole board**, explicitly or by saying "each drink" | v4 A5, Handbook | "A brand that only ever demonstrates range on one drink has one drink with range" |
| Specialty grade, never a species claim | v4 §0.8 | |
| Two registers never mix inside one sentence. Dose/recipe facts are serious register; the asides are drama | v4 §0.5 | This post will want to do both. Keep them in separate sentences |
| One P.S. sign-off, last, never a headline | v4 §0.6 | |
| Pre-launch: the opening rotation is **still being developed**. Do not present a slate as live | v4 Part I | |

**Banned words that specifically threaten this page:** curated, crafted, artisanal, premium,
journey, "carefully selected", tasting notes as marketing, any species claim, any price argument.

---

## 4. Structure

| Block | Content | Notes |
| --- | --- | --- |
| H1 | Approved-voice headline. The existing FAQ phrasing "What are The Letter and The P.S.?" is a safe base | Not a P.S. line |
| Lede, W2 | The one-sentence version: four drinks that never change, and a rotating handful behind them | |
| H2 · One version of each drink is a default, not a menu | The problem statement. v4 A2 beat 4 is the approved source | |
| H2 · The Letter | Black, White, Green, Strong. What each family is. Why the board never changes | Name all four. Do not let Black carry the whole explanation |
| H2 · The P.S. | The rotating variants. Numbered, not named. Three or four at a time. When something leaves, it leaves | Use v4 B2.03's examples as illustrations |
| H2 · Why numbers and not names | Short. The queue is the reason. This is a genuinely interesting, first-party answer | |
| H2 · Your usual is safe | The reassurance beat: the rotation never takes your default away | v4's approved P.S. line covers this |
| FAQ block, 5-6 Q | Same markup as the other Journal posts | `FAQPage` schema |
| Close | One P.S. sign-off. Link to the Menu | |

**Length:** 700-1,000 words. This is an explainer, not an essay.

---

## 5. FAQ questions to include

40-60 words each, mirrored exactly into `FAQPage` JSON-LD, regenerated from the visible HTML.

- What is The Letter?
- What is The P.S.?
- Why are the variants numbered instead of named?
- What happens to my usual when the slate changes?
- How often does The P.S. change?
- Are The P.S. drinks held to the same standard as the board?

That last one matters: v4's H1 line bank has *"P.S. The rotating ones are held to the same
standard. That was never in question."* — it exists because people will assume the rotating
range is the B-team. Answer it directly.

---

## 6. Internal links

**In:** `menu.html` (from the Letter/P.S. section intro), `blogs.html` index,
`blog/specialty-vs-regular-coffee-no-jargon.html`, `blog/morning-coffee-ritual-vs-routine.html`

**Out:** `menu.html` (primary), `matcha.html` (on P.S. Green), `pods.html`

This post should become the canonical internal destination for the phrase "The Letter and The
P.S." — anywhere else on the site that explains it in passing should link here instead.

---

## 7. What makes this page different

Unlike the locality pages, this one has no doorway risk — it is definitionally unique content.
The risk here is the opposite: **writing it as brand poetry instead of a real explanation.**

The test: could someone who has never heard of P.S. Coffee read this and correctly order a drink
at a counter? If not, it has failed, however well it reads. Clarity for a first-timer is rule 3
in the Handbook's precedence order, and it beats cleverness, which is rule 5.

---

## 8. What this page must not do

- Present a specific opening rotation as confirmed
- Invent variant names, or invent variants beyond v4 B2.03's illustrative examples
- Use origin/altitude/tasting-note language (that is the snob register the brand rejects)
- Demonstrate range only on the americano
- Argue price, or mention what a cafe charges
- Carry more than one P.S. sign-off

---

## 9. How to deliver

**Format:** plain prose in whatever you already write in — Google Doc, Word, Markdown, email
body. Do not write HTML. The markup and schema notes in §4 and §5 are build instructions for
whoever ships the post, not for you.

**What to hand over:**

1. The H1 and the lede.
2. The body copy, with the six H2s marked in order.
3. The FAQ block as six question-and-answer pairs, answers 40-60 words each. Write each answer to
   stand alone — they are lifted verbatim into schema and read out of context by search engines
   and AI assistants.
4. The single P.S. sign-off at the close.

**Word count:** 700-1,000 words, excluding the FAQ block.

**What not to try to write:** meta title, meta description, slug, schema, the kicker line, or
internal-link markup. Those are handled separately.

**The one thing worth re-reading before you send it:** §7. Could someone who has never heard of
P.S. Coffee read this and order correctly at a counter? If the answer is no, it does not matter
how well the piece reads.
