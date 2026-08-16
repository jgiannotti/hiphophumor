export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div>
          <p className="font-display text-3xl tracking-tight uppercase leading-none">
            HIP HOP <span className="text-[rgb(var(--volt))]">HUMOR</span>
          </p>
          <p className="mt-2 text-sm text-[rgb(var(--muted))] max-w-md">
            Scraped from the wildest corners of Reddit by a bot that never sleeps.
            Every meme belongs to whoever cooked it — we just put a spotlight on it.
          </p>
        </div>
        <div className="flex gap-5 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--muted))]">
          <a href="/feed.xml" className="hover:text-[rgb(var(--volt))]">RSS</a>
          <a href="/about" className="hover:text-[rgb(var(--volt))]">About</a>
          <a href="/about#dmca" className="hover:text-[rgb(var(--volt))]">Takedown</a>
        </div>
      </div>
    </footer>
  );
}
