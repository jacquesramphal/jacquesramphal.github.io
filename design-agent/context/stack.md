# Stack Philosophy and Architecture

The most important technical decision: the agent's knowledge layer should be plain text, not a proprietary system. Everything else follows from that.

---

## Core principle: durable over clever

The tools will change. Claude, GPT-4, whatever ships in 18 months — they're all just models that accept text and return text. The value is not in wrapping a specific model. It's in the rules, the schemas, and the judgment encoded in the prompts. Those live in markdown files. Any model can read them.

---

## Minimal stack

```
design-agent/
  rules/          ← plain markdown: token contracts, component guardrails, handoff specs
  prompts/        ← system prompts that load the rules and define output format
  schemas/        ← JSON schemas for structured output (component spec, handoff doc)
  scripts/        ← thin glue code: reads rules, calls the model, writes output
```

No framework required at the core. The scripts are Node or Python: read a folder of markdown, construct a prompt, call the API, parse and validate the response, write the output. That's the whole thing. Any model, any future model.

---

## The layers

### Layer 1: Rules (markdown)

The token contract. The component guardrails. The handoff output format. The list of what requires human review before proceeding.

These are just structured facts about how a specific team's design system works. They can be version-controlled, reviewed, updated, and audited independently of any tooling. They're readable by a designer who doesn't know how to code.

Example:
```
# Token Contract — [Client]

## Color
- Never use hex values directly. All colors must reference a token from /tokens/color.json.
- Semantic tokens (--color-primary, --color-surface) take precedence over base tokens.
- If a requested color has no token equivalent, FLAG FOR HUMAN REVIEW.

## Spacing
- All spacing values must be multiples of 4px.
- Use spacing tokens (--space-1 through --space-12) exclusively.
- Exception: border-radius values may use 2px for inputs.
```

### Layer 2: Prompts (markdown + template)

System prompts that load the relevant rules and define what the model should produce. One prompt per workflow (component spec, handoff doc, QA review, token audit).

The prompt is the interface between the rules and the model. It's also where the "what requires human review" logic lives — the model is explicitly told what it cannot decide on its own.

### Layer 3: Schemas (JSON Schema)

Structured output definitions. What a component spec looks like. What a handoff doc looks like. What a QA report looks like.

Structured output means the output is parseable and can flow into downstream tools (Storybook story stub generator, Jira ticket, Slack message) without manual reformatting.

### Layer 4: Scripts (thin glue)

Reads rules → constructs prompt → calls model API → validates response against schema → writes output to file or sends to integration.

This layer is the only thing that touches a specific model's API. It's the thinnest possible dependency. If you switch from Claude to another model, you change one function call.

---

## Integration shells (tool-specific, kept thin)

The integration layer connects the core to the tools the team actually uses. These are intentionally thin — they're just pipes in and out of the core.

- **Figma plugin:** sends selected component + design intent to the agent, displays structured output in Figma
- **Storybook CLI hook:** runs the agent against a new story before it's committed, flags guardrail violations
- **GitHub Action:** runs the agent on component PRs, posts structured output as a PR comment
- **Slack command:** `/design [brief]` triggers the agent from Slack, returns a formatted spec

If Figma's plugin API changes, you update the Figma shell. The rules don't change.

---

## Model dependency: the honest position

Today, Claude is the best choice — best instruction-following, best structured output, good context window for loading rules. But the system should not depend on Claude specifically.

The model-agnostic approach:
- Rules and prompts are plain text — any model reads them
- API calls are isolated to a single adapter function — swap the model by changing one file
- Structured output is validated against JSON schema — not against model-specific formatting quirks

The one exception worth considering: if Claude's API adds persistent system context or if CLAUDE.md in a repo becomes a first-class API feature, that's worth using. It reduces token cost per call significantly. But the core should still work without it.

---

## What not to build

- A wrapper around a single model that breaks when that model changes
- A proprietary rule format that only the tool can read
- A UI for editing rules (the rules are markdown — any text editor works)
- An n8n workflow as the core (n8n is a valid integration layer, not the knowledge layer)
- A database to store rules (a git repo is the database — version history is free)

---

## What this means for client deployments

Each client gets:
- A `rules/` folder specific to their design system (their tokens, their component patterns, their guardrails)
- Shared `prompts/` and `schemas/` (these are generic enough to reuse across clients, customized per workflow)
- Shared `scripts/` (identical across all clients)
- Client-specific integration shells (whichever tools they use)

The client-specific parts are small. The shared parts are the product. This is what makes it scalable: each new client is mostly a new `rules/` folder and some integration wiring, not a new system from scratch.

---

## Evaluation harness

One addition worth building early: a script that tests "does this output actually pass the rules?" before it goes to the user. Not a test suite — a feedback loop. The model produces output, the harness runs that output back through the model with the rules as a checklist, flags anything that fails.

This is what makes the system trustworthy. Speed is easy. Trust is the hard part.
