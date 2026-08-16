import type { TrendingItem } from '@/lib/trending';

// Horizontal auto-scrolling marquee of trending rap headlines. Server component
// (pure CSS animation, no JS). The track renders the items twice so the
// translateX(-50%) loop is seamless. Pauses on hover; respects reduced-motion.
export function Ticker({ items }: { items: TrendingItem[] }) {
  if (!items.length) return null;

  const Row = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <div className="marquee-track" aria-hidden={ariaHidden}>
      {items.map((item, i) => (
        <a
          key={`${ariaHidden ? 'b' : 'a'}-${i}`}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 group"
          title={item.blurb}
        >
          <span className="text-[rgb(var(--magenta))] font-display text-sm tracking-wide">
            ►
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--volt))]">
            {item.source}
          </span>
          <span className="text-sm font-medium text-[rgb(var(--fg))] group-hover:text-[rgb(var(--volt))]">
            {item.title}
          </span>
          <span className="text-[rgb(var(--border))]">/</span>
        </a>
      ))}
    </div>
  );

  return (
    <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="max-w-full overflow-hidden marquee-mask flex">
        <span className="sr-only">Trending in rap:</span>
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
