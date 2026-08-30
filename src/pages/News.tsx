const ENTRIES = [
  {
    date: "AUG 16, 2026",
    title: "BravoBlue: a new evaluation network is in training",
    body: "BravoBlue is growing its own evaluation network from self-play instead of reusing an existing one. The self-play dataset is done — just over 26 million positions — but training and head-to-head testing against the current network haven't started yet.",
  },
  {
    date: "AUG 3, 2026",
    title: "Fairy-MC: a new engine for chess variants",
    body: "Fairy-MC is a fork of Nature v2.1 built to play chess variants, not just standard chess, from one binary. King of the Hill is working end to end: in self-play testing, every move stayed legal and games ended correctly when a king reached the center. Three-check, Racing Kings, and Horde are next, followed by Antichess, Atomic, and Chess960.",
  },
  {
    date: "AUG 3, 2026",
    title: "Nature v2.1: faster search, smarter time management",
    body: "This release adds NEON SIMD for the evaluation network, a time management change that extends thinking time when the engine's evaluation drops sharply, and support for MultiPV, ponder, and other options external chess interfaces expect. It also adds razoring and a second search thread, both of which looked promising in short test runs but haven't yet been confirmed by a longer, statistically rigorous match.",
  },
]

export function News() {
  return (
    <div>
      <h1 className="mb-6 text-4xl font-semibold tracking-tight">News</h1>
      <table className="w-full border-collapse">
        <tbody>
          {ENTRIES.map((entry) => (
            <tr key={entry.title} className="border-b border-border">
              <td className="hidden w-32 py-6 pr-4 align-top font-mono text-xs whitespace-nowrap text-muted-foreground sm:table-cell">
                <span className="inline-block -translate-y-[3px]">
                  {entry.date}
                </span>
              </td>
              <td className="py-6 align-top">
                <div className="mb-1 font-mono text-xs text-muted-foreground uppercase sm:hidden">
                  {entry.date}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{entry.title}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {entry.body}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
