import { useTheme } from "@/lib/theme"

// Literal figlet "ANSI Shadow" art for H2CHESS. Fira Code is reserved
// specifically for this block — it's the one typeface guaranteed to
// render the box-drawing glyphs (U+2588 etc.) cleanly; it never appears
// as running text anywhere else. Flat ink in Warm/NVIDIA; The Verge gets
// a mint->ultraviolet gradient fill matching its hazard-tape accents.
const ART = `██╗  ██╗██████╗  ██████╗██╗  ██╗███████╗███████╗███████╗
██║  ██║╚════██╗██╔════╝██║  ██║██╔════╝██╔════╝██╔════╝
███████║ █████╔╝██║     ███████║█████╗  ███████╗███████╗
██╔══██║██╔═══╝ ██║     ██╔══██║██╔══╝  ╚════██║╚════██║
██║  ██║███████╗╚██████╗██║  ██║███████╗███████║███████║
╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝`

export function AnsiLogo({ className = "" }: { className?: string }) {
  const { theme } = useTheme()
  const isVerge = theme === "verge"

  return (
    <pre
      aria-hidden="true"
      className={`select-none whitespace-pre font-mono leading-[1.05] ${isVerge ? "" : "text-foreground"} ${className}`}
      style={
        isVerge
          ? {
              backgroundImage: "linear-gradient(100deg, #3cffd0 0%, #5200ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }
          : undefined
      }
    >
      {ART}
    </pre>
  )
}
