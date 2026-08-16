// Shared types for the meme pipeline

export interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  subreddit: string;
  author: string;
  ups: number;
  numComments: number;
  permalink: string;       // full https://reddit.com/... link
  createdUtc: number;      // unix seconds
  score: number;           // our internal funny-score
  nsfw: boolean;
}

export interface RedditPost {
  data: {
    id: string;
    title: string;
    url: string;
    permalink: string;
    subreddit: string;
    author: string;
    ups: number;
    num_comments: number;
    created_utc: number;
    post_hint?: string;
    is_video?: boolean;
    over_18?: boolean;
    stickied?: boolean;
    spoiler?: boolean;
    domain?: string;
    thumbnail?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
    preview?: {
      images?: Array<{
        source?: { url: string; width: number; height: number };
        resolutions?: Array<{ url: string; width: number; height: number }>;
      }>;
    };
  };
}

export interface RedditListing {
  data?: {
    children: RedditPost[];
  };
}
