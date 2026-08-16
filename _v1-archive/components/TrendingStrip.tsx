import type { TrendingItem } from '@/lib/trending';

// "Trending in Rap" strip near the top of the homepage. Same data source as
// the header ticker (data/trending.json) — fully data-driven. Horizontal,
// swipeable card row of the headlines actually moving the culture right now.
export function TrendingStrip({ items }: { items: TrendingItem[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="trending-heading">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block h-2 w-2 rounded-full bg-[rgb(var(--magenta))] animate-pulse" />
        <h2 id="trending-heading" className="font-display text-2xl tracking-tight uppercase">
          Trending in Rap
        </h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="snap-start shrink-0 w-72 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 hover:border-[rgb(var(--magenta))]/60 hover:shadow-magenta transition-all group"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--volt))]">
              {item.source}
            </span>
            <h3 className="mt-1 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[rgb(var(--magenta))] transition-colors">
              {item.title}
            </h3>
            <p className="mt-1.5 text-xs text-[rgb(var(--muted))] line-clamp-3">{item.blurb}</p>
            <span className="mt-2 inline-block text-xs font-bold text-[rgb(var(--magenta))]">
              Read it ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
