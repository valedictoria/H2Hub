import { THEMES, useTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={cn("flex items-center gap-1.5 rounded-full border border-hairline p-1.5", className)}
      role="radiogroup"
      aria-label="Design"
    >
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={theme === t.id}
          title={`${t.label} — ${t.description}`}
          onClick={() => setTheme(t.id)}
          className={cn(
            "grid size-6 shrink-0 grid-cols-2 grid-rows-2 overflow-hidden rounded-full ring-offset-2 ring-offset-background transition-shadow",
            theme === t.id ? "ring-2 ring-ring" : "opacity-60 hover:opacity-100"
          )}
        >
          <span className="sr-only">{t.label}</span>
          {t.swatch.map((color, i) => (
            <span key={i} aria-hidden="true" style={{ background: color }} />
          ))}
        </button>
      ))}
    </div>
  )
}
