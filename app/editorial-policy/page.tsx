import type { Metadata } from 'next'
import PageShell from '@/components/PageShell'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Editorial policy',
  description:
    'How HipHopHumor sources, verifies, corrects and labels its reporting — including how we handle disputed origin stories and unconfirmed claims.',
  alternates: { canonical: `${SITE.url}/editorial-policy` },
}

export default function EditorialPolicyPage() {
  return (
    <PageShell
      eyebrow="Editorial policy"
      title="How we source and check this"
      intro="Everything published here is original writing produced by the HipHopHumor editorial desk. Here is the standard we hold it to."
    >
      <h2>Sourcing</h2>
      <p>
        Every factual claim — a date, a legal name, a quote, an origin story, a chart position — is
        verified against a published source before it appears on the site. Each article lists its
        sources at the bottom, and every listed source is one we actually consulted.
      </p>
      <p>
        We prefer primary sources: the artist saying it themselves in an interview, official label
        or brand material, liner notes, or documented on-record statements. Secondary reporting from
        established music press is acceptable where a primary source does not exist.
      </p>

      <h2>Unconfirmed and disputed claims</h2>
      <p>
        A large share of what circulates as rap trivia has no traceable source. When we cannot
        verify a claim, we do one of three things, in order of preference: leave it out, state
        plainly that it is commonly reported but unconfirmed, or present the competing accounts
        side by side and say which is better documented.
      </p>
      <p>
        We never invent a quote, a date, or a source, and we do not repeat a tidy origin story
        simply because it is the version everyone else runs.
      </p>

      <h2>Corrections</h2>
      <p>
        If we publish something wrong, we fix it and say so. Email{' '}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> with the article and the
        issue. Substantive corrections are noted in the article itself, and the modification date is
        updated.
      </p>

      <h2>Fairness to the people we write about</h2>
      <p>
        This is a music and language site. We do not report on criminal allegations, legal
        proceedings, personal relationships, health, or unproven claims about anyone. Where that
        material is unavoidable context, it gets one neutral sentence and no speculation.
      </p>
      <p>
        Humor here is aimed at the absurdity of stage names, personas and the music business —
        never at an artist&apos;s background, family, ethnicity or class.
      </p>

      <h2>Use of AI</h2>
      <p>
        We use software tools in research and production, as most publishers now do. No article is
        published without human editorial review of its claims, its sources and its tone, and the
        standards above apply regardless of what tools were used to draft it. Responsibility for
        everything on this site rests with the editorial desk.
      </p>

      <h2>Ownership of content</h2>
      <p>
        All written content on this site is original and produced for HipHopHumor. We do not
        republish, scrape or mirror other publishers&apos; articles or images. Artist names, song
        titles, lyrics quoted briefly for commentary, and trademarks belong to their respective
        owners and are used here for identification and criticism.
      </p>
    </PageShell>
  )
}
