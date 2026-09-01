// Shared engine facts, used on both Home (compact status cards) and About
// (fuller description). Single source so the two pages can't drift apart.
export type EngineStatus = "in-training" | "in-development"

export type EngineColor = "teal" | "lavender" | "peach"

export type Engine = {
  id: string
  name: string
  status?: EngineStatus
  statusLabel?: string
  color: EngineColor
  onDark: boolean
  tagline: string
  description: string
}

export const ENGINES: Engine[] = [
  {
    id: "h2-classical",
    name: "H2-Classical",
    color: "teal",
    onDark: true,
    tagline: "The standard-chess engine. Plays live as MeikeChess on Lichess.",
    description:
      "H2-Classical is the standard-chess engine in the project, and the one playing live on Lichess as MeikeChess. It's improved incrementally: each search or evaluation change is measured against the previous version in head-to-head games before it's kept, not assumed to be an improvement because it sounds reasonable.",
  },
  {
    id: "bravoblue",
    name: "BravoBlue",
    status: "in-training",
    statusLabel: "In training",
    color: "lavender",
    onDark: false,
    tagline: "Training its own evaluation network from self-play.",
    description:
      "BravoBlue shares H2-Classical's codebase but is used to train and test a new evaluation network from scratch, using self-play data instead of reusing an existing network. The self-play dataset is complete; training and head-to-head testing against the current network are still ahead.",
  },
  {
    id: "fairy-mc",
    name: "Fairy-MC",
    status: "in-development",
    statusLabel: "In development",
    color: "peach",
    onDark: false,
    tagline: "Built to play chess variants, not just standard chess.",
    description:
      "Fairy-MC is forked from the same codebase but built to play chess variants — King of the Hill, Three-check, Chess960, and others — from a single binary. King of the Hill already works end to end in self-play testing; more variants are being added one at a time.",
  },
]
