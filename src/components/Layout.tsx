import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme"
import { ThemeToggle } from "@/components/ThemeToggle"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About" },
]

export function Layout() {
  const { theme } = useTheme()
  return theme === "teletype" ? <TeletypeLayout /> : <ClayLayout />
}

// Clay family (warm + bright): sticky top nav, pill buttons.
function ClayLayout() {
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
            <ThemeToggle className="ml-2" />
            <a
              href="https://lichess.org/@/MeikeChess"
              target="_blank"
              rel="noopener"
              className="ml-2 rounded-[var(--radius-btn)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
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
            className="flex flex-col gap-3 border-t border-hairline px-5 py-3 md:hidden"
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
            <ThemeToggle className="self-start" />
            <a
              href="https://lichess.org/@/MeikeChess"
              target="_blank"
              rel="noopener"
              className="rounded-[var(--radius-btn)] bg-primary px-3.5 py-2.5 text-center text-sm font-medium text-primary-foreground"
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

// Teletype: fixed left sidebar, restored from the pre-redesign layout.
function TeletypeLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="grain relative flex min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
        aria-expanded={open}
        className="fixed top-4 left-4 z-40 flex size-10 items-center justify-center border border-border bg-card text-foreground md:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <nav
        className={cn(
          "fixed top-0 left-0 z-30 flex h-screen w-64 flex-col gap-8 border-r border-border bg-card p-6 pt-20 transition-transform duration-200 md:pt-6",
          "before:absolute before:top-0 before:left-0 before:h-1.5 before:w-full before:bg-primary",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Primary"
      >
        <div>
          <div className="font-display text-2xl leading-none font-semibold tracking-tight uppercase">
            <span className="text-primary">H2</span>CHESS
            <span className="animate-pulse text-primary">_</span>
          </div>
          <div className="mt-1 font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            Dispatch — Live
          </div>
        </div>

        <div className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "border-l-4 border-transparent px-3 py-2 font-display text-lg tracking-wide text-muted-foreground uppercase transition-colors",
                  "hover:text-foreground",
                  isActive && "border-l-primary text-primary hover:text-primary"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <ThemeToggle />
          <a
            href="https://lichess.org/@/MeikeChess"
            target="_blank"
            rel="noopener"
            className="font-mono text-xs text-muted-foreground hover:text-primary"
          >
            Watch on Lichess ↗
          </a>
        </div>
      </nav>

      <main id="main" className="ml-0 flex-1 px-5 pt-20 pb-10 md:ml-64 md:px-16 md:py-10">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
