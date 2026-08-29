// GitHub repo links driving the badges on the home page. Add BravoBlue and
// Fairy-MC back here once each has a real repo.
export type Repo = {
  owner: string
  name: string
  label: string
  url: string
}

export const REPOS: Repo[] = [
  {
    owner: "h2-bdev",
    name: "H2-Classical",
    label: "H2-Classical (standard chess)",
    url: "https://github.com/h2-bdev/H2-Classical",
  },
]
