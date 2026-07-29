# Content Publication & Positioning Plan

> **Status: WORK IN PROGRESS.** Planning doc — not site content, not rendered. Lives in the repo; if the repo is public, this file is visible in source.

Companion to `career-and-monetization-notes.md`. Turns the "build portable, on-thesis external presence" recommendation into a concrete submission list, plus the site ethos audit and LinkedIn alignment.

The governing principle for external presence (from the byline analysis): **independent venues > employer-owned** (for portability), **speaking > writing** (for authority), **on-thesis > toys** (for positioning). Prioritize the resilient identity — *AI-native design engineer / design systems / AX* — over generic product design.

---

## Part 1 — Publication audit (which pieces to submit, where, how ready)

Editorial quality is a 1–5 call: 5 = publication-ready feature with a real argument; 3 = solid but thin or niche; below 3 = repurpose, don't pitch.

### Tier 1 — submit now (highest value)

**1. Token Pipeline for a Multi-Brand HMI Platform** (`doc_61`) — **Quality 4.5**
- Core: a token system is only real if it's *enforced* everywhere drift happens — Figma, code, and AI tooling. Architecture + Design Guard + custom ESLint rule + `.cursorrules` + one-command dev loop.
- Bucket: design-systems/tokens + AI. Evergreen. Employer-light (NDA client, but the *system* is fully described and stands alone).
- Why it's the top pick: the most concrete proof of the exact scarce combo (design systems + code + AI enforcement). Code-shaped, specific, on-thesis.
- **Submit to: Smashing Magazine** (design-systems deep-dives are their core). Technical-angle alt: CSS-Tricks.
- **Also pitch as a talk: Clarity** (the design systems conference) and **Into Design Systems**. This is a strong conference talk, not just an article.
- Readiness: ready.

**2. When UX Becomes AX** (`doc_62`) — **Quality 4**
- Core: designing for agentic systems is still design — boundaries, guardrails, human oversight — and the skills transfer. Practitioner account of an agentic-design workshop (agent cards, swimlanes, an "Align" phase).
- Bucket: AI/agentic-design. Timely. Has real workshop artifacts (good for a visual publication). Some employer framing ("a studio I defined and ran") but stands alone as method.
- Why: the best authority piece in the new niche, and it ties directly to the MACH talk network.
- **Submit to: Smashing Magazine** (method + artifacts) or **UX Collective** (reach). Feeds the MACH Alliance audience.
- Readiness: light edit (trim the employer-specific phrasing).

**3. Taste is Triage** (`doc_77`) — **Quality 5**
- Core: when making is nearly free, value moves from making to judgment — taste is the discipline of deciding where to spend attention you can't spend everywhere.
- Bucket: AI/craft. The flagship essay — original voice, memorable through-line ("a cow can like something"), Karpathy + Chanel. Principle-level, so it survives the trend. Employer-light.
- **Submit to: A List Apart** (durable craft/practice essays — prestige) with **UX Collective** as the reliable high-reach fallback.
- **Also: this is the talk.** Pitch "Taste is Triage" as the MACH / conference session — it's the manifesto.
- Readiness: ready.

### Tier 2 — submit after Tier 1

**4. The Ramstack** (`doc_58`) — **Quality 4**
- Core: a future-proof practice is about principles, not tools — interoperability, open formats, the design system as source of truth. Deliberately timeless; employer-agnostic; on-ethos.
- **Submit to: A List Apart** (exactly their register) or Smashing. Older (2022) but evergreen by design.
- Readiness: ready (light refresh).

**5. The /design Agent** (`doc_64`) — **Quality 4** (case study)
- Core: an isolated, AI-driven Storybook that turns handoff from an interpreted document into a merged diff.
- Design-engineering proof. Some Orium framing.
- **Submit to: Smashing** or **CSS-Tricks**. Also talk material.
- Readiness: light edit.

### Tier 3 — repurpose, don't pitch as features

- **The Guardrail Problem** (`doc_74`) — Quality 3.5 but ~250 words. Strong thesis, too thin for a feature. → **LinkedIn post / dev.to**, or expand and merge into the token-pipeline piece.
- **Building Genie Changed Me** (`doc_66`) — personal transformation narrative. Orium-entangled. → **UX Collective / LinkedIn / podcast**, not a technical prestige pub.
- **The Designer in the Age of AI** (`doc_51`) — ~100 words, aphoristic, overlaps Taste is Triage. → **LinkedIn post**.
- QA/process cluster (`doc_44`, `doc_45`, `doc_49`, `doc_52`) — solid, older, generic process; low positioning value. → cross-post to dev.to for SEO if at all; not a priority.

### Cross-posting caveat
These are already published on the site. Most prestige venues (A List Apart, Smashing) want original or properly canonicalized pieces. Pitch as "originally on my site, happy to set a canonical link or adapt," or write an adapted version. Check each venue's republish policy before submitting.

### Suggested sequence
1. Pitch **Token Pipeline → Smashing** and submit **Taste is Triage → A List Apart** (parallel; different desks).
2. Submit a Clarity / Into Design Systems talk proposal (Token Pipeline) and shape the MACH talk from Taste is Triage.
3. Follow with **When UX Becomes AX** and **The Ramstack**.
4. Post the Tier-3 shorts to LinkedIn on a cadence to keep the flywheel warm.

---

## Part 2 — Site audit against the ethos (record vs hire)

Ethos (CLAUDE.md + `doc_70`): *a record, not a portfolio; employer-agnostic; time-agnostic; specific for a stranger in five years; what persists.*

**Verdict:** the architecture is right and mostly faithful. Public nav is record-first (Home → Library → Resume → Storybook → About); `/hire` is correctly unlisted — a curated satellite that reuses record content. The risks are tonal drift and a few contradictions, not structure.

**Faithful:** record-first IA; the writing library as spine; self-built/public source; record-shaped case studies; the K&G card reframe (user/constraint lead, employer anchor dropped).

**Drift to hold the line on:**
1. **The Studio page is the biggest ethos violation** — a literal sales page (pricing, engagement models) inside a "not a portfolio" record. Currently unrouted. Decide: move the business off-site, or rebuild it as a record-shaped case study of building an AI delivery system.
2. **Employer entanglement is heavier than "employer-agnostic" allows** — CV/About lean on Orium/Genie; case studies framed as Orium deliverables; **every testimonial is an Orium colleague.** Move the testimonial carousel to `/hire` only (social proof belongs where you sell yourself), and lead more work with the problem and thinking than the employer.
3. **Hire copy is time-bound** — the `/hire` "AI made execution cheap" hero is good *hire* copy but must never migrate to the record homepage hero (keep that plain and durable).
4. **Not a violation:** dated AI essays are fine — the ethos explicitly forgives aging ("reflects where I was, which is the point"). Just write the principle under the trend, not the trend.

**Operating rule:** `/hire` and the Studio-as-business absorb 100% of the sales/positioning energy. The record stays clean. The record is what earns the hire page; if the record becomes a pitch, both lose.

**Actions:**
- [ ] Move testimonials off record surfaces → `/hire` only.
- [ ] Resolve the Studio page (off-site, or convert to case study).
- [ ] Keep the record homepage hero plain; never port hire framing inward.

---

## Part 3 — LinkedIn alignment (summary)

LinkedIn is a hire surface (like `/hire`), so positioning framing is appropriate — but stay honest, and build authority **without broadcasting "I'm leaving"** (protects the leverage-in-place play; use recruiter-only "Open to Work," never the public banner).

- **Headline:** lead with the searchable resilient role, not a company title — e.g. `Design Engineer · Design Systems & Tokens · Agentic AI / AX · React, Vue, production front-end`. Orium stays in the company field.
- **About:** hook first line with the concrete combo + keywords (LinkedIn truncates after ~2 lines); drop the `{{yearsExperience}}` template var; "At Orium I built" → "I built"; end with a CTA surfacing the MACH talk + CSS-Tricks byline (feeds the writing/speaking flywheel).
- **Experience:** lead each bullet with the systems/code/AI contribution, quantified; cut filler adjectives ("scalable" → a real result); use the ~60% friction-reduction number where it fits.
- **Featured:** pin independent + on-thesis first — CSS-Tricks byline, MACH talk, "Taste is Triage," Genie case study.
- **Skills:** reorder to Design Systems · Design Tokens · Design Engineering · Agentic AI / AX · Front-End (React/Vue/TS) · Storybook · Accessibility.
- **Creator mode on;** topics `#designsystems #designengineering #agenticai`.
- **Honesty guards:** no inflation; employer as context not identity; no competing-studio line in the headline while at Orium.

*(Full line-by-line LinkedIn edit doc delivered separately; paste real profile text to convert the CV-proxy edits into true line-for-line.)*

---

*(End of plan — WIP.)*
