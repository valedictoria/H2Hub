# H2CHESS site

React + Vite + shadcn/ui (Base UI primitives). Grayscale base palette with
per-time-control accent colors (Classical=green, Rapid=lime, Blitz=yellow,
Bullet=orange) and blue as the general accent (CTAs, links, active nav). Red
is reserved for shadcn's `destructive` token (errors/warnings only).

## Run locally

```sh
npm install
npm run dev
```

Then open the printed `http://localhost:5173` URL.

## Build

```sh
npm run build
npm run preview
```

## Outstanding before launch

- `src/data/stats.ts` still returns placeholder ratings — swap `getStats()`
  for a real `fetch('https://lichess.org/api/user/MeikeChess')` call.
- `src/data/repos.ts` only lists H2-Classical — add BravoBlue and Fairy-MC
  once each has a real GitHub repo.
- No OG/social preview image yet.
- No real browser QA pass has been run (responsive breakpoints, keyboard
  nav, Lighthouse).

## Prior static version

The previous plain HTML/CSS/JS build (Tailwind via CDN, no React) is kept
at `../h2chess-site.static-backup/` for reference.
