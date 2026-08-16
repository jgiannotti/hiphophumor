#!/usr/bin/env node
/**
 * Refresh / validate the "Trending in Rap" headline strip (data/trending.json).
 *
 * RIGHT NOW: this is a validator + normalizer. It reads trending.json, enforces
 * the schema, trims fields, drops broken entries, and rewrites a clean file.
 * It is wired into the GitHub Action so the strip is always well-formed.
 *
 * TODO (future, when someone wants to fully automate the news layer):
 *   Replace the validate-only body with a real fetch — e.g. pull RSS from
 *   xxlmag.com / hotnewhiphop.com / hiphopdx.com, run headlines through a
 *   cheap LLM (or simple heuristics) to produce {title, blurb, source, url},
 *   then write the top ~10. Keep the same schema so the UI never changes.
 *   Until then, headlines are hand-seeded and refreshed by editing this JSON.
 *
 * Usage:
 *   node scripts/refresh-trending.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const FILE = path.join(REPO_ROOT, 'data', 'trending.json');

const MAX_ITEMS = 14;

function clean(s, max) {
  return String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function isHttpUrl(u) {
  try {
    const url = new URL(u);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function main() {
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch (e) {
    console.error(`Could not read/parse ${FILE}: ${e.message}`);
    process.exit(1);
  }

  if (!Array.isArray(raw)) {
    console.error('trending.json must be a JSON array. Aborting.');
    process.exit(1);
  }

  const seen = new Set();
  const normalized = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const title = clean(item.title, 140);
    const blurb = clean(item.blurb, 240);
    const source = clean(item.source, 40) || 'Source';
    const url = clean(item.url, 500);
    if (!title) continue;
    if (!isHttpUrl(url)) {
      console.warn(`  Skipping "${title}" — bad/missing url.`);
      continue;
    }
    const key = title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push({ title, blurb, source, url });
  }

  const final = normalized.slice(0, MAX_ITEMS);

  if (final.length === 0) {
    console.error('No valid trending items survived. Keeping existing file untouched.');
    process.exit(0);
  }

  fs.writeFileSync(FILE, JSON.stringify(final, null, 2) + '\n');
  console.log(`✅ Validated & normalized ${final.length} trending headlines -> ${FILE}`);
}

main();
