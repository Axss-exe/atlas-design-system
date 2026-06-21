'use client'

import { ArrowRight, Globe2, Layers, Network } from 'lucide-react'
import { useState } from 'react'
import { COUNTRY_IDS, getCountry } from '@/lib/atis/countries'
import { isFlagship } from '@/lib/atis/entities'
import { AfricaMap } from './africa-map'
import { CountryDrawer } from './country-drawer'
import { Eyebrow } from './primitives'

const FLAGSHIP_PREVIEW = COUNTRY_IDS.filter(isFlagship).slice(0, 8)

export function LandingView({
  onEnterCountry,
}: {
  onEnterCountry: (id: string) => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="relative grid min-h-[calc(100vh-57px)] grid-cols-1 lg:grid-cols-[minmax(0,440px)_1fr]">
      {/* Editorial intro panel */}
      <section className="flex flex-col justify-between border-b border-border px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r">
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-accent-signal" />
            <Eyebrow>Live intelligence atlas · 50 nations</Eyebrow>
          </div>

          <h1 className="text-balance font-serif text-[2.75rem] leading-[1.04] tracking-tight text-foreground sm:text-5xl">
            The continent, read as a single document.
          </h1>

          <p className="max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
            ATIS is a calm, document-first investigation surface for African
            markets. Move from a country, to a company, to the permit that ties
            them together — without losing the thread.
          </p>

          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <Feature
              icon={<Globe2 className="size-4" />}
              title="Geographic entry"
              body="Begin at the map. Every nation opens an intelligence file."
            />
            <Feature
              icon={<Layers className="size-4" />}
              title="Layered records"
              body="Economy, regulators, projects and resources, structured per country."
            />
            <Feature
              icon={<Network className="size-4" />}
              title="Traceable relations"
              body="Follow links between entities like footnotes in a dossier."
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <Eyebrow>Deep-coverage files</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {FLAGSHIP_PREVIEW.map((id) => {
              const c = getCountry(id)
              if (!c) return null
              return (
                <button
                  key={id}
                  onClick={() => onEnterCountry(id)}
                  className="group flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {c.name}
                  <ArrowRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Map stage */}
      <section className="relative flex min-h-[60vh] items-stretch bg-secondary/40 lg:min-h-0">
        <div className="absolute left-5 top-5 z-10 flex flex-col gap-1 sm:left-8 sm:top-8">
          <Eyebrow>Figure 01 — Continental overview</Eyebrow>
          <span className="text-xs text-muted-foreground">
            Hover to identify · click to preview · double-click to enter
          </span>
        </div>

        <div className="flex-1 px-2 py-6 sm:px-6 sm:py-10">
          <AfricaMap
            selectedId={selectedId}
            onSelect={(id) => setSelectedId((cur) => (cur === id ? null : id))}
            onEnter={onEnterCountry}
          />
        </div>

        <CountryDrawer
          countryId={selectedId}
          onClose={() => setSelectedId(null)}
          onEnter={onEnterCountry}
        />
      </section>
    </div>
  )
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground">
        {icon}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="text-[13px] leading-relaxed text-muted-foreground">{body}</span>
      </div>
    </div>
  )
}
