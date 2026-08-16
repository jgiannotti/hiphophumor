import Link from 'next/link';
import type { Meme } from '@/lib/types';
import { ShareButton } from './ShareButton';

function timeAgo(unixSeconds: number): string {
  const seconds = Math.floor(Date.now() / 1000 - unixSeconds);
  if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

function formatNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function MemeCard({ meme, priority = false }: { meme: Meme; priority?: boolean }) {
  // Maintain the actual image aspect ratio when known, else default 4:5.
  const aspect = meme.width && meme.height ? meme.width / meme.height : 4 / 5;
  const paddingBottom = `${100 / aspect}%`;

  return (
    <article className="group relative bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl overflow-hidden transition-all duration-200 hover:border-[rgb(var(--volt))]/60 hover:shadow-volt hover:-translate-y-0.5 animate-fade-in">
      <Link href={`/meme/${meme.id}`} className="block" aria-label={meme.title}>
        <div className="meme-img relative w-full" style={{ paddingBottom }}>
          {/* Plain <img> on purpose — Reddit's CDN is fast and Next/Image
              optimization would burn serverless invocations on the free tier.
              lazy + async decode keeps it cheap and shift-free. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={meme.thumbnailUrl || meme.imageUrl}
            alt={meme.title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
          {/* Upvote / heat badge */}
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-black/70 backdrop-blur px-2 py-1 text-xs font-display tracking-wide text-[rgb(var(--volt))] border border-[rgb(var(--volt))]/30">
            ▲ {formatNum(meme.ups)}
          </span>
          {/* Source tag */}
          <span className="absolute top-2.5 right-2.5 rounded-md bg-black/70 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 border border-white/10">
            r/{meme.subreddit}
          </span>
        </div>
      </Link>

      <div className="p-3.5">
        <Link href={`/meme/${meme.id}`} className="block">
          <h2 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[rgb(var(--volt))] transition-colors">
            {meme.title}
          </h2>
        </Link>
        <div className="mt-3 flex items-center justify-between text-xs text-[rgb(var(--muted))]">
          <div className="flex items-center gap-2.5">
            <span title="comments">💬 {formatNum(meme.numComments)}</span>
            <span title="posted">{timeAgo(meme.createdUtc)} ago</span>
          </div>
          <ShareButton id={meme.id} title={meme.title} />
        </div>
      </div>
    </article>
  );
}
