# HIP HOP HUMOR — Rebuild Plan (v2, July 2026)

One-shot execution plan to take hiphophumor.com from a broken aggregator to a
hands-off, monetized, Worldstar-caliber hip-hop humor destination — on free
tools only. Approved directions from Joe: **memes + video + news**, **LLM
humor gate**, **ads ASAP**, **GitHub automation**.

---

## 1. Diagnosis — why the current site is bad

Verified by live audit on 2026-07-11:

1. **The refresh never ran once.** The project folder has no git repo, so the
   GitHub Action that was supposed to refresh content daily was never deployed
   anywhere. The site is serving the original build-time snapshot.
2. **The data source is dead.** pullpush.io now returns `502`. Even when it
   worked, its index lagged years behind: the pool's median post age is ~5
   years; the newest item is April 2025. The homepage literally shows "3373d"
   age badges next to "fresh."
3. **No humor filter.** Ranking is upvotes-in-fan-subs, so the wall is full of
   concert selfies, fan drawings, and sub-specific in-jokes ("saw this at my
   college library 🔥") — popular in r/playboicarti ≠ funny to a general
   hip-hop audience. 88 of 300 items are from one circlejerk sub.
4. **One content type.** Images only. Worldstar's engine is video + headlines
   + volume + recency; we have none of those dimensions.
5. **Trending strip is hand-seeded** and therefore permanently stale.

## 2. What we're building

A three-lane, self-refreshing site:

- **THE WALL** — fresh meme feed, quality-gated by an LLM, split 9GAG-style
  into Fresh (≤48h) / Trending (≤7d) / Hot (≤14d) lanes.
- **THE TAPE** — trending rap video lane: YouTube embeds of the hottest
  hip-hop videos/clips of the week (legally clean — embeds, not rehosts).
- **THE WIRE** — auto-updating news ticker + strip from live hip-hop RSS.

Everything refreshes itself twice daily via GitHub Actions. Zero human input
after setup. If any source fails, the site keeps yesterday's content — never
a blank page, never a stale-nuke.

## 3. Content Engine v2 (the core fix)

### 3.1 Meme source: arctic-shift (tested, working)
- Replace pullpush.io with `arctic-shift.photon-reddit.com` — free Reddit
  archive, verified live today: fresh to the hour, works from datacenter IPs
  (GitHub runners), and **back-updates scores** (posts 2–9 days old show real
  scores, e.g. 1546 upvotes).
- Fetch window: posts **24h–14d old** (young enough to be current, old enough
  that scores have settled). Pull per-subreddit pages across ~20 hip-hop subs
  **plus** general meme subs (r/memes, r/dankmemes) filtered by hip-hop
  keyword/artist match.
- Keep reddit.com JSON out of the plan: Reddit 403-blocks cloud IPs even with
  OAuth (verified + confirmed by 2026 reports). arctic-shift is the reliable
  free path.

### 3.2 Quality gates (in order)
1. **Structural:** image posts only (i.redd.it / imgur), valid dimensions,
   dedup by id + perceptual title similarity, `HEAD`-check a sample for dead
   links, drop galleries/videos/text posts.
2. **Blocklist:** existing `lib/blocklist.ts` hard line (slurs/hate/doxxing)
   applied at ingest, not just render.
3. **Engagement velocity:** score = upvotes ÷ age^1.5 × subreddit weight ×
   comment-ratio bonus. Velocity beats raw totals (9GAG's model) — this alone
   kills the "old viral post" failure mode.
4. **LLM humor gate (the big lever):** daily Gemini Flash (free tier: 1,500
   req/day, no card) batch-scores ~500 candidates, 25/prompt, JSON out:
   `{funny: 0-10, hiphop_relevance: 0-10, is_meme: bool, tone_flag}`.
   Only `funny ≥ 6 && hiphop_relevance ≥ 5 && is_meme` survives. Multimodal
   scoring of thumbnails for the top slice. **Fail-open:** if the API errors,
   fall back to heuristic ranking — never an empty feed. Groq free tier wired
   as fallback provider.
5. **Safety gate:** keep existing MIN_KEEP semantics — thin fetch never
   overwrites a healthy pool.

### 3.3 Video lane
- YouTube Data API v3 (free, 10k units/day — our daily job uses ~1.2k):
  `videos.list?chart=mostPopular&videoCategoryId=10` (1 unit) + a handful of
  targeted searches ("rap freestyle 2026", artist names from the news feed).
- LLM pass ranks for humor/heat; output `data/videos.json` (~24 embeds).
- Embeds only → no hosting cost, no copyright exposure.

### 3.4 News autopilot
- Replace hand-seeded `data/trending.json` with RSS ingestion from verified
  live feeds: **XXL, AllHipHop, HipHopDX (`/rss/news.xml`), HotNewHipHop
  (`/feed`), Uproxx Hip-Hop, RapRadar**. (Complex and Rap-Up feeds are dead —
  dropped.)
- LLM rewrites headlines into the site voice (edgy, never corny) and picks the
  12 hottest. Feeds the ticker + strip through the existing typed reader —
  UI contract unchanged.
- Cross-pollination: entities extracted from news drive the video searches and
  boost matching memes ("beef of the week" gets a heat multiplier).

## 4. Site rebuild (design + UX)

Keep the streetwear design system (volt/magenta, Anton/Inter) — it's good.
Change what's around it:

- Three-lane nav: **WALL / TAPE / WIRE** with Fresh/Trending/Hot tabs on the
  wall. Age badges capped ("2d", never "3373d"); anything >14d shows no badge.
- Meme detail pages get share buttons (X, Reddit, copy link, download) — memes
  spread by being stolen; make stealing frictionless with a watermark-free
  courtesy and a subtle `hiphophumor.com` corner tag on the share card.
- Editorialized card titles: LLM rewrites limp Reddit titles ("Yo" → something
  with voice) while linking source + author for attribution.
- OG images per meme for rich social shares (free, Vercel OG).
- **Compliance pages (required for every ad network):** About, Privacy Policy,
  Contact, DMCA/takedown with a real process. Profanity stays in the content,
  **out of titles/meta/URLs** — that's what ad classifiers read.
- Performance: static + ISR as today; lazy-load images; target 95+ Lighthouse.

## 5. Monetization (Joe's call: ads ASAP — with guardrails)

Reality check from research: entertainment display RPM ≈ **$2–4**. 10k
views/mo ≈ $30. Ads-now is fine, but done wrong it poisons premium eligibility
later. So:

1. **Now — Adsterra, banner + native widget formats ONLY.** No popunders, no
   push, no social bar (they trash UX, brand, and future Mediavine review).
   No traffic minimum, $5 payout floor. Needs a one-time Adsterra account
   (your email). Ad slots: 1 leaderboard under the ticker, 1 native unit every
   ~12 cards, 1 footer. Never inside the first viewport.
2. **At 1,000 sessions/mo — apply to Mediavine Journey** (2026's lowest
   premium bar, 70% share). Swap Adsterra out the day we're approved; premium
   pays 1.5–2× and the ads don't look like malware.
3. **Parallel, zero-effort:** beehiiv newsletter ("5 funniest rap memes this
   week", auto-drafted by the same pipeline, you approve sends) + free
   print-on-demand store (Fourthwall/Printful, original volt/magenta wordmark
   streetwear only — no artist likenesses, no stolen memes).
4. **Later (50k+ views/mo):** Raptive/Mediavine full, then WSHH's real model —
   direct label/artist placements in the ticker (disclosed).

## 6. Automation & ops (hands-off guarantee)

- **GitHub repo** (free) with the full site. Action runs **twice daily**
  (13:00 + 01:00 UTC): refresh memes → videos → news → commit `data/*.json`
  → push → Vercel auto-deploys. Manual dispatch button retained.
- Secrets: `GEMINI_API_KEY`, `YT_API_KEY` (both free-tier), optional
  `GROQ_API_KEY`.
- **Self-healing:** every stage fail-opens to previous data; the Action never
  exits non-zero on a source outage (it logs and keeps going).
- **Watchdog:** weekly Action job asserts pool freshness (newest item < 4
  days old) and opens a GitHub Issue if violated — so silent staleness (the
  exact failure that happened) can never happen invisibly again.
- Vercel Hobby stays the host; DNS cutover to hiphophumor.com when you're
  ready.

## 7. Execution checklist

**Me (the firm) — no input needed:**
1. Rewrite `scripts/refresh-memes.mjs` → arctic-shift + velocity scoring +
   gates; add `scripts/refresh-videos.mjs`, rewrite `refresh-trending.mjs`
   for RSS; add LLM scoring module with Gemini→Groq→heuristic fallback chain.
2. Rebuild UI: lanes, TAPE page, share/OG, compliance pages, ad slots
   (feature-flagged until account exists), metadata cleanup.
3. Test full pipeline locally with real fetches; verify the wall is <14 days
   fresh end-to-end; Lighthouse pass.
4. Init git, push to new GitHub repo, wire the Action + watchdog, connect
   Vercel to the repo, deploy, verify first automated refresh.
5. Draft newsletter template + 5 merch design concepts for your sign-off.

**You — four one-time authorizations (~15 min total, all free):**
1. GitHub: authorize account/repo access (or tell me the account to use).
2. Google AI Studio: create free Gemini API key → paste to me or into repo
   secrets. (I can walk your browser through it.)
3. Google Cloud: enable YouTube Data API v3, create free API key (same).
4. Adsterra: publisher signup with your email; I take it from the dashboard.

## 8. Success criteria

- Newest wall item always < 48h old; median < 5 days (vs ~5 years today).
- Zero manual content actions per week.
- LLM gate rejects ≥ 60% of raw candidates (proof it's actually filtering).
- Ad revenue live within days of Adsterra approval; Journey application
  auto-triggered by analytics at 1k sessions.
- Watchdog green weekly.
