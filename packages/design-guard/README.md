## @jacquesramphal/design-guard

Repo-local “design guard” CLI to detect **hardcoded design values** in code/styles.

### Why

It’s easy for UI code to drift into random one-off values (`12px`, `0.95rem`, `#333`, …). This tool nudges you toward **design tokens** (e.g. CSS variables like `var(--size-5)` / `var(--color-...)`).

### What it checks (rules)

- Hardcoded **lengths**: `px`, `rem`, `em`, `%`, `vw`, `vh`, etc.
- Hardcoded **colors**: hex (`#fff`, `#ffffff`, …) and `rgb()/rgba()/hsl()/hsla()`

It only flags **numeric literals with units** (and color literals). It does **not** flag `var(--token)` values.

### Install / run

Install (recommended):

```bash
npm i -D @jacquesramphal/design-guard
```

Run (scans **staged files** only; i.e. what you’ve `git add`’d):

```bash
npx design-guard --verbose
```

Strict mode (exit 1 if warnings exist):

```bash
npx design-guard --strict --verbose
```

### Config

By default, it reads `design-guard.config.json` from your **git repo root** if present; otherwise it uses the package default config.

You can create a starter config:

```bash
npx design-guard --init
```

Config shape:

```json
{
  "strict": false,
  "include": ["src"],
  "exclude": ["dist/**", "node_modules/**"],
  "ignoreFiles": ["src/assets/styles/scss/_config.scss"],
  "rules": {
    "noHardcodedLengths": true,
    "noHardcodedColors": true
  },
  "allow": {
    "px": ["0px", "1px"],
    "lengths": ["0%", "100%"]
  }
}
```

- **include**: only scan staged files under these roots/globs
- **exclude**: broad skip globs (build output, vendor, etc.)
- **ignoreFiles**: targeted skip list for “token/reference” files you don’t want scanned even if staged

### Ignoring

- Ignore a line: add `design-guard:ignore`
- Ignore a whole file: add `design-guard:off`

### Automation examples

CI (warning-only):

```bash
npx design-guard --warn --verbose
```

Husky pre-commit (recommended):

```sh
pnpm exec design-guard --verbose
```

