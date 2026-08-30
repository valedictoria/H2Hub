import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About Us" },
]

export function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background text-foreground">
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
          "fixed top-0 left-0 z-30 flex h-screen w-64 flex-col gap-8 border-r bg-card p-6 pt-20 transition-transform duration-200 md:pt-6",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Primary"
      >
        <div className="font-mono text-lg font-semibold tracking-tight">
          <span className="bg-primary px-1.5 py-0.5 text-primary-foreground">H2</span>
          CHESS
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
                  "border-l-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors",
                  "hover:text-foreground",
                  isActive && "border-l-primary text-primary hover:text-primary"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto text-sm text-muted-foreground">
          <a
            href="https://lichess.org/@/MeikeChess"
            target="_blank"
            rel="noopener"
            className="hover:text-primary"
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
