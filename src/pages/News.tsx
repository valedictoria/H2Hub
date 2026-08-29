import { Separator } from "@/components/ui/separator"

const ENTRIES = [
  {
    date: "August 16, 2026",
    title: "BravoBlue: a new evaluation network is in training",
    body: "BravoBlue is growing its own evaluation network from self-play instead of reusing an existing one. The self-play dataset is done — just over 26 million positions — but training and head-to-head testing against the current network haven't started yet.",
  },
  {
    date: "August 3, 2026",
    title: "Fairy-MC: a new engine for chess variants",
    body: "Fairy-MC is a fork of Nature v2.1 built to play chess variants, not just standard chess, from one binary. King of the Hill is working end to end: in self-play testing, every move stayed legal and games ended correctly when a king reached the center. Three-check, Racing Kings, and Horde are next, followed by Antichess, Atomic, and Chess960.",
  },
  {
    date: "August 3, 2026",
    title: "Nature v2.1: faster search, smarter time management",
    body: "This release adds NEON SIMD for the evaluation network, a time management change that extends thinking time when the engine's evaluation drops sharply, and support for MultiPV, ponder, and other options external chess interfaces expect. It also adds razoring and a second search thread, both of which looked promising in short test runs but haven't yet been confirmed by a longer, statistically rigorous match.",
  },
]

export function News() {
  return (
    <div>
      <h1 className="mb-6 text-4xl font-semibold tracking-tight">News</h1>
      <div className="flex flex-col">
        {ENTRIES.map((entry, i) => (
          <div key={entry.title}>
            <article className="py-7 first:pt-0">
              <div className="mb-1 text-xs font-semibold tracking-widest text-primary uppercase">
                {entry.date}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{entry.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{entry.body}</p>
            </article>
            {i < ENTRIES.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  )
}
