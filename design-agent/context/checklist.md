# Future State Checklist

Tracks what the plan calls for vs. what exists. Update as work progresses.

Legend: ✅ Done · 🟡 Partial · ⬜ Not started

---

## Strategy and context

| Item | Status | File |
|---|---|---|
| Competitive analysis | ✅ | context/competitive-analysis.md |
| Stack decision (Claude API + MCP, no n8n) | ✅ | context/stack.md |
| Process lifecycle (11 phases, 3 tiers) | ✅ | context/process.md |
| Service naming exploration | ✅ | context/naming.md |
| Source audit findings | ✅ | context/audit-findings.md |
| Session notes | ✅ | context/session-2026-04-17.md |
| **Agile process methodology** | ✅ | process/agile-process.md |

---

## Business and marketing

| Item | Status | File |
|---|---|---|
| Ideal client profile (ICP) | ✅ | marketing/icp.md |
| Positioning one-pager | ✅ | marketing/positioning.md |
| Marketing channels | ✅ | marketing/channels.md |
| Product page draft | 🟡 | marketing/product-page.md (demo section empty) |
| LinkedIn outreach templates | ✅ | marketing/outreach-templates/linkedin-dm.md |
| Cold email templates | ✅ | marketing/outreach-templates/cold-email.md |
| Discovery call guide | ✅ | pitching/discovery-call.md |
| Proposal template | ✅ | pitching/proposal-template.md |
| Proof of work inventory | 🟡 | pitching/proof-of-work.md (needs real client example) |
| Pricing tiers | ✅ | contracts/pricing.md |
| SOW template | ✅ | contracts/sow-template.md |
| Consulting agreement draft | ✅ | contracts/consulting-agreement.md |
| Deployment models doc | ⬜ | Not written |

---

## Tier B: Audit flow

| Item | Status | File |
|---|---|---|
| Audit dispatcher (lite/deep/batch) | ✅ | audit/audit.md |
| Auditor vision prompt | ✅ | audit/guides/auditor-prompt.md |
| Inventory match prompt | ✅ | audit/guides/inventory-match-prompt.md |
| URL prune prompt | ✅ | audit/guides/prune-urls-prompt.md |
| Page consolidation prompt | ✅ | audit/guides/consolidate-prompt.md |
| Checkpoint/resume pattern | ✅ | audit/guides/checkpoint.md |
| Config and column schemas | ✅ | audit/guides/config.md |
| Step 1: collect inputs | ✅ | audit/step1-collect-inputs.md |
| Step 2: setup output folder | ✅ | audit/step2-setup-drive.md |
| Step 3: capture screenshots | ✅ | audit/step3-capture-screenshots.md |
| Step 4: audit URL (vision + match) | ✅ | audit/step4-audit-url.md |
| Step 5: crawl and prune (deep/batch) | ✅ | audit/step5-crawl-and-prune.md |
| Step 6: consolidate pages (deep/batch) | ✅ | audit/step6-consolidate-pages.md |
| Step 7: write report and CSVs | ✅ | audit/step7-report.md |
| Batch parallel analysis | ✅ | audit/step-batch-analyze.md |
| Simulate mode (persona UX prediction) | ✅ | audit/simulate.md |
| Simulate guides (prompts + scoring) | ✅ | audit/guides/simulate/ |

---

## Tier A: Validation layer (core service, not yet built)

| Item | Status | File |
|---|---|---|
| Client rules template | ✅ | rules/client-rules-template.md |
| Client COMPONENT_MANIFEST.json template | ⬜ | rules/COMPONENT_MANIFEST.template.json |
| Validation system prompt | ⬜ | prompts/validate-component.md |
| Handoff spec system prompt | ⬜ | prompts/generate-handoff.md |
| Audit report system prompt | ⬜ | prompts/generate-audit-report.md |
| Component spec JSON schema | ⬜ | schemas/component-spec.json |
| Handoff doc JSON schema | ⬜ | schemas/handoff-doc.json |
| QA report JSON schema | ⬜ | schemas/qa-report.json |
| Validate script (start agent, run rules, flag violations) | ⬜ | scripts/validate.js |
| Handoff script (produce structured handoff package) | ⬜ | scripts/handoff.js |
| Start agent script (load rules, call Claude API) | ⬜ | scripts/start-agent.js |

---

## Client Storybook environment

| Item | Status | File |
|---|---|---|
| Blank Storybook (shadcn/ui, Tailwind, 40+ components) | 🟡 | _source/design agent/storybook-blank/ (in _source, not extracted) |
| storybook-blank extracted to deployable folder | ⬜ | storybook-blank/ |
| Example stories with storyMeta blocks | ⬜ | Not written |
| Example COMPONENT_MANIFEST.json | ⬜ | Not written |

---

## Custom MCPs (architecture only, lower priority)

| Item | Status | Notes |
|---|---|---|
| Rules MCP (serves client token contract as tool responses) | ⬜ | Use script layer first |
| Validation MCP (runs evaluation harness, returns pass/fail) | ⬜ | Use script layer first |
| Handoff Spec MCP (writes structured handoff in client format) | ⬜ | Use script layer first |

---

## What to do next

**Immediate (unlock first client):**
1. Extract `storybook-blank` to `design-agent/storybook-blank/` — deploy and verify
2. Write audit step files (step1–step7) — these make the audit dispatcher executable
3. Write `prompts/validate-component.md` and `schemas/component-spec.json` — the Tier A core
4. Fill the product page demo section with a real example (blocked until first engagement)

**Second (make the process runnable):**
5. Write `scripts/validate.js` — the thin glue that makes Tier A callable
6. Write simulate mode doc — strong standalone service for pre-sales
7. Build deployment models doc

**Hold:**
- Custom MCPs — script layer is sufficient for first 3 clients
- Full Tier C lifecycle implementation — needs proof of Tiers A and B first
