# Architecture Decisions: What Was Built and Why

*April 2026. Documents the key decisions made when designing the audit and validation layers.*

---

## What exists and what was built

### The rules layer (Tier A foundation)

The rules layer is implemented as plain markdown — a `client-rules-template.md` that is both machine-readable (Claude-compatible) and human-readable documentation. The same file serves as the agent's system context and as the spec a human designer reads on day one.

Key decisions in the rules architecture:

| Decision | Rationale |
|---|---|
| Markdown over JSON for rules | CLAUDE.md-compatible — works as agent system context without a parsing layer |
| Three argType categories (Content Editable / Dev Only / ⚠ Proposed) | Makes CMS-relevant fields visible to non-developers; `⚠ Proposed` acts as a visible human checkpoint flag in both Storybook Controls and git diffs |
| `storyMeta` block per story | Machine-readable component metadata the validation agent reads at runtime — co-located with the story, not a separate registry |
| `COMPONENT_MANIFEST.json` as separate file | Single source of truth across all stories; agent reads it once per run, not per-story |
| "Content Editable" over "CMS Editable" | CMS-agnostic — works for any headless CMS, not just one platform |

### The audit flow (Tier B)

The audit runs in three modes (lite / deep / batch) through a phased execution model:

- **Phase A** — screenshots captured sequentially with the browser open (fast, no analysis latency)
- **Phase B** — analysis runs against saved PNGs (browser can be closed; long runs don't hold the connection)

This split exists because the vision analysis step is slow and variable. Separating capture from analysis means a failed analysis step doesn't require re-capturing screenshots. The checkpoint/resume pattern builds on this — PROGRESS.md is written at every phase boundary so a compacted session can resume from the last completed phase.

The auditor runs two passes per page:
1. **Component inventory** — identifies reusable UI components and their fields
2. **UX heuristics** — evaluates the page against research-backed principles (see `guides/ux-heuristics.md`)

Both passes return structured JSON in a single call. `uxFlags` accumulate per URL and are rendered in the audit summary grouped by severity.

### The validation agent (Tier A core)

The validation agent receives three inputs: the story file, COMPONENT_MANIFEST.json, and client-rules.md. It runs 8 checks in a single pass and returns raw JSON — no prose, no commentary. The output shape is defined in `schemas/component-spec.json` (JSON Schema 7).

The 8 checks:
1. Props imported from package (not locally redefined)
2. argTypes categorised
3. Image specs present and matching manifest
4. No logic in stories
5. Variant names descriptive
6. No hardcoded values
7. storyMeta block present and complete
8. Manifest consistency

All checks run regardless of prior failures — the agent collects the complete picture in one pass.

`validate.js` exits non-zero on any failure, making it CI-composable from day one.

---

## What's missing (for reference)

| Missing item | Priority | Notes |
|---|---|---|
| `storybook-blank/` extraction | High | Still in `_source/` — needs to be extracted as standalone deployable |
| `prompts/generate-handoff.md` | Medium | Tier A handoff output — not yet written |
| `schemas/handoff-doc.json` | Medium | Paired with generate-handoff.md |
| `scripts/handoff.js` | Medium | Thin glue for handoff workflow |
| Product page demo section | Blocked | Needs first real client example |
| Deployment models doc | Medium | How clients receive the storybook-blank environment |

---

## Key abstraction principles applied

When building the audit and validation layers, these principles guided what to keep and what to remove:

- **Env vars over hardcoded IDs** — all Google Sheet IDs, client names, and output paths are configurable via environment variables
- **Generic field names** — "Component Name", "Exists in Inventory?", "Content Editable" — no platform-specific terminology
- **No tool branding in output** — report footers, file names, and output paths contain no third-party product names
- **Claude-native patterns** — no n8n workflow dependencies; agent prompts are plain markdown, not JSON workflow definitions
- **Portable scripts** — all scripts checked for third-party org references before inclusion
