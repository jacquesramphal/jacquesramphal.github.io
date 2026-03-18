# Portfolio Writing Rules

These rules apply when writing or editing any article, case study, or card description in this portfolio. They exist because AI-assisted writing produces consistent patterns that flatten the voice. This is a record of what to avoid and why.

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

## Case study structure

Case studies follow a fixed h2 order. Sections that don't apply can be omitted; the order should not change.

```
## Key Learning       ← the single transferable insight (optional but preferred)
## Overview           ← the situation, not the solution
## My Role            ← what you owned, who you worked with
## The Constraint     ← what made this hard or specific
## Approach           ← how you worked through it (use h3s — see below)
## Outcome            ← what shipped or changed
## What I Learned     ← honest reflection, not a verdict
```

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
- "Theme-aware, not theme-bolted-on" (not "Dark Mode Implementation")
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

### 8. The em-dash crutch

**Pattern:** Overusing `—` as a general-purpose connector, especially in pairs: "The thing — specifically this — is why it works."

**Why it happens:** Em dashes can substitute for commas, colons, or parentheses, so they become a default connector. They are visible and distinctive enough that readers notice the pattern quickly. Frequent use signals the writing wasn't restructured.

**Fix:** Replace almost all of them. Use a colon for elaboration, a comma for continuation, a period for a full stop. Keep an em dash only when the interruption itself is the point and nothing else conveys it.

```
❌ Base styles cover the elements — headings, body, buttons — all through tokens.
✓  Base styles cover headings, body, and buttons, all through tokens.

❌ This started as a reusable foundation — a layer I kept rebuilding.
✓  This started as a reusable foundation, a layer I kept rebuilding.

❌ A wrong component choice doesn't trigger a return — it triggers a failed deployment.
✓  A wrong component choice doesn't trigger a return; it triggers a failed deployment.
```

**This applies everywhere:** body text, subtitles, captions, h3 labels, Key Learning sections. Captions are especially visible — use a colon instead of an em dash in almost every case.

```
❌ *The module redesign process — brand guidelines mapped to CMS block types.*
✓  *The module redesign process: brand guidelines mapped to CMS block types.*
```

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

## Content file locations

- Articles: `src/assets/content/doc_*.md`
- Work cards: `src/assets/data/work.json` → `description` field
- Library entries: `src/assets/data/library.json` → `description` field
- New docs use the next available `doc_N.md` number and must be registered in `library.json` with `docId`, `slug`, and `contentFile`
