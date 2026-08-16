# CLAUDE.md — project brief for future agents

## What this is
**HIP HOP HUMOR** — a trend-driven hip-hop meme aggregator. A wall of the
funniest, freshest rap memes on the internet, auto-updated daily. Live at
hiphophumor.vercel.app (→ hiphophumor.com when DNS is connected).

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind
- Dark-first theme with a `.light` toggle (default = dark)
- Hosted free on Vercel (Hobby), static + daily ISR revalidation
- Content refreshed by a GitHub Action (free), not on Vercel

## Content engine (the core of the product)
- Reddit blocks cloud IPs + charges for its API, so we fetch from **pullpush.io**
  (free Reddit archive) on **GitHub's runners** instead of Vercel.
- `scripts/refresh-memes.mjs` pulls **recent windows only** (last 7d + last 30d)
  across ~20 hip-hop subreddits and ranks by a **blended heat score**
  (`recency × upvotes × source weight`). This is "trending now," NOT "top all-time."
  It is the fix for the old stale-evergreen feed.
- Output: `data/memes.json` (~300 entries, pre-sorted by heat). `lib/reddit.ts`
  reads it and applies a daily-seeded shuffle over the top slice.
- **Fails gracefully**: thin/failed fetch → keep existing data, exit 0. Never nukes
  the pool. Safety gate constant: `MIN_KEEP` (default 120).
- `.github/workflows/refresh.yml`: daily cron `0 13 * * *` + manual dispatch;
  `npm ci`, run both refresh scripts, commit changed `data/*.json` with
  `chore: refresh meme pool [skip ci]`, push (uses `GITHUB_TOKEN`,
  `permissions: contents: write`). Vercel auto-deploys on push.

## Trending layer
- `data/trending.json` = hand-seeded current rap headlines `{title, blurb, source, url}`.
- `lib/trending.ts` = typed reader. Feeds the header ticker (`components/Ticker.tsx`)
  and the homepage strip (`components/TrendingStrip.tsx`). Fully data-driven.
- `scripts/refresh-trending.mjs` = validates/normalizes the JSON today; has a
  documented TODO seam to later auto-fetch news (RSS/LLM) without UI changes.

## Design system (modern streetwear)
- Tokens in `tailwind.config.ts` + CSS vars in `app/globals.css`.
- Base near-black `#0A0A0B`, off-white text. Dual neon: **volt `#CCFF00`** (primary),
  **magenta `#FF2D7E`** (secondary). Use `text-[rgb(var(--volt))]` / `--magenta` etc.
- Type: **Anton** (display/headings/wordmark, class `font-display`, ALL CAPS,
  tight tracking) + **Inter** (body, `font-sans`). Loaded via `<link>` in
  `app/layout.tsx` on purpose (runtime, not `next/font`) so the build never hangs
  on a Google Fonts fetch when the build machine is offline. Font stacks are CSS
  vars `--font-display` / `--font-sans` in globals.css.
- Texture: subtle grid + neon radial glow on `body`; neon focus rings; cards get
  hover glow (`shadow-volt`) + slight scale; marquee animation for the ticker.

## Voice guideline
Edgy, unfiltered, irreverent, confident, funny — never corny. Rap is unfiltered,
copy matches. HARD LINE (enforced in `lib/blocklist.ts`, not just tone): never
slurs, hate against protected groups, or doxxing. Edgy/savage/profane = fine.

## How to refresh content
- Hands-off: GitHub Action runs daily (or hit "Run workflow" in the Actions tab).
- Manual: `npm run refresh:all` then commit `data/` and push (Vercel auto-deploys).
- Update headlines: edit `data/trending.json`, commit.

## Build / dev
- `npm install`; `npm run dev`; `npm run build`.
- Keep the `Meme` type (`lib/types.ts`) and the refresh script's output shape in
  sync — the UI reads those fields directly.

## One-time human setup (not code)
- GitHub repo → Settings → Actions → General → Workflow permissions →
  **Read and write** (so the Action can push refreshed data).
- Vercel → project → Settings → Domains → add `hiphophumor.com` + set DNS.
