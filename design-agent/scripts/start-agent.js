#!/usr/bin/env node
/**
 * Loads the validation system prompt + context files, calls the Claude API,
 * and returns the parsed JSON response.
 *
 * Called by validate.js — not intended to be run directly.
 *
 * Environment variables required:
 *   ANTHROPIC_API_KEY — Claude API key
 *
 * Usage (from validate.js):
 *   const { runAgent } = require('./start-agent');
 *   const result = await runAgent({ systemPrompt, storyContent, manifest, clientRules });
 */

const https = require('https');

const MODEL = 'claude-opus-4-5';
const MAX_TOKENS = 4096;

/**
 * Calls the Claude API with the validation prompt and context.
 * Returns the parsed component-spec JSON object.
 */
async function runAgent({ systemPrompt, storyContent, manifest, clientRules }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set. Export it before running validate.js.');
  }

  const userMessage = buildUserMessage({ storyContent, manifest, clientRules });

  const requestBody = JSON.stringify({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userMessage }
    ]
  });

  const rawResponse = await post('https://api.anthropic.com/v1/messages', requestBody, {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01'
  });

  const parsed = JSON.parse(rawResponse);

  if (parsed.error) {
    throw new Error(`Claude API error: ${parsed.error.type} — ${parsed.error.message}`);
  }

  const text = parsed.content?.[0]?.text;
  if (!text) {
    throw new Error('Claude API returned an empty response.');
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Claude returned non-JSON output. Raw response:\n\n${text.slice(0, 500)}`
    );
  }
}

function buildUserMessage({ storyContent, manifest, clientRules }) {
  return [
    '## STORY_FILE',
    '```tsx',
    storyContent,
    '```',
    '',
    '## COMPONENT_MANIFEST',
    '```json',
    JSON.stringify(manifest, null, 2),
    '```',
    '',
    '## CLIENT_RULES',
    clientRules,
  ].join('\n');
}

function post(url, body, headers) {
  return new Promise((resolve, reject) => {
    const { hostname, pathname, search } = new URL(url);
    const options = {
      hostname,
      path: pathname + (search || ''),
      method: 'POST',
      headers: { ...headers, 'Content-Length': Buffer.byteLength(body) }
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString()));
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

module.exports = { runAgent };
