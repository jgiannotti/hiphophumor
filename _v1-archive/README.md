# HIP HOP HUMOR

The funniest, freshest, most unfiltered hip-hop memes on the internet — auto-updated daily.
**Live:** https://hiphophumor.vercel.app (→ hiphophumor.com once DNS is connected)

## What it is

A trend-driven hip-hop meme wall. A bot pulls the **hottest recent** memes from
across rap's loudest subreddits every day, ranks them by heat, and the site
rebuilds itself. No stale "best of all time" reposts — what's on the wall is
what rap is actually laughing at *right now*.

## How the content engine works (the honest version)

Reddit's public API is paid-commercial-tier now, and their unauthenticated JSON
endpoints block cloud-provider IPs (Vercel, AWS, GCP). So fetching live from a
Vercel function is dead on arrival. The fix:

1. **Daily pull on GitHub's runners** (not Vercel) from [pullpush.io](https://pullpush.io),
   a community Reddit archive that GitHub runners *can* reach.
2. **Recent windows only** — `scripts/refresh-memes.mjs` pulls the top posts from
   the **last 7 days** and **last 30 days** across ~20 hip-hop subreddits. Never
   "all time."
3. **Blended heat ranking** — each post is scored `recency × upvotes × source weight`,
   so a 2k-upvote post from yesterday beats a 5k post from a month ago. That's the
   "trending now" signal.
4. **Filter & dedup** — image-only, score floor, NSFW/video stripped, run through
   the `lib/blocklist.ts` legal/brand firewall (slurs, hate, doxxing → nuked;
   edgy/savage → fine).
5. **Commit `data/memes.json` back to the repo.** Vercel auto-deploys on push.
6. **Render** — `lib/reddit.ts` reads the JSON and applies a daily-seeded shuffle
   over the hottest slice, so the feed feels alive day to day. Fully static, $0.

**Graceful failure:** if pullpush is down or rate-limits, the refresh script
keeps the existing `data/memes.json` untouched and exits 0. A bad upstream day
never nukes the site.

## The auto-update engine (free, hands-off)

`.github/workflows/refresh.yml` is the client's chosen content engine:

- **Daily cron** (`0 13 * * *`, ~9am ET) + a manual **Run workflow** button.
- Checks out, `npm ci`, runs `node scripts/refresh-memes.mjs` + `node scripts/refresh-trending.mjs`.
- Commits changed `data/*.json` with `chore: refresh meme pool [skip ci]` and pushes.
- Uses the built-in `GITHUB_TOKEN` (`permissions: contents: write`) — no secrets to set up.
- **No dependency on anyone's Mac being on.** This replaces the old "run it on your laptop" flow.

> One-time setup: the workflow needs push permission. In the GitHub repo →
> **Settings → Actions → General → Workflow permissions** → select
> **"Read and write permissions"** → Save. (The `permissions:` block in the
> workflow already requests it; this toggle must also allow it org/repo-wide.)

## The "Trending in Rap" layer

`data/trending.json` holds hand-seeded current rap headlines (`{title, blurb, source, url}`).
It feeds **two** UI surfaces, fully data-driven:

- the auto-scrolling **ticker** in the header (`components/Ticker.tsx`)
- the **"Trending in Rap"** card strip near the top of the homepage (`components/TrendingStrip.tsx`)

`scripts/refresh-trending.mjs` currently **validates & normalizes** the JSON
(schema, trimming, dedup, URL check) and runs in the GitHub Action. There's a
documented `TODO` seam in that file to later swap in a real news-RSS/LLM fetch
without changing the schema or the UI. To update headlines today: edit
`data/trending.json` and commit.

## Stack

- **Next.js 14** (App Router), **Tailwind**, dark-first with a light toggle
- **Vercel** (Hobby = free) for hosting + auto-deploy on push
- **GitHub Actions** for the daily content refresh
- **pullpush.io** for meme source (free, no auth)
- Zero servers, zero databases, zero ongoing cost

## Design system (modern streetwear)

- Dark-first. Near-black base `#0A0A0B`, off-white text. Light theme via `.light` class.
- Dual neon accents: **volt** `#CCFF00` (primary) + **hot magenta** `#FF2D7E` (secondary).
- Display type: **Anton** (heavy condensed) for headings/wordmark; **Inter** for body.
  Loaded via `<link>` in `app/layout.tsx` (runtime, not build-time, so builds never
  hang on a font fetch). Font stacks live as CSS vars in `app/globals.css`.
- Subtle grid + neon-glow texture, neon focus rings, hover glow/scale on cards.
- Tokens: `tailwind.config.ts` (`brand.volt`, `brand.magenta`, shadows, marquee anim)
  + CSS vars in `app/globals.css`.

## Voice

Edgy, unfiltered, irreverent, confident, funny — never corny. Rap is unfiltered,
so the copy is too. The hard line (enforced in code, not just tone): no slurs,
hate, or doxxing.

## Files that matter

- `data/memes.json` — the trending meme pool (regenerated daily by the Action)
- `data/trending.json` — the "Trending in Rap" headlines
- `scripts/refresh-memes.mjs` — daily trend pull (recency-weighted)
- `scripts/refresh-trending.mjs` — validate/normalize headlines (+ TODO seam)
- `lib/reddit.ts` — reads memes.json + daily shuffle
- `lib/sources.ts` — subreddit list + weights/windows
- `lib/trending.ts` — typed reader for trending.json
- `lib/blocklist.ts` — the legal/brand firewall
- `.github/workflows/refresh.yml` — the auto-update engine

## Refreshing content manually

```bash
npm run refresh:all   # pulls fresh memes + validates trending, writes data/*.json
git add data/ && git commit -m "chore: refresh" && git push   # Vercel auto-deploys
```

(Or just trigger the GitHub Action's **Run workflow** button — no laptop needed.)

## Local dev

```bash
npm install
npm run dev
```

## Custom domain

Currently at `hiphophumor.vercel.app`. To point `hiphophumor.com` at it:
1. Vercel dashboard → project → **Settings → Domains** → add `hiphophumor.com`.
2. Add the DNS records Vercel gives you at your registrar.

## DMCA / takedowns

`mailto:takedown@hiphophumor.com` (linked in the footer). Set up the forwarder
when you configure DNS.
