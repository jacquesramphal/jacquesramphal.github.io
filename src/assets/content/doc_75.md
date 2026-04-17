# Future Positioning: Design in an Automated World

*Private planning document — April 17, 2026*

---

## The question

Claude Design launched today. People are calling it a Figma killer. The conversation about designers automating themselves out of a job is back, louder. This is a snapshot of where I stand, what's real, and what's worth building.

---

## Honest assessment of current positioning

The site and the work read as **future-proof employee, not future-proof independent.** The differentiation is real — 13 years at the design/engineering boundary, production code skills most designers don't have, Genie built before most design leaders knew what an agent was, AX framing that's ahead of the field. But none of that generates income independent of employment. No product. No IP I own. No leverage that doesn't depend on someone hiring me.

Genie is owned by Orium. Every case study is client work. The tools (Design Guard, Smart Quotes Fixer) signal craft but not leverage. The /design Agent is the most forward-looking thing on the site and it's listed as In Progress.

That's the gap.

---

## What AI design automation actually replaces

- Visual decision-making
- Component generation from prompts
- UI iteration
- Design system scaffolding from brand guidelines
- The mechanical production layer

**What it doesn't replace:**

- Deciding what to build and why
- Knowing when AI output is wrong and steering it
- Designing the rules the AI follows (token architecture, guardrails, agent behavior definitions)
- Getting AI output to actually ship in a real production codebase
- Organizational trust — someone still needs to be accountable

The skills in the second list are already how I work. The problem is they're presented as a resume, not a product.

---

## What's worth building — ranked by seriousness

### 1. A deployable design agent, sold as a consulting engagement

The /design Agent exists internally. The model:

- Fixed fee to build a custom agentic design layer for a product team: their token system, their Storybook, their handoff workflow
- Monthly retainer to maintain and extend it
- Not selling hours — deploying a system and staying on as operator

Defensible because: requires taste + judgment to configure, deep org context to be useful, and I'm one of a small number of people who can bridge design systems and AI integration. Claude Design doesn't replace this — it's a tool that sits inside what I'd build.

**Realistic pricing:** $15–30k to build, $2–4k/month to operate. Three clients = meaningful independent income.

### 2. The /design Command Suite as a licenseable product

If the isolated Storybook + AI handoff workflow is actually working, that's the kernel of a real open-core product. Not a SaaS (too large a build to start). A licenseable tool or a paid setup/configuration service on top of an open repo.

The value isn't the AI layer. It's the opinionated workflow — how prompts are structured, how agent behavior connects to the token architecture, what guardrails are built in. That's a decade of judgment encoded. Generic AI tools can't replicate it.

### 3. A paid cohort on designing agentic systems

The "When UX Becomes AX" article, the Genie case study, and the agent card framework are all already written. Nobody else is teaching AX design with real implementation experience behind it.

**Format:** 4–6 weeks, $500–800/seat, 20 people = $10–16k per run. Requires marketing energy but the content exists.

### 4. Design system auditing as a productized service

Design Guard + token expertise + knowing what a broken system looks like = an AI-assisted design system health check. Fixed price ($5–8k), clear deliverable (structured audit with prioritized issues and token architecture recommendation). The AI accelerates it; judgment makes it valuable.

---

## What not to build

- A generic AI design tool. Competing on features with well-funded products.
- A newsletter without a clear monetization path.
- More hobbyist CLI tools — they signal craft, not leverage.
- Anything that requires winning on distribution.

---

## Deployment models

Three ways the agent can be deployed. They're different products with different buyers and different margins.

### Model 1: Configured tool embedded in a team's workflow

Agent sits inside their existing stack — Figma plugin, Slack command, or GitHub Action. Validates output against their token system and Storybook. Produces structured handoff specs. One-time build engagement, monthly retainer to maintain.

Buyer: Head of Design or VP Engineering. This is the entry-point engagement.

### Model 2: Fractional operator across multiple clients

The agent runs. I monitor it, handle escalations, tune prompts, make judgment calls it can't resolve. Billing for availability and expertise, not hours. Three clients at $2–3k/month = $6–9k/month for roughly 10 hours of active work. The leverage is real: the agent executes, I provide the oversight layer.

This is the most scalable version of the business. Not selling design work — selling a running system with a human judgment layer on top.

### Model 3: Agent for businesses with no designer (skip for now)

Different ICP — smaller budget, simpler stack, more hand-holding. Competing with cheap freelancers and no-code tools. The margin is thin and the problems are different. Worth revisiting once the first two models have proof.

---

## Augment vs. replace: the honest answer

**Augmenting an existing team** is the ethical comfortable answer. It's also the lower-value market. Selling "your designers will be faster" is a tooling pitch — soft ROI, lower willingness to pay, design leader as the buyer.

**Replacing a team** is the uncomfortable answer and the higher-value market. A company paying $90k/year for a designer will pay $3–5k/month for a system with equivalent output. That's $36–60k/year vs. $90k — easy sell to a CFO. Different buyer: CEO or VP Engineering, not the design lead.

**But the highest-value position is neither.** It's the skeleton crew model.

### The skeleton crew

A company has one designer doing the work of three, or one designer when they need two. The agent doesn't replace that designer — it multiplies them. One designer + the agent = output that used to require three people. The designer champions it because it protects their position. The CFO champions it because the math is obvious.

Why this is the best entry point for first clients:
- The existing designer is an internal advocate, not an opponent
- The ROI story is concrete and easy to tell
- Someone still needs to oversee the agent, which keeps me on retainer
- No one has to be fired for the engagement to succeed

### On the ethics

The technology is neutral. The business model and marketing determine who benefits. Building infrastructure that lets one skilled designer cover more ground is what every tool shift in design history has done — Figma over Sketch, components over one-offs, tokens over hardcoded values. Each one made individual designers more productive and reduced headcount needed for the same output.

The question isn't whether this happens. It's whether the person building the infrastructure has design judgment and cares about quality — or doesn't.

**First clients:** target companies with an existing design function that is understaffed. The problem is acute, the budget is real, and I'm walking in to help — not to displace. Once the model is proven, decide whether to go upstream toward the replacement market with clear eyes.

---

## Content gaps to close now

**The /design Agent as a complete case study.** Most original, most forward-looking work on the site, and it's incomplete. What does it actually do? How does it change the workflow? Where does AI judgment break down?

**A piece on designing the rules the AI follows.** Not "how to use Figma AI." What a design agent needs to know to do good work: the guardrails, the token contract, the agent behavior definition, where human judgment is non-negotiable. This is the gap in current design writing and the place I have something specific to say.

---

## The framing that survives automation

Tools automate execution. They don't automate:

- The decision about what system to build
- The judgment about when the output is wrong
- The organizational work of getting it trusted and adopted

**Position:** the person who designs the rules the AI follows. Not executing within those rules — defining them.

That's the shift the site needs to make visible. Not just as writing, but as a product.

---

*Next: share the /design Agent repo. Scaffold the ProductPage around the skeleton crew model.*
