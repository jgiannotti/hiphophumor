// The live "Trending in Rap" layer. Headlines are seeded in data/trending.json
// and validated by scripts/refresh-trending.mjs. The Header marquee ticker and
// the homepage "Trending in Rap" strip both render from here, so the news layer
// is fully data-driven — edit the JSON, the whole site updates.

import trendingJson from '@/data/trending.json';

export interface TrendingItem {
  title: string;
  blurb: string;
  source: string;
  url: string;
}

const ALL = trendingJson as TrendingItem[];

export function getTrending(): TrendingItem[] {
  return ALL;
}
