import type { MetadataRoute } from 'next';
import { getAllMemes } from '@/lib/reddit';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const memes = await getAllMemes();
  const base = 'https://hiphophumor.com';

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...memes.map((m) => ({
      url: `${base}/meme/${m.id}`,
      lastModified: new Date(m.createdUtc * 1000),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
