#!/usr/bin/env node
/**
 * Refresh the meme pool — TREND-DRIVEN edition.
 *
 * Instead of "top all-time" (evergreen, stale), this pulls RECENT windows
 * (last week + last month) from pullpush.io across a wide net of hip-hop
 * subreddits, then ranks by a blended heat score that favors high-scoring
 * posts from the last 7-30 days. The result reflects what's actually popping
 * off in rap right now, not what went viral in 2017.
 *
 * Designed to run on GitHub Actions runners (see .github/workflows/refresh.yml),
 * NOT on Vercel — Vercel/cloud IPs get blocked by Reddit. GitHub runners reach
 * pullpush fine, though pullpush itself may rate-limit or be down, so this
 * script is built to FAIL GRACEFULLY: if the live fetch yields too little, it
 * keeps the existing data/memes.json untouched and exits 0. It never nukes a
 * good pool with a bad fetch.
 *
 * Usage:
 *   node scripts/refresh-memes.mjs
 *
 * Env knobs (optional):
 *   MIN_KEEP=120   # if fewer than this many memes survive, abort & keep old data
 *   TARGET=300     # max memes to write
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.join(REPO_ROOT, 'data', 'memes.json');

const MIN_KEEP = parseInt(process.env.MIN_KEEP || '120', 10);
const TARGET = parseInt(process.env.TARGET || '300', 10);
const NOW = Math.floor(Date.now() / 1000);
const DAY = 86400;

// Subreddit -> weight. Mirrors lib/sources.ts (kept inline so the script has
// zero TS import dependency and runs under bare node on a CI runner).
const SUB_WEIGHTS = {
  hiphopcirclejerk: 2.0,
  rapbattles: 1.6,
  Drizzy: 1.6,
  KendrickLamar: 1.5,
  KanyeWest: 1.4,
  playboicarti: 1.4,
  TravisScott: 1.2,
  Eminem: 1.2,
  liluzivert: 1.2,
  JuiceWRLD: 1.1,
  JCole: 1.1,
  XXXTENTACION: 1.0,
  GriseldaRecords: 1.0,
  MFDOOM: 1.0,
  rap: 0.9,
  HipHopImages: 0.9,
  trapproduction: 0.8,
  hiphopheads: 0.7,
  rapmusic: 0.7,
};

// (subreddit, window) pairs to pull. "week" = last 7d, "month" = last 30d.
// We pull recent windows only — never all-time — so content stays current.
const PULLS = [
  // Hot this week — the trending core
  ['hiphopcirclejerk', 'week'],
  ['rapbattles', 'week'],
  ['Drizzy', 'week'],
  ['KendrickLamar', 'week'],
  ['KanyeWest', 'week'],
  ['playboicarti', 'week'],
  ['TravisScott', 'week'],
  ['Eminem', 'week'],
  ['liluzivert', 'week'],
  ['JuiceWRLD', 'week'],
  ['JCole', 'week'],
  ['XXXTENTACION', 'week'],
  ['rap', 'week'],
  ['hiphopheads', 'week'],
  ['rapmusic', 'week'],
  // Last 30 days — keeps the pool full + catches slower-burn subs
  ['hiphopcirclejerk', 'month'],
  ['Drizzy', 'month'],
  ['KendrickLamar', 'month'],
  ['KanyeWest', 'month'],
  ['playboicarti', 'month'],
  ['Eminem', 'month'],
  ['liluzivert', 'month'],
  ['GriseldaRecords', 'month'],
  ['MFDOOM', 'month'],
  ['HipHopImages', 'month'],
  ['trapproduction', 'month'],
];

const IMG_HOSTS = new Set(['i.redd.it', 'i.imgur.com', 'preview.redd.it']);
const IMG_RX = /\.(jpe?g|png|gif|webp)(\?|$)/i;
function isImg(url) {
  try {
    const u = new URL(url);
    return IMG_HOSTS.has(u.hostname) || IMG_RX.test(u.pathname);
  } catch {
    return false;
  }
}

// Brand/legal firewall. Edgy is fine; this is the hard line only.
const BLOCK = [
  'tranny', 'faggot', 'kike', 'spic ', 'chink', 'wetback', 'beaner',
  'retard',
  ' home address', ' phone number of ', 'leaked photos of', 'leaked nudes',
  'irl pic of ',
  'cp ', 'child p', 'underage', 'jailbait',
  'kys ', 'kill yourself',
];
function passes(title) {
  const t = (title || '').toLowerCase();
  return !BLOCK.some((b) => t.includes(b));
}

/**
 * Fetch one (subreddit, window) page from pullpush, sorted by score desc,
 * constrained to the time window via the `after` param. Robust: timeout,
 * retry-once, graceful empty return on any failure.
 */
async function fetchPull(sub, window, attempt = 1) {
  const afterDays = window === 'week' ? 7 : 30;
  const after = NOW - afterDays * DAY;
  const url =
    `https://api.pullpush.io/reddit/search/submission/` +
    `?subreddit=${encodeURIComponent(sub)}` +
    `&after=${after}` +
    `&size=100&sort=desc&sort_type=score`;
  try {
    const r = await fetch(url, {
      signal: AbortSignal.timeout(25000),
      headers: { 'User-Agent': 'hiphophumor-refresh/2.0 (+https://hiphophumor.com)' },
    });
    if (!r.ok) {
      // 429 / 5xx — back off once then give up gracefully
      if ((r.status === 429 || r.status >= 500) && attempt < 2) {
        console.error(`  r/${sub} [${window}]: HTTP ${r.status}, retrying in 3s...`);
        await sleep(3000);
        return fetchPull(sub, window, attempt + 1);
      }
      console.error(`  r/${sub} [${window}]: HTTP ${r.status} (skipping)`);
      return [];
    }
    const j = await r.json();
    return Array.isArray(j.data) ? j.data : [];
  } catch (e) {
    if (attempt < 2) {
      console.error(`  r/${sub} [${window}]: ${e.message}, retrying in 3s...`);
      await sleep(3000);
      return fetchPull(sub, window, attempt + 1);
    }
    console.error(`  r/${sub} [${window}]: ${e.message} (skipping)`);
    return [];
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function normalizeImageUrl(url) {
  if (!url) return null;
  let u = url.replace(/&amp;/g, '&');
  u = u.replace(/^http:\/\/i\.imgur\.com/, 'https://i.imgur.com');
  if (u.startsWith('http://')) return null;
  return u;
}

/**
 * Blended heat score. Trending = recent + popular. We multiply the raw upvote
 * score by a recency multiplier (newer = hotter) and the subreddit weight, so a
 * 2k-upvote post from yesterday outranks a 5k post from 28 days ago.
 */
function heatScore(rawScore, createdUtc, sub) {
  const ageDays = Math.max(0, (NOW - createdUtc) / DAY);
  // Recency multiplier: ~1.0 today, ~0.6 at a week, ~0.35 at a month.
  const recency = 1 / (1 + ageDays / 9);
  const weight = SUB_WEIGHTS[sub] ?? SUB_WEIGHTS[String(sub).toLowerCase()] ?? 1.0;
  return rawScore * recency * weight;
}

function toMeme(p) {
  if (!p) return null;
  if (p.over_18 || p.stickied || p.is_video || p.spoiler) return null;
  const rawScore = p.score || p.ups || 0;
  if (rawScore < 50) return null;
  if (!passes(p.title)) return null;

  const ageDays = (NOW - p.created_utc) / DAY;
  const rawUrl = p.url_overridden_by_dest || p.url || '';

  let imageUrl = null;
  if (isImg(rawUrl)) imageUrl = normalizeImageUrl(rawUrl);
  // Preview URLs are signed and decay; only trust them for fresh posts.
  if (!imageUrl && ageDays < 45) {
    const prev = p.preview?.images?.[0]?.source?.url;
    if (prev) imageUrl = normalizeImageUrl(prev);
  }
  if (!imageUrl) return null;

  let thumbnailUrl = imageUrl;
  if (ageDays < 45) {
    const thumbRes = p.preview?.images?.[0]?.resolutions?.find(
      (r) => r.width >= 320 && r.width <= 640,
    );
    if (thumbRes) {
      const t = normalizeImageUrl(thumbRes.url);
      if (t) thumbnailUrl = t;
    }
  }

  const heat = heatScore(rawScore, p.created_utc, p.subreddit);

  return {
    id: p.id,
    title: p.title,
    imageUrl,
    thumbnailUrl,
    width: p.preview?.images?.[0]?.source?.width,
    height: p.preview?.images?.[0]?.source?.height,
    subreddit: p.subreddit,
    author: p.author === '[deleted]' ? 'anon' : p.author,
    ups: rawScore,
    numComments: p.num_comments || 0,
    permalink: `https://reddit.com${p.permalink}`,
    createdUtc: p.created_utc,
    // Internal ranking score = blended heat (recency x popularity x weight).
    score: Math.round(heat),
    nsfw: !!p.over_18,
  };
}

function readExisting() {
  try {
    const txt = fs.readFileSync(OUT_FILE, 'utf8');
    const arr = JSON.parse(txt);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

async function main() {
  console.log(`Trend refresh: pulling ${PULLS.length} (sub, window) feeds from pullpush.io ...`);
  const raw = [];
  let okFeeds = 0;
  for (const [sub, window] of PULLS) {
    const posts = await fetchPull(sub, window);
    if (posts.length) okFeeds++;
    console.log(`  r/${sub} [${window}]: ${posts.length} raw`);
    raw.push(...posts);
    await sleep(400); // be gentle to pullpush
  }
  console.log(`\nFeeds with data: ${okFeeds}/${PULLS.length}  |  Total raw: ${raw.length}`);

  // Dedup by id, keep the copy with the highest raw upvote count.
  const byId = new Map();
  for (const p of raw) {
    if (!p?.id) continue;
    const ex = byId.get(p.id);
    if (!ex || (p.score || 0) > (ex.score || 0)) byId.set(p.id, p);
  }

  const memes = [];
  for (const p of byId.values()) {
    const m = toMeme(p);
    if (m) memes.push(m);
  }
  // Rank by blended heat — trending first.
  memes.sort((a, b) => b.score - a.score);
  const final = memes.slice(0, TARGET);

  console.log(`\nFiltered to: ${final.length} (min to commit: ${MIN_KEEP})`);

  // SAFETY GATE: if the live fetch came back thin (network down, rate-limited,
  // pullpush outage), do NOT overwrite a healthy existing pool with garbage.
  if (final.length < MIN_KEEP) {
    const existing = readExisting();
    console.error(
      `\n⚠️  Only ${final.length} memes survived (< ${MIN_KEEP}). ` +
      `Likely a network/pullpush issue. Keeping existing pool of ${existing.length} ` +
      `memes untouched. No write performed.`,
    );
    // Exit 0 so CI doesn't fail the whole run on a transient upstream blip.
    process.exit(0);
  }

  const bySub = {};
  for (const m of final) bySub[m.subreddit] = (bySub[m.subreddit] || 0) + 1;
  console.log('By subreddit:');
  for (const [s, n] of Object.entries(bySub).sort((a, b) => b[1] - a[1])) {
    console.log(`  r/${s}: ${n}`);
  }

  // Freshness report — how recent is this pool, really?
  const ages = final.map((m) => (NOW - m.createdUtc) / DAY);
  const within7 = ages.filter((a) => a <= 7).length;
  const within30 = ages.filter((a) => a <= 30).length;
  console.log(`\nFreshness: ${within7} from last 7d, ${within30} from last 30d.`);

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(final));
  console.log(`\n✅ Wrote ${final.length} trending memes to ${OUT_FILE}`);
}

main().catch((e) => {
  // Never hard-fail CI on a transient error — log loudly, keep old data, exit 0.
  console.error('Refresh hit an unexpected error (keeping existing data):', e);
  process.exit(0);
});
