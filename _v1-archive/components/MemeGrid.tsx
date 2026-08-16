import type { Meme } from '@/lib/types';
import { MemeCard } from './MemeCard';

export function MemeGrid({ memes }: { memes: Meme[] }) {
  if (memes.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-[rgb(var(--border))] rounded-2xl">
        <p className="text-4xl mb-3">🎧</p>
        <p className="font-display text-2xl tracking-tight">FEED&apos;S IN THE LAB</p>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          The bots are out here cooking a fresh batch. Pull up again in a minute.
        </p>
      </div>
    );
  }
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
      {memes.map((meme, i) => (
        <div key={meme.id} className="mb-4 break-inside-avoid">
          <MemeCard meme={meme} priority={i < 3} />
        </div>
      ))}
    </div>
  );
}
