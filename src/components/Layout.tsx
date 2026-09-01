import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeToggle"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About" },
]

// One structural layout shared by all three themes — a sticky top nav.
// NVIDIA's "two surface modes" (its nav/footer stay a black chapter even
// though the body content is white) is expressed through --nav-bg/--nav-fg
// resolving differently than --background/--foreground, not a separate
// component tree.
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

      <header
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{
          background: "color-mix(in srgb, var(--nav-bg) 95%, transparent)",
          borderColor: "var(--nav-border)",
          color: "var(--nav-fg)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
          <NavLink to="/" className="flex items-center gap-2.5" aria-label="H2CHESS home">
            <span className="font-display text-lg font-bold tracking-tight">
              H2<span className="opacity-60">CHESS</span>
            </span>
            <span
              className="hidden rounded-full px-2.5 py-1 text-[10px] font-semibold opacity-70 sm:inline-block"
              style={{ background: "color-mix(in srgb, var(--nav-fg) 10%, transparent)" }}
            >
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
                    "rounded-full px-3.5 py-2 text-sm opacity-70 transition-opacity hover:opacity-100",
                    isActive && "opacity-100"
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
            className="flex size-10 items-center justify-center rounded-full border md:hidden"
            style={{ borderColor: "var(--nav-border)" }}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <nav
            className="flex flex-col gap-3 border-t px-5 py-3 md:hidden"
            style={{ borderColor: "var(--nav-border)" }}
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
                    "rounded-full px-3.5 py-2.5 text-sm opacity-70 transition-opacity",
                    isActive && "opacity-100"
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

      <footer
        className="border-t"
        style={{
          background: "var(--nav-bg)",
          borderColor: "var(--nav-border)",
          color: "var(--nav-fg)",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm opacity-70 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>H2CHESS — three engines, one lineage.</span>
          <a
            href="https://lichess.org/@/MeikeChess"
            target="_blank"
            rel="noopener"
            className="transition-opacity hover:opacity-100"
          >
            lichess.org/@/MeikeChess ↗
          </a>
        </div>
      </footer>
    </div>
  )
}
