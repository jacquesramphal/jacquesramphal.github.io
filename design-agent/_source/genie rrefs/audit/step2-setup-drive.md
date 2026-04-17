---
name: step2-setup-drive
description: Internal step of /genie audit — creates local run folder + screenshots subfolder
user-invocable: false
---

# Step 2: Set Up Output Folder (local)

Create the run folder that will hold `audit.xlsx`, `audit-summary.md`, and the `screenshots/` subfolder. No Google Drive, no Apps Script webhook, no network I/O. Pure `mkdir`.

The filename stays as `step2-setup-drive.md` for compatibility with the skill registry. "Drive" is a misnomer in the current local-only mode — kept to avoid breaking skill discovery. When the Drive-backed backend returns (see `scripts/genie-audit/apps-script/`), this file is swapped back, not renamed.

## Preconditions

`inputs` from Step 1 is populated and confirmed. Specifically:
- `baseUrl` — used to build the run-folder name
- `outputFolder` — absolute path where the run should land (Step 1 defaults this if the user skipped)
- `runId` — timestamp-based unique ID

## 1. Resolve the run folder path

If `inputs.outputFolder` is an absolute path → use it as-is.

If it's missing or relative → build a default:

```js
const safeHost = new URL(inputs.baseUrl).host.replace(/[^a-z0-9.-]/gi, "_");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const base = process.env.GENIE_AUDIT_OUTPUT_BASE || path.join(os.homedir(), "Desktop");
inputs.runFolder = path.join(base, `genie-audit-${safeHost}-${timestamp}`);
```

Example: `/Users/jacques/Desktop/genie-audit-orium.com-2026-04-15T15-30-22`

If the user specifically passed a path in Step 1, use that instead and append `genie-audit-<host>-<ts>` as a sub-directory (so running twice into the same target doesn't clobber the previous run).

## 2. Create folders

```bash
RUN="${inputs.runFolder}"
SCREENSHOTS="${RUN}/screenshots"

mkdir -p "$SCREENSHOTS"
```

Verify both exist:

```bash
[[ -d "$RUN" ]]         || { echo "Failed to create $RUN"; exit 1; }
[[ -d "$SCREENSHOTS" ]] || { echo "Failed to create $SCREENSHOTS"; exit 1; }
```

## 3. Pass forward

```js
outputArtefacts = {
  runFolder:          inputs.runFolder,             // absolute path
  screenshotsFolder:  `${inputs.runFolder}/screenshots`,
  xlsxPath:           `${inputs.runFolder}/audit.xlsx`,
  summaryPath:        `${inputs.runFolder}/audit-summary.md`,
}
```

Print a confirmation in chat:
```
✓ Run folder created: ${outputArtefacts.runFolder}
  screenshots → ${outputArtefacts.screenshotsFolder}
  (audit.xlsx + audit-summary.md will be written here by Step 7)
```

## Failure handling

- **Permission denied writing the folder**: surface the error with a remediation hint (`chmod +w` the parent, or pass a different `outputFolder` in Step 1).
- **Folder already exists and is non-empty**: treat as fine — previous run. The screenshot filenames in Step 3 are URL-keyed, so re-running against the same site overwrites the same files (which is what the user wants — re-audit produces newer data at the same paths).

## What changed from the Drive-backed version

- No `copyTemplate` webhook call. No Drive folder URL parsing. No share-with-email prompt. No ownership-transfer gate.
- The run folder is purely local. Everything lands there.
- If/when Drive backend returns: this step reverts to calling the Apps Script webhook's `copyTemplate` action and capturing `sheetFileId` / `screenshotsFolderId` instead of local paths.

## References

- `scripts/genie-audit/apps-script/Code.gs` — future backend (deferred)
- Step 7 — consumer of `outputArtefacts.xlsxPath` + `.summaryPath`
