'use client'

import { ArrowLeft, ArrowUpRight, CornerDownLeft, Link2, Loader2, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { COUNTRY_IDS, getCountry } from '@/lib/atis/countries'
import { buildReport, getSampleQueries } from '@/lib/atis/report'
import type { IntelligenceReport } from '@/lib/atis/types'
import { Eyebrow, Pill, SectionLabel } from './primitives'
import { RichText } from './rich-text'

export function SearchView({
  countryId,
  onBack,
  onOpenCountry,
}: {
  countryId: string | null
  onBack: () => void
  onOpenCountry: (id: string) => void
}) {
  const [scope, setScope] = useState<string>(countryId ?? COUNTRY_IDS[0])
  const [query, setQuery] = useState('')
  const [report, setReport] = useState<IntelligenceReport | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const country = getCountry(scope)
  const samples = getSampleQueries(scope)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function run(q: string) {
    const trimmed = q.trim()
    if (!trimmed) return
    setQuery(trimmed)
    setLoading(true)
    setReport(null)
    // Simulate retrieval/synthesis latency for a deliberate, considered feel
    window.setTimeout(() => {
      setReport(buildReport(scope, trimmed))
      setLoading(false)
    }, 900)
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      <button
        onClick={onBack}
        className="group mb-7 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back
      </button>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-accent-signal" />
          <Eyebrow>Intelligence search</Eyebrow>
        </div>
        <h1 className="text-balance font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
          Ask the atlas a question.
        </h1>
        <p className="max-w-prose text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Pose an investigative query. ATIS interprets it, scopes a retrieval
          plan across the selected country&apos;s record, and returns a sourced
          editorial brief.
        </p>
      </div>

      {/* Scope + input */}
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-[0_2px_24px_-16px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Scope
          </span>
          <select
            value={scope}
            onChange={(e) => {
              setScope(e.target.value)
              setReport(null)
            }}
            className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground outline-none transition-colors hover:border-foreground focus:border-foreground"
          >
            {COUNTRY_IDS.map((id) => (
              <option key={id} value={id}>
                {getCountry(id)?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <textarea
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                run(query)
              }
            }}
            rows={2}
            placeholder={`e.g. ${samples[0] ?? 'Who controls strategic resources here?'}`}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-12 text-[15px] leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground"
          />
          <button
            onClick={() => run(query)}
            disabled={!query.trim() || loading}
            className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-lg bg-foreground text-background transition-opacity disabled:opacity-30"
            aria-label="Run investigation"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <CornerDownLeft className="size-4" />}
          </button>
        </div>

        {/* Sample queries */}
        <div className="flex flex-wrap gap-2">
          {samples.map((s) => (
            <button
              key={s}
              onClick={() => run(s)}
              className="rounded-full border border-border px-3 py-1 text-left text-[13px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="mt-10 flex flex-col gap-4 animate-fade">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Interpreting query and scoping retrieval across {country?.name}&hellip;
          </div>
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-secondary"
                style={{ width: `${90 - i * 12}%` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Report */}
      {report && !loading && <ReportView report={report} onOpenCountry={onOpenCountry} scope={scope} />}
    </div>
  )
}

function ReportView({
  report,
  scope,
  onOpenCountry,
}: {
  report: IntelligenceReport
  scope: string
  onOpenCountry: (id: string) => void
}) {
  return (
    <div className="animate-fade-up mt-10 flex flex-col gap-10">
      {/* Interpretation + retrieval plan */}
      <section className="flex flex-col gap-5 rounded-2xl border border-border bg-secondary/40 p-6">
        <div className="flex flex-col gap-2">
          <Eyebrow>Query interpretation</Eyebrow>
          <p className="text-pretty text-[15px] leading-relaxed text-foreground/85">
            {report.interpretation}
          </p>
        </div>
        <div className="flex flex-col gap-2.5 border-t border-border pt-4">
          <Eyebrow>Retrieval plan</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {report.retrievalPlan.map((t) => (
              <Pill
                key={t.label}
                tone={t.kind === 'resource' || t.kind === 'relation' ? 'accent' : 'neutral'}
              >
                <span className="opacity-50">{t.kind}</span>
                {t.label}
              </Pill>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial brief */}
      <article className="report-prose flex flex-col">
        <Eyebrow className="mb-2">Intelligence brief</Eyebrow>
        <h2 className="!mt-0 text-balance font-serif text-3xl leading-tight tracking-tight text-foreground">
          {report.title}
        </h2>
        {report.findings.map((f) => (
          <div key={f.heading}>
            <h3>{f.heading}</h3>
            <p>
              <RichText text={f.body} />
            </p>
          </div>
        ))}
      </article>

      {/* Relationships */}
      {report.relationships.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionLabel index="04" title="Mapped relationships" />
          <ul className="grid gap-2 sm:grid-cols-2">
            {report.relationships.map((r, i) => (
              <li
                key={`${r.label}-${i}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
              >
                <Link2 className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {r.label}
                  </span>
                  <span className="text-[14px] text-foreground">{r.targetName}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sources */}
      <section className="flex flex-col gap-4">
        <SectionLabel index="05" title="Sources" />
        <ul className="flex flex-col divide-y divide-border border-y border-border">
          {report.sources.map((s, i) => (
            <li key={`${s.title}-${i}`} className="flex items-baseline justify-between gap-4 py-3">
              <span className="text-[14px] text-foreground">
                <span className="mr-2 font-mono text-[11px] text-muted-foreground">
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                {s.title}
              </span>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                {s.meta}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <button
        onClick={() => onOpenCountry(scope)}
        className="flex w-fit items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        Open {getCountry(scope)?.name} workspace
        <ArrowUpRight className="size-4" />
      </button>
    </div>
  )
}
