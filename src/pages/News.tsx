import { useEffect, useState } from "react"
import { DEFAULT_CONTENT, getContent, type NewsEntry } from "@/data/content"

const DOTS = ["var(--news-1)", "var(--news-2)", "var(--news-3)"]

export function News() {
  const [entries, setEntries] = useState<NewsEntry[]>(DEFAULT_CONTENT.news)

  useEffect(() => {
    getContent().then((content) => setEntries(content.news))
  }, [])

  return (
    <div>
      <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        Dispatch log
      </span>
      <h1 className="mt-2 mb-10 text-display-md">News</h1>

      <div className="flex flex-col gap-4">
        {entries.map((entry, i) => (
          <article
            key={entry.id}
            className="rounded-[var(--radius-card)] border border-hairline bg-card p-7"
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: DOTS[i % DOTS.length] }} />
              {entry.date}
            </div>
            <h3 className="mb-2 text-xl font-bold tracking-tight">
              {entry.title}
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {entry.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
