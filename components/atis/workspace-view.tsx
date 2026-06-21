'use client'

import { ArrowLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { getCountry } from '@/lib/atis/countries'
import { ENTITY_TYPE_LABELS, getEntities, isFlagship } from '@/lib/atis/entities'
import type { Entity, EntityType } from '@/lib/atis/types'
import { EntityCard } from './entity-card'
import { Eyebrow, Pill, SectionLabel, Stat } from './primitives'

const GROUP_ORDER: EntityType[] = [
  'Company',
  'Project',
  'Resource',
  'Infrastructure',
  'Regulator',
  'Law',
  'Permit',
  'Region',
]

const FILTERS: ('All' | EntityType)[] = ['All', ...GROUP_ORDER]

export function WorkspaceView({
  countryId,
  onBack,
  onOpenEntity,
  onSearch,
}: {
  countryId: string
  onBack: () => void
  onOpenEntity: (id: string) => void
  onSearch: () => void
}) {
  const [filter, setFilter] = useState<'All' | EntityType>('All')
  const country = getCountry(countryId)
  const entities = getEntities(countryId)
  const flagship = isFlagship(countryId)

  const grouped = useMemo(() => {
    const map = new Map<EntityType, Entity[]>()
    for (const e of entities) {
      if (!map.has(e.type)) map.set(e.type, [])
      map.get(e.type)!.push(e)
    }
    return map
  }, [entities])

  if (!country) return null

  const visibleGroups = GROUP_ORDER.filter(
    (t) => (filter === 'All' || filter === t) && (grouped.get(t)?.length ?? 0) > 0,
  )

  let sectionIndex = 1

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      {/* Breadcrumb */}
      <button
        onClick={onBack}
        className="group mb-7 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        Atlas
      </button>

      {/* Country header */}
      <header className="flex flex-col gap-6 border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <Eyebrow>{country.region}</Eyebrow>
          {flagship ? (
            <Pill tone="accent">Deep coverage</Pill>
          ) : (
            <Pill tone="neutral">Baseline file</Pill>
          )}
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_minmax(0,360px)]">
          <div className="flex flex-col gap-5">
            <h1 className="text-balance font-serif text-5xl leading-[0.98] tracking-tight text-foreground sm:text-6xl">
              {country.name}
            </h1>
            <p className="max-w-prose text-pretty text-[15px] leading-relaxed text-foreground/80">
              {country.overview}
            </p>
            <button
              onClick={onSearch}
              className="group flex w-fit items-center gap-2 rounded-full border border-foreground px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <Search className="size-3.5" />
              Investigate {country.name}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 rounded-xl border border-border bg-secondary/40 p-6">
            <Stat label="Capital" value={country.capital} />
            <Stat label="Population" value={country.population} />
            <Stat label="Entities" value={String(entities.length)} sub="on file" />
            <Stat label="Climate" value={country.investmentClimate} />
            <div className="col-span-2 flex flex-col gap-2 border-t border-border pt-4">
              <Eyebrow>Strategic resources</Eyebrow>
              <div className="flex flex-wrap gap-1.5">
                {country.resources.map((r) => (
                  <Pill key={r} tone="accent">
                    {r}
                  </Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter bar */}
      <div className="sticky top-[57px] z-20 -mx-5 mt-8 flex gap-1.5 overflow-x-auto border-b border-border bg-background/90 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => {
          const count = f === 'All' ? entities.length : grouped.get(f)?.length ?? 0
          if (f !== 'All' && count === 0) return null
          const active = filter === f
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors ${
                active
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {f === 'All' ? 'All records' : ENTITY_TYPE_LABELS[f]}
              <span className={`font-mono text-[11px] ${active ? 'text-background/70' : 'text-muted-foreground/70'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grouped entity sections */}
      <div className="mt-10 flex flex-col gap-12 pb-12">
        {visibleGroups.map((type) => {
          const list = grouped.get(type) ?? []
          const idx = String(sectionIndex++).padStart(2, '0')
          return (
            <section key={type} className="animate-fade-up flex flex-col gap-5">
              <SectionLabel index={idx} title={ENTITY_TYPE_LABELS[type]} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((e) => (
                  <EntityCard key={e.id} entity={e} onOpen={onOpenEntity} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
