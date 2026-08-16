import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'How HIP HOP HUMOR works, where the memes come from, and how to get yours pulled.',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-5xl tracking-tight uppercase mb-6">
        About the <span className="text-[rgb(var(--volt))]">site</span>
      </h1>

      <p className="text-[rgb(var(--muted))] leading-relaxed">
        HIP HOP HUMOR is a wall of the funniest, freshest hip-hop memes on the
        internet — and a bot does all the work. We don&apos;t write the jokes. We
        hunt down the ones blowing up across rap&apos;s loudest communities and rank
        them by pure heat: how new it is, how hard it&apos;s hitting, and how
        meme-dense the source is. No nostalgia bait, no recycled 2017 reposts.
      </p>

      <h2 className="font-display text-2xl tracking-tight uppercase mt-10 mb-3">
        How it actually works
      </h2>
      <ul className="space-y-2 text-[rgb(var(--muted))]">
        <li className="flex gap-2"><span className="text-[rgb(var(--volt))]">▸</span> Every day a robot pulls the hottest recent posts from a wide net of hip-hop subreddits — last week and last month, never &quot;all time.&quot;</li>
        <li className="flex gap-2"><span className="text-[rgb(var(--volt))]">▸</span> It throws out videos, dead links, low-engagement noise, NSFW, and anything that trips our hard blocklist (slurs, hate, doxxing, the real red lines).</li>
        <li className="flex gap-2"><span className="text-[rgb(var(--volt))]">▸</span> What survives gets a heat score — recency × upvotes × source quality — and the hottest float to the top.</li>
        <li className="flex gap-2"><span className="text-[rgb(var(--volt))]">▸</span> The site rebuilds itself. No human in the loop, no opinions, no mercy.</li>
      </ul>

      <h2 className="font-display text-2xl tracking-tight uppercase mt-10 mb-3">
        Edgy, not evil
      </h2>
      <p className="text-[rgb(var(--muted))] leading-relaxed">
        Rap is unfiltered, so we are too — beef, shots, savage captions, all fair
        game. The one line we don&apos;t cross: slurs, hate targeting people for who
        they are, doxxing, and anything illegal. That stuff gets nuked on sight.
        Everything short of it ships.
      </p>

      <h2 className="font-display text-2xl tracking-tight uppercase mt-10 mb-3">
        Credit where it&apos;s due
      </h2>
      <p className="text-[rgb(var(--muted))] leading-relaxed">
        Every meme links straight back to the original Reddit post and the person
        who posted it. We&apos;re a discovery layer, not the owner. Click through,
        show the creator love, that&apos;s the whole vibe.
      </p>

      <h2 id="dmca" className="font-display text-2xl tracking-tight uppercase mt-10 mb-3">
        Get it pulled
      </h2>
      <p className="text-[rgb(var(--muted))] leading-relaxed">
        Your meme&apos;s up here and you want it gone? No drama. Email{' '}
        <a href="mailto:takedown@hiphophumor.com" className="text-[rgb(var(--volt))] underline underline-offset-2">
          takedown@hiphophumor.com
        </a>{' '}
        with the link and it&apos;s out by the next refresh. We respect creator wishes,
        no questions asked.
      </p>
    </div>
  );
}
