#!/usr/bin/env node
/* eslint-disable no-console */

const { toSmartQuotes, toSmartQuotesInsideAttributeValue } = require("./index.js");

function help() {
  console.log(
    [
      "@jacquesramphal/smart-quotes",
      "",
      "Usage:",
      "  smart-quotes              # smarten quotes from stdin → stdout",
      "  smart-quotes --attr       # treat stdin as a quoted attribute value (preserve outer quotes)",
      "",
      "Examples:",
      "  echo '\"Hello\"' | smart-quotes",
      "  echo 'title=\"I\\'m \"Jacques\"\"' | smart-quotes",
      "  echo '\"I\\'m \"Jacques\"\"' | smart-quotes --attr",
      "",
    ].join("\n")
  );
}

const argv = process.argv.slice(2);
if (argv.includes("--help") || argv.includes("-h")) {
  help();
  process.exit(0);
}

const asAttr = argv.includes("--attr");

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});
process.stdin.on("end", () => {
  const out = asAttr ? toSmartQuotesInsideAttributeValue(input.trimEnd()) : toSmartQuotes(input.trimEnd());
  process.stdout.write(out);
  if (!out.endsWith("\n")) process.stdout.write("\n");
});

