import { kv } from "@vercel/kv"

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

const KV_KEY = "h2chess:content"

// Baked-in starting content — what ships until the first admin save.
// Deliberately duplicated in src/data/content.ts rather than shared,
// since that file also needs to work as this endpoint's offline
// fallback (see its own comment) — two small, independently-stable
// copies beat a cross-project import between the serverless function
// and the browser bundle.
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

function isNewsEntry(value: unknown): value is NewsEntry {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === "string" &&
    typeof v.date === "string" &&
    typeof v.title === "string" &&
    typeof v.body === "string"
  )
}

function isAboutContent(value: unknown): value is AboutContent {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  return typeof v.intro === "string" && typeof v.howWeTest === "string" && typeof v.openSource === "string"
}

// Reads whatever's in KV and merges it over the defaults field-by-field,
// so a KV outage or a partially-written value degrades to defaults
// instead of throwing.
export async function readContent(): Promise<SiteContent> {
  try {
    const stored = await kv.get<Partial<SiteContent>>(KV_KEY)
    if (!stored) return DEFAULT_CONTENT
    const news = Array.isArray(stored.news) && stored.news.every(isNewsEntry) ? stored.news : DEFAULT_CONTENT.news
    const about = isAboutContent(stored.about) ? stored.about : DEFAULT_CONTENT.about
    return { news, about }
  } catch {
    return DEFAULT_CONTENT
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  await kv.set(KV_KEY, content)
}

export function validateContent(value: unknown): SiteContent | null {
  if (!value || typeof value !== "object") return null
  const v = value as Record<string, unknown>
  if (!Array.isArray(v.news) || !v.news.every(isNewsEntry)) return null
  if (!isAboutContent(v.about)) return null
  return { news: v.news, about: v.about }
}
