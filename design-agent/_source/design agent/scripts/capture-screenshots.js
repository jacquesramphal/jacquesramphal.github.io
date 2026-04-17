#!/usr/bin/env node
/**
 * capture-screenshots.js
 *
 * Captures full-page scrolling screenshots of all Storybook stories.
 * Template stories (4-templates) are captured in fullscreen iframe mode
 * at 1440px wide — no sidebars, no toolbars.
 *
 * Requires puppeteer:
 *   cd storybook && pnpm add -D puppeteer
 *   (or: npm install -g puppeteer)
 *
 * Usage:
 *   node scripts/capture-screenshots.js [options]
 *
 * Options:
 *   --url <url>         Storybook base URL       (default: http://localhost:6006)
 *   --output <dir>      Output directory         (default: screenshots/YYYY-MM-DD)
 *   --filter <str>      Only capture story IDs containing this string
 *   --width <px>        Default viewport width   (default: 1440)
 *   --mobile            Also capture at 375px mobile width
 *   --delay <ms>        Wait after navigation    (default: 600)
 *   --concurrency <n>   Parallel pages           (default: 3)
 *
 * Examples:
 *   node scripts/capture-screenshots.js
 *   node scripts/capture-screenshots.js --filter 4-templates
 *   node scripts/capture-screenshots.js --filter banner --mobile
 *   node scripts/capture-screenshots.js --url http://localhost:6007 --output ./tmp/shots
 */

const path = require('path')
const fs = require('fs')

// ─── CLI args ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2)

function getArg(flag, defaultVal) {
  const idx = args.indexOf(flag)
  if (idx === -1) return defaultVal
  return args[idx + 1]
}

const BASE_URL     = getArg('--url', 'http://localhost:6006')
const FILTER       = getArg('--filter', null)
const MOBILE       = args.includes('--mobile')
const DEFAULT_W    = parseInt(getArg('--width', '1440'), 10)
const DELAY        = parseInt(getArg('--delay', '600'), 10)
const CONCURRENCY  = parseInt(getArg('--concurrency', '3'), 10)
const TODAY        = new Date().toISOString().split('T')[0]
const OUTPUT_ROOT  = getArg('--output', path.resolve(__dirname, '..', 'screenshots', TODAY))

// ─── Puppeteer check ────────────────────────────────────────────────────────

let puppeteer
const PUPPETEER_PATHS = [
  path.resolve(__dirname, '../storybook/node_modules/puppeteer'),
  path.resolve(__dirname, '../storybook/apps/storybook/node_modules/puppeteer'),
  path.resolve(__dirname, '../node_modules/puppeteer'),
  'puppeteer',
]

try {
  for (const p of PUPPETEER_PATHS) {
    try { puppeteer = require(p); break } catch { /* try next */ }
  }
  if (!puppeteer) throw new Error('not found')
} catch {
  console.error('\n[capture-screenshots] puppeteer not found.\n')
  console.error('Install it in the storybook workspace:')
  console.error('  cd storybook && pnpm add -D puppeteer\n')
  console.error('Or globally:')
  console.error('  npm install -g puppeteer\n')
  process.exit(1)
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/**
 * Determine the output subdirectory for a story based on its title.
 * e.g. "Accelerator/UI/4-Templates/HomePage" → "4-templates/homepage"
 */
function getOutputDir(title) {
  const parts = title.split('/').map(slugify)
  // Drop the first part ("accelerator") if it's a generic namespace
  const relevant = parts.length > 2 ? parts.slice(1) : parts
  // Use the section (e.g. "4-templates") as a subfolder
  return path.join(OUTPUT_ROOT, ...relevant.slice(0, -1))
}

/**
 * Is this a full-page template story?
 * Matches "4-templates" in the story ID or title.
 */
function isTemplate(story) {
  return story.id.includes('4-templates') || story.title.toLowerCase().includes('4-templates')
}

async function fetchStoryIndex() {
  const url = `${BASE_URL}/index.json`
  // Use Node 18+ fetch, fall back to http module
  let json
  if (typeof fetch !== 'undefined') {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
    json = await res.json()
  } else {
    const https = require(url.startsWith('https') ? 'https' : 'http')
    json = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
          try { resolve(JSON.parse(data)) }
          catch (e) { reject(e) }
        })
      }).on('error', reject)
    })
  }
  return json
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// ─── Screenshot capture ─────────────────────────────────────────────────────

async function captureStory(page, story, width) {
  const iframeUrl = `${BASE_URL}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`
  const outDir = getOutputDir(story.title)
  fs.mkdirSync(outDir, { recursive: true })

  const widthSuffix = width < 800 ? `--mobile` : ''
  const filename = `${story.id.split('--').pop() || 'default'}${widthSuffix}.png`
  const outPath = path.join(outDir, filename)

  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
  await page.goto(iframeUrl, { waitUntil: 'networkidle2', timeout: 15000 })

  // Extra wait for fonts, animations, lazy images
  await sleep(DELAY)

  // For templates, also wait for any hero images to load
  if (isTemplate(story)) {
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map((img) => new Promise((res) => { img.onload = res; img.onerror = res }))
      )
    }).catch(() => {})
    await sleep(200)
  }

  await page.screenshot({ path: outPath, fullPage: true })
  return outPath
}

// ─── Concurrency pool ────────────────────────────────────────────────────────

async function runPool(tasks, concurrency) {
  const results = []
  let i = 0
  async function worker() {
    while (i < tasks.length) {
      const idx = i++
      results[idx] = await tasks[idx]()
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker())
  await Promise.all(workers)
  return results
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n[capture-screenshots] Fetching story index from ${BASE_URL}/index.json …`)

  let index
  try {
    index = await fetchStoryIndex()
  } catch (err) {
    console.error(`\n[capture-screenshots] Could not reach Storybook at ${BASE_URL}`)
    console.error('Make sure Storybook is running: cd storybook && pnpm run storybook\n')
    process.exit(1)
  }

  // Storybook v8 uses "entries", older versions use "stories"
  const allEntries = Object.values(index.entries || index.stories || {})
  const stories = allEntries.filter((e) => {
    if (e.type && e.type !== 'story') return false  // skip docs pages
    if (FILTER && !e.id.includes(FILTER) && !e.title.toLowerCase().includes(FILTER)) return false
    return true
  })

  if (stories.length === 0) {
    console.error(`[capture-screenshots] No stories found${FILTER ? ` matching "${FILTER}"` : ''}.`)
    process.exit(1)
  }

  console.log(`[capture-screenshots] Found ${stories.length} stories — saving to ${OUTPUT_ROOT}`)
  if (FILTER) console.log(`[capture-screenshots] Filter: "${FILTER}"`)
  if (MOBILE)  console.log(`[capture-screenshots] Mobile captures enabled (375px)`)
  console.log()

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let done = 0
  let failed = 0

  // Build task list — desktop + optional mobile
  const widths = MOBILE ? [DEFAULT_W, 375] : [DEFAULT_W]

  const tasks = stories.flatMap((story) =>
    widths.map((width) => async () => {
      // Create a fresh page per task (returned to pool by closing after use)
      const page = await browser.newPage()
      try {
        const outPath = await captureStory(page, story, width)
        done++
        const label = `${story.id}${width < 800 ? ' (mobile)' : ''}`
        console.log(`  [${done}/${stories.length * widths.length}] ${label}`)
        return { ok: true, outPath }
      } catch (err) {
        failed++
        console.error(`  [FAIL] ${story.id}: ${err.message}`)
        return { ok: false, story, error: err.message }
      } finally {
        await page.close()
      }
    })
  )

  await runPool(tasks, CONCURRENCY)
  await browser.close()

  // ─── Summary ────────────────────────────────────────────────────────────
  console.log()
  console.log(`────────────────────────────────────────────`)
  console.log(`  Screenshots saved to: ${OUTPUT_ROOT}`)
  console.log(`  Done:   ${done}`)
  if (failed > 0) console.log(`  Failed: ${failed}`)
  console.log(`────────────────────────────────────────────\n`)

  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  console.error('[capture-screenshots] Fatal error:', err)
  process.exit(1)
})
