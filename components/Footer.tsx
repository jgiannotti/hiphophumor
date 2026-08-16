import Link from 'next/link'
import { PILLARS, SITE } from '@/lib/site'

export default function Footer() {
  const year = 2026
  return (
    <footer className="mt-24 border-t border-ink-800 bg-ink-900">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-xl uppercase tracking-tight text-ink-100">
              HipHop<span className="text-volt">Humor</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-400">{SITE.description}</p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400">Topics</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {Object.values(PILLARS).map((p) => (
                <li key={p.slug}>
                  <Link href={`/topics/${p.slug}`} className="text-ink-300 hover:text-volt">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400">Site</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-ink-300 hover:text-volt">About</Link></li>
              <li><Link href="/contact" className="text-ink-300 hover:text-volt">Contact</Link></li>
              <li><Link href="/feed.xml" className="text-ink-300 hover:text-volt">RSS feed</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400">Legal</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/privacy" className="text-ink-300 hover:text-volt">Privacy policy</Link></li>
              <li><Link href="/terms" className="text-ink-300 hover:text-volt">Terms of use</Link></li>
              <li><Link href="/dmca" className="text-ink-300 hover:text-volt">DMCA</Link></li>
              <li><Link href="/editorial-policy" className="text-ink-300 hover:text-volt">Editorial policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-800 pt-6 text-xs leading-relaxed text-ink-400">
          <p>
            &copy; {year} {SITE.name}. All original writing on this site is produced by the
            HipHopHumor editorial desk. Artist names, song titles and trademarks belong to their
            respective owners and are used here for identification and commentary.
          </p>
        </div>
      </div>
    </footer>
  )
}
