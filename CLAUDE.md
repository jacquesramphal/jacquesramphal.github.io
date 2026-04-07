# Writing Rules for ramphal.design

These rules apply when writing or editing any article, case study, card description, or page prose on this site. They exist for two reasons: AI-assisted writing produces consistent patterns that flatten voice, and this site is meant to outlast any particular job, role, or moment — so the writing has to be employer-agnostic, time-agnostic, and specific enough to mean something to a stranger in five years.

This site is a record, not a portfolio.

---

## The core principle

If the evidence is already there, cut the verdict. Readers who just read the evidence don't need to be told what it means. Trust them.

---

## Anti-patterns

### 1. The pivot sentence

**Pattern:** "X wasn't Y. It was Z." / "This isn't about X. It's about Y." / "X wasn't the problem. Y was."

**Why it happens:** AI constructs contrast to signal insight. The problem is that contrast without new information is just noise.

**Fix:** Cut it. If the preceding paragraph already showed the distinction, the verdict sentence is redundant. If it didn't, rewrite the paragraph — don't add a summary sentence.

```
❌ This project wasn't a redesign. It was a systems problem — and it needed a systems solution.
✓  The client had a multi-display HMI prototype that needed to scale across four brands...
```

```
❌ Storybook wasn't the wrong tool. The integration model was.
✓  [cut — the three consequences in the paragraph before it already make the point]
```

```
❌ The answer isn't to slow down everywhere. It's to build the constraints that let you run.
✓  Build the constraints that let you run.
   [cut the first sentence — it restates what the paragraph already showed]
```

---

### 2. The double mirror

**Pattern:** "X disappears. Y expands." / "X reduces. Y increases." / Two short sentences with parallel structure used as a closing flourish.

**Why it happens:** AI loves symmetric closings. They feel conclusive. They're usually empty.

**Fix:** Cut both sentences, or rewrite as one specific claim.

```
❌ This isn't design disappearing. It's design expanding.
✓  [cut — the preceding paragraph about guardrails and ownership already made this case]
```

---

### 3. The fragment triplet

**Pattern:** "And that's uncomfortable. And humbling. And exactly where growth happens."

**Why it happens:** Short sentences used for emphasis. The "And" at the start of each is meant to feel like a pause. It reads as performed.

**Fix:** One sentence, no fragments.

```
❌ And that's uncomfortable. And humbling. And exactly where growth happens.
✓  That's uncomfortable, and humbling, and exactly where growth happens.
```

---

### 4. The meta-verdict

**Pattern:** "That's exactly the point." / "That's a design problem too." / "That's what good systems work is supposed to do."

**Why it happens:** AI wraps up sections with a sentence that names the takeaway explicitly. It treats the reader as someone who might have missed it.

**Fix:** Cut it. If the section made its point, the verdict is unnecessary. If it didn't, fix the section.

```
❌ This may not look like traditional design work. That's exactly the point.
✓  [cut]
```

```
❌ That's not just a tooling challenge. It's a design problem.
✓  [cut — the sentence before lists the actual challenges]
```

```
❌ Speed is fine. Speed inside a system is design.
✓  [cut — the paragraph before it already made the point]
```

---

### 5. The abstract noun substitution

**Pattern:** "organizational model", "integration layer", "interpretation model", "adoption challenge", "transition moment"

**Why it happens:** AI avoids specifics by naming the category of thing instead of the thing itself.

**Fix:** Name the actual thing. Who does what, where does it break, what did it cost.

```
❌ The organizational model is still being figured out.
✓  How this becomes a team practice rather than something one person uses.
```

```
❌ Empowering technical users with precision, flexibility, and control.
✓  IT professionals configuring industrial PCs where a wrong choice has real consequences.
```

---

### 6. The list of virtues

**Pattern:** "Make complexity understandable. Make risk visible. Make value measurable." / Three parallel "make X Y" clauses used as a closing.

**Why it happens:** AI uses parallel structure to create the feeling of a manifesto. The items are often true but interchangeable — they could describe any design discipline.

**Fix:** Either cut to one specific claim, or replace the list with a concrete example of what you actually did.

```
❌ Make complexity understandable, make risk visible, make value measurable, and design for humans.
✓  [use a specific example instead]
```

---

### 7. The threshold announcement

**Pattern:** "You crossed a threshold." / "That's a signal you've arrived." / "Those are questions for serious tools, not side projects."

**Why it happens:** AI likes to announce significance explicitly. Real significance doesn't need announcing.

**Fix:** Leave the thing that signals significance. Cut the announcement of it.

---

### 8. The em-dash crutch

**Pattern:** Overusing `—` as a general-purpose connector, especially in pairs: "The thing — specifically this — is why it works."

**Why it happens:** Em dashes can substitute for commas, colons, or parentheses, so they become a default connector. They are visible and distinctive enough that readers notice the pattern quickly. Frequent use signals the writing wasn't restructured.

**Fix:** Don't overuse them. Each em dash should earn its place — it works when the aside or interruption genuinely needs to stand apart from the surrounding sentence. When it doesn't earn it, prefer a comma for continuation or rewrite as a longer sentence or two shorter ones. Don't swap an em dash directly for a colon — colons read more abrupt and clinical than the prose usually wants.

```
❌ Base styles cover the elements — headings, body, buttons — all through tokens.
✓  Base styles cover headings, body, and buttons, all through tokens.

❌ This started as a reusable foundation — a layer I kept rebuilding.
✓  This started as a reusable foundation, a layer I kept rebuilding.

❌ Nothing is wrong, exactly — but nothing is quite yours, either.
✓  Nothing is wrong, exactly, but nothing is quite yours, either.

❌ That friction isn't a bug — it's the discipline the design process needs.
✓  That friction forces you to be precise. You can't accidentally leave twelve versions
   of a button in a stylesheet.
   [rewrite as two sentences rather than patching with a colon]

✓  Enterprise design has a lot of invisible contribution — work that gets absorbed,
   attributed elsewhere, or shipped without fanfare.
   [earns it — the aside is a clarifying expansion, not a connector]
```

Captions are especially visible. Prefer a colon over an em dash in most cases.

```
❌ *The module redesign process — brand guidelines mapped to CMS block types.*
✓  *The module redesign process: brand guidelines mapped to CMS block types.*
```

---

### 9. Pivot h3 labels

**Pattern:** An h3 that frames a decision as "X, not Y" or "theme-aware, not theme-bolted-on."

**Why it happens:** The pivot format feels punchy for section headers. But it front-loads the verdict before the reader has seen the evidence, and it reads as performed insight.

**Fix:** Name the decision or the principle directly, without the negation.

```
❌ ### Theme-aware, not theme-bolted-on
✓  ### Theming built into the architecture

❌ ### Redesign the modules, not the system
✓  ### Working within the existing structure
```

---

### 10. The employer anchor

**Pattern:** "At Orium, I..." / "In my role as Head of Design..." / "As part of my work at [company]..."

**Why it happens:** AI defaults to establishing credentials. Employer = credential signal.

**Fix:** Name the work, not the role. If the employer is genuinely relevant context, mention it once in passing — never as the subject of the sentence.

```
❌ As Head of Design at Orium, I led the development of Genie...
✓  Genie started as a personal experiment to protect creative focus...
```

---

### 11. Time-bound language

**Pattern:** "For the past year..." / "Recently, I've been..." / "Currently working on..."

**Why it happens:** AI grounds claims in the present to sound active. Present tense for completed work dates immediately — next year it reads as abandoned.

**Fix:** Use past tense for completed work. For ongoing practice, describe the practice rather than its duration.

```
❌ For the past year I've been leading design on Genie...
✓  I led the design of Genie...

❌ I'm currently exploring agentic AI workflows...
✓  I build agentic AI workflows...
```

---

## When the construction earns it

Not all X/Y pivots are wrong. The test: does the reversal add new information, or just restate what was already shown?

```
✓  At the time, it felt destabilizing. In hindsight, it was a gift.
   [earns it — the emotional reversal is the insight, not a restatement of evidence]

✓  The challenge wasn't about working harder. It was about protecting creative focus.
   [earns it — the distinction between effort and focus is the actual point]

❌ This project wasn't a redesign. It was a systems problem.
   [doesn't earn it — the next three paragraphs already explain what kind of problem it was]
```

---

### 12. AI word tells

Four clusters. All signal AI rather than a person writing.

**Filler adverbs** — "moreover," "furthermore," "additionally," "indeed," "certainly," "albeit," "notably."
These perform logical structure instead of having it. If "moreover" is load-bearing, the paragraph isn't structured well enough. Delete the word and fix the paragraph.

**Adjective tells** — "seamless," "robust," "intuitive," "comprehensive," "holistic," "impactful," "innovative," "cutting-edge," "best-in-class."
These name the category of a quality rather than the quality itself. "Seamless integration" means nothing. What was the friction, and how was it removed?

```
❌ A seamless, intuitive experience that empowers users with robust tooling.
✓  A configuration flow where a wrong hardware choice fails the deployment, not the return.
```

**Verb tells** — "delve," "underscore," "leverage" (as a verb), "unpack," "explore" (when used instead of "describe" or "discuss").
AI reaches for a dynamic verb and lands on the same one every time. Use the plain word.

```
❌ Let's delve into the token architecture and unpack the decisions behind it.
✓  The token architecture has seven layers. Here's why.
```

**Stock metaphors** — "north star," "guardrails" (when not literal), "moving the needle," "Swiss Army knife," "at the end of the day."
The test: has every design article published in the last three years used this phrase? Then cut it. If the metaphor is genuinely clarifying, keep it. If it's decorating a sentence that would be clearer without it, cut it.

```
❌ Tokens became the north star for the entire design system.
✓  Tokens were the single source of truth that kept Figma, code, and AI tooling in sync.
```

---

## Voice principles

What good writing looks like on this site, stated positively.

**Lead with the situation, not the claim.** Put the reader in the problem before naming the solution. A reader who understands the constraint will evaluate the decision themselves.

**Specificity is the argument.** "A wrong component choice triggers a failed deployment" is more persuasive than "high-stakes decisions require precision." The concrete detail does the work the abstract claim only promises.

**Trust the arc.** If the story is well-told, the reader draws the conclusion. You don't need to name it.

**Share, don't declare.** Articles and journal entries should read like someone thinking through something they've experienced, not issuing a manifesto. Avoid imperative commands directed at the reader. Use first person. Lead with what happened to you before drawing any conclusion.

```
❌ Build the constraints that let you run. Design tokens as law.
✓  What helped was having constraints in place before I picked up speed.
```

**First person, active, past tense for completed work.** "I built" not "was responsible for building." "I cut" not "decisions were made to reduce." "I led" not "I was leading."

**Employer as context, not identity.** The work defines the person. Mention the employer when it's genuinely relevant (the client, the team size, the constraint) — not to establish credibility.

---

## Case study structure

Case studies follow a fixed h2 order. Sections that don't apply can be omitted; the order should not change.

```
## Key Learning       ← the single transferable insight (optional but preferred)
## Overview           ← the situation, not the solution
## The Constraint     ← what made this hard or specific
## Approach           ← how you worked through it (use h3s — see below)
## Outcome            ← what shipped or changed
## What I Learned     ← honest reflection, not a verdict
```

Role is captured in the metadata table. Do not add a `## My Role` section. If collaborator or team context matters to the story (e.g. three parties with conflicting assumptions), weave it into Overview or The Constraint rather than isolating it as attribution.

### h3s in Approach

Use h3s when the Approach has more than one distinct decision worth explaining. Each h3 should answer *why* that decision was made, not describe *what* was built.

```
❌ ### Token Architecture
   Seven layers, each overriding the one before...

✓  ### Multi-brand from the start
   Multi-brand support almost always arrives late — either as a client request after
   launch or as an architectural call that gets deferred to the dev team...
```

The h3 label should name the decision or the design principle, not the deliverable. A reader who only reads the h3s should understand the thinking, not the output.

Good examples of h3 framing:
- "Multi-brand from the start" (not "Brand Architecture")
- "Theming built into the architecture" (not "Dark Mode Implementation")
- "Base styles for HTML elements" (not "base.css")
- "Accessible by default" (not "Accessibility")

### Writing tone

Case studies are about experience and value, not implementation mechanics. Technical details belong in READMEs and documentation. The case study should answer: what did you learn, what problem were you solving, and why did the decisions you made matter?

Ask yourself for each paragraph: is this explaining *why*, or just describing *what*?

Reference: [doc_67.md](src/assets/content/doc_67.md) (Design Token Starter) is the current best example of this structure.

---

## For card descriptions (work.json / library.json)

Lead with the user or the constraint, not the outcome or an adjective cluster.

```
❌ A comprehensive planning tool designed for enterprise-level strategic planning,
   featuring intuitive dashboards and real-time analytics for data-driven decision making.

✓  A strategic planning tool for a Fortune 100 company — making complex organizational
   data across business units, budgets, and initiatives navigable without flattening it.
```

The description should put the reader in the problem, not pitch the solution.

---

## Content file locations

- Articles: `src/assets/content/doc_*.md`
- Work cards: `src/assets/data/work.json` → `description` field
- Library entries: `src/assets/data/library.json` → `description` field
- New docs use the next available `doc_N.md` number and must be registered in `library.json` with `docId`, `slug`, and `contentFile`
