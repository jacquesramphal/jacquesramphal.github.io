# Consolidation Prompt — port of `deep` flow's `AI Agent1` node

> Ported verbatim (light adaptations) from `deep - POC - Trojan Scraper.json`,
> `AI Agent1` node. Step 6 (`step6-consolidate-pages.md`) uses this to collapse
> per-URL audit rows into reusable page-template rows written to the
> `Page Consolidation` tab.

---

## Goal

Analyze the provided **page audit** (rows from the `Component Audit` tab) and the **component inventory** (rows from `INVENTORY_SHEET_ID / Components V2`) to define the **consolidated set of page templates** required for rebuild or migration.

Output must be **CMS-agnostic** and formatted for spreadsheet import.

---

## Inputs

1. **Audit output** — JSON array of rows from the current run's `Component Audit` tab. Each row has the shape:
   ```json
   {
     "URL": "https://client.com/blog/example",
     "componentName": "Article Card",
     "existsInInventory": "True",
     "closestMatch": "Article Card",
     "suggestedModifications": "",
     "fields": "...",
     "desktop": "...",
     "mobile": "..."
   }
   ```
2. **Accelerator inventory** — the OOTB component list. Use only to understand component **intent** and **capabilities** (e.g., "Hero Banner supports background image, heading, CTA"). Do NOT enforce schema from it.

---

## Instructions

### 1. Review the audit

- Group URLs by structural similarity and content type.
- Identify patterns in component composition to infer reusable **template types** (e.g., Homepage, Blog Post, Generic Landing, PLP, PDP, Help Page).
- For each template, note whether it requires:
  - Customization of existing components
  - A new component type
  - No customizations (pure OOTB)

### 2. Cross-reference with inventory

- Map used components to their OOTB equivalents using the inventory's naming conventions.
- Flag any component missing from the accelerator.
- Identify where duplicated or redundant structures can be merged into a single reusable template.

### 3. Output format

Produce a JSON array of page-template objects:

```json
[
  {
    "Page Template": "Homepage",
    "Page Type": "CMS-Driven",
    "Components": [
      "Header",
      "Hero Banner / Image BG Banner",
      "Text Banner",
      "Vertical Product Card",
      "Filters",
      "Footer"
    ],
    "Customization Status": "OOTB",
    "Required Changes": ""
  },
  {
    "Page Template": "Blog Article",
    "Page Type": "CMS-Driven",
    "Components": [
      "Header",
      "Article Card",
      "Text Card IV",
      "Author Banner",
      "Footer"
    ],
    "Customization Status": "Requires Update",
    "Required Changes": "Add 'author social links' field to Author Banner"
  }
]
```

### 4. Summary

After the JSON array, include a short plain-text summary with:
- Total number of unique templates
- Redundant/duplicate pages that can share templates
- Recommended new fields (if any)

---

## Consistency notes

- Keep the output **CMS-agnostic** — do NOT reference "entries", "blocks", or "content types".
- Use the inventory as the source of truth for component names only.
- Apply naming conventions consistent with existing accelerator components.
- Only suggest new fields or components when explicitly required by audit findings.
- Avoid over-segmentation — prioritize consolidation and reusability.

## Values for `Customization Status`

| Condition | Value |
|---|---|
| All components are OOTB matches | `OOTB` |
| Some components need field/behavior changes | `Requires Update` |
| Template needs a brand-new component type | `New Component Required` |

## Values for `Page Type`

Use the specific label that fits (don't invent new ones if possible):

- `CMS-Driven` — content comes from the CMS
- `Commerce-Driven` — content comes from the commerce platform (PLP, PDP)
- `Static` — hardcoded or static content
- `User-Generated` — account, wishlist, order history

---

## Fallback when accelerator comparison was OFF

If the run had `compareAccelerator: false` (generic no-accelerator mode), the audit rows will have `existsInInventory: "n/a"` and empty match/modifications. In that case:

- Still produce page templates — grouping URLs by structural similarity is independent of inventory.
- `Customization Status` should always be `New Component Required` (since there's no OOTB reference).
- `Required Changes` should be empty.
- The user is expected to later supply an inventory and re-run the accelerator-compare path if they want gap analysis.
