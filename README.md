# hiphophumor.com

Original editorial site explaining hip-hop ad-libs, nicknames and slang. Next.js 14 (App Router),
statically generated, deployed on Vercel.

## What this is

A content asset, not an aggregator. Every page is original writing produced by the editorial desk,
fact-checked against sources that are listed on the page. There is deliberately **no scraped or
republished third-party content** anywhere on the site — that decision is load-bearing (see
"Content policy" below).

## Structure

```
app/
  page.tsx                  Home — lead story, full index, pillar directory
  [slug]/page.tsx           Article template (schema, FAQ, sources, related)
  [slug]/opengraph-image.tsx Per-article OG image
  topics/[pillar]/page.tsx  Topic hub pages
  about|contact|privacy|terms|dmca|editorial-policy
  sitemap.ts robots.ts feed.xml/route.ts
components/                 Header, Footer, ArticleCard, PageShell, JsonLd
lib/
  site.ts                   Site constants + pillar definitions
  content.ts                Markdown loader (gray-matter + marked)
  schema.ts                 JSON-LD graph builders
content/*.md                The articles. One file per article.
```

## Adding an article

1. Drop a new `.md` file in `content/` following the frontmatter contract in
   `content/HOUSE_STYLE.md`.
2. Add its slug to the `internalLinks` of 2–3 existing articles so it is never an orphan.
3. Commit and push. Vercel builds and the sitemap, RSS feed, topic pages and schema update
   automatically — nothing else to wire up.

Required frontmatter keys: `slug`, `title`, `h1`, `description`, `targetQuery`, `alsoAnswers`,
`pillar`, `schemaType`, `isHub`, `quickAnswer`, `faqs`, `internalLinks`, `sources`, `readingTime`.
`ItemList` articles also need `listItems`.

## SEO / AEO design decisions

- **Quick-answer block** at the top of every article, marked with `speakable` schema and a
  `.quick-answer` selector. This is the block AI answer engines lift.
- **JSON-LD graph** per page: `Organization` + `WebSite` + `BreadcrumbList` + `Article`, plus
  `FAQPage` where FAQs exist and `ItemList` for roundups. Sources are emitted as `citation`.
- **AI crawlers are explicitly allowed** in `robots.ts` (GPTBot, ClaudeBot, PerplexityBot,
  OAI-SearchBot, Google-Extended, CCBot and others). Being citable is a distribution channel here,
  not a leak.
- **Topical clusters**: three pillars (ad-libs, names, slang), each with a hub article that links
  to its spokes and back. No orphan pages.
- Fully static output — every route prerendered at build time.

## Content policy (do not break this)

The site monetizes with display advertising, and every major ad network — AdSense, Mediavine,
Journey, Raptive, Ezoic — explicitly prohibits aggregated, scraped or embedded third-party media
without substantial added value. It also affects resale: a buyer inherits any copyright exposure.

Therefore:

- No hotlinked or re-hosted images from Reddit, social platforms or other publishers.
- No auto-generated or auto-published content of any kind without human editorial review.
- If media is ever added, use official platform embeds wrapped in original commentary, never
  raw image grids.
- No profanity in titles, headings, URLs or meta descriptions (Google Publisher Restrictions
  demote pages that prominently feature it, which costs real ad revenue).

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static build
```

Node 20+.
