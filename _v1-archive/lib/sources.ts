// Source subreddits, weighted by how meme-dense and on-brand they are.
// Higher weight = its posts get a score boost in the trend ranking.
//
// FRESHNESS MODEL: we no longer pull "top all-time." The refresh script pulls
// recent windows (last week + last month) so the pool reflects what's actually
// popping off in rap right now. Weight nudges the ranking toward the funniest,
// most meme-dense corners.

export interface Source {
  subreddit: string;
  weight: number;       // 0.5 (occasional gems) to 2.0 (pure meme gold)
  timeWindow: 'day' | 'week' | 'month';
  minUpvotes: number;   // sub-specific floor
}

export const SOURCES: Source[] = [
  // PRIMARY — pure meme content, hip-hop focused
  { subreddit: 'hiphopcirclejerk', weight: 2.0, timeWindow: 'week',  minUpvotes: 100 },
  { subreddit: 'rapbattles',       weight: 1.6, timeWindow: 'week',  minUpvotes: 80 },
  { subreddit: 'Drizzy',           weight: 1.6, timeWindow: 'week',  minUpvotes: 120 },
  { subreddit: 'KendrickLamar',    weight: 1.5, timeWindow: 'week',  minUpvotes: 100 },
  { subreddit: 'KanyeWest',        weight: 1.4, timeWindow: 'week',  minUpvotes: 120 },
  { subreddit: 'playboicarti',     weight: 1.4, timeWindow: 'week',  minUpvotes: 100 },
  { subreddit: 'TravisScott',      weight: 1.2, timeWindow: 'week',  minUpvotes: 100 },
  { subreddit: 'Eminem',           weight: 1.2, timeWindow: 'week',  minUpvotes: 120 },
  { subreddit: 'liluzivert',       weight: 1.2, timeWindow: 'week',  minUpvotes: 80 },
  { subreddit: 'JuiceWRLD',        weight: 1.1, timeWindow: 'week',  minUpvotes: 80 },
  { subreddit: 'JCole',            weight: 1.1, timeWindow: 'week',  minUpvotes: 80 },
  { subreddit: 'XXXTENTACION',     weight: 1.0, timeWindow: 'week',  minUpvotes: 80 },
  { subreddit: 'GriseldaRecords',  weight: 1.0, timeWindow: 'month', minUpvotes: 60 },
  { subreddit: 'MFDOOM',           weight: 1.0, timeWindow: 'month', minUpvotes: 60 },

  // SECONDARY — quality varies, filter aggressively
  { subreddit: 'rap',              weight: 0.9, timeWindow: 'week',  minUpvotes: 80 },
  { subreddit: 'HipHopImages',     weight: 0.9, timeWindow: 'month', minUpvotes: 150 },
  { subreddit: 'trapproduction',   weight: 0.8, timeWindow: 'month', minUpvotes: 60 },
  { subreddit: 'hiphopheads',      weight: 0.7, timeWindow: 'week',  minUpvotes: 300 },
  { subreddit: 'rapmusic',         weight: 0.7, timeWindow: 'week',  minUpvotes: 60 },

  // BACKFILL — wider monthly window so the pool stays full even on a slow week
  { subreddit: 'hiphopcirclejerk', weight: 1.5, timeWindow: 'month', minUpvotes: 300 },
  { subreddit: 'Drizzy',           weight: 1.3, timeWindow: 'month', minUpvotes: 300 },
  { subreddit: 'KendrickLamar',    weight: 1.3, timeWindow: 'month', minUpvotes: 250 },
];
