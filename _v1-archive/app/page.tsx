import { getMemes } from '@/lib/reddit';
import { getTrending } from '@/lib/trending';
import { MemeGrid } from '@/components/MemeGrid';
import { TrendingStrip } from '@/components/TrendingStrip';

// Re-render daily so the shuffle rotates with the date seed.
export const revalidate = 86400;

export default async function HomePage() {
  const memes = await getMemes({ limit: 60 });
  const trending = getTrending();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* HERO */}
      <section className="mb-8">
        <h1 className="font-display text-5xl sm:text-7xl tracking-tight uppercase">
          The funniest
          <span className="text-[rgb(var(--volt))]"> sh*t</span> in rap.
          <br className="hidden sm:block" />
          <span className="text-[rgb(var(--magenta))]">Updated daily.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[rgb(var(--muted))] max-w-2xl">
          No corny captions. No stale 2017 reposts. An auto-updating wall of the
          loudest, freshest hip-hop memes the internet is laughing at{' '}
          <span className="text-[rgb(var(--fg))] font-semibold">right now</span> — ranked by heat, not nostalgia.
        </p>
      </section>

      {/* TRENDING IN RAP strip */}
      <TrendingStrip items={trending} />

      {/* FEED */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-3xl tracking-tight uppercase">The Feed</h2>
          <span className="text-xs uppercase tracking-widest text-[rgb(var(--muted))]">
            Rotates every 24h
          </span>
        </div>
        <MemeGrid memes={memes} />
      </section>

      <p className="mt-14 text-center text-xs uppercase tracking-widest text-[rgb(var(--muted))]">
        Auto-curated by a bot with no chill · refreshes daily
      </p>
    </div>
  );
}
