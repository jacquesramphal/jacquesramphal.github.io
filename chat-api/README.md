# ramphal.design — chat API

A single serverless function that powers the site's "Let's chat" guide, backed
by Claude. It replaces the old n8n webhook. The site itself stays on GitHub
Pages; only this endpoint runs on Vercel.

```
chat-api/
├── api/chat.js      # the serverless function (Vercel Node runtime)
├── _context.json    # generated corpus of public writing/work/bio (committed)
├── package.json     # only dependency: @anthropic-ai/sdk
└── vercel.json      # function config
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
   deploy independent of the site's pnpm monorepo — Vercel installs only
   `@anthropic-ai/sdk`.)
3. Add an environment variable **`ANTHROPIC_API_KEY`** (your Anthropic key).
   Optional: `CHAT_MODEL` (default `claude-haiku-4-5`), `ALLOWED_ORIGINS`,
   `MAX_INPUT_CHARS`.
4. Deploy. Your endpoint is `https://<project>.vercel.app/api/chat`.

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

Content is baked into `_context.json` at generation time. After you publish or
edit writing, regenerate and commit:

```sh
node scripts/build-chat-context.mjs   # run from the repo root
git add chat-api/_context.json && git commit -m "chat: refresh context"
```

A push redeploys the function with the updated corpus.

## Local test

```sh
cd chat-api && npm install
ANTHROPIC_API_KEY=sk-... npx vercel dev     # serves /api/chat locally
```

## Notes / limitations

- **Stateless:** each message is answered independently (the widget doesn't
  send history). Good enough for a site guide. Add conversation memory later
  with a KV store if needed.
- **Cost:** hosting is free-tier; the Claude API is pay-per-use. Haiku +
  prompt caching keeps a typical answer well under a cent. Set a spend limit
  on your Anthropic key.
