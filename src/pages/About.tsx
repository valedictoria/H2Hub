import { ENGINES } from "@/data/engines"

const DOTS = ["var(--news-1)", "var(--news-2)", "var(--news-3)"]

export function About() {
  return (
    <div>
      <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        The project
      </span>
      <h1 className="mt-2 mb-6 text-display-md">About</h1>

      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
        H2CHESS is the name for three chess engines developed as one ongoing
        project. They share a lineage but not a codebase: each is developed
        and measured on its own.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {ENGINES.map((engine, i) => (
          <div
            key={engine.id}
            className="rounded-[var(--radius-card)] border border-hairline bg-card p-7"
          >
            <div className="mb-2 flex items-center gap-2.5">
              <span className="size-2.5 rounded-full" style={{ background: DOTS[i] }} />
              <h3 className="text-lg font-bold tracking-tight">{engine.name}</h3>
              {engine.statusLabel && (
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {engine.statusLabel}
                </span>
              )}
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {engine.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-6 rounded-[var(--radius-card)] border border-hairline bg-card p-8 md:grid-cols-2">
        <div>
          <h2 className="mb-3 text-xl font-bold tracking-tight">How we test</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A change doesn't ship because it sounds like an improvement.
            Every search or evaluation change is played against the
            previous version in a large batch of games, and only kept if it
            wins by a margin large enough to rule out random variance.
            Move-generation correctness is checked separately before that,
            so a change can't pass the strength test by playing illegal
            moves.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-bold tracking-tight">Open source</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The project is open source. Source for H2-Classical is linked
            from the home page; BravoBlue and Fairy-MC will be published
            once they're further along.
          </p>
        </div>
      </div>
    </div>
  )
}
