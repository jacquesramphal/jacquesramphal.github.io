---
name: step-batch-analyze
description: Internal step of /genie audit batch — parallel analysis via agents
user-invocable: false
---

# Step: Batch Analyze (parallel agents)

After Phase A has screenshotted all URLs and saved PNGs to disk, this step launches **multiple agents in parallel** to analyze subsets of URLs concurrently. Each agent runs Step 4's vision + inventory-match logic independently, returns a row buffer, and the dispatcher merges them.

This is the key speedup for batch mode — analysis is the longest phase (~45s per URL) and is embarrassingly parallel (zero shared state between URLs).

## Inputs

- `screenshotResults[]` — from Phase A: `[{ url, desktopPath, mobilePath, desktopUrl, mobileUrl }, ...]`
- `inputs.inventoryRows` — pre-loaded from Drive MCP (or `null` if generic mode)
- `inputs.compareAccelerator` — boolean
- Guide file paths for the auditor + inventory-match prompts

## Strategy

Split `screenshotResults` into **N chunks** (where N = number of parallel agents, typically 3–5). Each agent gets:

1. Its chunk of `screenshotResults` (5–7 URLs)
2. The full `inputs.inventoryRows` (same for all agents)
3. The auditor prompt path (`guides/auditor-prompt.md`)
4. The inventory-match prompt path (`guides/inventory-match-prompt.md`)
5. The column schema from `guides/config.md`

## Agent prompt template

Each agent receives a prompt like:

```
You are analyzing {N} URLs for the /genie audit batch flow. For each URL:

1. Read the desktop + mobile screenshots from disk (paths provided below).
2. Follow the auditor prompt in claude/skills/genie/audit/guides/auditor-prompt.md —
   identify all reusable UI components from the screenshots.
3. If inventoryRows is provided, follow the inventory-match prompt in
   claude/skills/genie/audit/guides/inventory-match-prompt.md —
   match each component against the inventory.
4. If inventoryRows is null, mark all components as "n/a" for inventory columns.
5. Return a JSON array of row objects matching the Component Audit column schema.

URLs to analyze:
{JSON.stringify(chunk)}

Inventory rows:
{JSON.stringify(inputs.inventoryRows || null)}

Return ONLY a JSON array of row objects. Each object has keys:
URL, Component Name, Exists in Inventory?, Closest Match, Suggested Modifications,
Fields, Desktop Screenshot, Mobile Screenshot

Do not include any text outside the JSON array.
```

## Dispatching

Use the `Agent` tool to launch all chunks in a single message (parallel execution):

```js
// Split into chunks of ~5 URLs each
const CHUNK_SIZE = 5;
const chunks = [];
for (let i = 0; i < screenshotResults.length; i += CHUNK_SIZE) {
  chunks.push(screenshotResults.slice(i, i + CHUNK_SIZE));
}

// Launch all agents in parallel (single message, multiple tool calls)
const agentResults = await Promise.all(chunks.map((chunk, i) =>
  Agent({
    description: `Analyze URLs ${i * CHUNK_SIZE + 1}-${Math.min((i + 1) * CHUNK_SIZE, screenshotResults.length)}`,
    prompt: buildAgentPrompt(chunk, inputs.inventoryRows),
  })
));
```

## Merging results

Each agent returns a JSON array of row objects. The dispatcher:

1. Parses each agent's response as `JSON.parse(agentResult)`
2. Concatenates all arrays: `rowBuffer.audit = agentResults.flat()`
3. Validates each row has the required keys (skip malformed rows, log warnings)
4. Continues to Step 6 (consolidation, if deep/batch) or Step 7 (report)

## Progress reporting

After all agents complete:

```
✓ Analysis complete
  • {agentCount} parallel agents processed {totalUrls} URLs
  • {rowBuffer.audit.length} components detected across all URLs
  • Wall clock: ~{elapsedMinutes} min (vs ~{sequentialEstimate} min sequential)
```

## Fallback

If an agent errors (timeout, malformed response):
- Log the error and the URLs it was responsible for
- Those URLs go into `failedUrls[]` with reason "analysis agent failed"
- Remaining agents' results are still merged — partial results are better than none
- Step 7 reports the failures

## Concurrency limits

- **3 agents** for ≤15 URLs (5 per agent)
- **4 agents** for 16–20 URLs (5 per agent)
- **5 agents** for 21–30 URLs (6 per agent)
- Cap at **5 agents** regardless of URL count — diminishing returns beyond that, and context window pressure increases

## Relationship to non-batch modes

- **Lite mode**: 1 URL → no parallelism needed, runs Step 4 directly
- **Deep mode**: typically 8–15 pruned URLs → can use 2–3 agents
- **Batch mode**: 10–30 URLs → uses this step for full parallel analysis

The `audit.md` dispatcher decides whether to call this step or loop Step 4 sequentially based on URL count:
- ≤ 3 URLs → sequential Step 4 (agent overhead isn't worth it)
- > 3 URLs → this parallel step
