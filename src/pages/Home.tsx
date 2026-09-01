import { useEffect, useState } from "react"
import { motion, type Variants } from "motion/react"
import { getStats, TIME_CONTROLS, type Stats } from "@/data/stats"
import { REPOS } from "@/data/repos"
import { ENGINES } from "@/data/engines"
import { AnsiLogo } from "@/components/AnsiLogo"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// Each engine gets one chess piece as its mark — king for the flagship,
// knight for the one that's still learning, bishop as a nod to "fairy"
// pieces (Fairy-MC's namesake) — instead of leaving the color card empty.
const CARD_GLYPH: Record<string, string> = {
  "h2-classical": "♚",
  bravoblue: "♞",
  "fairy-mc": "♝",
}

export function Home() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    getStats().then(setStats)
  }, [])

  const bullet = stats?.perfs.bullet

  return (
    <motion.div
      className="flex flex-col gap-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <section className="grid gap-10 pt-2 pb-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
        <div>
          <motion.div
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
          >
            <span className="size-1.5 animate-pulse rounded-full" style={{ background: "var(--engine-1)" }} />
            Live from lichess.org
          </motion.div>

          <h1 className="sr-only">H2CHESS</h1>
          <motion.div variants={item} className="-ml-1 mb-6 overflow-x-auto text-foreground">
            <AnsiLogo className="text-[3.4vw] sm:text-[1.35rem] md:text-[1.6rem]" />
          </motion.div>

          <motion.p variants={item} className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Three chess engines, built from scratch and tested by playing
            games, not by assumption. The flagship plays live, public games
            on Lichess under the account MeikeChess — every move is visible
            in real time, win or lose.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <a
              href="https://lichess.org/@/MeikeChess"
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center rounded-[var(--radius-btn)] bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Watch it play on Lichess →
            </a>
            <a
              href="#engines"
              className="inline-flex h-12 items-center rounded-[var(--radius-btn)] border border-hairline px-6 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              See the engines
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="rounded-[var(--radius-card)] border border-hairline bg-card p-7">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-semibold">MeikeChess</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--engine-1)" }}>
              <span className="size-1.5 rounded-full" style={{ background: "var(--engine-1)" }} />
              Live
            </span>
          </div>
          <div className="text-metric text-foreground">
            {bullet ? bullet.rating : "—"}
          </div>
          <p className="mb-6 text-sm text-muted-foreground">
            Bullet rating · {bullet ? `${bullet.games} games played` : "loading"}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full" style={{ background: "var(--engine-1)" }} />
            <span className="size-3 rounded-full" style={{ background: "var(--engine-2)" }} />
            <span className="size-3 rounded-full" style={{ background: "var(--engine-3)" }} />
            <span className="ml-1.5 text-xs text-muted-foreground">Three engines, one lineage</span>
          </div>
        </motion.div>
      </section>

      <section>
        <div className="mb-8 flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            01 / Ratings
          </span>
          <h2 className="text-display-sm">Current ratings</h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            MeikeChess on Lichess is H2-Classical's account. BravoBlue and
            Fairy-MC don't play on Lichess yet.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {TIME_CONTROLS.map((tc) => {
            const perf = stats?.perfs[tc.key as keyof Stats["perfs"]]
            return (
              <div
                key={tc.key}
                className="rounded-[var(--radius-card)] border border-hairline bg-card p-5"
              >
                <div className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {tc.label}
                </div>
                <div className="text-metric">{perf ? perf.rating : "—"}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {perf ? `${perf.games} games` : "loading…"}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section id="engines">
        <div className="mb-8 flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            02 / The engines
          </span>
          <h2 className="text-display-sm">One codebase, three directions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ENGINES.map((engine, i) => (
            <div
              key={engine.id}
              className="relative flex min-h-[220px] flex-col overflow-hidden rounded-[var(--radius-card)] p-7"
              style={{
                background: `var(--engine-${i + 1})`,
                color: `var(--engine-${i + 1}-fg)`,
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -bottom-6 text-[9rem] leading-none opacity-[0.16]"
              >
                {CARD_GLYPH[engine.id]}
              </span>
              <div className="relative mb-4 flex items-center justify-between gap-3">
                <span className="text-lg font-bold tracking-tight">{engine.name}</span>
                <span className="rounded-full bg-black/10 px-2.5 py-1 text-[11px] font-semibold">
                  {engine.statusLabel ?? "Live"}
                </span>
              </div>
              <p className="relative mt-auto max-w-[85%] text-sm leading-relaxed opacity-90">
                {engine.tagline}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            03 / Source
          </span>
          <h2 className="text-display-sm">Open source</h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            Each engine is developed and tested independently.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener"
              className="rounded-[var(--radius-btn)] border border-hairline px-4 py-2 text-sm transition-colors hover:bg-card"
            >
              {repo.label} ↗
            </a>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
