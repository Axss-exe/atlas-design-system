import type React from "react"
import { cn } from "@/lib/utils"

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode
  tone?: "neutral" | "positive" | "watch" | "alert" | "accent"
  className?: string
}) {
  const tones: Record<string, string> = {
    neutral: "border-border text-muted-foreground",
    positive: "border-positive/30 text-positive",
    watch: "border-watch/40 text-watch",
    alert: "border-alert/30 text-alert",
    accent: "border-accent-signal/40 text-accent-signal",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground", className)}>
      {children}
    </span>
  )
}

export function Stat({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <span className="font-serif text-2xl leading-none text-foreground">{value}</span>
      {sub ? <span className="text-xs text-muted-foreground">{sub}</span> : null}
    </div>
  )
}

export function SectionLabel({
  index,
  title,
  className,
}: {
  index: string
  title: string
  className?: string
}) {
  return (
    <div className={cn("flex items-baseline gap-3 border-b border-border pb-2", className)}>
      <span className="font-mono text-[11px] text-accent-signal">{index}</span>
      <h2 className="font-mono text-[12px] uppercase tracking-[0.2em] text-foreground">{title}</h2>
    </div>
  )
}

export function Sparkline({
  data,
  className,
  positive = true,
}: {
  data: number[]
  className?: string
  positive?: boolean
}) {
  if (!data.length) return null
  const w = 120
  const h = 32
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((d - min) / span) * h
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-8 w-[120px] overflow-visible", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={positive ? "var(--color-positive)" : "var(--color-alert)"}
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
