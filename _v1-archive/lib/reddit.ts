// Data layer. A GitHub Action pulls RECENT, TRENDING memes from pullpush.io (a
// free public Reddit JSON mirror) every day and commits them as a static JSON
// file ranked by a blended heat score (recency x popularity x source weight).
// The site reads from that file and applies a daily-seeded shuffle over the
// hottest slice, so the feed feels fresh every day with zero live API calls.
//
// Why not live Reddit (or live pullpush from Vercel)? Reddit blocks
// unauthenticated requests from cloud provider IPs (Vercel, AWS, GCP) and the
// official API is paid commercial-tier. So we fetch on GitHub's runners
// instead (see .github/workflows/refresh.yml) and bake the result into the
// repo. The pool is "trending now," not "best of all time" — that's the fix.

import type { Meme } from './types';
import memesJson from '@/data/memes.json';

const ALL_MEMES = memesJson as Meme[];

// xorshift32 — small, fast, deterministic. Good enough for shuffling.
function rng(seed: number) {
  let s = seed | 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1000000) / 1000000;
  };
}

function shuffle<T>(arr: readonly T[], seed: number): T[] {
  const a = arr.slice();
  const rand = rng(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Today's date as a numeric seed. Day-stable: every visit on the same UTC day
// gets the same ordering. Tomorrow it rotates.
function dailySeed(): number {
  const d = new Date();
  return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
}

export async function getMemes(opts: { limit?: number } = {}): Promise<Meme[]> {
  const limit = opts.limit ?? 60;
  // memes.json arrives pre-ranked by trending heat (hottest first). We shuffle
  // the hottest slice with the daily seed so the hottest stuff appears most
  // often but the day-to-day order still rotates and feels alive.
  const pool = ALL_MEMES.slice(0, 200); // top 200 by trending heat
  const shuffled = shuffle(pool, dailySeed());
  return shuffled.slice(0, limit);
}

export async function getMeme(id: string): Promise<Meme | null> {
  return ALL_MEMES.find((m) => m.id === id) ?? null;
}

// Exposed for the sitemap so it can list all meme pages, not just today's.
export async function getAllMemes(): Promise<Meme[]> {
  return ALL_MEMES;
}
