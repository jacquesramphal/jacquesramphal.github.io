# Source Audit: _source/ Against the Plan

*Conducted April 2026. Maps each source file to what it covers in the plan, what needs abstraction, and what's still missing.*

---

## Summary verdict

The source files are stronger than expected. Two things are essentially built:

1. **The rules layer** — `_source/design agent/CLAUDE.md` is a working implementation of the `rules/` folder described in stack.md. The enforced rules, `storyMeta` block, `⚠ Proposed` category, and `COMPONENT_MANIFEST.json` pattern are exactly the validation framework the Tier A engine needs. The concept is proven in production at Orium.

2. **The audit flow (Tier B)** — `_source/genie rrefs/` contains the full Genie audit: 7-step dispatcher, auditor prompt, URL pruner, page consolidation, checkpoint pattern. Already ported from n8n to Claude-native. Abstraction work is moderate — mostly replacing Orium-specific IDs and branding.

What isn't built: the implementation layer. No `rules/` client template, no `prompts/` or `schemas/` folders, no scripts, no MCP connections. The plan is well-documented; the execution hasn't started.

---

## Source file mapping

### `_source/design agent/storybook-blank/`

**Plan coverage:** Tier A client deployment artifact. The blank Storybook with 40+ shadcn/ui components is the environment clients get at engagement start. Zero Orium references — clean as-is.

**What to do:** Extract to `design-agent/storybook-blank/` or reference as a template repo. No abstraction needed.

**Covers plan phases:** Tier A validation environment, Phase 7 (hi-fi with token enforcement), Phase 10 (handoff).

---

### `_source/design agent/CLAUDE.md` — Orium Design Docs rules

**Plan coverage:** This IS the `rules/` layer from stack.md. Every enforced rule maps directly to a plan concept:

| Rule in CLAUDE.md | Plan equivalent |
|---|---|
| Never redefine props from the package | Component guardrail in `rules/` |
| `⚠ Proposed — Needs CMS Review` category | Human checkpoint flag |
| `storyMeta` block per story | Machine-readable component metadata the Validation MCP reads |
| `COMPONENT_MANIFEST.json` | The validation target — what the agent checks output against |
| Image spec requirement | Structured constraint the Validation MCP enforces |
| Variant naming rules | Guardrail patterns in `rules/` |
| Foundations must import tokens, never hardcode | Token contract enforcement |

**Orium-specific refs to remove before using as client template:**

| Remove | Replace with |
|---|---|
| `@oriuminc/ui`, `@oriuminc/chakra`, `@chakra-ui/react` | `[client-package]/ui`, `[client-package]/tokens` |
| `composable-pro`, CMS schema refs | Client's component registry |
| "Orium Accelerator" | Remove or replace with generic |
| `BannerFull`, `BannerFullProps` examples | Generic examples (e.g. `HeroSection`, `CardProps`) |
| storybook-special, SpecIAL platform refs | Remove — Orium-internal project |
| `packages/chakra/src/figma-tokens/transformedTokens.json` | `[client-token-path]` |
| "CMS Editable" category | Rename to "Content Editable" (CMS-agnostic) |

**Output:** `design-agent/rules/client-rules-template.md` — a parameterized version a new client fills in.

---

### `_source/design agent/README.md` — Orium Design Docs overview

**Plan coverage:** Partial. The repo overview and variant table (Chakra/Tailwind/blank Storbyook) describes the deployment options. Useful as context for how the storybook-blank variant was positioned.

**Orium-specific refs:** Heavy. Entire README is Orium-context — deploy buttons link to oriuminc GitHub, references Orium Claude Setup as a prerequisite. Not portable as-is.

**What to do:** Use as reference only. The storybook-blank portion is what matters; that's already portable.

---

### `_source/design agent/scripts/`

**Plan coverage:** Thin glue scripts in stack.md Layer 4. Four scripts:

| Script | Purpose | Portable? |
|---|---|---|
| `capture-screenshots.js` | Screenshot pipeline (likely uses chrome-devtools or Hyperbrowser) | Review for Orium-specific config |
| `install-hooks.sh` | Git hook setup | Likely portable |
| `track-story-changes.js` | Monitors Storybook story changes | Review — may reference Orium packages |
| `vercel-deploy.sh` | Deploys a Storybook variant to Vercel | Portable — takes variant name as arg |

**What to do:** Read each, abstract any Orium references, move to `design-agent/scripts/`.

---

### `_source/genie rrefs/audit.md` — Genie audit dispatcher

**Plan coverage:** Phase 2 (Audit), Tier B entry point. The 3-mode dispatch (lite/deep/batch), phased execution design (Phase A screenshots → Phase B analysis), checkpoint pattern, and estimated timelines are all directly usable.

**Orium-specific refs to remove:**

| Remove | Replace with |
|---|---|
| `composable-pro accelerator inventory` | `client component library inventory` |
| Google Sheet template IDs (`1DgKO7uq7n...`, `1Nii5Ul5DEbFjD_Ep0Cdw...`) | `AUDIT_SHEET_TEMPLATE_ID`, `AUDIT_INVENTORY_SHEET_ID` (configurable env vars) |
| Google Drive MCP folder references | Generic folder variable |
| `oriuminc` team references | Remove |

**What to preserve:** The 3-mode dispatch logic is solid. The phased execution rationale (why screenshots before analysis, why 3 agents for batch) is worth keeping — it's documented reasoning that a future operator needs.

---

### `_source/genie rrefs/genie/SKILL.md` — Genie skill definition

**Plan coverage:** Tier B audit mode + simulate mode are directly relevant. Slides and Sprint Summary modes are Orium-internal delivery tools, not relevant to this service.

**What to extract:** Audit mode and Simulate mode sections only. The simulate mode (persona-based UX prediction) is genuinely portable and aligns with Phase 2 (Audit) and Phase 3 (Stakeholder alignment) in the process.

---

### `_source/genie rrefs/genie/audit/guides/auditor-prompt.md`

**Plan coverage:** This is the system prompt for the vision auditor — the agent that looks at desktop + mobile screenshots and identifies reusable components. Already ported from GPT-4V/n8n to Claude-native. Already produces structured JSON output. This is production-proven.

**Orium-specific refs:** None. The prompt is generic — "web auditor specializing in UI/UX analysis." Portable as-is.

**What to do:** Copy directly to `design-agent/audit/guides/auditor-prompt.md`.

---

### `_source/genie rrefs/genie/audit/guides/` (other guides)

| Guide | Portable? | Notes |
|---|---|---|
| `inventory-match-prompt.md` | Mostly | Replace "composable-pro accelerator inventory" with generic inventory reference |
| `prune-urls-prompt.md` | Yes | Generic URL selection logic |
| `consolidate-prompt.md` | Yes | Generic page template consolidation |
| `checkpoint.md` | Yes | Checkpoint/resume pattern is infrastructure, not Orium-specific |
| `config.md` | No | Contains Orium Google Sheet IDs and column schemas — use as reference to build a generic config |

---

### `_source/genie rrefs/genie/guides/` — Simulate mode guides

| Guide | Relevance | Notes |
|---|---|---|
| `simulation-prompt.md` | High | Core of the simulate mode — persona behavior prediction |
| `synthesis-prompt.md` | High | Report synthesis system prompt |
| `scoring-model.md` | High | 0-10 persona fit rubric |
| `personas-rmi.md` | Partial | RMI Consumer Styles are Orium-specific defaults — replace with generic persona archetypes or make configurable |

---

## What's in the plan but not in source

These need to be built, not just abstracted:

| Missing item | Plan reference | Priority |
|---|---|---|
| `rules/client-rules-template.md` | stack.md Layer 1 — abstract from CLAUDE.md | High — needed before first client |
| `prompts/` folder | stack.md Layer 2 — system prompts per workflow phase | High |
| `schemas/` folder | stack.md Layer 3 — JSON schemas for component spec, handoff doc | High |
| `scripts/start-agent.js` | stack.md Layer 4 — thin glue | Medium |
| `audit/config.md` (generic) | Abstracted from Orium config.md | High |
| Custom MCPs (Rules, Validation, Handoff) | stack.md custom builds | Lower — start with script layer |
| Product page demo section | marketing/product-page.md placeholder | Blocked on real client example |
| Deployment models doc | Session discussion | Medium |

---

## Recommended next actions

**Do first (abstraction work — hours, not days):**
1. Write `design-agent/rules/client-rules-template.md` from CLAUDE.md
2. Write `design-agent/audit/audit.md` from `genie rrefs/audit.md` (remove Sheet IDs, inventory refs)
3. Copy auditor-prompt, prune-urls, consolidate, checkpoint guides verbatim
4. Write generic `audit/config.md` with env var placeholders instead of hardcoded IDs

**Do second (new build — Tier A core):**
1. `design-agent/prompts/validate-component.md` — system prompt for the validation agent
2. `design-agent/schemas/component-spec.json` — output schema for a validated component
3. `design-agent/schemas/handoff-doc.json` — output schema for a handoff package
4. `design-agent/scripts/validate.js` — start agent, load rules, parse output, flag violations

**Hold for now:**
- Custom MCPs (overkill for first client — script layer is sufficient)
- Full Phase lifecycle implementation (Tier C — not the entry point)
- Product page demo section (needs a real engagement to draw from)
