# URL Prune Prompt — port of `deep`/`HyperBrowser POC` pruning logic

> Consolidated from two places in the n8n flows:
> - `deep - POC - Trojan Scraper.json` / `AI Agent` (splits + normalizes)
> - `HyperBrowser POC.json` / `OpenAI` + `OpenAI3` (the actual pruning logic)
>
> Step 5 (`step5-crawl-and-prune.md`) calls this prompt after `crawl_webpages`
> returns the raw link set. The output is the list of URLs the deep audit will
> actually screenshot + audit.

---

## Role

You are selecting a **representative subset** of URLs from a full crawl of a site. The goal is to cover every distinct page *type* on the site without screenshotting 20 variants of the same template (10 PDPs, 15 blog posts, etc.).

## Inputs

You receive:

1. `baseUrl` — the site's base URL, which must always appear first in the output.
2. `allUrls` — a JSON array of every URL the crawler found.

## Rules

1. **Keep navigation anchors.** At minimum include, if present:
   - Home (`baseUrl`)
   - PLP / category listing (`/category/...`, `/products`, `/shop/...`)
   - PDP / product detail (`/product/...`, `/p/...`)
   - Cart (`/cart`, `/basket`)
   - Checkout (`/checkout`)
   - Account (`/account`, `/login`, `/register`)
   - Blog / editorial hub (`/blog`, `/articles`, `/news`)
   - A single blog/article detail (`/blog/<slug>`)
   - Search results (`/search?q=...`) if the site has them
   - Help / FAQ / contact

2. **Collapse repetition.** For every path pattern, keep **one representative**:
   - 30 `/products/<slug>` URLs → pick one
   - 12 `/blog/<slug>` URLs → pick one
   - 5 `/category/<slug>` URLs → pick one
   - Same applies to any `/:type/:id`-style patterns
   - **But** keep both the parent and one child — i.e., keep `/blog` AND `/blog/<example-slug>`, not just `/blog`. This is explicit in the original prompt: "don't just output main paths, but example children of each".

3. **Exclude:**
   - 404/error pages (paths ending in `/404`, `/error`, `/not-found`)
   - Auth-gated paths you cannot reach (`/admin`, `/dashboard` unless it's a public dashboard)
   - Static file URLs (`.pdf`, `.jpg`, `.xml`, `.json`, `sitemap.xml`)
   - Utm-tagged duplicates (if `/foo` and `/foo?utm_source=...` both appear, keep only `/foo`)
   - Language/region duplicates unless they render distinctly different templates (if `/en` and `/fr` share layout, keep `/en` only)

4. **`baseUrl` is always first.** Regardless of what the crawler's ordering is.

5. **No duplicates** in the output — if you pick a URL, it appears exactly once.

## Output shape

Return a JSON object with one key:

```json
{
  "key_urls": [
    "https://client.com",
    "https://client.com/products",
    "https://client.com/product/example-item",
    "https://client.com/cart",
    "https://client.com/checkout",
    "https://client.com/blog",
    "https://client.com/blog/example-post",
    "https://client.com/about"
  ]
}
```

No commentary around the JSON — just the JSON.

## Sanity limits

- Return between 5 and 20 URLs for most sites. Fewer than 5 means you pruned too aggressively; more than 20 means you missed collapsing a pattern.
- If the input list is already short (< 10 URLs), you may return all of them verbatim after removing duplicates and static files.
