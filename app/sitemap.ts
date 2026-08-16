import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/content'
import { PILLARS, SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const lastModified = new Date(articles[0]?.updatedAt ?? '2026-08-16T12:00:00.000Z')

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE.url}/about`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE.url}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    {
      url: `${SITE.url}/editorial-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    { url: `${SITE.url}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE.url}/dmca`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const topicPages: MetadataRoute.Sitemap = Object.values(PILLARS).map((p) => ({
    url: `${SITE.url}/topics/${p.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE.url}/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: a.isHub ? 0.9 : 0.7,
  }))

  return [...staticPages, ...topicPages, ...articlePages]
}
