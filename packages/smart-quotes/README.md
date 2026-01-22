## @jacquesramphal/smart-quotes

Framework-agnostic helpers for converting "dumb" quotes (`'` and `"`) into Unicode smart quotes (`‘ ’ “ ”`).

This is meant to complement the “copy/paste freebie” version in the site docs: if you want the same behavior as a reusable module (or a tiny CLI), use this package.

### Install

```bash
npm i @jacquesramphal/smart-quotes
```

### API

```js
const { toSmartQuotes, toSmartQuotesInsideAttributeValue } = require("@jacquesramphal/smart-quotes");

toSmartQuotes(`I'm "Jacques"`); // → I’m “Jacques”

// Preserves the outer delimiter quotes (safe for attribute-value strings)
toSmartQuotesInsideAttributeValue(`"I'm \"Jacques\""`); // → "I’m “Jacques”"
```

### CLI

```bash
echo "\"Hello\"" | smart-quotes
echo "\"I'm \\\"Jacques\\\"\"" | smart-quotes --attr
```

### Notes

- This is **heuristic**, not a full typography engine.
- The “safe” approach in UI code is still: **only transform rendered text** and avoid code/bindings.

