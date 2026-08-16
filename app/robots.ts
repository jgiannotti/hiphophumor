import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

/**
 * AI answer engines are explicitly welcomed. Being citable by ChatGPT, Claude,
 * Perplexity and Google AI Overviews is a core distribution channel for this site,
 * not a leak to be plugged.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'CCBot',
  'Bingbot',
  'DuckAssistBot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'Amazonbot',
  'YouBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
