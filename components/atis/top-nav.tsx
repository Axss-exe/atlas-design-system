'use client'

import { Search } from 'lucide-react'

export function TopNav({
  onHome,
  onAbout,
  onWorkspace,
  onSearch,
  context,
}: {
  onHome: () => void
  onAbout: () => void
  onWorkspace: () => void
  onSearch?: () => void
  context?: string | null
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-5 py-3.5 backdrop-blur-md sm:px-8">
      <button
        onClick={onHome}
        className="group flex items-baseline gap-2.5 text-left"
        aria-label="ATIS home"
      >
        <span className="font-mono text-base font-semibold tracking-[0.18em] text-foreground">
          ATIS
        </span>
        <span className="hidden text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:inline">
          Analytical Trade Intelligence System
        </span>
      </button>

      <div className="flex items-center gap-1">
        {context && (
          <span className="mr-2 hidden max-w-[180px] truncate text-xs text-muted-foreground md:inline">
            {context}
          </span>
        )}
        {onSearch && (
          <button
            onClick={onSearch}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-hover"
          >
            <Search className="size-3.5" strokeWidth={2} />
            <span>Search</span>
          </button>
        )}
        <button
          onClick={onAbout}
          className="rounded-full px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-hover"
        >
          About
        </button>
        <button
          onClick={onWorkspace}
          className="rounded-full border border-foreground px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Intelligence Workspace
        </button>
      </div>
    </header>
  )
}
