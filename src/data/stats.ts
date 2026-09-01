// Live ELO data, fetched from /api/ratings (a Vercel Edge Function that
// proxies and caches Lichess's GET /api/user/MeikeChess). Falls back to
// placeholder numbers if the fetch fails, so a Lichess outage degrades
// to stale-looking data instead of a broken page.
export type Perf = {
  games: number
  rating: number
  rd: number
  prog: number
  prov: boolean
}

export type Stats = {
  username: string
  perfs: {
    classical: Perf | null
    rapid: Perf | null
    blitz: Perf | null
    bullet: Perf | null
  }
}

const PLACEHOLDER_STATS: Stats = {
  username: "MeikeChess",
  perfs: {
    classical: { games: 34, rating: 1965, rd: 71, prog: 0, prov: false },
    rapid: { games: 128, rating: 2103, rd: 55, prog: -8, prov: false },
    blitz: { games: 356, rating: 2041, rd: 38, prog: 5, prov: false },
    bullet: { games: 412, rating: 1987, rd: 42, prog: 12, prov: false },
  },
}

function isStats(value: unknown): value is Stats {
  if (!value || typeof value !== "object") return false
  const perfs = (value as { perfs?: unknown }).perfs
  return typeof perfs === "object" && perfs !== null
}

export async function getStats(): Promise<Stats> {
  try {
    const res = await fetch("/api/ratings")
    if (!res.ok) throw new Error(`ratings endpoint returned ${res.status}`)
    const data: unknown = await res.json()
    if (!isStats(data)) throw new Error("unexpected ratings response shape")
    return data
  } catch {
    return PLACEHOLDER_STATS
  }
}

export const TIME_CONTROLS = [
  { key: "classical", label: "Classical" },
  { key: "rapid", label: "Rapid" },
  { key: "blitz", label: "Blitz" },
  { key: "bullet", label: "Bullet" },
] as const
