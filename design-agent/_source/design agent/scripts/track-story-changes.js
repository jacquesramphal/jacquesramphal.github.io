#!/usr/bin/env node
/**
 * track-story-changes.js
 *
 * Runs on git post-commit. Diffs all changed *.stories.tsx files and appends
 * structured entries to storybook/apps/storybook/stories/guides/changelog.json.
 *
 * Detects:
 *   - prop-added    : new argType category line added
 *   - prop-promoted : ⚠ Proposed category replaced by CMS Editable / Dev Only
 *   - prop-removed  : argType category line removed with no replacement
 *   - story-added   : new `export const Foo: Story` export
 *
 * Usage: node scripts/track-story-changes.js
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const CHANGELOG_PATH = path.resolve(
  __dirname,
  '../storybook/apps/storybook/stories/guides/changelog.json'
)

// ─── Git helpers ─────────────────────────────────────────────────────────────

function getChangedStoryFiles() {
  try {
    // --diff-filter=AM: Added or Modified only
    const out = execSync('git diff HEAD~1 --name-only --diff-filter=AM 2>/dev/null', {
      encoding: 'utf8',
    })
    return out
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.endsWith('.stories.tsx'))
  } catch {
    // First commit — compare against empty tree
    try {
      const out = execSync(
        'git diff --cached --name-only --diff-filter=AM 2>/dev/null',
        { encoding: 'utf8' }
      )
      return out
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f.endsWith('.stories.tsx'))
    } catch {
      return []
    }
  }
}

function getFileDiff(filePath) {
  try {
    return execSync(`git diff HEAD~1 -- "${filePath}" 2>/dev/null`, { encoding: 'utf8' })
  } catch {
    try {
      return execSync(`git diff --cached -- "${filePath}" 2>/dev/null`, { encoding: 'utf8' })
    } catch {
      return ''
    }
  }
}

function getCommitHash() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

function getToday() {
  return new Date().toISOString().split('T')[0]
}

// ─── Path helpers ─────────────────────────────────────────────────────────────

function getComponentName(filePath) {
  const match = filePath.match(/\/([^/]+)\.stories\.tsx$/)
  return match ? match[1] : path.basename(filePath, '.stories.tsx')
}

function getSection(filePath) {
  const match = filePath.match(/stories\/ui\/([\d]+-[^/]+)/)
  if (match) return match[1]
  if (filePath.includes('/foundations/')) return 'foundations'
  if (filePath.includes('/guides/')) return 'guides'
  return 'other'
}

// ─── Diff parser ──────────────────────────────────────────────────────────────

function parseChanges(diff) {
  const changes = []

  const diffLines = diff.split('\n')

  // Walk the diff once, building deduplicated (prop, category) pairs per sign.
  // Using a Map keyed by `prop::category` prevents the same entry appearing
  // multiple times when git shows the same line across repeated hunk contexts.
  const propCategoryPairs = { added: new Map(), removed: new Map() }

  for (let i = 0; i < diffLines.length; i++) {
    const line = diffLines[i]
    const sign = (line.startsWith('+') && !line.startsWith('+++')) ? 'added'
               : (line.startsWith('-') && !line.startsWith('---')) ? 'removed'
               : null
    if (!sign) continue

    const catMatch = line.match(/category:\s*['"]([^'"]+)['"]/)
    if (!catMatch) continue

    const category = catMatch[1]

    // Walk back up to 10 lines to find the argType prop key (e.g. `  size: {`)
    // Skip 'argTypes' and 'table' — those are containers, not prop names
    let propName = null
    for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
      const raw = diffLines[j].replace(/^[+-]/, '')
      const propMatch = raw.match(/^\s{2,4}(\w+):\s*\{/)
      if (propMatch && propMatch[1] !== 'argTypes' && propMatch[1] !== 'table') {
        propName = propMatch[1]
        break
      }
    }

    const key = `${propName}::${category}`
    propCategoryPairs[sign].set(key, { category, propName })
  }

  const addedEntries = [...propCategoryPairs.added.values()]
  const removedEntries = [...propCategoryPairs.removed.values()]
  const addedCategories = addedEntries.map((e) => e.category)
  const removedCategories = removedEntries.map((e) => e.category)

  // Detect promotions: ⚠ Proposed removed and a confirmed category added
  const hadProposedRemoval = removedCategories.some((c) => c.includes('⚠ Proposed'))
  for (const removed of removedEntries) {
    if (removed.category.includes('⚠ Proposed')) {
      const promoted = addedEntries.find((e) => !e.category.includes('⚠ Proposed'))
      changes.push({
        type: 'prop-promoted',
        prop: promoted?.propName || removed.propName || null,
        from: removed.category,
        to: promoted?.category || null,
        description: `Promoted from proposed to ${promoted?.category || 'confirmed'}. Update review status.`,
      })
    }
  }

  // Detect new proposed props
  for (const entry of addedEntries) {
    if (entry.category.includes('⚠ Proposed') && !hadProposedRemoval) {
      changes.push({
        type: 'prop-added',
        prop: entry.propName,
        from: null,
        to: entry.category,
        description: `New prop${entry.propName ? ` "${entry.propName}"` : ''} proposed — pending CMS schema review.`,
      })
    }
  }

  // Detect new confirmed props added directly
  for (const entry of addedEntries) {
    if (!entry.category.includes('⚠ Proposed') && !hadProposedRemoval) {
      changes.push({
        type: 'prop-added',
        prop: entry.propName,
        from: null,
        to: entry.category,
        description: `New prop${entry.propName ? ` "${entry.propName}"` : ''} added as ${entry.category}.`,
      })
    }
  }

  // Detect removed props (no corresponding addition)
  for (const entry of removedEntries) {
    if (!entry.category.includes('⚠ Proposed') && !addedCategories.length) {
      changes.push({
        type: 'prop-removed',
        prop: entry.propName,
        from: entry.category,
        to: null,
        description: `Prop${entry.propName ? ` "${entry.propName}"` : ''} removed.`,
      })
    }
  }

  // Detect new story exports — deduplicate by name
  const addedStories = [...new Set(
    diffLines
      .filter((l) => l.startsWith('+') && !l.startsWith('+++'))
      .map((l) => { const m = l.match(/^\+export const (\w+):\s*Story/); return m ? m[1] : null })
      .filter(Boolean)
  )]

  for (const story of addedStories) {
    changes.push({
      type: 'story-added',
      prop: null,
      from: null,
      to: null,
      description: `New story variant: ${story}.`,
    })
  }

  return changes
}

// ─── Changelog I/O ────────────────────────────────────────────────────────────

function loadChangelog() {
  if (fs.existsSync(CHANGELOG_PATH)) {
    return JSON.parse(fs.readFileSync(CHANGELOG_PATH, 'utf8'))
  }
  return { entries: [] }
}

function saveChangelog(data) {
  fs.writeFileSync(CHANGELOG_PATH, JSON.stringify(data, null, 2) + '\n')
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const changedFiles = getChangedStoryFiles()

if (changedFiles.length === 0) {
  console.log('[changelog] No story files changed — nothing to log.')
  process.exit(0)
}

const changelog = loadChangelog()
const date = getToday()
const commit = getCommitHash()
let added = 0

for (const filePath of changedFiles) {
  const component = getComponentName(filePath)
  const section = getSection(filePath)
  const diff = getFileDiff(filePath)
  const changes = parseChanges(diff)

  for (const change of changes) {
    changelog.entries.unshift({
      date,
      component,
      section,
      type: change.type,
      prop: change.prop || null,
      from: change.from,
      to: change.to,
      description: change.description,
      review: {
        internal: 'pending',
        client: 'n/a',
      },
      commit,
    })
    added++
  }
}

if (added > 0) {
  saveChangelog(changelog)
  console.log(`[changelog] ${added} entr${added === 1 ? 'y' : 'ies'} added from ${changedFiles.length} file(s).`)
} else {
  console.log('[changelog] Story files changed but no trackable events detected.')
}
