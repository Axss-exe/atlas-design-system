'use client'

import { ArrowRight, X } from 'lucide-react'
import { getCountry } from '@/lib/atis/countries'
import { getEntities, isFlagship } from '@/lib/atis/entities'
import { Eyebrow, Pill, Stat } from './primitives'

export function CountryDrawer({
  countryId,
  onClose,
  onEnter,
}: {
  countryId: string | null
  onClose: () => void
  onEnter: (id: string) => void
}) {
  if (!countryId) return null
  const country = getCountry(countryId)
  if (!country) return null

  const entities = getEntities(countryId)
  const flagship = isFlagship(countryId)
  const companies = entities.filter((e) => e.type === 'Company').length
  const projects = entities.filter((e) => e.type === 'Project').length
  const records = entities.length

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="animate-drawer-up pointer-events-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <Eyebrow>{country.region}</Eyebrow>
              {flagship ? (
                <Pill tone="accent">Deep coverage</Pill>
              ) : (
                <Pill tone="neutral">Baseline file</Pill>
              )}
            </div>
            <h2 className="font-serif text-3xl leading-none tracking-tight text-foreground">
              {country.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
            aria-label="Close country preview"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="max-w-prose text-pretty text-[15px] leading-relaxed text-foreground/85">
            {country.summary}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            <Stat label="Capital" value={country.capital} />
            <Stat label="Population" value={country.population} />
            <Stat label="Indexed records" value={String(records)} sub={`${companies} firms · ${projects} projects`} />
            <Stat label="Climate" value={country.investmentClimate} />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Eyebrow>Lead sectors</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {country.sectors.map((s) => (
                <Pill key={s} tone="neutral">
                  {s}
                </Pill>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <Eyebrow>Strategic resources</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {country.resources.map((r) => (
                <Pill key={r} tone="accent">
                  {r}
                </Pill>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border bg-secondary/60 px-6 py-4">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Double-click any country to enter directly.
          </span>
          <button
            onClick={() => onEnter(countryId)}
            className="group flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Enter intelligence workspace
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
