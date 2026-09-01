// Literal figlet "ANSI Shadow" art for H2CHESS, rendered flat in ink.
// Fira Code is reserved specifically for this block — it's the one
// typeface guaranteed to render the box-drawing glyphs (U+2588 etc.)
// cleanly; it never appears as running text anywhere else.
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
      className={`select-none whitespace-pre font-mono leading-[1.05] text-foreground ${className}`}
    >
      {ART}
    </pre>
  )
}
