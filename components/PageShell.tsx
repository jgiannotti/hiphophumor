export default function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <article className="mx-auto max-w-prose px-5 py-14 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-volt">{eyebrow}</p>
      <h1 className="mt-4 font-display text-4xl uppercase leading-[1.02] tracking-tight text-ink-100 sm:text-5xl">
        {title}
      </h1>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-300">{intro}</p>}
      <div className="prose-hhh mt-10">{children}</div>
    </article>
  )
}
