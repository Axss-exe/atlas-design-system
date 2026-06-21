'use client'

import { ArrowLeft, ArrowUpRight, FileText, Link2 } from 'lucide-react'
import { getCountry } from '@/lib/atis/countries'
import { getEntity } from '@/lib/atis/entities'
import { Eyebrow, Pill, SectionLabel } from './primitives'

export function EntityView({
  entityId,
  onBack,
  onOpenEntity,
  onOpenCountry,
}: {
  entityId: string
  onBack: () => void
  onOpenEntity: (id: string) => void
  onOpenCountry: (id: string) => void
}) {
  const entity = getEntity(entityId)
  if (!entity) return null
  const country = getCountry(entity.countryId)

  return (
    <article className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <button onClick={onBack} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
          <ArrowLeft className="size-3.5" />
          Back
        </button>
        <span className="text-border">/</span>
        <button
          onClick={() => country && onOpenCountry(country.id)}
          className="transition-colors hover:text-foreground"
        >
          {country?.name}
        </button>
        <span className="text-border">/</span>
        <span className="text-foreground">{entity.name}</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col gap-5 border-b border-border pb-9">
        <div className="flex flex-wrap items-center gap-2.5">
          <Pill tone="accent">{entity.type}</Pill>
          {country && <Eyebrow>{country.name}</Eyebrow>}
        </div>
        <h1 className="text-balance font-serif text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl">
          {entity.name}
        </h1>
        <p className="max-w-prose text-pretty text-[16px] leading-relaxed text-foreground/80">
          {entity.summary}
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_minmax(0,320px)]">
        {/* Main column */}
        <div className="flex flex-col gap-11">
          {/* Key facts */}
          {entity.keyFacts.length > 0 && (
            <section className="flex flex-col gap-5">
              <SectionLabel index="01" title="Key facts" />
              <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {entity.keyFacts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-1 border-l-2 border-border pl-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {f.label}
                    </dt>
                    <dd className="text-[15px] leading-snug text-foreground">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Relationships */}
          {entity.relationships.length > 0 && (
            <section className="flex flex-col gap-5">
              <SectionLabel index="02" title="Relationships" />
              <ul className="flex flex-col divide-y divide-border border-y border-border">
                {entity.relationships.map((r, i) => {
                  const clickable = Boolean(r.targetId)
                  return (
                    <li key={`${r.label}-${i}`}>
                      <button
                        disabled={!clickable}
                        onClick={() => r.targetId && onOpenEntity(r.targetId)}
                        className={`group flex w-full items-center justify-between gap-4 py-3.5 text-left ${
                          clickable ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Link2 className="size-3.5 shrink-0 text-muted-foreground" />
                          <span className="flex flex-col">
                            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                              {r.label}
                            </span>
                            <span className="text-[15px] text-foreground">{r.targetName}</span>
                          </span>
                        </span>
                        {clickable && (
                          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar: related documents */}
        <aside className="flex flex-col gap-5 lg:sticky lg:top-20 lg:self-start">
          <SectionLabel index="03" title="Related records" />
          <div className="flex flex-col gap-3">
            {(entity.relatedDocuments ?? []).map((d) => (
              <div
                key={d.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 p-3.5"
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium leading-snug text-foreground">{d.title}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    {d.meta}
                  </span>
                </div>
              </div>
            ))}
            {(entity.relatedDocuments ?? []).length === 0 && (
              <p className="text-[13px] text-muted-foreground">
                No supplementary records indexed for this entity yet.
              </p>
            )}
          </div>

          {country && (
            <button
              onClick={() => onOpenCountry(country.id)}
              className="mt-2 flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-foreground"
            >
              <span>Return to {country.name} workspace</span>
              <ArrowUpRight className="size-4" />
            </button>
          )}
        </aside>
      </div>
    </article>
  )
}
