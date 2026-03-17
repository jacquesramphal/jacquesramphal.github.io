![Smart Quotes Fixer](../images/placeholders/placeholder-27.svg)

# Smart Quotes Fixer
A CLI that converts straight quotes to smart quotes in rendered content, without touching code.

| | |
|---|---|
| **Role** | Author |
| **Type** | npm Package |
| **Status** | Published |
| **Tags** | cli · npm |

## Overview

> Straight quotes inside attribute strings don't look wrong in the editor, but they break markup — and it's the kind of thing you don't notice until it's in production.

The failure mode is easy to miss: `title="I'm "Jacques""` — a sentence with inner double quotes that closes the attribute early, eating the rest of the copy or breaking the rendering entirely. It happens whenever someone pastes copy from a document into a template without thinking about the delimiter. Smart (curly) quotes prevent it, because `"` and `"` are different characters from the ASCII `"` that HTML uses to delimit attributes.

The script converts straight quotes to Unicode smart quotes in rendered text nodes only — leaving code, bindings, expressions, and attribute delimiters untouched. For Vue SFCs, it parses the template section and works only on what the user will actually read.

## The rule: only touch what the user will read

A naive search-and-replace on quotes will eventually break something. The safe approach: parse the source into an AST, transform only rendered text nodes, skip everything that's code.

For Vue SFCs, the script:
- Converts quotes in **rendered text nodes** and safe static attribute values (`title="..."`, `description="..."`)
- **Skips** `<script>` / `<style>`, Vue bindings and expressions (`:title="..."`, `v-if="..."`, `{{ ... }}`), and `<pre>` / `<code>` descendants
- Preserves the outer delimiter quote so attribute syntax stays valid

## The core transform

```js
function toSmartQuotes(input) {
  if (!input || (!input.includes("'") && !input.includes('"'))) return input;

  const isWordChar = (ch) => Boolean(ch) && /[A-Za-z0-9]/.test(ch);
  const isOpeningQuote = (prevCh, nextCh) => {
    const prevIsBoundary =
      !prevCh || /\s/.test(prevCh) || /[([{<]/.test(prevCh) || /[–—-]/.test(prevCh);
    const nextIsWordish = Boolean(nextCh) && !/[\s)\]}>.,;:!?]/.test(nextCh);
    return prevIsBoundary && nextIsWordish;
  };

  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === '"') {
      out += isOpeningQuote(input[i - 1] ?? "", input[i + 1] ?? "") ? "\u201C" : "\u201D";
      continue;
    }
    if (ch === "'") {
      const prevCh = input[i - 1] ?? "";
      const nextCh = input[i + 1] ?? "";
      // Apostrophes inside words: I'm, Orium's, designers'
      if (isWordChar(prevCh) && isWordChar(nextCh)) { out += "\u2019"; continue; }
      out += isOpeningQuote(prevCh, nextCh) ? "\u2018" : "\u2019";
      continue;
    }
    out += ch;
  }
  return out;
}
```

The attribute variant wraps the same logic but preserves the outer delimiter so `title="..."` stays valid after transformation.

## Use It

```bash
# Check for straight quotes (fails if changes needed — use in CI)
npx @jacquesramphal/smart-quotes --check

# Auto-fix
npx @jacquesramphal/smart-quotes --write

# Target a specific file
npx @jacquesramphal/smart-quotes src/pages/HomePage.vue --write

# Include Markdown
npx @jacquesramphal/smart-quotes --paths src --ext .vue,.md,.mdx --write
```

Available on npm: [`@jacquesramphal/smart-quotes`](https://www.npmjs.com/package/@jacquesramphal/smart-quotes) · Source on [GitHub](https://github.com/jacquesramphal/smart-quotes)
