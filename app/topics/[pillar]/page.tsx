import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import JsonLd from '@/components/JsonLd'
import { getArticlesByPillar } from '@/lib/content'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { PILLARS, SITE, type PillarKey } from '@/lib/site'

export const dynamicParams = false

function bySlug(slug: string) {
  return Object.values(PILLARS).find((p) => p.slug === slug)
}

export function generateStaticParams() {
  return Object.values(PILLARS).map((p) => ({ pillar: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>
}): Promise<Metadata> {
  const { pillar } = await params
  const p = bySlug(pillar)
  if (!p) return {}
  return {
    title: `${p.name} — Explained`,
    description: p.blurb,
    alternates: { canonical: `${SITE.url}/topics/${p.slug}` },
    openGraph: {
      type: 'website',
      url: `${SITE.url}/topics/${p.slug}`,
      title: `${p.name} — Explained | ${SITE.name}`,
      description: p.blurb,
    },
  }
}

export default async function TopicPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: pillarSlug } = await params
  const pillar = bySlug(pillarSlug)
  if (!pillar) notFound()

  const articles = getArticlesByPillar(pillar.key as PillarKey)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema(),
            websiteSchema(),
            {
              '@type': 'CollectionPage',
              url: `${SITE.url}/topics/${pillar.slug}`,
              name: pillar.name,
              description: pillar.blurb,
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
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: pillar.name,
                  item: `${SITE.url}/topics/${pillar.slug}`,
                },
              ],
            },
          ],
        }}
      />

      <section className="grain border-b border-ink-800">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-volt">Topic</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[1.02] tracking-tight text-ink-100 sm:text-6xl">
            {pillar.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-300">{pillar.blurb}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  )
}
