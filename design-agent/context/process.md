# Design Process: Lifecycle and Tiers

The full design lifecycle encoded as an agent workflow. Each phase has: what goes in, what the agent does, where the human is required, and what comes out. The human is not in every step — only where decisions are consequential.

---

## The three tiers

Don't try to sell the full lifecycle first. The three tiers are separate products with separate buyers and separate entry points.

---

### Tier A: Validation layer (start here)

**What it is:** Agent sits between AI design tools and the codebase. Validates generated output against the token contract and Storybook. Produces structured handoff specs. Human reviews flagged violations before anything ships.

**Who buys it:** Head of Design or VP Engineering at a team that already has a design system and is now using AI tools that bypass it.

**Why start here:** Fastest to build, most concrete ROI story, clearest buyer. This is the entry point that proves the model. Every other tier builds on top of it.

**Phases:** Component input → token validation → Storybook check → structured spec output → human review gate → handoff

---

### Tier B: Discovery + definition (add second)

**What it is:** Intake questionnaire, site/product component audit, IA, user stories, flows, requirements definition, backlog creation. The agent synthesizes inputs into structured artifacts a team can act on.

**Who buys it:** Same buyer, or CEO/Head of Product at a company starting a new product or significant redesign. Also the entry point for the skeleton crew model — one designer using this to cover the work of three.

**Why add second:** The audit flow is already built. It's the fastest path to a Tier B deliverable. The rest is structured prompts + templates that already exist.

**Phases:** Intake → audit → stakeholder alignment → IA + user stories → requirements + backlog → plan for review

---

### Tier C: Full lifecycle (build toward, not first)

**What it is:** Tier A + Tier B + wireframe generation + hi-fi token artboards + approval tracking + prototype + UAT + analytics integration. Design-to-handoff as a complete, supervised workflow. Optional build output.

**Who buys it:** CEO, Head of Product, or design-forward company that wants to run a design process without a full in-house design team. Higher ticket. Longer engagement. Different sales cycle.

**Why not first:** Requires proof of Tiers A and B. Longer build time. Harder to define scope. The analytics integration alone is a significant scoping conversation. Build the simpler things first, price them correctly, then use the proof to sell Tier C.

---

## Full lifecycle phases

For reference when scoping Tier C engagements. Each phase is a structured agent step with defined inputs, agent tasks, human checkpoints, and outputs.

---

### Phase 1: Intake

**Input:** Client fills a structured questionnaire (goals, constraints, existing stack, analytics access, stakeholder map)

**Agent tasks:**
- Synthesize questionnaire into a structured project brief
- Flag gaps and ambiguities for human review
- Generate a list of discovery questions for the kickoff call

**Human checkpoint:** Review synthesized brief before proceeding. Approve or correct the project framing.

**Output:** Project brief (structured markdown), discovery question list

---

### Phase 2: Audit

**Input:** Project brief, access to existing product (URL, Figma file, or repo), analytics data if available

**Agent tasks:**
- Run the component audit against the existing product
- Identify design system gaps, token violations, accessibility issues, navigation problems
- Cross-reference with analytics data (if provided) to prioritize by actual usage

**Human checkpoint:** Review audit findings. Decide which findings are in scope for this engagement.

**Output:** Audit report (structured markdown), prioritized issue list, analytics-informed severity ratings

---

### Phase 3: Stakeholder alignment

**Input:** Audit report, project brief, stakeholder map from intake

**Agent tasks:**
- Generate stakeholder-specific summaries of audit findings (executive version, design version, engineering version)
- Draft alignment questions for each stakeholder group
- Produce a risks and assumptions document

**Human checkpoint:** Review stakeholder materials before any client-facing delivery. Approval required before sending.

**Output:** Stakeholder decks/summaries, risks and assumptions doc, alignment meeting agenda

---

### Phase 4: Definition

**Input:** Approved audit findings, stakeholder alignment notes, project brief

**Agent tasks:**
- Generate information architecture from audit findings and business goals
- Draft user stories in standard format (As a [user], I want [action], so that [outcome])
- Produce user flows for core journeys
- Map analytics events to user story acceptance criteria (if analytics data is available)

**Human checkpoint:** IA and user stories review. This is a consequential decision point — approve before moving to design.

**Output:** IA document, user story backlog (structured markdown), user flow diagrams, acceptance criteria

---

### Phase 5: Backlog and planning

**Input:** Approved user stories and IA, project constraints from intake

**Agent tasks:**
- Organize user stories into sprints based on priority and dependency order
- Estimate relative complexity (T-shirt sizing or story points) using heuristics
- Generate a project plan with milestones and review gates
- Flag dependencies and risks

**Human checkpoint:** Plan review. Approve timeline and sprint structure before design begins.

**Output:** Prioritized backlog, sprint plan, project timeline, dependency map

---

### Phase 6: Wireframes

**Input:** Approved user stories, IA, user flows

**Agent tasks:**
- Generate low-fidelity wireframe descriptions (structured prompts for Figma AI, Claude Design, or v0)
- Map wireframe components to existing component library entries
- Flag any required new components not in the existing library

**Human checkpoint:** Wireframe review and approval. Client sign-off required before hi-fi.

**Output:** Wireframe specs (structured prompts + layout descriptions), component gap list, client-facing wireframe deck

---

### Phase 7: Hi-fi design with token enforcement

**Input:** Approved wireframes, token contract (client's token system), component library

**Agent tasks:**
- Generate hi-fi design prompts using client's tokens and component library
- Run Tier A validation on all AI-generated output (token contract check, Storybook validation)
- Flag violations and produce structured handoff specs for approved components

**Human checkpoint:** Every flagged violation requires approval. Final design review before prototype.

**Output:** Validated hi-fi specs, Storybook story stubs, structured handoff docs, violation log

---

### Phase 8: Prototype and feedback

**Input:** Approved hi-fi specs, existing codebase or Storybook

**Agent tasks:**
- Generate prototype from approved specs (Framer, Storybook, or coded prototype depending on stack)
- Produce feedback collection script (structured questions by user type)
- Compile feedback into structured format for analysis

**Human checkpoint:** Prototype review before sending to stakeholders. Feedback synthesis review before acting on changes.

**Output:** Prototype, feedback collection script, feedback synthesis report

---

### Phase 9: Refinement and UAT

**Input:** Feedback synthesis, original acceptance criteria from Phase 4

**Agent tasks:**
- Cross-reference feedback against acceptance criteria — flag anything that conflicts
- Prioritize refinements by frequency and severity
- Generate refined specs for approved changes
- Run Tier A validation on all refinements

**Human checkpoint:** Approve refinement scope before re-entering design cycle. UAT sign-off required.

**Output:** Refined validated specs, UAT checklist, regression test list

---

### Phase 10: Handoff

**Input:** All approved, validated specs and Storybook stories from Phases 7–9

**Agent tasks:**
- Produce final handoff package: component specs, token annotations, accessibility notes, Storybook story stubs, acceptance criteria
- Generate implementation notes for each component (known edge cases, token overrides, responsive behavior)
- Produce QA checklist for engineering review

**Human checkpoint:** Final handoff review. Nothing ships without this approval.

**Output:** Handoff package (structured markdown + JSON), Storybook stories, QA checklist, implementation notes

---

### Phase 11 (optional): Build

**Input:** Approved handoff package

**Decision point:** Is build in scope? If yes, who owns it?
- Option A: Engineering team implements, agent validates PRs against specs (Tier A running in CI)
- Option B: AI code generation (v0, Bolt, Cursor) with agent validation at each step
- Option C: Out of scope — handoff is the deliverable, implementation is the client's

**Recommendation for first engagements:** Option C or Option A. Don't own the build until the validation model is proven. The liability story is cleaner.

---

## What to focus on first

Build Phase 7 (hi-fi with token enforcement) and Phase 10 (handoff) first. That's the Tier A validation layer in production. Phases 1–5 are structured prompts and templates — they can run with minimal code. Phases 6, 8, and 9 are iterative wrappers around the validated output Tier A already produces.

The full lifecycle is a selling story before it's a technical requirement. You can describe Phases 1–10 to a client and deliver Phases 1–5 with prompts + templates, Phases 6–10 with the Tier A engine underneath. The client experiences the full lifecycle; you've built the hard part and scaffolded the rest.
