---
name: step5-crawl-and-prune
description: Internal step of /audit — deep mode only — not invoked directly
user-invocable: false
---

# Step 5: Crawl and Prune (deep mode only)

Crawl the target site with hyperbrowser to get every reachable URL, then use Claude to prune that list down to a **representative subset** — one of each page type (home, PLP, PDP, cart, checkout, blog, blog detail, account, help, etc.) — so the audit loop doesn't screenshot 20 PDPs of the same template.

## Inputs to this step

- `inputs.baseUrl` — the site's base URL
- `HYPERBROWSER_CRAWL_MAX` = 100 (from `guides/config.md`)

## 1. Crawl with hyperbrowser

**Hyperbrowser only** — chrome-devtools cannot crawl (it's single-page). If hyperbrowser fails, the step errors with remediation text; we do not hand-roll a local crawler.

```js
const crawl = await mcp__hyperbrowser__crawl_webpages({
  url: inputs.baseUrl,
  followLinks: true,
  maxPages: HYPERBROWSER_CRAWL_MAX,        // 100
  ignoreSitemap: false,
  outputFormat: ["links"],
  sessionOptions: {
    useStealth: true,
    useProxy: true,
  },
});
// → crawl has an array of pages, each with its discovered links.
```

Flatten all discovered links into a single deduplicated list:

```js
const allUrls = Array.from(new Set(
  crawl.pages.flatMap(p => p.links || [])
));
```

Same-origin only — filter out any link whose origin doesn't match `new URL(inputs.baseUrl).origin`. External links (CDNs, social, payment providers) get dropped here.

## 2. Prune with Claude

Load the system prompt from `audit/guides/prune-urls-prompt.md`.

Make a Claude call with:
- System: the prune prompt
- User: `{ "baseUrl": "<baseUrl>", "allUrls": [ ...allUrls... ] }`

Parse the JSON block as `{ key_urls: string[] }`.

Sanity-check the response:
- `key_urls[0]` must equal `inputs.baseUrl` (prompt enforces this; re-check in code).
- `key_urls.length` between 1 and 20 inclusive. If >20, take the first 20 and warn; if <1, fall back to `[inputs.baseUrl]` plus a user prompt to add URLs manually.

## 3. Confirm with the user

Print the pruned list and ask for confirmation (`AskUserQuestion`) before looping Steps 3+4 across it:

```
"I'm ready to audit these <N> URLs. Proceed?"

  1. https://client.com              (home)
  2. https://client.com/products     (PLP)
  3. https://client.com/product/abc  (PDP)
  ...

options:
  - "Yes, audit all <N>"              → continue to loop
  - "Remove some URLs"                → re-prompt for which to drop, then loop
  - "Cancel"                          → stop the command
```

If the user removes URLs, apply the removals and re-confirm once before looping.

## 4. Save pruned URLs to disk

**Always save the pruned URL list to disk** before proceeding — this preserves state across sessions and allows resuming without re-crawling.

```bash
# Write one URL per line to the domain's folder
python3 -c "
import sys
urls = sys.argv[1:]
with open(sys.argv[0], 'w') as f:
    f.write('\n'.join(urls))
" "{domainFolder}/urls-crawled.txt" {pruned_url_1} {pruned_url_2} ...
```

Or via evaluate_script → Bash write:
```js
// After prune is confirmed, write to disk
const urlsText = pruned.join('\n');
// Bash: echo "$urlsText" > "{domainFolder}/urls-crawled.txt"
```

## 5. Pass forward

Emit:
```js
deepUrls = {
  pruned: ["https://client.com", ...],     // the final list (also saved to urls-crawled.txt)
  sourceCrawlCount: allUrls.length,        // for reporting in Step 7
}
```

The loop (in `audit.md`) then iterates `deepUrls.pruned` calling Step 3 + Step 4 per URL.

**Resume note:** If `{domainFolder}/urls-crawled.txt` already exists on disk, skip the crawl and prune steps and read from the file directly — no need to re-crawl.

## Failure handling

- If `mcp__hyperbrowser__crawl_webpages` fails with an auth error → surface the same remediation message as Step 3:
  ```
  Hyperbrowser crawl failed. Set HYPERBROWSER_API_KEY in ~/.env.mcp.
  ```
- If the crawl finds 0 pages beyond `baseUrl`:
  - The site may have no internal links discoverable via crawl.
  - Prompt the user: "Crawl returned 0 linked pages. Audit the baseUrl only?" — on confirm, set `pruned = [baseUrl]` and continue.
- If the prune call returns malformed JSON, retry once with firmer instruction; on second failure, fall back to a deterministic prune: dedupe by path template (`/x/*` collapsed to one representative) and take up to 15 URLs.

## References

- `mcp__hyperbrowser__crawl_webpages` tool surface
- `audit/guides/prune-urls-prompt.md`
- n8n reference: `HyperBrowser POC.json` → `HTTP Request` (crawl) + `OpenAI` / `OpenAI3` (prune)
