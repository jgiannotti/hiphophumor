import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'HIP HOP HUMOR — the funniest sh*t in rap, updated daily';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Generated at request time (not collected at build) so the build never blocks
// on next/og fetching font/wasm assets in an offline environment. On Vercel
// this renders on demand and is cached. Uses only system fonts — no remote
// font fetch — so it's fully self-contained.
export const dynamic = 'force-dynamic';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0B',
          backgroundImage:
            'radial-gradient(circle at 15% 0%, rgba(204,255,0,0.18), transparent 45%), radial-gradient(circle at 85% 100%, rgba(255,45,126,0.18), transparent 45%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', fontSize: 132, fontWeight: 900, letterSpacing: -4, lineHeight: 1 }}>
          HIP HOP
        </div>
        <div style={{ display: 'flex', fontSize: 132, fontWeight: 900, letterSpacing: -4, lineHeight: 1, color: '#CCFF00' }}>
          HUMOR
        </div>
        <div style={{ marginTop: 36, fontSize: 38, color: '#9a9aa2', fontWeight: 600 }}>
          the funniest sh*t in rap — updated daily
        </div>
        <div style={{ marginTop: 40, display: 'flex', fontSize: 26, color: '#FF2D7E', fontWeight: 800 }}>
          hiphophumor.com
        </div>
      </div>
    ),
    { ...size },
  );
}
