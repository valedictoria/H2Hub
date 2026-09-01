import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type ThemeId = "warm" | "nvidia" | "verge"

export type ThemeDef = {
  id: ThemeId
  label: string
  description: string
  swatch: [string, string, string, string]
}

// Three real design systems extracted from brand references, not recolors
// of one template. "warm" (Clay) is the direction already live. "nvidia"
// and "verge" come from styl4e-style token packages in nvidia-brand-
// package.zip / theverge-brand-package.zip — each package's tokens.json
// disagreed with its own preview.html again (same pattern as Clay), so
// tokens.json + theme.css (which agreed with each other) won over
// preview.html's rendering in both cases.
export const THEMES: ThemeDef[] = [
  {
    id: "warm",
    label: "Clay — Warm",
    description: "Cream canvas, near-black ink, teal/lavender/peach engine cards.",
    swatch: ["#fffaf0", "#1a3a3a", "#b8a4ed", "#ffb084"],
  },
  {
    id: "nvidia",
    label: "NVIDIA",
    description: "White engineering canvas, black hero/footer chapters, NVIDIA Green accent.",
    swatch: ["#ffffff", "#000000", "#76b900", "#1a1a1a"],
  },
  {
    id: "verge",
    label: "The Verge",
    description: "Near-black canvas, no light mode, acid-mint and ultraviolet hazard-tape accents.",
    swatch: ["#131313", "#3cffd0", "#5200ff", "#ff2e9c"],
  },
]

const STORAGE_KEY = "h2chess-theme"
const DEFAULT_THEME: ThemeId = "warm"

function isThemeId(value: string | null): value is ThemeId {
  return value === "warm" || value === "nvidia" || value === "verge"
}

const ThemeContext = createContext<{
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
} | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof document === "undefined") return DEFAULT_THEME
    const current = document.documentElement.dataset.theme
    return isThemeId(current ?? null) ? (current as ThemeId) : DEFAULT_THEME
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
