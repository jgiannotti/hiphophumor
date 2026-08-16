import type { Metadata } from 'next'
import PageShell from '@/components/PageShell'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach the HipHopHumor editorial desk with corrections, story tips, licensing questions or takedown requests.',
  alternates: { canonical: `${SITE.url}/contact` },
}

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Get in touch"
      intro="One inbox, read by a human. We answer corrections first."
    >
      <p>
        Email us at <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>

      <h2>Corrections</h2>
      <p>
        Include the article title and the specific claim you believe is wrong. If you have a source,
        send it — it speeds things up considerably. We fix confirmed errors and note the correction
        on the article.
      </p>

      <h2>Story tips and requests</h2>
      <p>
        If there is a question about an ad-lib, alias or slang term you cannot find a straight
        answer to anywhere, send it over. Those make the best articles, and reader questions are
        where a good share of this site comes from.
      </p>

      <h2>Press, licensing and partnerships</h2>
      <p>
        Same address. Tell us what you have in mind and we will get back to you.
      </p>

      <h2>Rights and takedowns</h2>
      <p>
        For copyright matters, see our <a href="/dmca">DMCA policy</a>, which sets out exactly what
        a notice needs to include.
      </p>
    </PageShell>
  )
}
