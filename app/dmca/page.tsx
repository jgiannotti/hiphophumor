import type { Metadata } from 'next'
import PageShell from '@/components/PageShell'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'DMCA and copyright',
  description:
    'How to send a copyright notice to HipHopHumor, what it must contain, and how we handle counter-notices.',
  alternates: { canonical: `${SITE.url}/dmca` },
}

export default function DmcaPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="DMCA and copyright"
      intro="We respect copyright and act on valid notices quickly. Last updated: August 16, 2026."
    >
      <h2>Our position</h2>
      <p>
        All written content on {SITE.domain} is original and produced by our editorial desk. We do
        not host, mirror or republish other publishers&apos; articles, photographs or artwork.
        References to artists, songs, albums and brands are made for identification, commentary and
        criticism.
      </p>

      <h2>Sending a notice</h2>
      <p>
        If you own a copyright and believe material on this site infringes it, email{' '}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> with the subject line
        &quot;DMCA Notice&quot;. To be effective under 17 U.S.C. § 512(c)(3), your notice must
        include all of the following:
      </p>
      <ol>
        <li>A physical or electronic signature of the copyright owner, or a person authorised to act on their behalf.</li>
        <li>Identification of the copyrighted work claimed to have been infringed.</li>
        <li>
          Identification of the material claimed to be infringing, with enough detail for us to
          locate it — a direct URL is best.
        </li>
        <li>Your name, mailing address, telephone number and email address.</li>
        <li>
          A statement that you have a good-faith belief that the disputed use is not authorised by
          the copyright owner, its agent, or the law.
        </li>
        <li>
          A statement, made under penalty of perjury, that the information in your notice is
          accurate and that you are the copyright owner or authorised to act on their behalf.
        </li>
      </ol>

      <h2>What happens next</h2>
      <p>
        We review valid notices promptly and, where a claim is well founded, remove or disable
        access to the material and notify the party who supplied it. We keep a record of notices
        received and actions taken.
      </p>

      <h2>Counter-notice</h2>
      <p>
        If material of yours was removed and you believe that was a mistake or misidentification,
        you may send a counter-notice to the same address including your signature, identification
        of the removed material and its former location, a statement under penalty of perjury that
        you have a good-faith belief the removal was a mistake, your contact details, and your
        consent to the jurisdiction of the appropriate federal court.
      </p>

      <h2>Repeat infringers</h2>
      <p>
        We terminate access for repeat infringers in appropriate circumstances, in line with the
        DMCA safe harbour requirements.
      </p>

      <h2>Bad-faith notices</h2>
      <p>
        Please note that under 17 U.S.C. § 512(f) a person who knowingly misrepresents that material
        is infringing may be liable for damages.
      </p>
    </PageShell>
  )
}
