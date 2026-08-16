import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import JsonLd from '@/components/JsonLd'
import { getAllArticles, getArticlesByPillar } from '@/lib/content'
import { homeGraph } from '@/lib/schema'
import { PILLARS, SITE } from '@/lib/site'

export default function HomePage() {
  const articles = getAllArticles()
  const [lead, ...rest] = articles

  return (
    <>
      <JsonLd data={homeGraph(articles)} />

      {/* Hero */}
      <section className="grain border-b border-ink-800">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-volt">
            {SITE.tagline}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink-100 sm:text-7xl">
            Why do rappers <span className="text-volt">say that?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            Every ad-lib, alias and slang term in rap came from somewhere. We do the reading, check
            the sources, and give you the actual answer — plus the joke you came for.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {Object.values(PILLARS).map((p) => (
              <Link
                key={p.slug}
                href={`/topics/${p.slug}`}
                className="rounded-full border border-ink-700 px-5 py-2.5 text-sm font-medium text-ink-100 transition-colors hover:border-volt hover:text-volt"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead story */}
      {lead && (
        <section className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
            Start here
          </h2>
          <ArticleCard article={lead} featured />
        </section>
      )}

      {/* Everything else */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
          All explainers
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* Pillar directory — internal linking + crawl depth */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {Object.values(PILLARS).map((p) => {
            const items = getArticlesByPillar(p.key as keyof typeof PILLARS)
            return (
              <div key={p.slug} className="rounded-2xl border border-ink-800 bg-ink-900 p-6">
                <h2 className="font-display text-2xl uppercase tracking-tight text-ink-100">
                  <Link href={`/topics/${p.slug}`} className="hover:text-volt">
                    {p.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{p.blurb}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {items.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/${a.slug}`} className="text-ink-300 hover:text-volt">
                        {a.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
