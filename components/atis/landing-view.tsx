'use client'

import { ArrowDown, ArrowRight, Compass, Globe2, Layers, Network, ScanLine } from 'lucide-react'
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

  const scrollToAtlas = () => {
    document.getElementById('atlas-entry')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border bg-foreground text-background">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-57px)] max-w-7xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-background/60">
            <span>ATIS / Field note 001</span>
            <span>32°N — 35°S</span>
          </div>

          <div className="grid gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 text-accent-signal">
                <span className="size-1.5 rounded-full bg-current" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">A living intelligence atlas</span>
              </div>
              <h1 className="max-w-4xl text-balance font-serif text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.86] tracking-[-0.06em]">
                Africa,<br />read together.
              </h1>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-background/65 sm:text-lg">
                ATIS is a document-first way to understand the continent&apos;s markets, institutions, resources, and the relationships that connect them.
              </p>
              <button
                type="button"
                onClick={scrollToAtlas}
                className="group flex w-fit items-center gap-3 border-b border-background/50 pb-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors hover:border-accent-signal hover:text-accent-signal"
              >
                Enter the atlas
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-px border border-background/15 bg-background/15 text-background">
              <Signal label="Nations mapped" value="50" />
              <Signal label="Entity records" value="240+" />
              <Signal label="Relations traced" value="1,800" />
              <Signal label="Edition" value="01 / 26" />
            </div>
          </div>

          <div className="flex items-end justify-between border-t border-background/15 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-background/45">
            <span>Spatial intelligence / open edition</span>
            <Compass className="size-5 text-accent-signal" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:px-16 lg:py-28">
        <div>
          <Eyebrow>Why ATIS</Eyebrow>
          <h2 className="mt-5 max-w-sm text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Not a feed. A way of seeing.
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <Principle icon={<Globe2 />} number="01" title="Start with place" body="Every investigation begins with the geography that gives a record its meaning." />
          <Principle icon={<Layers />} number="02" title="Read in layers" body="Markets, regulators, projects, and resources sit in one legible country file." />
          <Principle icon={<Network />} number="03" title="Follow the thread" body="Move from an institution to an entity to the permit, project, or resource beneath it." />
        </div>
      </section>

      <section id="atlas-entry" className="scroll-mt-16 border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[minmax(0,440px)_1fr]">
          <div className="flex flex-col justify-between border-b border-border px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
            <div className="flex flex-col gap-7">
              <div className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-accent-signal" />
                <Eyebrow>Figure 01 · Continental overview</Eyebrow>
              </div>
              <h2 className="text-balance font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl">
                The continent, as a starting point.
              </h2>
              <p className="max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Select a nation to open its intelligence file. The dataset is illustrative, designed to demonstrate how ATIS connects geography, institutions, and strategic activity.
              </p>
              <div className="flex flex-col gap-4 border-t border-border pt-6">
                <Feature icon={<ScanLine className="size-4" />} title="Explore spatially" body="Hover to identify. Click to preview. Enter a country file when you are ready." />
                <Feature icon={<Network className="size-4" />} title="Keep the thread" body="Every file is a doorway into connected entities and traceable relations." />
              </div>
            </div>
            <div className="mt-12 flex flex-col gap-3">
              <Eyebrow>Deep-coverage files</Eyebrow>
              <div className="flex flex-wrap gap-2">
                {FLAGSHIP_PREVIEW.map((id) => {
                  const c = getCountry(id)
                  if (!c) return null
                  return <button key={id} onClick={() => onEnterCountry(id)} className="group flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background">{c.name}<ArrowRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" /></button>
                })}
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[62vh] items-stretch bg-background">
            <div className="absolute left-5 top-5 z-10 flex flex-col gap-1 sm:left-8 sm:top-8">
              <Eyebrow>Live map / 50 nations</Eyebrow>
              <span className="text-xs text-muted-foreground">Hover to identify · click to preview · double-click to enter</span>
            </div>
            <div className="flex-1 px-2 py-8 sm:px-6 sm:py-12">
              <AfricaMap selectedId={selectedId} onSelect={(id) => setSelectedId((cur) => (cur === id ? null : id))} onEnter={onEnterCountry} />
            </div>
            <CountryDrawer countryId={selectedId} onClose={() => setSelectedId(null)} onEnter={onEnterCountry} />
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow>Open edition / illustrative dataset</Eyebrow>
          <p className="mt-5 text-balance font-serif text-3xl leading-tight tracking-tight sm:text-4xl">A quiet surface for complex questions.</p>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">ATIS is a prototype intelligence system. Its structure is the point: a shared map, a country file, and the relationships waiting underneath.</p>
      </section>
    </div>
  )
}

function Signal({ label, value }: { label: string; value: string }) {
  return <div className="flex min-h-28 flex-col justify-between bg-background/5 p-4 sm:p-5"><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-background/45">{label}</span><span className="font-serif text-3xl tracking-tight">{value}</span></div>
}

function Principle({ icon, number, title, body }: { icon: React.ReactNode; number: string; title: string; body: string }) {
  return <div className="flex flex-col gap-4 border-t border-border pt-4"><div className="flex items-center justify-between"><span className="font-mono text-[10px] text-muted-foreground">{number}</span><span className="text-foreground [&_svg]:size-4">{icon}</span></div><h3 className="font-medium">{title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{body}</p></div>
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return <div className="flex gap-3"><span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground">{icon}</span><div className="flex flex-col gap-0.5"><span className="text-sm font-medium text-foreground">{title}</span><span className="text-[13px] leading-relaxed text-muted-foreground">{body}</span></div></div>
}
