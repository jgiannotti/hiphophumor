import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: 'https://hiphophumor.com/sitemap.xml',
    host: 'https://hiphophumor.com',
  };
}
