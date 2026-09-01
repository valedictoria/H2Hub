import { useEffect, useState } from "react"
import { motion, type Variants } from "motion/react"
import { getStats, TIME_CONTROLS, type Stats } from "@/data/stats"
import { REPOS } from "@/data/repos"
import { ENGINES } from "@/data/engines"
import { AnsiLogo } from "@/components/AnsiLogo"
import { useTheme } from "@/lib/theme"

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
// Kept as the one signature element that reads the same across all three
// design systems.
const CARD_GLYPH: Record<string, string> = {
  "h2-classical": "♚",
  bravoblue: "♞",
  "fairy-mc": "♝",
}

export function Home() {
  const { theme } = useTheme()
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    getStats().then(setStats)
  }, [])

  if (theme === "nvidia") return <NvidiaHome stats={stats} />
  if (theme === "verge") return <VergeHome stats={stats} />
  return <WarmHome stats={stats} />
}

function EngineCards() {
  return (
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
  )
}

function WarmHome({ stats }: { stats: Stats | null }) {
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
        <EngineCards />
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

// NVIDIA: white engineering canvas for body content, black "chapter"
// bands for hero/footer (Layout's footer handles that half; this handles
// the hero), NVIDIA Green used only for accents — never as a card fill.
// Ratings become a dense bordered spec table instead of loose cards.
function NvidiaHome({ stats }: { stats: Stats | null }) {
  return (
    <motion.div
      className="flex flex-col gap-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <section className="-mx-5 -mt-12 border-b border-[#1a1a1a] bg-black px-5 pt-16 pb-14 text-white md:-mx-8 md:-mt-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={item} className="mb-4 text-[10px] font-semibold tracking-widest text-[#76b900] uppercase">
            Design System · Chess Engines
          </motion.div>
          <h1 className="sr-only">H2CHESS</h1>
          <motion.h2
            variants={item}
            className="max-w-xl text-[clamp(36px,6vw,56px)] leading-[1] font-extrabold tracking-[-0.04em]"
          >
            The chess engine <span className="text-[#76b900]">platform.</span>
          </motion.h2>
          <motion.p variants={item} className="mt-4 max-w-md text-[15px] leading-relaxed text-[#888888]">
            Three engines, built from scratch and measured the way hardware
            is measured — every change benchmarked against the last before
            it ships. The flagship plays live on Lichess as MeikeChess.
          </motion.p>
          <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://lichess.org/@/MeikeChess"
              target="_blank"
              rel="noopener"
              className="inline-flex h-11 items-center rounded-[2px] bg-[#76b900] px-6 text-sm font-bold text-black transition-colors hover:bg-[#8ed100]"
            >
              Watch it play
            </a>
            <a
              href="#engines"
              className="inline-flex h-11 items-center rounded-[2px] border border-[#1a1a1a] px-6 text-sm font-semibold text-white transition-colors hover:border-[#2a2a2a] hover:bg-[#0a0a0a]"
            >
              See the engines
            </a>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-2">
          <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
            Foundation
          </span>
          <h2 className="text-display-sm">Current ratings</h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            MeikeChess on Lichess is H2-Classical's account. BravoBlue and
            Fairy-MC don't play on Lichess yet.
          </p>
        </div>
        <div className="flex flex-col overflow-hidden rounded-[2px] border border-hairline">
          {TIME_CONTROLS.map((tc, i) => {
            const perf = stats?.perfs[tc.key as keyof Stats["perfs"]]
            return (
              <div
                key={tc.key}
                className={`grid grid-cols-[90px_1fr_auto] items-baseline gap-4 px-5 py-3.5 ${i > 0 ? "border-t border-hairline" : ""}`}
              >
                <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                  {tc.label}
                </span>
                <span className="font-mono text-sm">
                  {perf ? `${perf.rating}` : "—"}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {perf ? `${perf.games} games` : "loading…"}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      <section id="engines">
        <div className="mb-6 flex flex-col gap-2">
          <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
            Components
          </span>
          <h2 className="text-display-sm">The engines</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {ENGINES.map((engine) => (
            <div
              key={engine.id}
              className="relative overflow-hidden rounded-[2px] border-l-2 border-[#76b900] bg-[#0a0a0a] p-6 text-white"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -bottom-6 text-[8rem] leading-none text-white opacity-[0.06]"
              >
                {CARD_GLYPH[engine.id]}
              </span>
              <div className="relative mb-3 flex items-center gap-2">
                <span className="text-base font-bold">{engine.name}</span>
                {engine.statusLabel && (
                  <span className="rounded-full bg-[#76b900]/10 px-2 py-0.5 text-[10px] font-semibold text-[#76b900] uppercase">
                    {engine.statusLabel}
                  </span>
                )}
              </div>
              <p className="relative max-w-[85%] text-[13px] leading-relaxed text-[#a7a7a7]">
                {engine.tagline}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2">
          <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
            Guidelines
          </span>
          <h2 className="text-display-sm">Open source</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-xs font-semibold text-[#5a8d00] transition-colors hover:bg-primary/20"
            >
              {repo.label} ↗
            </a>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

// The Verge: no light mode — dark canvas throughout, huge display type,
// full-bleed hazard-color "story tile" engine cards.
function VergeHome({ stats }: { stats: Stats | null }) {
  const bullet = stats?.perfs.bullet

  return (
    <motion.div
      className="flex flex-col gap-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <section>
        <motion.div
          variants={item}
          className="mb-5 inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-hairline px-3 py-1.5 text-xs font-bold tracking-widest uppercase"
          style={{ color: "var(--engine-1)" }}
        >
          <span className="size-1.5 animate-pulse rounded-full" style={{ background: "var(--engine-1)" }} />
          Live from lichess.org
        </motion.div>

        <h1 className="sr-only">H2CHESS</h1>
        <motion.h2
          variants={item}
          className="max-w-2xl text-[clamp(42px,8vw,84px)] leading-[0.95] font-black italic tracking-[-0.01em]"
        >
          Chess engines, built loud.
        </motion.h2>

        <motion.p variants={item} className="mt-6 max-w-md text-[17px] leading-relaxed text-muted-foreground">
          Three engines, built from scratch, tested by playing games — not
          by assumption. The flagship plays live, public games on Lichess
          under the account MeikeChess.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://lichess.org/@/MeikeChess"
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center rounded-[var(--radius-btn)] bg-primary px-6 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Watch it play on Lichess
          </a>
          <a
            href="#engines"
            className="inline-flex h-12 items-center rounded-[var(--radius-btn)] border border-white/30 px-6 text-sm font-bold transition-transform hover:-translate-y-0.5 hover:bg-white/5"
          >
            See the engines
          </a>
        </motion.div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--engine-1)" }}>
            Foundation
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
                <div className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">
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
        {bullet && (
          <p className="mt-3 text-xs text-muted-foreground">
            Bullet: {bullet.rating} rating across {bullet.games} games.
          </p>
        )}
      </section>

      <section id="engines">
        <div className="mb-6 flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--engine-1)" }}>
            Story tiles
          </span>
          <h2 className="text-display-sm">The engines</h2>
        </div>
        <EngineCards />
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--engine-1)" }}>
            Guidelines
          </span>
          <h2 className="text-display-sm">Open source</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener"
              className="rounded-[var(--radius-btn)] border border-hairline px-4 py-2 text-sm font-semibold transition-colors hover:bg-card"
            >
              {repo.label} ↗
            </a>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
