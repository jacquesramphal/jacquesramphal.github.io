# Chat backend — status & handoff

Self-hosted, n8n-free chatbot for ramphal.design. Answers as a site guide
using the site's public writing/work/bio as prompt-cached context, with
optional per-session memory. Built on the Claude API.

Branch: `claude/self-hosted-chatbot-options-18fll9`

---

## ✅ Done (code complete, on the branch)

- **`chat-api/api/chat.js`** — Vercel serverless function. CORS allowlist,
  input caps, prompt-cached corpus, model via `CHAT_MODEL` (default
  `claude-haiku-4-5`). Returns `{ output }` (matches the widget's payload).
- **Conversation memory** — optional, via Vercel KV / Upstash Redis, keyed by
  the widget's `sessionId`. Degrades to stateless if no store is connected;
  KV failures never break a reply. History capped to ~12 messages/session,
  expires after `SESSION_TTL_SECONDS` (24h).
- **`scripts/build-chat-context.mjs`** → `chat-api/_context.json` — corpus
  built from `library.json` / `work.json` / `resume.md`. Excludes `private`
  and `published:false` entries and the template. (30 sources, ~30k tokens.)
- **`chat-api/{package.json,vercel.json,README.md}`** — isolated deploy.
- **Widget repointed** — `src/components/CustomChatUI.vue` `webhookUrl`
  default now `https://ramphal-chat-api.vercel.app/api/chat` (was n8n).
- **Netlify removed** — `netlify.toml` and `.netlify/` deleted (unused).

Verified with a stubbed-SDK/stubbed-KV harness: CORS (allowed vs foreign
origin), method guard, input validation, happy path returning `{ output }`,
stateless vs KV memory, session isolation, and graceful KV-failure handling.
No live Claude call was possible in the build env (no API key there).

---

## ⏳ To do (you — "set up Vercel later")

1. **Anthropic API billing** (separate from Claude Pro — Pro has no API
   access): at console.anthropic.com add a small balance, create an API key,
   set a monthly spend limit.
2. **Deploy on Vercel** — import this repo. On the import screen:
   - **Root Directory → `chat-api`**  (not `./`)
   - **Framework Preset → Other**  (not Vue.js)
   - **Environment Variable** → `ANTHROPIC_API_KEY` = your key
   - Deploy. Endpoint: `https://<project>.vercel.app/api/chat`.
3. **Verify the domain** — confirm it is exactly
   `ramphal-chat-api.vercel.app`. If Vercel appended a suffix (name
   collision), update the `webhookUrl` default in `CustomChatUI.vue` to match.
4. **Enable memory** — Vercel → **Storage → create KV → Connect to Project**
   (auto-injects the KV env vars), then **redeploy**.
5. **Go live** — merge this branch to `main` so GitHub Pages rebuilds the site
   with the new `webhookUrl`. Until then the live site still points at the
   pre-existing default.

Full deploy detail: `chat-api/README.md`.

---

## Smoke test (after deploy)

```sh
# CORS preflight (expect 204 + Access-Control-Allow-Origin echoed)
curl -i -X OPTIONS https://ramphal-chat-api.vercel.app/api/chat \
  -H "Origin: https://ramphal.design" \
  -H "Access-Control-Request-Method: POST"

# Real answer (expect 200 + {"output":"..."})
curl -s -X POST https://ramphal-chat-api.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: https://ramphal.design" \
  -d '{"chatInput":"Who is Jacques Ramphal?","sessionId":"smoketest"}'
```

---

## Open flags (not blocking; left untouched by request)

- **`.env` is tracked in git** with live Contentful credentials — a real leak.
  Rotate the keys in Contentful, then untrack the file (`git rm --cached .env`
  + add to `.gitignore`). Ready to do this on request.
- **Vercel Hobby is non-commercial** per Vercel's terms. Fine for a personal
  portfolio; note it if the site actively pitches paid work.

---

## Refreshing the corpus (after publishing/editing writing)

```sh
node scripts/build-chat-context.mjs         # regenerates chat-api/_context.json
git add chat-api/_context.json && git commit -m "chat: refresh context"
```
A push redeploys the function with the updated content.
