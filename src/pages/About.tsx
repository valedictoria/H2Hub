import { Separator } from "@/components/ui/separator"
import { ENGINES } from "@/data/engines"

export function About() {
  return (
    <div>
      <h1 className="mb-6 text-4xl font-semibold tracking-tight">About Us</h1>

      <div className="flex max-w-3xl flex-col gap-4 leading-relaxed">
        <p>
          H2CHESS is the name for three chess engines developed as one
          ongoing project. They share a lineage but not a codebase: each is
          developed and measured on its own.
        </p>
      </div>

      <div className="mt-8 flex max-w-3xl flex-col gap-6">
        {ENGINES.map((engine) => (
          <div key={engine.id}>
            <h3 className="mb-1 font-semibold">{engine.name}</h3>
            <p className="leading-relaxed text-muted-foreground">
              {engine.description}
            </p>
          </div>
        ))}
      </div>

      <Separator className="my-8 max-w-3xl" />

      <div className="max-w-3xl">
        <h2 className="mb-3 text-lg font-semibold">How we test</h2>
        <p className="mb-3 leading-relaxed text-muted-foreground">
          A change doesn't ship because it sounds like an improvement. Every
          search or evaluation change is played against the previous version
          in a large batch of games, and only kept if it wins by a margin
          large enough to rule out random variance. Move-generation
          correctness is checked separately before that, so a change can't
          pass the strength test by playing illegal moves.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          The project is open source. Source for H2-Classical is linked from
          the home page; BravoBlue and Fairy-MC will be published once
          they're further along.
        </p>
      </div>
    </div>
  )
}
