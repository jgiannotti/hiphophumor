'use client';

import { useState } from 'react';

// Copy-link affordance for a meme. Uses the Web Share API when available
// (mobile), falls back to clipboard copy with a quick "Copied" confirmation.
export function ShareButton({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const onShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://hiphophumor.com/meme/${id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
    } catch {
      // user cancelled share sheet — fall through to copy
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // clipboard blocked — last resort
      window.prompt('Copy this link:', url);
    }
  };

  return (
    <button
      onClick={onShare}
      aria-label={`Share "${title}"`}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide border border-[rgb(var(--border))] hover:border-[rgb(var(--volt))] hover:text-[rgb(var(--volt))]"
    >
      {copied ? '✓ Copied' : '↗ Share'}
    </button>
  );
}
