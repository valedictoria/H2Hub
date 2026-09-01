// News/About copy, editable from /admin without a code change or
// redeploy — /api/content reads it live from Vercel KV. The constants
// below are the offline fallback (used if the fetch fails, e.g. KV
// hasn't been provisioned yet) and double as the site's original
// baked-in copy; they're intentionally duplicated in api/_lib/content.ts
// rather than shared, since that file is a separate serverless bundle
// and this one ships to the browser — two small, independently-stable
// copies beat a cross-project import.
export type NewsEntry = {
  id: string
  date: string
  title: string
  body: string
}

export type AboutContent = {
  intro: string
  howWeTest: string
  openSource: string
}

export type SiteContent = {
  news: NewsEntry[]
  about: AboutContent
}

export const DEFAULT_CONTENT: SiteContent = {
  news: [
    {
      id: "bravoblue-training",
      date: "Aug 16, 2026",
      title: "BravoBlue: a new evaluation network is in training",
      body: "BravoBlue is growing its own evaluation network from self-play instead of reusing an existing one. The self-play dataset is done — just over 26 million positions — but training and head-to-head testing against the current network haven't started yet.",
    },
    {
      id: "fairy-mc-launch",
      date: "Aug 3, 2026",
      title: "Fairy-MC: a new engine for chess variants",
      body: "Fairy-MC is a fork of Nature v2.1 built to play chess variants, not just standard chess, from one binary. King of the Hill is working end to end: in self-play testing, every move stayed legal and games ended correctly when a king reached the center. Three-check, Racing Kings, and Horde are next, followed by Antichess, Atomic, and Chess960.",
    },
    {
      id: "nature-v2-1",
      date: "Aug 3, 2026",
      title: "Nature v2.1: faster search, smarter time management",
      body: "This release adds NEON SIMD for the evaluation network, a time management change that extends thinking time when the engine's evaluation drops sharply, and support for MultiPV, ponder, and other options external chess interfaces expect. It also adds razoring and a second search thread, both of which looked promising in short test runs but haven't yet been confirmed by a longer, statistically rigorous match.",
    },
  ],
  about: {
    intro:
      "H2CHESS is the name for three chess engines developed as one ongoing project. They share a lineage but not a codebase: each is developed and measured on its own.",
    howWeTest:
      "A change doesn't ship because it sounds like an improvement. Every search or evaluation change is played against the previous version in a large batch of games, and only kept if it wins by a margin large enough to rule out random variance. Move-generation correctness is checked separately before that, so a change can't pass the strength test by playing illegal moves.",
    openSource:
      "The project is open source. Source for H2-Classical is linked from the home page; BravoBlue and Fairy-MC will be published once they're further along.",
  },
}

function isSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false
  const v = value as { news?: unknown; about?: unknown }
  return Array.isArray(v.news) && typeof v.about === "object" && v.about !== null
}

export async function getContent(): Promise<SiteContent> {
  try {
    const res = await fetch("/api/content")
    if (!res.ok) throw new Error(`content endpoint returned ${res.status}`)
    const data: unknown = await res.json()
    if (!isSiteContent(data)) throw new Error("unexpected content response shape")
    return data
  } catch {
    return DEFAULT_CONTENT
  }
}
