## @jacquesramphal/smart-quotes

Convert straight quotes (`’` and `”`) into Unicode smart quotes (`‘ ’ “ ”`) **in human-readable content**, without mangling code.

### Why

Pasted copy often introduces straight quotes into titles, labels, and prose. If you “smart quote” blindly, you can break things like markup delimiters:

```txt
title="I'm "Jacques""
```

This package gives you:

- **A small API** you can call on any string
- **A CLI** to scan Markdown/MDX (and template-like files you choose) while avoiding code blocks, inline code, and other unsafe regions

It’s **framework-agnostic**: it runs in any Node project and does not require any framework runtime.

### Install / run

Install (recommended for projects):

```bash
npm i -D @jacquesramphal/smart-quotes
```

Run once without installing:

```bash
npx smart-quotes --check
```

### CLI

By default the CLI scans the current directory in **check mode** (prints files that need changes and exits with code 1).

```bash
smart-quotes
smart-quotes --check
```

Apply fixes in-place:

```bash
smart-quotes --write
```

Scan a specific file or directory:

```bash
smart-quotes README.md --check
smart-quotes content/ --write
```

Control what gets scanned:

```bash
smart-quotes --paths src,content --ext .md,.mdx --write
```

Stdin mode (string transform):

```bash
echo "\"I'm \\\"Jacques\\\"\"" | smart-quotes --stdin
```

Stdin mode, preserving the **outer** attribute quotes (useful when your input string includes its own delimiter quotes):

```bash
echo "\"I'm \\\"Jacques\\\"\"" | smart-quotes --stdin --attr
```

### API

```js
const { toSmartQuotes, toSmartQuotesInsideAttributeValue } = require("@jacquesramphal/smart-quotes");

toSmartQuotes(`I'm "Jacques"`); // → I’m “Jacques”

// Preserves the outer delimiter quotes (safe for attribute-value strings)
toSmartQuotesInsideAttributeValue(`"I'm \"Jacques\""`); // → "I’m “Jacques”"
```

### What it will (and won’t) touch

- **Markdown / MDX**: skips fenced code blocks, inline code, raw HTML tags, and link destinations.
- **General guidance**: run this on prose/content files, not on source code (JS/TS/etc).

### Automate (optional)

- **CI**: fail the build when files need changes:

```bash
npx smart-quotes --check
```

- **Pre-commit**: auto-fix then stage:

```bash
npx smart-quotes --write
git add -A
```

### Notes / expectations

- This is **heuristic**, not a full typography engine.
- Always review diffs after running `--write`.
