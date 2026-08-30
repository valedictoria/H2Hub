import { ENGINES } from "@/data/engines"

export function About() {
  return (
    <div>
      <h1 className="mb-6 font-display text-4xl tracking-wide uppercase">
        About Us
      </h1>

      <div className="max-w-3xl font-mono text-sm leading-relaxed text-foreground/90">
        <p>
          H2CHESS is the name for three chess engines developed as one
          ongoing project. They share a lineage but not a codebase: each is
          developed and measured on its own.
        </p>
      </div>

      <div className="mt-8 flex max-w-3xl flex-col gap-6 border-t border-border pt-6">
        {ENGINES.map((engine) => (
          <div key={engine.id}>
            <h3 className="mb-1 font-display text-lg tracking-wide uppercase">
              {engine.name}
            </h3>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              {engine.description}
            </p>
          </div>
        ))}
      </div>

      <div className="my-8 max-w-3xl border-t-4 border-double border-primary/70" />

      <div className="max-w-3xl">
        <h2 className="mb-3 font-display text-xl tracking-wide uppercase">
          How we test
        </h2>
        <p className="mb-3 font-mono text-sm leading-relaxed text-muted-foreground">
          A change doesn't ship because it sounds like an improvement. Every
          search or evaluation change is played against the previous version
          in a large batch of games, and only kept if it wins by a margin
          large enough to rule out random variance. Move-generation
          correctness is checked separately before that, so a change can't
          pass the strength test by playing illegal moves.
        </p>
        <p className="font-mono text-sm leading-relaxed text-muted-foreground">
          The project is open source. Source for H2-Classical is linked from
          the home page; BravoBlue and Fairy-MC will be published once
          they're further along.
        </p>
      </div>
    </div>
  )
}
