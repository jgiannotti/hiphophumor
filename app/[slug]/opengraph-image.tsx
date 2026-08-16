import { ImageResponse } from 'next/og'
import { getAllArticles, getArticle } from '@/lib/content'
import { PILLARS } from '@/lib/site'

export const alt = 'HipHopHumor explainer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  const heading = article?.h1 ?? 'HipHopHumor'
  const pillar = article ? PILLARS[article.pillar].name : 'Explainers'
  const fontSize = heading.length > 58 ? 66 : heading.length > 38 ? 78 : 92

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#08080A',
          padding: '72px 80px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '10px',
            background: '#CCFF00',
          }}
        />

        <div
          style={{
            fontSize: 24,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: '#CCFF00',
            fontWeight: 700,
          }}
        >
          {pillar}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontSize,
            lineHeight: 1.04,
            fontWeight: 800,
            color: '#EDEDF2',
            letterSpacing: -2,
            maxWidth: 1040,
          }}
        >
          {heading}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 6, background: '#FF2D7E' }} />
          <div style={{ fontSize: 30, color: '#B4B4C0', fontWeight: 600 }}>hiphophumor.com</div>
        </div>
      </div>
    ),
    size,
  )
}
