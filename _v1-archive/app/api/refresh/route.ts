import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Hit by Vercel cron (see vercel.json). Forces a refresh of the ISR cache.
export async function GET() {
  try {
    revalidateTag('reddit');
    revalidatePath('/');
    return NextResponse.json({ refreshed: true, at: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
