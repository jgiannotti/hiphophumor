import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getMeme } from '@/lib/reddit';

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meme = await getMeme(params.id);
  if (!meme) return { title: 'Meme not found' };
  return {
    title: meme.title,
    description: `${meme.title} — straight off r/${meme.subreddit}. Trending hip-hop meme on HIP HOP HUMOR.`,
    openGraph: {
      title: meme.title,
      description: `Going off in r/${meme.subreddit} · ${meme.ups.toLocaleString()} upvotes`,
      images: [{ url: meme.imageUrl, width: meme.width, height: meme.height }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: meme.title,
      images: [meme.imageUrl],
    },
    alternates: { canonical: `https://hiphophumor.com/meme/${meme.id}` },
  };
}

export default async function MemePage({ params }: Props) {
  const meme = await getMeme(params.id);
  if (!meme) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm mb-5">
        <Link
          href="/"
          className="font-semibold uppercase tracking-wide text-[rgb(var(--muted))] hover:text-[rgb(var(--volt))]"
        >
          ← Back to the feed
        </Link>
      </nav>

      <article>
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight uppercase mb-3">
          {meme.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2.5 text-sm text-[rgb(var(--muted))] mb-5">
          <span className="rounded-md border border-[rgb(var(--border))] px-2 py-0.5 font-bold uppercase tracking-wider text-xs">
            r/{meme.subreddit}
          </span>
          <span className="text-[rgb(var(--volt))] font-display">▲ {meme.ups.toLocaleString()}</span>
          <span>·</span>
          <span>{meme.numComments.toLocaleString()} comments</span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={meme.imageUrl} alt={meme.title} className="w-full h-auto" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={meme.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-[rgb(var(--volt))] text-black font-bold uppercase tracking-wide text-sm hover:bg-[rgb(var(--magenta))] hover:text-white"
          >
            See it on Reddit ↗
          </a>
          <a
            href={meme.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg border border-[rgb(var(--border))] font-bold uppercase tracking-wide text-sm hover:border-[rgb(var(--volt))] hover:text-[rgb(var(--volt))]"
          >
            Open full image
          </a>
        </div>
      </article>

      {/* JSON-LD for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            name: meme.title,
            contentUrl: meme.imageUrl,
            uploadDate: new Date(meme.createdUtc * 1000).toISOString(),
            author: { '@type': 'Person', name: meme.author },
            isBasedOn: meme.permalink,
          }),
        }}
      />
    </div>
  );
}
