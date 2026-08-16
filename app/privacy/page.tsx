import type { Metadata } from 'next'
import PageShell from '@/components/PageShell'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'What HipHopHumor collects, what we do not collect, how advertising cookies work, and how to exercise your privacy rights.',
  alternates: { canonical: `${SITE.url}/privacy` },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Legal" title="Privacy policy" intro="Last updated: August 16, 2026.">
      <p>
        This policy explains what information {SITE.name} (&quot;we&quot;, &quot;us&quot;) collects
        when you visit {SITE.domain}, why we collect it, and what choices you have.
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>We do not ask you for personal information.</strong> There is no account system, no
        login, and no newsletter signup on this site at present. If you email us, we receive the
        address you write from and whatever you put in the message, and we keep that correspondence
        only as long as needed to deal with it.
      </p>
      <p>
        <strong>Automatically collected data.</strong> Like nearly all websites, our hosting
        provider records standard technical information when a page is requested: IP address,
        browser type and version, device type, referring page, and the pages viewed. This is used
        for security, troubleshooting and aggregate traffic measurement.
      </p>

      <h2>Analytics</h2>
      <p>
        We use privacy-conscious traffic analytics to understand which articles people read and how
        the site performs. We do not use analytics to build profiles of individual visitors, and we
        do not sell or share visitor data.
      </p>

      <h2>Advertising and cookies</h2>
      <p>
        This site may display advertising supplied by third-party ad networks, including Google.
        Where advertising is served:
      </p>
      <ul>
        <li>Third-party vendors, including Google, use cookies to serve ads based on prior visits to this or other websites.</li>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based on
          your visits to this site and other sites on the internet.
        </li>
        <li>
          You can opt out of personalised advertising by visiting Google&apos;s{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener nofollow">
            Ads Settings
          </a>
          , or opt out of third-party vendor cookies at{' '}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener nofollow">
            aboutads.info
          </a>{' '}
          and{' '}
          <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener nofollow">
            youronlinechoices.eu
          </a>
          .
        </li>
        <li>You can also block or delete cookies through your browser settings at any time.</li>
      </ul>

      <h2>Children</h2>
      <p>
        This site is not directed at children under 13, and we do not knowingly collect personal
        information from them. If you believe a child has provided us information, email us and we
        will delete it.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete or restrict
        processing of your personal information, to object to processing, and to data portability.
        Residents of California, and of jurisdictions covered by the GDPR and UK GDPR, have
        additional rights including the right not to have personal information sold or shared. We do
        not sell personal information.
      </p>
      <p>
        To exercise any of these rights, email{' '}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. We respond to verified
        requests within the timeframe required by applicable law.
      </p>

      <h2>External links</h2>
      <p>
        Articles link out to sources and other websites. We are not responsible for the privacy
        practices or content of sites we link to.
      </p>

      <h2>Changes</h2>
      <p>
        We will update this page if our practices change, and will revise the date at the top when
        we do.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </PageShell>
  )
}
