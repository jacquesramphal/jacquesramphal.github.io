## @jacquesramphal/smart-quotes

Convert "straight" quotes (`'` and `"`) into Unicode smart quotes (`‘ ’ “ ”`) without breaking code.

This started as typography snobbery and became practical: pasted copy can break markup like:

```txt
title="I'm "Jacques""
```

The CLI in this package fixes quotes in **rendered content** (Vue templates + Markdown) while avoiding code/bindings.

### Install

```bash
npm i -D @jacquesramphal/smart-quotes
```

Run without installing:

```bash
npx smart-quotes --check
```

### CLI (recommended)

Scan the whole repo (default is check mode; exits 1 if changes needed):

```bash
smart-quotes
smart-quotes --check
```

Apply fixes:

```bash
smart-quotes --write
```

Scan just one file (the “current file” workflow):

```bash
smart-quotes src/pages/HomePage.vue --check
smart-quotes src/pages/HomePage.vue --write
```

Control what gets scanned:

```bash
smart-quotes --paths src,content --ext .vue,.md,.mdx --write
```

Stdin mode (string transform):

```bash
echo "\"I'm \\\"Jacques\\\"\"" | smart-quotes --stdin
echo "\"I'm \\\"Jacques\\\"\"" | smart-quotes --stdin --attr
```

### API

```js
const { toSmartQuotes, toSmartQuotesInsideAttributeValue } = require("@jacquesramphal/smart-quotes");

toSmartQuotes(`I'm "Jacques"`); // → I’m “Jacques”

// Preserves the outer delimiter quotes (safe for attribute-value strings)
toSmartQuotesInsideAttributeValue(`"I'm \"Jacques\""`); // → "I’m “Jacques”"
```

### Automate on commit (Husky)

Use **check** mode to block commits that introduce straight quotes:

```bash
pnpm smart-quotes:check
```

Or use **write** mode to auto-fix during commit:

```bash
pnpm smart-quotes
git add -A
```

### Publishing (npm + 2FA)

From `packages/smart-quotes`:

```bash
npm login
npm publish --otp=123456
```

### Notes / expectations

- This is **heuristic**, not a full typography engine.
- The scanner is safe by design, but you should still review diffs.

