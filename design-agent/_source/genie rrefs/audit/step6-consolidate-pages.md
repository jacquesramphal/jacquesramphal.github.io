---
name: step6-consolidate-pages
description: Internal step of /genie audit — deep mode only — not invoked directly
user-invocable: false
---

# Step 6: Consolidate Pages (deep mode only)

After the deep loop has populated `rowBuffer.audit` with every URL's component rows, collapse those URLs into reusable **page templates** and accumulate the output into `rowBuffer.consolidation`. Writes to the `Page Consolidation` tab happen in Step 7 (batched), not here.

Mirrors the n8n deep flow's `Get Audit Rows` → `AI Agent1` → `Append or update row in sheet` chain, but the read-audit-rows step is replaced by a direct in-memory read of the buffer we already populated.

## Inputs to this step

- `rowBuffer.audit` — populated by the Step 3+4 loop (every URL's detected components)
- `rowBuffer.consolidation` — the accumulator (starts empty)
- `inputs.compareAccelerator` — boolean
- `inputs.inventoryRows` — cached from Step 4's first iteration if accelerator compare was on; `undefined` otherwise

## 1. Sanity check

If `rowBuffer.audit.length === 0` → the deep loop produced nothing (every URL failed). Skip Step 6. Step 7 will report "0 page templates consolidated — no audit rows to analyze."

## 2. Run consolidation via Claude

Load the system prompt from `claude/skills/genie/audit/guides/consolidate-prompt.md`.

Make a Claude call with:
- System: the consolidation prompt
- User payload:
  ```json
  {
    "audit":              [ ...rowBuffer.audit... ],
    "inventory":          [ ...inputs.inventoryRows || [] ... ],
    "compareAccelerator": true | false
  }
  ```

Parse the response's JSON array as `pageTemplates[]`:

```json
[
  {
    "Page Template": "Homepage",
    "Page Type": "CMS-Driven",
    "Components": ["Header", "Hero Banner / Image BG Banner", ...],
    "Customization Status": "OOTB",
    "Required Changes": ""
  }
]
```

Also capture the plain-text summary that follows the JSON as `consolidationSummary` — used by Step 7's chat report.

## 3. Buffer consolidation rows

Serialize `Components` from array → `, `-joined string (the sheet column holds text, not array), then push to the buffer:

```js
for (const t of pageTemplates) {
  rowBuffer.consolidation.push({
    "Page Template":        t["Page Template"],
    "Page Type":            t["Page Type"],
    "Components":           Array.isArray(t.Components) ? t.Components.join(", ") : t.Components,
    "Customization Status": t["Customization Status"],
    "Required Changes":     t["Required Changes"] || "",
  });
}
```

**Do not call `appendConsolidationRows`** here — that happens once in Step 7.

## 4. Pass forward

```js
consolidation = {
  pageTemplateCount:   rowBuffer.consolidation.length,
  ootbCount:           rowBuffer.consolidation.filter(t => t["Customization Status"] === "OOTB").length,
  requiresUpdateCount: rowBuffer.consolidation.filter(t => t["Customization Status"] === "Requires Update").length,
  newComponentCount:   rowBuffer.consolidation.filter(t => t["Customization Status"] === "New Component Required").length,
  summary:             consolidationSummary,
}
```

Step 7 reads this for the final chat report.

## Failure handling

- **Consolidation call returns non-JSON:** retry once; on second failure, skip Step 6 entirely and surface the raw audit rows in Step 7's report — the user can manually inspect the `Component Audit` tab to form their own templates.
- **JSON validates but has 0 templates:** treat as success with a warning ("LLM did not identify any reusable templates"). Step 7 reports the count as 0.
- **Malformed row (missing required keys):** skip that row and log to console. Only rows with all 5 columns present make it into the buffer.

## References

- Consolidation prompt: `claude/skills/genie/audit/guides/consolidate-prompt.md`
- Column schema: `claude/skills/genie/audit/guides/config.md`
- Webhook contract: `scripts/genie-audit/apps-script/Code.gs` → `appendConsolidationRows()` (called from Step 7, not here)
- n8n reference: `deep - POC - Trojan Scraper.json` → `Get Audit Rows` + `AI Agent1` + `Append or update row in sheet`
