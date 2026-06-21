'use client'

import { ArrowLeft, Globe2, Layers, Network, Search } from 'lucide-react'
import { Eyebrow, SectionLabel } from './primitives'

export function AboutView({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
      <button
        onClick={onBack}
        className="group mb-7 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back
      </button>

      <Eyebrow>About the system</Eyebrow>
      <h1 className="mt-3 text-balance font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
        A calm instrument for reading African markets.
      </h1>
      <p className="mt-5 max-w-prose text-pretty text-[16px] leading-relaxed text-foreground/80">
        ATIS — the Analytical Trade Intelligence System — treats the continent
        as a single, navigable document. It is designed for analysts who need to
        move quickly between scales: from a country&apos;s strategic posture, to
        the firms operating inside it, to the specific permit or law that governs
        an asset. The interface is deliberately quiet, monochrome, and
        typographic, so the intelligence stays in the foreground.
      </p>

      <section className="mt-12 flex flex-col gap-5">
        <SectionLabel index="01" title="How to read the atlas" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Principle
            icon={<Globe2 className="size-4" />}
            title="Start geographic"
            body="The map is the index. Hover to identify a nation, click to preview its file, double-click or enter to open the full workspace."
          />
          <Principle
            icon={<Layers className="size-4" />}
            title="Drill into records"
            body="Each country workspace organises its intelligence into layered records — companies, projects, regulators, resources and infrastructure."
          />
          <Principle
            icon={<Network className="size-4" />}
            title="Follow the relations"
            body="Entities reference one another like footnotes. Follow ownership, oversight and licensing links without losing your place."
          />
          <Principle
            icon={<Search className="size-4" />}
            title="Investigate"
            body="Pose a question in intelligence search. ATIS interprets it, scopes a retrieval plan, and assembles a sourced editorial brief."
          />
        </div>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <SectionLabel index="02" title="On the data" />
        <p className="max-w-prose text-pretty text-[15px] leading-relaxed text-muted-foreground">
          This build runs on a curated, illustrative dataset spanning all 50
          mapped African nations, with deep-coverage files for flagship markets.
          Figures are representative and intended to demonstrate the
          investigation experience rather than serve as a live source of record.
        </p>
      </section>
    </div>
  )
}

function Principle({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border p-5">
      <span className="flex size-9 items-center justify-center rounded-full border border-border text-foreground">
        {icon}
      </span>
      <span className="mt-1 text-[15px] font-medium text-foreground">{title}</span>
      <span className="text-[13px] leading-relaxed text-muted-foreground">{body}</span>
    </div>
  )
}
