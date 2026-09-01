import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About" },
]

export function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-hairline bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
          <NavLink to="/" className="flex items-center gap-2.5" aria-label="H2CHESS home">
            <span className="font-display text-lg font-bold tracking-tight">
              H2<span className="text-muted-foreground">CHESS</span>
            </span>
            <span className="hidden rounded-full bg-card px-2.5 py-1 text-[10px] font-semibold text-muted-foreground sm:inline-block">
              Live on Lichess
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground",
                    isActive && "text-foreground"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://lichess.org/@/MeikeChess"
              target="_blank"
              rel="noopener"
              className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Lichess ↗
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="flex size-10 items-center justify-center rounded-full border border-hairline md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <nav
            className="flex flex-col gap-1 border-t border-hairline px-5 py-3 md:hidden"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3.5 py-2.5 text-sm text-muted-foreground transition-colors",
                    isActive && "bg-card text-foreground"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://lichess.org/@/MeikeChess"
              target="_blank"
              rel="noopener"
              className="mt-1 rounded-full bg-primary px-3.5 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Lichess ↗
            </a>
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>H2CHESS — three engines, one lineage.</span>
          <a
            href="https://lichess.org/@/MeikeChess"
            target="_blank"
            rel="noopener"
            className="hover:text-foreground"
          >
            lichess.org/@/MeikeChess ↗
          </a>
        </div>
      </footer>
    </div>
  )
}
