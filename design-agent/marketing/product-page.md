# Product Page Draft

*Working title: Seam. Content for ProductPage.vue at /product.*
*Placeholders marked [LIKE THIS]. Design agent repo context will fill in specifics.*

---

## HERO

**Headline:**
Your design system has guardrails. Your AI tools ignore them.

**Subhead:**
I build the layer that catches what Figma AI, Claude Design, and v0 produce before it reaches your codebase. Token contracts enforced. Storybook validated. Handoff specs your developers can act on.

**CTA:** Start with an audit →

---

## PROBLEM

Three things happening to every design team right now.

**AI tools are generating faster than teams can evaluate.**
Figma AI proposes a component in 30 seconds. Reviewing whether it respects your token system, matches an existing Storybook story, and meets your accessibility baseline takes 20 minutes — if anyone does it at all.

**The output looks right but breaks the contract.**
A button with the wrong border radius. A color that's close to your primary but isn't a token. A spacing value that's 18px instead of 16px. None of these fail a visual review. All of them accumulate into a design system that's slowly becoming fiction.

**One designer is covering ground that used to take three.**
Not because they're working harder. Because AI tools are moving fast and the team didn't grow to match. The backlog isn't the problem. The missing enforcement layer is.

---

## WHAT IT IS

I design and deploy agentic design layers for product teams.

An agent that sits between your AI tools and your codebase. It reads your token system and encodes it as rules. It connects to your Storybook and knows what components exist. It evaluates every piece of AI-generated output against both — and flags what fails before a developer touches it.

The output is a structured handoff spec: component name, token annotations, Storybook story reference, accessibility notes, and a clear list of what required human review. A developer can implement from it without a meeting.

I build it for your stack. I deploy it into your workflow. I stay on as the operator — monitoring usage, tuning the rules as your design system evolves, and handling the edge cases the agent can't resolve on its own.

**[SCREENSHOT OR DEMO PLACEHOLDER — agent output example: a flagged violation + a passing component spec]**

---

## HOW IT WORKS

### Step 1: Audit — 1–2 weeks

Before anything is built, I review your current setup: token implementation, Figma structure, Storybook coverage, and handoff workflow. I map where AI output is entering your pipeline and where it's creating drift.

You get a written report: what's breaking, what the agent architecture looks like for your specific stack, and a prioritized list of what to address first. You own that report regardless of what you do next.

*Audit fee credited toward the build engagement if you proceed.*

### Step 2: Build + Deploy — 6–8 weeks

Design and implementation of the agentic layer:

- **Token contract** — your token system encoded as agent rules. Every generated component is evaluated against it.
- **Storybook connection** — agent checks output against your live component library. If a component doesn't exist, it says so.
- **Guardrail definitions** — explicit list of what the agent flags for human review before proceeding. You decide where human judgment is required.
- **Handoff workflow** — structured output format your developers can act on directly.
- **Team walkthrough** — 2-hour session with your design lead and a front-end engineer. Everyone knows how it works and how to extend it.

Delivered as a running system with documentation.

### Step 3: Fractional operator — ongoing

The system runs. I monitor it.

Monthly check-ins, prompt tuning as your design system grows, new guardrails when you add components, and escalation handling for anything the agent can't resolve. You get a senior design engineer on call without the headcount cost.

*Minimum three-month term. Month-to-month after that.*

---

## PRICING

All engagements are fixed-price. Not hourly.

| Engagement | Price | Duration |
|---|---|---|
| Audit + Architecture | $5,000 | 1–2 weeks |
| Build + Deploy | $15,000–$30,000 | 6–8 weeks |
| Fractional Operator | $2,000–$4,000 / month | 3-month minimum |

**Audit pricing scales with system complexity:**
- $3,000: Small team, early design system
- $5,000: Mid-size team, established tokens and Storybook
- $8,000: Multi-brand or complex system with existing automation

**Build pricing scales with scope:**
- $15,000: One workflow (component spec → Storybook story), clean token system
- $20,000–$25,000: Full handoff workflow, token enforcement, Storybook connection, guardrail definitions
- $30,000: Multi-brand system, multiple workflow paths, extended team training

**The audit fee is credited toward the build.** You're not paying to be sold something. You're paying for a deliverable you own.

---

## WHO THIS IS FOR

Product teams with:

- A Figma file, a token system, and a Storybook instance (or equivalent component library)
- A designer or small design team stretched across more work than they can review carefully
- AI tools already in use — and a growing sense that the output quality isn't where it needs to be

The conversation that usually precedes an inquiry:
*"We shipped something last sprint that wasn't in the design."*
*"Figma AI keeps suggesting components that don't exist in our library."*
*"Our design system is always out of date and I don't know why."*

**Not the right fit:**
Teams with no component library, companies pre-product-market-fit, or teams that already have a full design engineering function. The audit will tell us if there's a fit — that's what it's for.

---

## WHY THERE'S NO TOOL FOR THIS

Every AI design tool on the market either generates output or manages design system data. Figma AI generates components. Storybook MCP tells agents what components exist. Knapsack manages the token pipeline.

None of them sit downstream — taking what AI generated and validating it against what you actually have, with a human reviewing what fails, before any of it reaches a developer.

That's the gap. This service occupies it.

**[DIAGRAM PLACEHOLDER — three-column: AI tools → Seam (validation layer + human review) → codebase]**

---

## PROOF

**[DESIGN AGENT DEMO PLACEHOLDER — repo context needed]**
[Short description of what the demo shows: a real component going through the validation workflow, a violation getting flagged, the structured handoff spec that comes out the other side]

**Built Genie before most design leaders knew what an agent was.**
Genie is an agentic AI platform built for a design team — an orchestration layer that automated routine design work and reclaimed time for novel problems. [Read the case study →](/doc/building-genie-changed-me)

**Wrote the framework before building the product.**
The agent card format, the AX design methodology, and the workflow mapping approach used in this service are documented publicly. [When UX Becomes AX →](/doc/when-ux-becomes-ax)

**Open-source design system tooling.**
Design Guard (npm) scans for hardcoded values and token violations. Design Token Starter is a multi-brand, theme-aware token architecture. Both are in production use. [View on GitHub →]

**13 years at the boundary between design and production engineering.**
Writes production front-end code. Runs design QA at the source. Has paired with engineers, coached designers, and owned the gap between intent and what ships for over a decade.

---

## TESTIMONIALS

**[PLACEHOLDER — 2–3 testimonials from quotes.json or new client feedback]**

*"Jacques has a rare ability to work from the future backward."*
— Nik Shenoy, VP Software Development

---

## FAQ

**What if we don't have Storybook yet?**
The audit will tell us. If you don't have Storybook, the build engagement includes a path to get there — or we scope around what you do have. The token contract enforcement doesn't require Storybook specifically, just a source of truth for your components.

**What AI tools does this work with?**
Any AI design tool that produces output your team evaluates: Figma AI, Claude Design, v0, Bolt, Builder.io, or any combination. The agent sits after generation, not inside a specific tool.

**What if our design system is a mess?**
The audit is specifically for this. If the system is too fragmented to enforce, that's what the report will say — along with what it would take to get it to a state where the agent is useful. That's worth knowing.

**Do I need a developer to set this up?**
You need a front-end engineer available for the kickoff and the team walkthrough (roughly 3 hours of their time). I handle the build. The system runs without ongoing engineering support.

**What happens if we outgrow the system?**
The rules files are plain markdown in a git repo. The agent architecture is documented. If you eventually hire a design engineer who wants to take it over, the handoff is clean. You own everything built.

---

## CTA

**Engagements start with an audit.**

A 1–2 week review of your design system, AI tooling, and handoff workflow. Written report delivered. You own it regardless of next steps.

[Request an audit →]  ← links to contact / intake form

*or send an email: [EMAIL PLACEHOLDER]*

---

## FOOTER NOTES FOR DESIGN

- The diagram (AI tools → validation layer → codebase) is the most important visual on the page. It needs to be designed, not a stock icon set.
- The demo/proof section needs the repo context to write specifically. Leave as a visual placeholder until the repo is shared.
- Testimonials: pull 2 from quotes.json that are most relevant (Nik Shenoy's is the best fit), and the third should be a future client quote.
- The FAQ section can be collapsed/expandable in the actual component.
- Price table: consider whether to show on the public page or gate behind "request audit." Showing prices is better for self-qualification (filters out wrong-fit inquiries) but might anchor low. Recommendation: show the ranges, not the specific figures.
