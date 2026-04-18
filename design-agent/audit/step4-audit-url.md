---
name: step4-audit-url
description: Internal step of /audit — not invoked directly
user-invocable: false
---

# Step 4: Audit URL

For a single URL with desktop + mobile screenshots already captured, identify reusable UI components with Claude's native vision, optionally match each against the client component inventory, and **accumulate** per-component rows in memory. Writes to the sheet happen in Step 7, not here — batching 100+ rows into a single POST is dramatically faster than appending per-component.

Runs once in lite mode. Runs in a loop in deep mode — called once per URL in the pruned set from Step 5.

## Inputs to this step

- `url` — the page under audit
- `desktopImage`, `mobileImage` — in-memory image references from Step 3
- `desktopUrl`, `mobileUrl` — Drive public URLs for the sheet row
- `inputs.compareInventory` — boolean
- `rowBuffer.audit` — the accumulator array seeded in `audit.md` before Step 3/4 start

## 1. Vision audit — identify components

Load the system prompt from `audit/guides/auditor-prompt.md`.

Make a vision call with:
- System: the auditor prompt
- User: "Analyze this page. Desktop first, mobile second. URL: `<url>`" + both images attached

Parse the response's final JSON code block as `detectedComponents[]`:

```json
[
  {
    "componentName": "Hero Banner",
    "fields": [
      { "name": "Heading", "type": "Text", "description": "..." },
      { "name": "Background Image", "type": "Image", "description": "..." }
    ]
  }
]
```

## 2a. If `inputs.compareInventory === true` — match against inventory

**Read the inventory once per run** from the live Google Sheet via the Drive MCP, and cache on `inputs.inventoryRows`.

```js
// First iteration only — subsequent iterations reuse the cached value.
if (!inputs.inventoryRows) {
  const INVENTORY_SHEET_ID = "process.env.AUDIT_INVENTORY_SHEET_ID";

  try {
    const response = await mcp__7496cfda_8e12_455f_aa22_fc425f6f7db9__read_file_content({
      fileId: INVENTORY_SHEET_ID,
    });
    // The response is a markdown table. Parse header row + data rows into objects.
    inputs.inventoryRows = parseMarkdownTableToRows(response.fileContent);
  } catch (err) {
    // Drive MCP disconnected, permission revoked, or network error.
    console.warn(`⚠️  Could not read inventory from Drive MCP: ${err.message}`);
    console.warn("    Falling back to generic mode (no inventory comparison).");
    inputs.compareInventory = false;
  }
}
```

**Parsing the markdown table:** `read_file_content` returns the sheet as a markdown table (pipes + newlines). Extract the header row, then map each data row into `{ "Component Name": "...", "Component Type": "...", ... }`. Skip empty rows (where `Component Name` is blank — the sheet uses these as field-continuation rows). The parser only needs the `Component Name`, `Component Type`, `Description`, and `Fields` columns for matching; the rest (Figma links, visual flexibilities, layout specs) are available for enrichment but not required.

**Why this is better than CSV:** zero setup for the user (no export, no env var, no file path). Always reads the latest version. If the Drive MCP is disconnected, the fallback is the same as before — generic mode — so the run never hard-fails on an inventory read issue.

> **V2 opportunity (documented, not built):** The inventory rows contain Figma node IDs in every `Image/Figma Link` cell. A future enhancement could call `mcp__figma__get_screenshot` per inventory component and do visual-to-visual matching against the client site screenshots. This would catch components that look similar but have different names.

**Match each detected component** via a second Claude vision/text call using `audit/guides/inventory-match-prompt.md` as the system prompt.

Input to the match call:
```json
{
  "inventory": [ ...inputs.inventoryRows... ],
  "detected": [ ...detectedComponents... ]
}
```

Parse the response's JSON block as `matchedComponents[]`:

```json
[
  {
    "componentName": "Hero Banner",
    "existsInInventory": "True" | "False" | "True with Modifications",
    "closestMatch": "Hero Banner" | "",
    "suggestedModifications": "" | "Add social links field",
    "fields": [ ...as auditor emitted... ]
  }
]
```

## 2b. If `inputs.compareInventory === false` — generic mode

Skip the inventory read + match call. For each detected component emit:
```json
{
  "componentName": "<as detected>",
  "existsInInventory": "n/a",
  "closestMatch": "",
  "suggestedModifications": "",
  "fields": [ ...as auditor emitted... ]
}
```

## 3. Serialize fields

Collapse each component's `fields[]` into a single string for the sheet's `Fields` column:

```js
fieldsString = component.fields
  .map(f => `${f.name} (${f.type})${f.description ? ": " + f.description : ""}`)
  .join(", ");
```

## 4. Buffer rows — NO webhook writes in this step

Append one object per detected component to the in-memory buffer. Keys must match the sheet column headers exactly (typos preserved):

```js
for (const c of matchedComponents) {
  rowBuffer.audit.push({
    "URL":                     url,
    "Component Name":          c.componentName,
    "Exists in Inventory?":   c.existsInInventory,
    "Closest Match":          c.closestMatch,
    "Suggested Modifications": c.suggestedModifications,
    "Fields":                  fieldsString,
    "Desktop Screenshot":      desktopUrl,
    "Mobile Screenshot":       mobileUrl,
  });
}
```

**Do not call `appendAuditRows`** here. That happens once, in Step 7, for all rows at once.

## 5. Progress reporting

Print to chat after each URL:
```
✓ Audited <url>
  • <N> components detected
  • <M> OOTB matches, <K> with modifications, <L> net-new
    (or for generic mode: "<N> components detected, inventory comparison skipped")
  • Buffered row count: <rowBuffer.audit.length>
```

## Failure handling

- **No JSON block in vision response:** retry once with firmer instruction; on second failure, append one placeholder row (`"Component Name": "— parsing failed —"`) to the buffer so the run is traceable.
- **Inventory read fails (first-time call):** fall back to generic mode for this entire run (emit `n/a` for all URLs) and warn loudly. Don't block the audit.
- **Vision call times out:** same as parsing failure — one placeholder row, move on.

Bulk write in Step 7 handles any webhook retries at the batch level, so row-level failures here are always recoverable.

## References

- Auditor prompt: `audit/guides/auditor-prompt.md`
- Inventory match prompt: `audit/guides/inventory-match-prompt.md`
- Column schemas: `audit/guides/config.md`
- n8n reference: `lite - [Tool] Component Audit & Gap Analysis - Genie.json` → `OpenAI` + `OpenAI2` nodes (the inline append that lived in n8n `Append or update row in sheet1` is now Step 7's job)
