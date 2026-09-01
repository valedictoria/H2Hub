import { useTheme } from "@/lib/theme"

// Literal figlet "ANSI Shadow" art for H2CHESS. Fira Code is reserved
// specifically for this block — it's the one typeface guaranteed to
// render the box-drawing glyphs (U+2588 etc.) cleanly; it never appears
// as running text anywhere else. Flat ink in the two Clay themes; the
// teletype theme restores its original red->black gradient fill.
const ART = `██╗  ██╗██████╗  ██████╗██╗  ██╗███████╗███████╗███████╗
██║  ██║╚════██╗██╔════╝██║  ██║██╔════╝██╔════╝██╔════╝
███████║ █████╔╝██║     ███████║█████╗  ███████╗███████╗
██╔══██║██╔═══╝ ██║     ██╔══██║██╔══╝  ╚════██║╚════██║
██║  ██║███████╗╚██████╗██║  ██║███████╗███████║███████║
╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝`

export function AnsiLogo({ className = "" }: { className?: string }) {
  const { theme } = useTheme()
  const isTeletype = theme === "teletype"

  return (
    <pre
      aria-hidden="true"
      className={`select-none whitespace-pre font-mono leading-[1.05] ${isTeletype ? "" : "text-foreground"} ${className}`}
      style={
        isTeletype
          ? {
              backgroundImage: "linear-gradient(100deg, #f0685c 0%, #d9483f 40%, #a3232f 75%, #8a1f28 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 18px rgba(163, 35, 47, 0.35))",
            }
          : undefined
      }
    >
      {ART}
    </pre>
  )
}
