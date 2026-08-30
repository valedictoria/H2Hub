// Placeholder ELO data, shaped exactly like Lichess's real
// GET /api/user/MeikeChess -> .perfs.* response, so the live swap later is
// a single function body, not a call-site hunt.
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
    classical: Perf
    rapid: Perf
    blitz: Perf
    bullet: Perf
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

export async function getStats(): Promise<Stats> {
  // TODO(live-data): return fetch('https://lichess.org/api/user/MeikeChess').then((r) => r.json())
  return PLACEHOLDER_STATS
}

export const TIME_CONTROLS = [
  { key: "classical", label: "Classical" },
  { key: "rapid", label: "Rapid" },
  { key: "blitz", label: "Blitz" },
  { key: "bullet", label: "Bullet" },
] as const
