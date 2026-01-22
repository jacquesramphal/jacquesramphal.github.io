function isWordChar(ch) {
  return Boolean(ch) && /[A-Za-z0-9]/.test(ch);
}

function isOpeningQuote(prevCh, nextCh) {
  // Use immediate neighbors (not prevNonSpace), otherwise: `word "Quote"` gets misclassified.
  const prevIsBoundary =
    !prevCh || /\s/.test(prevCh) || /[([{<]/.test(prevCh) || /[–—-]/.test(prevCh);
  const nextIsWordish = Boolean(nextCh) && !/[\s)\]}>.,;:!?]/.test(nextCh);
  return prevIsBoundary && nextIsWordish;
}

function toSmartQuotes(input) {
  if (!input || (!input.includes("'") && !input.includes('"'))) return input;

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

      // Apostrophes inside words: I'm, Orium's, designers' (common prose)
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
  // Useful for values like: title="I'm \"Jacques\"" → title="I’m “Jacques”"
  const first = src[0];
  const last = src[src.length - 1];
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return first + toSmartQuotes(src.slice(1, -1)) + last;
  }

  return toSmartQuotes(src);
}

module.exports = {
  toSmartQuotes,
  toSmartQuotesInsideAttributeValue,
};

