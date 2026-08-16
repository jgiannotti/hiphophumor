import { getMemes } from '@/lib/reddit';

export const revalidate = 3600;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const memes = await getMemes({ limit: 30 });
  const items = memes
    .map((m) => {
      const link = `https://hiphophumor.com/meme/${m.id}`;
      const pubDate = new Date(m.createdUtc * 1000).toUTCString();
      return `    <item>
      <title>${escapeXml(m.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(`<img src="${m.imageUrl}" alt="${m.title}" /><p>From r/${m.subreddit} · ${m.ups} upvotes</p>`)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>HIP HOP HUMOR</title>
    <link>https://hiphophumor.com</link>
    <description>The funniest, freshest hip-hop memes on the internet — auto-curated daily.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
