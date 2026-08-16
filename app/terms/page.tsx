import type { Metadata } from 'next'
import PageShell from '@/components/PageShell'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of use',
  description:
    'The terms governing use of hiphophumor.com, including content ownership, permitted use, and disclaimers.',
  alternates: { canonical: `${SITE.url}/terms` },
}

export default function TermsPage() {
  return (
    <PageShell eyebrow="Legal" title="Terms of use" intro="Last updated: August 16, 2026.">
      <p>
        By using {SITE.domain} you agree to these terms. If you do not agree, please do not use the
        site.
      </p>

      <h2>Our content</h2>
      <p>
        All written content on this site is original work owned by {SITE.name} and protected by
        copyright. You may read it, link to it, and quote short excerpts with attribution and a link
        back. You may not republish articles in whole or in substantial part, or use them to train
        commercial models for resale, without written permission.
      </p>
      <p>
        Artist names, group names, song and album titles, brand names and logos referenced on this
        site belong to their respective owners. They are used here for identification, commentary
        and criticism. Brief lyric quotations are used for the purpose of commentary and criticism.
        We are not affiliated with, endorsed by, or sponsored by any artist, label or brand
        mentioned.
      </p>

      <h2>Accuracy</h2>
      <p>
        We work hard to get things right and we list our sources so you can check. Even so, content
        is provided for general information and entertainment, on an &quot;as is&quot; basis,
        without warranties of any kind. Where a claim is disputed or unconfirmed we say so, and you
        should treat those claims accordingly.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not use this site to break the law, attempt to gain unauthorised access to it, interfere
        with its operation, or scrape it at a volume that degrades service for other readers.
      </p>

      <h2>Third-party links and advertising</h2>
      <p>
        This site links to external sources and may display third-party advertising. We do not
        control and are not responsible for third-party content, products or services, and a link
        is not an endorsement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE.name} is not liable for any indirect,
        incidental or consequential damages arising from your use of, or inability to use, this
        site.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. Continued use of the site after a change means you accept the
        revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </PageShell>
  )
}
