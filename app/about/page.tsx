import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/PageShell'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'HipHopHumor explains where rap ad-libs, nicknames and slang actually came from — sourced, fact-checked, and written by people who listen to the music.',
  alternates: { canonical: `${SITE.url}/about` },
}

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="We do the reading so you don't have to"
      intro="HipHopHumor answers the questions people actually type into search bars about rap — and answers them properly, with sources."
    >
      <h2>Why this site exists</h2>
      <p>
        Search almost any real question about hip-hop — why a rapper uses a particular ad-lib, where
        an alias came from, what a slang term actually means — and you get one of three things: a
        video you have to sit through, a slang-dictionary page written by someone who has never
        heard the song, or nothing at all.
      </p>
      <p>
        That is a strange gap for the most-discussed genre on earth. We are filling it. Every piece
        here starts from a question someone is genuinely asking and ends with an answer you can
        check.
      </p>

      <h2>How we work</h2>
      <p>
        Every factual claim on this site is verified against a real source before publication, and
        those sources are listed at the bottom of each article so you can follow them yourself.
        Where an origin story is disputed or undocumented, we say so instead of picking the version
        that reads best.
      </p>
      <p>
        That last part matters more than it sounds. Rap etymology is full of confident internet
        folklore that turns out to have no source behind it. A surprising number of the &quot;facts&quot;
        repeated across every listicle on the topic trace back to nothing. When we hit one of those,
        we tell you it is unconfirmed. Read our{' '}
        <Link href="/editorial-policy">editorial policy</Link> for the full standard.
      </p>

      <h2>What we cover</h2>
      <ul>
        <li>
          <Link href="/topics/ad-libs">Ad-libs and producer tags</Link> — the grunts, yelps and drops
          that make a song identifiable in two seconds, and who actually voices them.
        </li>
        <li>
          <Link href="/topics/names">Names and nicknames</Link> — where rap aliases come from, and
          the government names underneath them.
        </li>
        <li>
          <Link href="/topics/slang">Rap slang</Link> — real etymology, with the context the
          dictionary sites leave out.
        </li>
      </ul>

      <h2>Tone</h2>
      <p>
        We are fans, not tourists. The jokes here are aimed at the absurdity of showbiz, never at
        the artists, their families or where they came from. We keep the language clean and the
        opinions sharp.
      </p>

      <h2>Get in touch</h2>
      <p>
        Corrections, tips and requests are all welcome at{' '}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. If we got something wrong,
        tell us and we will fix it and note the correction. See the{' '}
        <Link href="/contact">contact page</Link> for more.
      </p>
    </PageShell>
  )
}
