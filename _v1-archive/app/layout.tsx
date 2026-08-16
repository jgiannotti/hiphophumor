import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getTrending } from '@/lib/trending';

export const metadata: Metadata = {
  metadataBase: new URL('https://hiphophumor.com'),
  title: {
    default: 'HIP HOP HUMOR — the funniest sh*t in rap, updated daily',
    template: '%s · HIP HOP HUMOR',
  },
  description:
    "The loudest, freshest, most unfiltered hip-hop memes on the internet — auto-updated every single day. Drake, Kendrick, Carti, Ye, Uzi. If rap is laughing at it, it's already here.",
  keywords: [
    'hip hop memes', 'rap memes', 'drake memes', 'kendrick memes', 'kanye memes',
    'carti memes', 'lil uzi memes', 'hip hop humor', 'rap humor', 'trending rap memes',
  ],
  openGraph: {
    type: 'website',
    siteName: 'HIP HOP HUMOR',
    title: 'HIP HOP HUMOR — the funniest sh*t in rap',
    description: "Unfiltered hip-hop memes, auto-updated daily. If rap is laughing at it, it's here.",
    url: 'https://hiphophumor.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIP HOP HUMOR — the funniest sh*t in rap',
    description: "Unfiltered hip-hop memes, auto-updated daily. If rap is laughing at it, it's here.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://hiphophumor.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const trending = getTrending();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Fonts loaded via <link> (runtime CSS) rather than next/font so the
          build never depends on Google Fonts being reachable from the build
          machine. Anton (display) + Inter (body). The font-family stacks live
          as CSS vars (--font-display / --font-sans) in globals.css.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Dark is the default. Only flip to light if the user explicitly chose it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  if (localStorage.getItem('theme') === 'light') {
                    document.documentElement.classList.add('light');
                  }
                } catch(e){}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Header trending={trending} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
