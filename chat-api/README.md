# ramphal.design — chat API

A single serverless function that powers the site's "Let's chat" guide, backed
by Claude. It replaces the old n8n webhook. The site itself stays on GitHub
Pages; only this endpoint runs on Vercel.

```
chat-api/
├── api/
│   ├── chat.js        # the serverless function (Vercel Node runtime)
│   └── _context.json  # generated corpus (committed; colocated so Vercel bundles it)
├── package.json       # no runtime deps — Anthropic + Upstash called via fetch
└── vercel.json        # function config
```

## How it works

- The Vue widget (`../src/components/CustomChatUI.vue`) POSTs
  `{ chatInput, sessionId, metadata }` to this function and renders `output`.
- The function sends your **public** writing/work/bio to Claude as a
  **prompt-cached** system block, so after the first call that context is
  ~90% cheaper and adds almost no latency.
- Content comes from `_context.json`, generated from the live repo by
  `../scripts/build-chat-context.mjs`. Private (`private: true`) and draft
  (`published: false`) library entries are excluded.

## One-time deploy (your Vercel account)

1. Push this branch.
2. In Vercel: **New Project** → import this repo → set **Root Directory** to
   `chat-api`. Framework preset: **Other**. (Root Directory scoping keeps the
   deploy independent of the site's pnpm monorepo. The function has no npm
   dependencies — it calls the Anthropic and Upstash REST APIs via `fetch`.)
3. Add an environment variable **`ANTHROPIC_API_KEY`** (your Anthropic key).
   Optional: `CHAT_MODEL` (default `claude-haiku-4-5`), `ALLOWED_ORIGINS`,
   `MAX_INPUT_CHARS`, `SESSION_TTL_SECONDS` (default 86400).
4. Deploy. Your endpoint is `https://<project>.vercel.app/api/chat`.

## Conversation memory (Vercel KV)

Follow-up questions ("how long did that take?") only work if the function
remembers the thread. It does this with a Vercel KV / Upstash Redis store,
keyed by the widget's `sessionId`.

1. In your Vercel project: **Storage** → create a **KV** (Upstash Redis) store.
2. **Connect** it to this project. Vercel auto-injects the connection env vars
   (`KV_REST_API_URL` / `KV_REST_API_TOKEN`, or the `UPSTASH_REDIS_REST_*`
   pair) — the function reads whichever it finds.
3. Redeploy. Memory is now on; history expires after `SESSION_TTL_SECONDS`.

> **Do not put KV credentials in `vercel.json` or any committed file** — that
> would publish them. They belong only in Vercel's env vars, which the
> "Connect to Project" step sets for you.

**Until a store is connected the function runs statelessly** — it still
answers, just without memory. Connecting KV later needs no code change.

> If your Vercel plan rejects `maxDuration: 30` in `vercel.json`, lower it or
> remove the `functions` block (the default is plenty for Haiku).

## Point the widget at it

In `../src/components/CustomChatUI.vue`, change the `webhookUrl` prop default
from the old n8n URL to your deployed endpoint:

```js
webhookUrl: {
  type: String,
  default: 'https://<project>.vercel.app/api/chat',
},
```

(Or pass `:webhook-url` where `<CustomChatUI />` is used.) Then rebuild/deploy
the site. This is the only change to the site itself.

## Refreshing the context

Content is baked into `_context.json` at generation time (it is not read live
per request).

**Automatic:** the `.github/workflows/refresh-chat-context.yml` Action
regenerates `_context.json` and commits it whenever you push changes under
`src/assets/content/`, `src/assets/data/`, or `public/resume.md`. That commit
redeploys the Vercel function with the updated corpus. Unrelated pushes don't
trigger it.

**Manual** (if you ever need it):

```sh
node scripts/build-chat-context.mjs   # run from the repo root
git add chat-api/api/_context.json && git commit -m "chat: refresh context"
```

## Local test

```sh
cd chat-api && npm install
ANTHROPIC_API_KEY=sk-... npx vercel dev     # serves /api/chat locally
```

## Notes

- **Memory:** on when a KV store is connected (see above); stateless
  otherwise. History is capped to the last ~12 messages per session to bound
  token cost, and expires after `SESSION_TTL_SECONDS`.
- **Billing:** the Claude **API** is separate from a Claude Pro/Max
  subscription — Pro does **not** include API access. Fund a small balance and
  create a key at console.anthropic.com, and set a monthly spend limit. Haiku
  + prompt caching keeps a typical answer well under a cent. Hosting (Vercel)
  and KV both have free tiers that cover a personal site.
