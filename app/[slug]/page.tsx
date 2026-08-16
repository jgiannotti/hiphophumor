import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import { getAllArticles, getArticle, getRelated } from '@/lib/content'
import { articleGraph } from '@/lib/schema'
import { PILLARS, SITE } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  const url = `${SITE.url}/${article.slug}`
  return {
    // `absolute` skips the site-name template — article titles already run long and
    // the differentiating tail is what gets truncated in SERPs.
    title: { absolute: article.title },
    description: article.description,
    keywords: [article.targetQuery, ...article.alsoAnswers],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.description,
      siteName: SITE.name,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: PILLARS[article.pillar].name,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const pillar = PILLARS[article.pillar]
  const related = getRelated(article)

  return (
    <>
      <JsonLd data={articleGraph(article)} />

      <article className="mx-auto max-w-prose px-5 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-volt">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/topics/${pillar.slug}`} className="hover:text-volt">
                {pillar.name}
              </Link>
            </li>
          </ol>
        </nav>

        <header>
          <h1 className="font-display text-4xl uppercase leading-[1.02] tracking-tight text-ink-100 sm:text-5xl">
            {article.h1}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-400">
            <span>By {SITE.author.name}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={article.publishedAt}>August 16, 2026</time>
            <span aria-hidden="true">/</span>
            <span>{article.readingTime} min read</span>
          </div>
        </header>

        {/* Extractable answer — first thing after the H1 */}
        <div className="quick-answer mt-8">
          <p className="!text-xs !font-semibold !uppercase !tracking-[0.2em] !text-volt">
            Quick answer
          </p>
          <p className="mt-3">{article.quickAnswer}</p>
        </div>

        <div
          className="prose-hhh mt-12"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {/* FAQ — rendered visibly so it matches the FAQPage schema */}
        {article.faqs.length > 0 && (
          <section className="mt-16 border-t border-ink-800 pt-10" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="font-display text-3xl uppercase tracking-tight text-ink-100"
            >
              Frequently asked
            </h2>
            <dl className="mt-6 space-y-6">
              {article.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-ink-800 bg-ink-900 p-6">
                  <dt className="text-base font-semibold text-ink-100">{f.q}</dt>
                  <dd className="mt-2.5 leading-relaxed text-ink-300">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Sources — E-E-A-T signal and a real editorial commitment */}
        {article.sources.length > 0 && (
          <section className="mt-16 border-t border-ink-800 pt-10" aria-labelledby="sources-heading">
            <h2
              id="sources-heading"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400"
            >
              Sources
            </h2>
            <ol className="mt-4 space-y-2 text-sm">
              {article.sources.map((s) => (
                <li key={s.url} className="leading-relaxed text-ink-400">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener"
                    className="text-ink-300 underline decoration-ink-600 underline-offset-2 hover:text-volt"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Related — keeps the cluster tight */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-ink-800 pt-10" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="font-display text-3xl uppercase tracking-tight text-ink-100"
            >
              Keep reading
            </h2>
            <ul className="mt-6 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="group flex items-baseline gap-3 rounded-xl border border-ink-800 bg-ink-900 p-5 transition-colors hover:border-volt/40 hover:bg-ink-850"
                  >
                    <span className="text-base font-semibold text-ink-100 group-hover:text-volt">
                      {r.h1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  )
}
