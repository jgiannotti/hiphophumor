import type { Article } from './content'
import { SITE, PILLARS } from './site'

const ORG_ID = `${SITE.url}/#organization`
const SITE_ID = `${SITE.url}/#website`

export function organizationSchema() {
  const sameAs = Object.values(SITE.social).filter(Boolean)
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/icon.png`,
      width: 512,
      height: 512,
    },
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  }
}

export function breadcrumbSchema(article: Article) {
  const pillar = PILLARS[article.pillar]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: pillar.name,
        item: `${SITE.url}/topics/${pillar.slug}`,
      },
      { '@type': 'ListItem', position: 3, name: article.h1, item: `${SITE.url}/${article.slug}` },
    ],
  }
}

function faqSchema(article: Article) {
  if (!article.faqs.length) return null
  return {
    '@type': 'FAQPage',
    '@id': `${SITE.url}/${article.slug}/#faq`,
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function itemListSchema(article: Article) {
  if (!article.listItems.length) return null
  return {
    '@type': 'ItemList',
    '@id': `${SITE.url}/${article.slug}/#list`,
    name: article.h1,
    numberOfItems: article.listItems.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: article.listItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      description: item.description,
    })),
  }
}

function articleSchema(article: Article) {
  return {
    '@type': 'Article',
    '@id': `${SITE.url}/${article.slug}/#article`,
    headline: article.h1,
    name: article.title,
    description: article.description,
    abstract: article.quickAnswer,
    // Google's Article spec expects an image; the per-article OG route renders one.
    image: [`${SITE.url}/${article.slug}/opengraph-image`],
    articleSection: PILLARS[article.pillar].name,
    wordCount: article.wordCount,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Organization', name: SITE.author.name, url: SITE.author.url },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/${article.slug}` },
    // Tells voice/AI surfaces exactly which block is the answer.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.quick-answer', 'h1'],
    },
    ...(article.sources.length
      ? { citation: article.sources.map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url })) }
      : {}),
  }
}

/** Full graph for an article page. Always includes Article + Breadcrumb + Org + WebSite. */
export function articleGraph(article: Article) {
  const graph: Record<string, unknown>[] = [
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema(article),
    articleSchema(article),
  ]

  const faq = faqSchema(article)
  if (faq) graph.push(faq)

  if (article.schemaType === 'ItemList') {
    const list = itemListSchema(article)
    if (list) graph.push(list)
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

export function homeGraph(articles: Article[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      websiteSchema(),
      {
        '@type': 'CollectionPage',
        '@id': `${SITE.url}/#collection`,
        url: SITE.url,
        name: `${SITE.name} — ${SITE.tagline}`,
        description: SITE.description,
        isPartOf: { '@id': SITE_ID },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: articles.length,
          itemListElement: articles.map((a, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE.url}/${a.slug}`,
            name: a.h1,
          })),
        },
      },
    ],
  }
}
