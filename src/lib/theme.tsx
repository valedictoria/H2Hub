import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type ThemeId = "warm" | "bright" | "teletype"

export type ThemeDef = {
  id: ThemeId
  label: string
  description: string
  swatch: [string, string, string, string]
}

// Three real design systems, not just recolors: "warm" and "bright" share
// one component language (adapted from clay.com's extracted tokens —
// styl4e/tokens.json and styl4e/preview.html read as two different
// palettes for the same brand); "teletype" is the site's previous, more
// structurally distinct dispatch identity, restored as a togglable option.
export const THEMES: ThemeDef[] = [
  {
    id: "warm",
    label: "Clay — Warm",
    description: "Cream canvas, near-black ink, teal/lavender/peach engine cards.",
    swatch: ["#fffaf0", "#1a3a3a", "#b8a4ed", "#ffb084"],
  },
  {
    id: "bright",
    label: "Clay — Bright",
    description: "White canvas, pure ink, violet/lime/orange/cobalt accents.",
    swatch: ["#ffffff", "#3859f9", "#cbd810", "#ff7614"],
  },
  {
    id: "teletype",
    label: "Teletype",
    description: "Near-black dispatch, aged cream text, one red accent.",
    swatch: ["#161210", "#a3232f", "#e9dfc8", "#8c8272"],
  },
]

const STORAGE_KEY = "h2chess-theme"
const DEFAULT_THEME: ThemeId = "warm"

function isThemeId(value: string | null): value is ThemeId {
  return value === "warm" || value === "bright" || value === "teletype"
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
