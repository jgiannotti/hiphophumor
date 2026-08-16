import Link from 'next/link'
import { PILLARS } from '@/lib/site'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5"
        aria-label="Main navigation"
      >
        <Link href="/" className="group shrink-0" aria-label="HipHopHumor home">
          <span className="font-display text-2xl uppercase tracking-tight text-ink-100">
            HipHop
            <span className="text-volt group-hover:text-magenta transition-colors">Humor</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1 text-sm sm:gap-2">
          {Object.values(PILLARS).map((p) => (
            <Link
              key={p.slug}
              href={`/topics/${p.slug}`}
              className="rounded-full px-3 py-1.5 text-ink-300 transition-colors hover:bg-ink-850 hover:text-volt"
            >
              {p.short}
            </Link>
          ))}
          <Link
            href="/about"
            className="hidden rounded-full px-3 py-1.5 text-ink-300 transition-colors hover:bg-ink-850 hover:text-volt sm:block"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}
