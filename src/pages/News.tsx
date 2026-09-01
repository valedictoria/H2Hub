const ENTRIES = [
  {
    date: "Aug 16, 2026",
    title: "BravoBlue: a new evaluation network is in training",
    body: "BravoBlue is growing its own evaluation network from self-play instead of reusing an existing one. The self-play dataset is done — just over 26 million positions — but training and head-to-head testing against the current network haven't started yet.",
    dot: "var(--news-1)",
  },
  {
    date: "Aug 3, 2026",
    title: "Fairy-MC: a new engine for chess variants",
    body: "Fairy-MC is a fork of Nature v2.1 built to play chess variants, not just standard chess, from one binary. King of the Hill is working end to end: in self-play testing, every move stayed legal and games ended correctly when a king reached the center. Three-check, Racing Kings, and Horde are next, followed by Antichess, Atomic, and Chess960.",
    dot: "var(--news-2)",
  },
  {
    date: "Aug 3, 2026",
    title: "Nature v2.1: faster search, smarter time management",
    body: "This release adds NEON SIMD for the evaluation network, a time management change that extends thinking time when the engine's evaluation drops sharply, and support for MultiPV, ponder, and other options external chess interfaces expect. It also adds razoring and a second search thread, both of which looked promising in short test runs but haven't yet been confirmed by a longer, statistically rigorous match.",
    dot: "var(--news-3)",
  },
]

export function News() {
  return (
    <div>
      <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        Dispatch log
      </span>
      <h1 className="mt-2 mb-10 text-display-md">News</h1>

      <div className="flex flex-col gap-4">
        {ENTRIES.map((entry) => (
          <article
            key={entry.title}
            className="rounded-[var(--radius-card)] border border-hairline bg-card p-7"
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: entry.dot }} />
              {entry.date}
            </div>
            <h3 className="mb-2 text-xl font-bold tracking-tight">
              {entry.title}
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {entry.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
