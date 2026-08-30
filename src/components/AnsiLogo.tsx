// Literal figlet "ANSI Shadow" art for H2CHESS, rendered with a red->black
// gradient text-fill. Fira Code is reserved specifically for this block —
// it's the one typeface guaranteed to render the box-drawing glyphs
// (U+2588 etc.) cleanly; it never appears as running text anywhere else.
const ART = `██╗  ██╗██████╗  ██████╗██╗  ██╗███████╗███████╗███████╗
██║  ██║╚════██╗██╔════╝██║  ██║██╔════╝██╔════╝██╔════╝
███████║ █████╔╝██║     ███████║█████╗  ███████╗███████╗
██╔══██║██╔═══╝ ██║     ██╔══██║██╔══╝  ╚════██║╚════██║
██║  ██║███████╗╚██████╗██║  ██║███████╗███████║███████║
╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝`

export function AnsiLogo({ className = "" }: { className?: string }) {
  return (
    <pre
      aria-hidden="true"
      className={`select-none whitespace-pre font-mono leading-[1.05] ${className}`}
      style={{
        backgroundImage: "linear-gradient(100deg, #f0685c 0%, #d9483f 40%, #a3232f 75%, #8a1f28 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        filter: "drop-shadow(0 0 18px rgba(163, 35, 47, 0.35))",
      }}
    >
      {ART}
    </pre>
  )
}
