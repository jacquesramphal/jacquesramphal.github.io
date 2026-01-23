<header>

# Smart Quotes Fixer

#### A tiny typography fix that prevents broken markup (freebie)

</header>

I have a soft spot for the kind of “tooling hygiene” that feels slightly over‑crafted… right up until the day it saves you from shipping a broken page.

This is one of those.

It started as a petty typography preference (the kind that triggers debates), and turned into a practical fix for a very common failure mode:

```txt
title="I'm "Jacques""
```

That looks harmless when you paste it. But it’s invalid markup because the inner `”` **closes the attribute early**. Depending on where it lands, it can break rendering, hydration, or just quietly eat half your copy.

So I made a small script that converts straight quotes to **Unicode smart quotes** *only where text is rendered*, so you can keep writing naturally without turning your templates into escape sequences.

> **Freebie (npm package + CLI)**  
> Install/runs anywhere: [`@jacquesramphal/smart-quotes`](https://www.npmjs.com/package/@jacquesramphal/smart-quotes)  
>  
> - Check your repo: `npx smart-quotes --check`  
> - Auto-fix: `npx smart-quotes --write`

## What are “straight” vs “smart” quotes?

- **Straight quotes**: `’` and `”` (ASCII)
  - Apostrophe: `I’m` uses `’`
  - Quotation marks: `“Hello”`
- **Smart / curly quotes**: `‘ ’ “ ”` (Unicode)
  - Apostrophe: `I’m`
  - Quotation marks: `“Hello”`

Smart quotes are typographically nicer in prose, and—importantly for templates—curly quotes inside text don’t conflict with the plain ASCII `”` delimiter used by HTML attributes.

## Why you’d want this (beyond vibes)

- **Prevents broken markup** when copy contains quotes inside attribute strings (`title=”...”`, `description=”...”`, etc.).
- **Makes content look more polished** (typographic quotes are standard in publishing).
- **Keeps code safe** by avoiding script expressions and code blocks.

## The typography snobbery (and the real reason this exists)

Smart quotes have a reputation: to some people they’re *basic typography*, to others they’re *pedantry*. You’ll see them used as a quiet signal of craft—especially in publishing, design writing, and “brand voice” work.

Two things can be true at once:
- **Yes, it’s partly aesthetics** (curly quotes read better in long-form text).
- **But it’s also practical engineering**: curly quotes in prose don’t conflict with the plain ASCII `”` that often delimits attributes/strings in markup, so they help prevent “I pasted a sentence and broke the template” moments.

## The rule: only touch what the user will read

If you do “smart quotes” with straight search/replace, you’ll eventually break something.

The safe, framework-agnostic approach is:
- Parse your source into an AST
- Transform **only rendered text nodes**
- Skip anything that’s code (expressions, bindings, code blocks)

That’s the entire philosophy of this script: treat prose like prose, and treat code like code.

## What this repo’s script changes (and what it never touches)

In this repo, the implementation:
- **Parses Vue SFCs** and edits only the `<template>` section.
- Converts quotes in:
  - **Rendered text nodes** (what users see)
  - **Safe static attribute values** used for copy (e.g. `title=”...”`, `description=”...”`)
- **Skips**:
  - `<script>` / `<style>`
  - Vue bindings and expressions (`:title=”...”`, `v-if=”...”`, `{{ ... }}`)
  - `<pre>` / `<code>` descendants (rendered code)
- For attributes, it **preserves the outer delimiter quotes** and only smartens the inside.

## The “freebie” part: the core transform

This is the heart of it: given plain text, convert straight quotes to curly quotes with a small set of heuristics (plus a helper that preserves attribute delimiters).

```js
function toSmartQuotes(input) {
  if (!input || (!input.includes("'") && !input.includes('"'))) return input;

  const isWordChar = (ch) => Boolean(ch) && /[A-Za-z0-9]/.test(ch);
  const isOpeningQuote = (prevCh, nextCh) => {
    // Use immediate neighbors, otherwise: `word "Quote"` gets misclassified.
    const prevIsBoundary =
      !prevCh || /\s/.test(prevCh) || /[([{<]/.test(prevCh) || /[–—-]/.test(prevCh);
    const nextIsWordish = Boolean(nextCh) && !/[\s)\]}>.,;:!?]/.test(nextCh);
    return prevIsBoundary && nextIsWordish;
  };

  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];

    if (ch === '"') {
      const prevCh = input[i - 1] ?? "";
      const nextCh = input[i + 1] ?? "";
      out += isOpeningQuote(prevCh, nextCh) ? "“" : "”";
      continue;
    }

    if (ch === "'") {
      const prevCh = input[i - 1] ?? "";
      const nextCh = input[i + 1] ?? "";

      // Apostrophes inside words: I'm, Orium's, designers'
      if (isWordChar(prevCh) && isWordChar(nextCh)) {
        out += "’";
        continue;
      }

      out += isOpeningQuote(prevCh, nextCh) ? "‘" : "’";
      continue;
    }

    out += ch;
  }

  return out;
}

function toSmartQuotesInsideAttributeValue(valueSource) {
  const src = String(valueSource ?? "");
  if (!src) return src;

  // Preserve the delimiter quotes (must remain ' or "), only smarten the inside.
  const first = src[0];
  const last = src[src.length - 1];
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return first + toSmartQuotes(src.slice(1, -1)) + last;
  }

  return toSmartQuotes(src);
}
```

## Usage (this repo)

Auto-fix (tool mode):

```bash
pnpm smart-quotes
```

CI / pre-commit check (fails if changes are needed):

```bash
pnpm smart-quotes:check
```

Target a specific file:

```bash
smart-quotes src/pages/HomePage.vue --write
```

If you want to include Markdown scanning, pass extensions explicitly:

```bash
smart-quotes --paths src --ext .vue,.md,.mdx --write
```

