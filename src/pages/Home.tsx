import { useEffect, useState } from "react"
import { motion, type Variants } from "motion/react"
import { getStats, TIME_CONTROLS, type Stats } from "@/data/stats"
import { REPOS } from "@/data/repos"
import { ENGINES } from "@/data/engines"
import { AnsiLogo } from "@/components/AnsiLogo"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function dotLeader(label: string, value: string) {
  return (
    <div className="flex items-baseline gap-2 font-mono text-sm">
      <span className="whitespace-nowrap">{label}</span>
      <span className="flex-1 overflow-hidden border-b border-dotted border-muted-foreground/50 pb-1" />
      <span className="whitespace-nowrap">{value}</span>
    </div>
  )
}

export function Home() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    getStats().then(setStats)
  }, [])

  return (
    <motion.div
      className="flex flex-col gap-16"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <section className="pt-6 pb-4">
        <motion.div variants={item} className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-primary uppercase">
          <span className="size-2 animate-pulse bg-primary" />
          Dispatch — Live from lichess.org
        </motion.div>

        <h1 className="sr-only">H2CHESS</h1>
        <motion.div variants={item} className="-ml-1 overflow-x-auto">
          <AnsiLogo className="text-[3vw] sm:text-[1.6rem] md:text-[1.85rem]" />
        </motion.div>

        <motion.div variants={item} className="my-5 border-t-[7px] border-double border-primary/70" />

        <motion.p variants={item} className="mb-7 max-w-xl text-lg leading-relaxed text-foreground/90">
          A chess engine built from scratch. It plays live, public games on
          Lichess under the account MeikeChess — every move it makes is
          visible in real time, win or lose.
        </motion.p>

        <motion.a
          variants={item}
          href="https://lichess.org/@/MeikeChess"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center bg-primary px-6 py-3 font-display text-lg tracking-wide text-primary-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
        >
          Watch it play on Lichess
        </motion.a>
      </section>

      <section>
        <h2 className="mb-1 font-display text-2xl tracking-wide uppercase">
          Current ratings
        </h2>
        <p className="mb-4 font-mono text-sm text-muted-foreground">
          MeikeChess on Lichess — H2-Classical's account. BravoBlue and
          Fairy-MC don't play on Lichess yet.
        </p>
        <div className="flex flex-col gap-3 border-t border-border pt-4">
          {TIME_CONTROLS.map((tc) => {
            const perf = stats?.perfs[tc.key as keyof Stats["perfs"]]
            return (
              <div key={tc.key}>
                {dotLeader(
                  tc.label.toUpperCase(),
                  perf ? `${perf.rating}  (${perf.games} games)` : "—"
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl tracking-wide uppercase">
          The engines
        </h2>
        <div className="flex flex-col">
          {ENGINES.map((engine) => (
            <div key={engine.id} className="border-b border-border py-4">
              <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-lg tracking-wide uppercase">
                  {engine.name}
                </span>
                {engine.statusLabel && (
                  <span className="font-mono text-xs text-primary uppercase">
                    [{engine.statusLabel}]
                  </span>
                )}
              </div>
              <p className="max-w-2xl font-mono text-sm text-muted-foreground">
                {engine.tagline}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-display text-2xl tracking-wide uppercase">
          Source
        </h2>
        <p className="mb-4 max-w-xl font-mono text-sm text-muted-foreground">
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
                )}&color=a3232f&logo=github&logoColor=e9dfc8&labelColor=1d1815`}
              />
            </a>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
