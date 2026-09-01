// Vercel Edge Function: proxies Lichess's public user API so the client
// never talks to lichess.org directly. Two reasons this lives server-side
// instead of a plain client-side fetch: response caching (Lichess gets
// hit at most once every couple of minutes, not once per page load), and
// a stable shape (missing/renamed perfs on Lichess's side get normalized
// here instead of leaking into the UI).
export const config = { runtime: "edge" }

const USERNAME = "MeikeChess"
const LICHESS_URL = `https://lichess.org/api/user/${USERNAME}`

type LichessPerf = {
  games?: number
  rating?: number
  rd?: number
  prog?: number
  prov?: boolean
}

type LichessUser = {
  username?: string
  perfs?: Record<string, LichessPerf>
}

type Perf = {
  games: number
  rating: number
  rd: number
  prog: number
  prov: boolean
}

function toPerf(p: LichessPerf | undefined): Perf | null {
  if (!p || typeof p.rating !== "number") return null
  return {
    games: p.games ?? 0,
    rating: p.rating,
    rd: p.rd ?? 0,
    prog: p.prog ?? 0,
    prov: p.prov ?? false,
  }
}

function json(body: unknown, status: number, cacheControl?: string) {
  const headers: Record<string, string> = { "content-type": "application/json" }
  if (cacheControl) headers["cache-control"] = cacheControl
  return new Response(JSON.stringify(body), { status, headers })
}

export default async function handler() {
  let res: Response
  try {
    res = await fetch(LICHESS_URL, { headers: { accept: "application/json" } })
  } catch {
    return json({ error: "lichess_unreachable" }, 502)
  }

  if (!res.ok) {
    return json({ error: "lichess_error", status: res.status }, 502)
  }

  const data = (await res.json()) as LichessUser

  return json(
    {
      username: data.username ?? USERNAME,
      perfs: {
        classical: toPerf(data.perfs?.classical),
        rapid: toPerf(data.perfs?.rapid),
        blitz: toPerf(data.perfs?.blitz),
        bullet: toPerf(data.perfs?.bullet),
      },
    },
    200,
    // Cached at Vercel's edge for 2 minutes; a stale copy can keep being
    // served for up to 10 more while a fresh one is fetched in the
    // background, so requests never block on Lichess's latency.
    "public, s-maxage=120, stale-while-revalidate=600"
  )
}
