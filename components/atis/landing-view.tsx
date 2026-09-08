'use client'

import { ArrowRight, Network, ScanLine } from 'lucide-react'
import { useState } from 'react'
import { COUNTRY_IDS, getCountry } from '@/lib/atis/countries'
import { isFlagship } from '@/lib/atis/entities'
import { AfricaMap } from './africa-map'
import { CountryDrawer } from './country-drawer'
import { Eyebrow } from './primitives'

const FLAGSHIP_PREVIEW = COUNTRY_IDS.filter(isFlagship).slice(0, 8)

export function LandingView({ onEnterCountry }: { onEnterCountry: (id: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div>
      <section id="atlas-entry" className="scroll-mt-16 border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[minmax(0,440px)_1fr]">
          <div className="flex flex-col justify-between border-b border-border px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
            <div className="flex flex-col gap-7">
              <div className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-accent-signal" />
                <Eyebrow>Figure 01 · Continental overview</Eyebrow>
              </div>
              <h2 className="text-balance font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl">Start anywhere. Follow the connections.</h2>
              <p className="max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
                This public preview shows the shape of ATIS: begin with a country, open an entity, and follow the relationships outward. The records here are illustrative, not live intelligence.
              </p>
              <div className="flex flex-col gap-4 border-t border-border pt-6">
                <Feature icon={<ScanLine className="size-4" />} title="Country → entity → context" body="A geographic starting point becomes a path through institutions, projects, resources and markets." />
                <Feature icon={<Network className="size-4" />} title="The relationship is the record" body="Trace ownership, regulation, infrastructure, trade and investment as connected information." />
              </div>
            </div>
            <div className="mt-12 flex flex-col gap-3">
              <Eyebrow>Concept files / illustrative</Eyebrow>
              <div className="flex flex-wrap gap-2">
                {FLAGSHIP_PREVIEW.map((id) => {
                  const country = getCountry(id)
                  if (!country) return null
                  return <button key={id} onClick={() => onEnterCountry(id)} className="group flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background">{country.name}<ArrowRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" /></button>
                })}
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[62vh] items-stretch bg-background">
            <div className="absolute left-5 top-5 z-10 flex flex-col gap-1 sm:left-8 sm:top-8">
              <Eyebrow>Concept map / 50 nations</Eyebrow>
              <span className="text-xs text-muted-foreground">Hover to identify · click to preview · double-click to enter</span>
            </div>
            <div className="flex-1 px-2 py-8 sm:px-6 sm:py-12">
              <AfricaMap selectedId={selectedId} onSelect={(id) => setSelectedId((current) => (current === id ? null : id))} onEnter={onEnterCountry} />
            </div>
            <CountryDrawer countryId={selectedId} onClose={() => setSelectedId(null)} onEnter={onEnterCountry} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16 lg:py-24">
        <div>
          <Eyebrow>Reading the system</Eyebrow>
          <h2 className="mt-5 max-w-sm text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">From information to context. From context to intelligence.</h2>
        </div>
        <div className="grid gap-0 border-t border-border sm:grid-cols-2">
          <SystemRow label="Query" body="Ask across the knowledge system." />
          <SystemRow label="Discovery" body="Find countries, companies, institutions and projects." />
          <SystemRow label="Investigation" body="Turn a question or event into a persistent thread." />
          <SystemRow label="Evidence" body="Ground findings in supporting information." />
          <SystemRow label="Report" body="Structure findings, implications and unresolved questions." />
          <SystemRow label="Execution" body="Translate validated opportunities into pathways." />
        </div>
      </section>

      <section className="border-t border-border px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
          <span>ATIS / Concept / Illustrative data</span>
          <p className="max-w-xl font-sans text-xs normal-case leading-relaxed tracking-normal text-muted-foreground">ATIS is presented here as a working concept. The interface and information structures demonstrate how the system is intended to work. The data shown in this public preview is illustrative and should not be interpreted as verified economic, corporate, regulatory or investment intelligence.</p>
        </div>
      </section>
    </div>
  )
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return <div className="flex gap-3"><span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground">{icon}</span><div className="flex flex-col gap-0.5"><span className="text-sm font-medium text-foreground">{title}</span><span className="text-[13px] leading-relaxed text-muted-foreground">{body}</span></div></div>
}

function SystemRow({ label, body }: { label: string; body: string }) {
  return <div className="flex min-h-28 flex-col justify-between border-b border-border py-5 pr-5"><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-signal">{label}</span><span className="max-w-[18rem] text-sm leading-relaxed text-muted-foreground">{body}</span></div>
}
