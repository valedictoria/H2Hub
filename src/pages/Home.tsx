import { useEffect, useState } from "react"
import { getStats, TIME_CONTROLS, type Stats } from "@/data/stats"
import { REPOS } from "@/data/repos"
import { ENGINES } from "@/data/engines"

const BORDER_CLASSES: Record<string, string> = {
  classical: "border-l-classical",
  rapid: "border-l-rapid",
  blitz: "border-l-blitz",
  bullet: "border-l-bullet",
}

export function Home() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    getStats().then(setStats)
  }, [])

  return (
    <div className="flex flex-col gap-16">
      <section className="pt-6 pb-4">
        <div className="mb-5 inline-flex items-center gap-2 border-b border-primary pb-1 font-mono text-xs font-medium tracking-widest text-primary uppercase">
          <span className="size-2 bg-primary" />
          Live on Lichess
        </div>
        <h1 className="mb-3 text-5xl font-semibold tracking-tight md:text-6xl">
          H2CHESS
        </h1>
        <p className="mb-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A chess engine built from scratch. It plays live, public games on
          Lichess under the account MeikeChess — every move it makes is
          visible in real time, win or lose.
        </p>
        <a
          href="https://lichess.org/@/MeikeChess"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Watch it play on Lichess
        </a>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Current ratings
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          MeikeChess on Lichess — H2-Classical's account. BravoBlue and
          Fairy-MC don't play on Lichess yet.
        </p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border text-left font-mono text-xs tracking-widest text-muted-foreground uppercase">
              <th className="py-2 font-medium">Time control</th>
              <th className="py-2 pr-2 text-right font-medium">Rating</th>
              <th className="hidden py-2 text-right font-medium sm:table-cell">
                Games
              </th>
            </tr>
          </thead>
          <tbody>
            {TIME_CONTROLS.map((tc) => {
              const perf = stats?.perfs[tc.key as keyof Stats["perfs"]]
              return (
                <tr
                  key={tc.key}
                  className={`border-b border-border border-l-4 ${BORDER_CLASSES[tc.accent]}`}
                >
                  <td className="py-4 pl-4 font-medium">{tc.label}</td>
                  <td className="py-4 pr-2 text-right font-mono text-2xl font-medium tabular-nums">
                    {perf ? perf.rating : "—"}
                  </td>
                  <td className="hidden py-4 text-right font-mono text-sm text-muted-foreground sm:table-cell">
                    {perf ? perf.games : ""}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          The engines
        </h2>
        <table className="w-full border-collapse">
          <tbody>
            {ENGINES.map((engine) => (
              <tr key={engine.id} className="border-b border-border">
                <td className="w-40 py-4 pr-4 align-top font-medium whitespace-nowrap">
                  {engine.name}
                </td>
                <td className="hidden w-32 py-4 pr-4 align-top font-mono text-xs tracking-wide text-muted-foreground uppercase sm:table-cell">
                  <span className="inline-block -translate-y-[3px]">
                    {engine.statusLabel ?? "—"}
                  </span>
                </td>
                <td className="py-4 align-top text-sm text-muted-foreground">
                  {engine.tagline}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Source
        </h2>
        <p className="mb-4 max-w-xl text-muted-foreground">
          Three engines, one lineage. Each is developed and tested
          independently.
        </p>
        <div className="flex flex-wrap gap-3">
          {REPOS.map((repo) => (
            <a key={repo.name} href={repo.url} target="_blank" rel="noopener">
              <img
                alt={repo.label}
                src={`https://img.shields.io/github/last-commit/${repo.owner}/${repo.name}?label=${encodeURIComponent(
                  repo.label
                )}&color=2563eb&logo=github&logoColor=white`}
              />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
