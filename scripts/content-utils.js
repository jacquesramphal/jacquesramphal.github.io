/**
 * Shared helpers for the content-derived build outputs (sitemap companions):
 * RSS feed and llms.txt. Single source of truth for how library.json entries
 * map to public URLs, which entries are publishable, and how "Mon YYYY" dates
 * parse.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ramphal.design';

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// Parse the human "Mon YYYY" format used in library.json into a Date (day 1).
// Returns null for empty/unparseable values.
function parseEntryDate(value) {
  if (!value || typeof value !== 'string') return null;
  const m = value.trim().match(/^([A-Za-z]{3})[a-z]*\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTHS[m[1].toLowerCase()];
  if (month == null) return null;
  return new Date(Date.UTC(parseInt(m[2], 10), month, 1));
}

function loadEntries() {
  const libraryPath = path.join(__dirname, '../src/assets/data/library.json');
  const library = JSON.parse(fs.readFileSync(libraryPath, 'utf-8'));
  return Array.isArray(library.entries) ? library.entries : [];
}

// Scaffolding / format-reference docs that shouldn't be syndicated as content.
const EXCLUDE_SLUGS = new Set(['template']);

// A private/internal doc opts out of syndication via its description.
function isPrivate(entry) {
  return (
    EXCLUDE_SLUGS.has(entry.slug) ||
    /\bprivate\b/i.test(entry.description || '') ||
    entry.type === 'planning'
  );
}

function urlFor(entry) {
  if (entry.route && entry.route.startsWith('/')) return `${BASE_URL}${entry.route}`;
  if (entry.slug) return `${BASE_URL}/doc/${entry.slug}`;
  return null;
}

// Entries safe to publish in a feed / index, grouped-friendly and newest-first.
function publishableEntries(types) {
  const allow = new Set(types);
  return loadEntries()
    .filter((e) => allow.has(e.type) && e.slug && !isPrivate(e) && urlFor(e))
    .sort((a, b) => {
      const da = parseEntryDate(a.date);
      const db = parseEntryDate(b.date);
      return (db ? db.getTime() : 0) - (da ? da.getTime() : 0);
    });
}

module.exports = { BASE_URL, parseEntryDate, loadEntries, isPrivate, urlFor, publishableEntries };
