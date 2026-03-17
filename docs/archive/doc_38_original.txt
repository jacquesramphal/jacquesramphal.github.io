# Design Guard

#### Catch hardcoded design values before they ship (npm package + CLI)

![Image](../images/placeholders/placeholder-26.svg)

If you care about design consistency, you eventually end up caring about **what shouldn’t be allowed** in your codebase:

- `12px` that should have been `var(--spacing-sm)`
- `0.95rem` that should have been `var(--font-500)`
- `#333` that should have been `var(--color-darktext)`

This is a tiny “design guard” that scans **staged files** (`git add`’d) and warns (or fails, in strict mode) when it finds hardcoded values that should be tokens.

> **Freebie (npm package + CLI)**  
> Install/runs anywhere: [`@jacquesramphal/design-guard`](https://www.npmjs.com/package/@jacquesramphal/design-guard)  
>  
> - Run (verbose): `npx design-guard --verbose`  
> - Strict (fail commit/CI): `npx design-guard --strict --verbose`

## What it checks

- **Hardcoded lengths**: `px`, `rem`, `em`, `%`, `vw`, `vh`, etc.
- **Hardcoded colors**: hex (`#fff`, `#ffffff`, …) and `rgb()/rgba()/hsl()/hsla()`

It does **not** flag token usage (like `var(--size-5)`), because there’s no numeric literal to match.

## Config (repo root)

The tool reads `design-guard.config.json` from your repo root if present.

Common patterns:

- Use `include` to restrict scanning to the parts of the repo you care about (usually `src`)
- Use `exclude` for broad folders like build output
- Use `ignoreFiles` for token/reference sources (e.g. `_config.scss`) so they don’t self-flag

## Ignoring

- Ignore a line: add `design-guard:ignore`
- Ignore an entire file: add `design-guard:off`

