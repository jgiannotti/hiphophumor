import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Ticker } from './Ticker';
import type { TrendingItem } from '@/lib/trending';

export function Header({ trending }: { trending: TrendingItem[] }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[rgb(var(--bg))]/85 border-b border-[rgb(var(--border))]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="HIP HOP HUMOR home">
          <span className="text-2xl spin-slow inline-block" aria-hidden>💿</span>
          <span className="font-display text-2xl sm:text-3xl leading-none tracking-tight">
            HIP HOP
            <span
              className="text-[rgb(var(--volt))] group-hover:text-[rgb(var(--magenta))] transition-colors"
            >
              {' '}HUMOR
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-md hover:text-[rgb(var(--volt))] hover:bg-[rgb(var(--card-2))]"
          >
            Feed
          </Link>
          <Link
            href="/about"
            className="px-3 py-1.5 rounded-md hover:text-[rgb(var(--volt))] hover:bg-[rgb(var(--card-2))]"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>

      {/* Auto-scrolling trending-rap ticker, fed from data/trending.json */}
      <Ticker items={trending} />
    </header>
  );
}
