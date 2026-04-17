# Stack Philosophy and Architecture

The most important technical decision: the agent's knowledge layer should be plain text, not a proprietary system. Everything else follows from that.

---

## Orchestration decision: Claude API directly

**Not LangChain. Not n8n at the core. Claude API directly.**

**LangChain: no.** Abstractions leak — you end up debugging the framework, not building the product. It changes constantly. For what this system needs, it's overkill. Most teams that start with LangChain strip it out.

**n8n: yes, but only at the edges.** Good for connecting external tools: Slack form submission → trigger the agent, agent finishes → write to Jira, send a Slack notification. That's the right use. n8n is a pipe between the agent and the outside world — not the reasoning core, not the orchestration logic, not the rules engine.

**Claude API directly: yes, this is the core.** The "orchestration" is a script:

```
read rules files → construct prompt → call Claude API → validate output against schema → write output → if checkpoint: pause for human approval → next phase
```

That's a 50-line Node script. Claude's context window loads rules, phase inputs, and conversation history in one call. Claude tool use handles anything that needs to call an external API. Structured output (JSON mode) handles output formatting. No framework needed.

**Model-swap path:** API calls are isolated to a single adapter function. Switch Claude to another model by changing one file. Everything else stays.

**The CLAUDE.md angle:** Rules files structured as CLAUDE.md-compatible markdown work as system context for the agent AND as documentation for human designers reading them. Same file, two uses. That's the agnostic future-proofing — not a framework, just a file format any model can read.

| Layer | Tool | Why |
|---|---|---|
| Rules | Markdown files | Portable, version-controlled, human-readable |
| Reasoning | Claude API (claude-sonnet-4-6) | Best instruction-following, large context, structured output |
| Orchestration | Plain Node/Python script | No abstraction overhead, easy to swap models |
| Integrations | n8n | Triggers, webhooks, external tool connections |
| State | Files in git | Free versioning, auditable, no database needed |
| Output schema | JSON Schema | Validates structured output before it goes anywhere |

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
