import { getAllArticles } from '@/lib/content'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const articles = getAllArticles()
  const buildDate = new Date(articles[0]?.updatedAt ?? Date.now()).toUTCString()

  const items = articles
    .map(
      (a) => `    <item>
      <title>${esc(a.h1)}</title>
      <link>${SITE.url}/${a.slug}</link>
      <guid isPermaLink="true">${SITE.url}/${a.slug}</guid>
      <description>${esc(a.quickAnswer)}</description>
      <category>${esc(a.pillar)}</category>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} — ${esc(SITE.tagline)}</title>
    <link>${SITE.url}</link>
    <description>${esc(SITE.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
