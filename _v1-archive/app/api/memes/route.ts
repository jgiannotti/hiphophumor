import { NextResponse } from 'next/server';
import { getMemes } from '@/lib/reddit';

export const revalidate = 3600;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') ?? '60', 10);
  const memes = await getMemes({ limit: Math.min(Math.max(limit, 1), 200) });
  return NextResponse.json(
    { memes, count: memes.length, refreshedAt: new Date().toISOString() },
    { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } },
  );
}
