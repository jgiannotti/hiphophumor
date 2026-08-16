import Link from 'next/link'
import { getAllArticles } from '@/lib/content'

export default function NotFound() {
  const picks = getAllArticles().slice(0, 5)

  return (
    <section className="mx-auto max-w-prose px-5 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-magenta">404</p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-none tracking-tight text-ink-100">
        This one skipped
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-300">
        There is nothing at this address. Here is what people are actually reading.
      </p>
      <ul className="mt-8 space-y-3">
        {picks.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/${a.slug}`}
              className="block rounded-xl border border-ink-800 bg-ink-900 p-5 font-semibold text-ink-100 transition-colors hover:border-volt/40 hover:text-volt"
            >
              {a.h1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
