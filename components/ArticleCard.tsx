import Link from 'next/link'
import type { Article } from '@/lib/content'
import { PILLARS } from '@/lib/site'

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: Article
  featured?: boolean
}) {
  const pillar = PILLARS[article.pillar]

  return (
    <article
      className={[
        'group relative flex flex-col rounded-2xl border border-ink-800 bg-ink-900 p-6 transition-colors',
        'hover:border-volt/40 hover:bg-ink-850',
        featured ? 'sm:p-8' : '',
      ].join(' ')}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-widest">
        <span className="text-volt">{pillar.name}</span>
        {article.isHub && (
          <span className="rounded-full bg-magenta/15 px-2 py-0.5 text-magenta">Guide</span>
        )}
      </div>

      <h2
        className={[
          'font-display uppercase leading-[1.05] tracking-tight text-ink-100',
          featured ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl',
        ].join(' ')}
      >
        <Link href={`/${article.slug}`} className="after:absolute after:inset-0">
          {article.h1}
        </Link>
      </h2>

      <p
        className={[
          'mt-3 leading-relaxed text-ink-300',
          featured ? 'text-base' : 'text-sm line-clamp-3',
        ].join(' ')}
      >
        {featured ? article.quickAnswer : article.description}
      </p>

      <div className="mt-5 flex items-center gap-3 text-xs text-ink-400">
        <span>{article.readingTime} min read</span>
        <span aria-hidden="true">/</span>
        <span>{article.wordCount.toLocaleString('en-US')} words</span>
      </div>
    </article>
  )
}
