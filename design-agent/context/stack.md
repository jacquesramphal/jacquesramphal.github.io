# Stack Philosophy and Architecture

The most important technical decision: the agent's knowledge layer should be plain text, not a proprietary system. Everything else follows from that.

---

## Core principle: durable over clever

The tools will change. Claude, GPT-4, whatever ships in 18 months — they're all just models that accept text and return text. The value is not in wrapping a specific model. It's in the rules, the schemas, and the judgment encoded in the prompts. Those live in markdown files. Any model can read them.

---

## Orchestration decision: Claude API directly, not n8n at the core

**Not LangChain. Not n8n for orchestration. Claude API directly.**

**LangChain: no.** Abstractions leak — you end up debugging the framework, not building the product. It changes constantly. For what this system needs, it's overkill. Most teams that start with LangChain strip it out.

**n8n: reconsidered.** n8n made sense when the integration layer was the hard problem. But Claude Agents and MCP servers already handle tool use, context, and multi-step reasoning natively. n8n adds a visual wrapper around things Claude can do directly. It's a dependency you don't need. Skip it.

**Claude API with MCP: yes, this is the stack.** Claude's agent framework handles orchestration. MCP servers expose external tools and data sources (Figma, Storybook, GitHub, Jira) as structured context the agent can query. The "workflow" is the agent's reasoning loop — read rules, evaluate input, call tools, validate output, flag for human review. No separate orchestration layer needed.

**The orchestration IS the agent.** A Claude agent with the right system prompt, the right rules files loaded as context, and the right MCP tools connected is the entire system. The script layer is just: start the agent, pass the input, receive the output.

---

## Minimal stack

```
design-agent/
  rules/          ← plain markdown: token contracts, component guardrails, handoff specs
  prompts/        ← system prompts that load the rules and define output format
  schemas/        ← JSON schemas for structured output (component spec, handoff doc)
  scripts/        ← thin glue: start agent, pass input, receive and store output
```

No framework. No n8n. No LangChain. The scripts are Node or Python — start the agent, pass a folder of markdown rules as context, parse the structured output. That's the whole system.

---

## MCP servers needed

MCPs replace the integration layer entirely. Each one connects the agent to an external tool as a first-class capability, not a webhook.

### Core (required for Tier A)

| MCP | Purpose | Status |
|---|---|---|
| **Storybook MCP** | Exposes component metadata, variants, token bindings to the agent. Agent validates generated output against live component library. | Live, React only (March 2026) |
| **Filesystem MCP** | Reads and writes rules files, schemas, output docs from the local repo. The agent's persistent memory. | Available (Anthropic official) |
| **GitHub MCP** | Reads PRs, posts validation results as comments, triggers agent on component-related commits. | Available (Anthropic official) |

### Extended (Tier B and full lifecycle)

| MCP | Purpose | Status |
|---|---|---|
| **Figma MCP** | Reads Figma file structure, component properties, variables. Agent can read design intent directly from Figma files. | Community MCPs exist; quality varies |
| **Tokens Studio MCP** | Reads token definitions as structured data. Agent uses live token values, not a static snapshot. | Not confirmed — may need custom build |
| **Linear / Jira MCP** | Creates and updates tickets from agent output (user stories, bug reports, handoff specs). | Linear MCP available; Jira via API |
| **Notion MCP** | Writes audit reports, project briefs, and stakeholder docs directly to the client's Notion workspace. | Available |
| **Slack MCP** | Sends human checkpoint notifications, receives approval responses. | Available |

### Custom builds (specific to this service)

| MCP | Purpose |
|---|---|
| **Rules MCP** | Serves the client's token contract and guardrail definitions as structured tool responses. Each client gets their own rules set; the MCP serves whichever client's rules are active. |
| **Validation MCP** | Runs the evaluation harness — takes agent output, cross-checks it against the token contract and component schema, returns a pass/fail with specific violations. This is the core of Tier A. |
| **Handoff Spec MCP** | Accepts validated output and writes a structured handoff doc in the team's preferred format (markdown, JSON, Notion page, Jira ticket). |

---

## The layers

### Layer 1: Rules (markdown files)

Token contract. Component guardrails. Handoff output format. What requires human review.

These are structured facts about how a specific team's design system works. Version-controlled, reviewable, auditable independently of any tooling. Readable by a designer who doesn't know how to code.

Structured as CLAUDE.md-compatible markdown: they work as system context for the agent AND as documentation for human designers. Same file, two uses.

Example rule:
```markdown
# Token Contract — [Client]

## Color
- Never use hex values directly. All colors must reference a token from /tokens/color.json.
- Semantic tokens (--color-primary, --color-surface) take precedence over base tokens.
- If a requested color has no token equivalent: FLAG FOR HUMAN REVIEW.
```

### Layer 2: System prompts

Load the relevant rules and define what the agent should produce. One prompt per workflow: component validation, handoff spec, audit, QA review.

The prompt defines what the agent cannot decide on its own — the explicit list of human review triggers.

### Layer 3: JSON schemas

Structured output definitions. What a component spec looks like. What a handoff doc looks like. What a QA report looks like. Output is validated against schema before it goes anywhere.

### Layer 4: Thin scripts

Start the agent → pass rules as context → receive structured output → validate against schema → store output or route to MCP. If human checkpoint: pause and notify via Slack MCP, wait for approval.

---

## Per-client deployment

Each client gets:
- A `rules/` folder specific to their design system (their tokens, component patterns, guardrails)
- Configured MCP connections to their tools (their Storybook instance, their GitHub, their Jira)
- The shared prompts, schemas, and scripts (identical across all clients)

The client-specific parts are small. The shared parts are the product. Each new client is mostly a new `rules/` folder and MCP configuration, not a new system.

---

## Evaluation harness

A script that runs agent output back through the model with the rules as a checklist before it reaches the human review gate. Not a full test suite — a feedback loop. The model produces output, the harness validates it, flags anything that fails.

This is what makes the system trustworthy rather than just fast. Built as the Validation MCP above.

---

## What not to build

- A wrapper around a single model that breaks when that model changes
- A proprietary rule format that only the tool can read
- A UI for editing rules (they're markdown — any text editor works)
- n8n as the orchestration core (it's the integration layer the MCPs replace)
- A database to store rules (git is the database — version history is free)
- LangChain (see above)
