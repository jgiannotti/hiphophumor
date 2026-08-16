import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#08080A',
          padding: '80px',
          position: 'relative',
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
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#CCFF00',
            fontWeight: 700,
          }}
        >
          hiphophumor.com
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 92,
            lineHeight: 1.02,
            fontWeight: 800,
            color: '#EDEDF2',
            letterSpacing: -2,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          Why do rappers say that?
        </div>
        <div style={{ marginTop: 32, fontSize: 32, color: '#B4B4C0', maxWidth: 900 }}>
          Ad-libs, nicknames and slang — explained properly, with sources.
        </div>
      </div>
    ),
    size,
  )
}
