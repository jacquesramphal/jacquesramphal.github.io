---
name: step1-collect-inputs
description: Internal step of /genie audit — not invoked directly
user-invocable: false
---

# Step 1: Collect Inputs

Gather everything the audit flow needs before touching hyperbrowser, Drive, or the inventory sheet. Use `AskUserQuestion` for structured prompts — do NOT free-text ask.

## 1. Parse command arguments

Command signature: `/genie audit [lite|deep] [url]`. Parse:
- `mode` — `"lite"` or `"deep"` (dispatched from `audit.md`; may be `null` if dispatcher couldn't tell)
- `baseUrl` — may be missing

Do not infer missing values. If either is missing, prompt in Step 1.3 below.

## 2. Set defaults

```js
inputs = {
  mode:                argv.mode || null,                  // "lite" | "deep" | null
  baseUrl:             argv[0] || null,
  outputFolder:        null,                                // absolute local path; null → defaults in Step 2
  compareAccelerator:  true,                                // default ON (auto-downgrades in Step 4 if Drive MCP is unavailable)
  runId:               `audit-${Date.now()}`,               // used for local tmp paths
}
```

## 3. Prompt for missing fields

Use a **single** `AskUserQuestion` call with multiple questions. Only include questions for fields that are still `null`/default.

Required prompts (include any that are missing):

| Field | Header | Question | Options / Type |
|---|---|---|---|
| `mode` | "Mode" | "Lite (single URL) or Deep (crawl + consolidate)?" | `Lite`, `Deep` |
| `baseUrl` | "Site URL" | "Which URL should I audit?" | Free-text (via the auto-added "Other") |
| `outputFolder` | "Output folder" | "Where should I save the audit files? (absolute path, or skip to use ~/Desktop)" | `Enter path`, `Use ~/Desktop (default)` |
| `compareAccelerator` | "Accelerator compare" | "Compare components against the composable-pro inventory?" | `Yes (recommended)`, `No — generic audit` |

Use the sprint-summary pattern for free-text inputs — two options + the auto-added "Other":
```
options: [
  { label: "Enter value", description: "Provide the value inline" },
  { label: "Skip", description: "Use the default" }
]
```

If the user picks `Use ~/Desktop` (or skips), leave `inputs.outputFolder = null` — Step 2 builds the default run-folder path at that point.

If the user picks `No — generic audit`, set `inputs.compareAccelerator = false`. The flow will still emit component rows; it just writes `"n/a"` for `Exists in Inventory?` and empty strings for `Closest Match` / `Suggested Modifications`.

If the user picks `Yes` — no further prompts needed. Step 4 reads the inventory live from the Drive MCP at runtime. If the Drive MCP is disconnected or errors, Step 4 auto-downgrades to generic mode and warns. No CSV path, no env var, no follow-up question.

## 4. URL sanity check

If `inputs.baseUrl` is a localhost or private/VPN URL (`localhost`, `127.0.0.1`, `*.local`, `10.*`, `192.168.*`, `172.16-31.*`), set `inputs.useLocalBrowser = true`. Step 3 reads this flag to route to `mcp__chrome-devtools__take_screenshot` instead of hyperbrowser for that single run. **This is the only silent route-to-chrome-devtools condition** — all other hyperbrowser failures surface as errors.

If the user explicitly passes a `--local` flag on the command, also set `inputs.useLocalBrowser = true`.

## 5. Confirm before Step 2

Print a compact summary of `inputs` and ask the user to confirm with a single `AskUserQuestion`:

```
"Ready to set up the audit with these inputs?"
options:
  - "Yes, proceed" → continue to Step 2
  - "Let me change something" → loop back to Step 1.3
  - "Cancel" → stop the command
```

## 6. Capture and pass forward

Save the finalized object as `inputs` for subsequent steps. Do not proceed to Step 2 until:
- `mode` is `"lite"` or `"deep"`
- `baseUrl` is a non-empty string that looks like a URL
- `folderUrl` is a non-empty string (possibly the literal `"root"`)
- `email` is a non-empty string (or `null` if the user explicitly skipped — Step 2 will then skip the share step)
- the user has confirmed

## Failure handling

- If the user cancels, stop the command cleanly — do not touch Drive, do not call hyperbrowser.
- If `folderUrl` looks like it might be a full Drive URL but cannot be parsed, warn the user but accept it as-is (Step 2 will normalize). The user can always re-run.
