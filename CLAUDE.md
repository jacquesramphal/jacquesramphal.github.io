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
