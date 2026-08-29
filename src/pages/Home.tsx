import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getStats, TIME_CONTROLS, type Stats } from "@/data/stats"
import { REPOS } from "@/data/repos"
import { ENGINES } from "@/data/engines"

const ACCENT_CLASSES: Record<string, string> = {
  classical: "border-t-classical",
  rapid: "border-t-rapid",
  blitz: "border-t-blitz",
  bullet: "border-t-bullet",
}

const ACCENT_TEXT_CLASSES: Record<string, string> = {
  classical: "text-classical",
  rapid: "text-rapid",
  blitz: "text-blitz",
  bullet: "text-bullet",
}

export function Home() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    getStats().then(setStats)
  }, [])

  return (
    <div className="flex flex-col gap-16">
      <section className="pt-6 pb-4">
        <Badge className="mb-4 gap-2 bg-primary/10 text-primary hover:bg-primary/10">
          <span className="size-1.5 rounded-full bg-primary" />
          Live on Lichess
        </Badge>
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
          className="inline-flex items-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
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
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TIME_CONTROLS.map((tc) => {
            const perf = stats?.perfs[tc.key as keyof Stats["perfs"]]
            return (
              <Card key={tc.key} className={`border-t-4 ${ACCENT_CLASSES[tc.accent]}`}>
                <CardHeader>
                  <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    {tc.label}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-4xl font-semibold tabular-nums ${ACCENT_TEXT_CLASSES[tc.accent]}`}>
                    {perf ? perf.rating : "—"}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {perf ? `${perf.games} games played` : ""}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          The engines
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {ENGINES.map((engine) => (
            <Card key={engine.id}>
              <CardHeader className="flex items-center justify-between">
                <span className="font-semibold">{engine.name}</span>
                {engine.statusLabel && (
                  <Badge variant="secondary">{engine.statusLabel}</Badge>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{engine.tagline}</p>
              </CardContent>
            </Card>
          ))}
        </div>
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
