## @jacquesramphal/design-guard

Repo-local “design guard” CLI to detect hardcoded design values in staged files.

### What it checks

- Hardcoded **lengths**: `px`, `rem`, `em`, `%`, `vw`, `vh`, etc.
- Hardcoded **colors**: hex (`#fff`, `#ffffff`, …) and `rgb()/rgba()/hsl()/hsla()`

It’s intended to nudge code toward using design tokens (e.g. CSS variables like `var(--size-5)`).

### Install / run

Install (recommended):

```bash
npm i -D @jacquesramphal/design-guard
```

Run (scans **staged files** only):

```bash
npx design-guard --verbose
```

### Config

By default, it reads `design-guard.config.json` from your git repo root if present; otherwise it uses the package default config.

You can create a starter config:

```bash
npx design-guard --init
```

### Ignoring

- Ignore a line: add `design-guard:ignore`
- Ignore a whole file: add `design-guard:off`

