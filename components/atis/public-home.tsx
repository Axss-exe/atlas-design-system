'use client'

import Link from 'next/link'
import { ArrowRight, Minus } from 'lucide-react'
import { Eyebrow, Pill, SectionLabel } from './primitives'

const capabilities = [
  ['01', 'Ask ATIS', 'Ask questions in natural language about information available in the system.'],
  ['02', 'Explore evidence', 'Review the underlying documents and information used to support ATIS responses.'],
  ['03', 'Explore entities', 'Investigate companies, organisations, people, institutions, projects and other entities.'],
  ['04', 'Explore relationships', 'Follow connections between entities and examine how different pieces of information relate.'],
  ['05', 'Follow stories', 'Understand developments as connected events rather than isolated pieces of information.'],
  ['06', 'Read RITA intelligence', 'Examine how new developments connect to what is already known.'],
  ['07', 'Investigate further', 'Follow entities, evidence, relationships and stories deeper into the system.'],
] as const

export function PublicHome() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-border px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]" aria-label="ATIS home">
          <span className="flex size-7 items-center justify-center border border-foreground font-serif text-base tracking-normal">A</span>
          <span>ATIS</span>
        </Link>
        <Pill>Concept / pilot</Pill>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-24 pt-24 text-center sm:px-8 sm:pt-36 lg:pb-32">
        <Eyebrow>Africa Trade Intelligence System</Eyebrow>
        <h1 className="mt-8 max-w-4xl text-balance font-serif text-5xl leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-[6.5rem]">
          Making African information legible through relationships.
        </h1>
        <p className="mt-9 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          ATIS is an intelligence system designed to help users explore complex information by connecting evidence, entities, relationships, events and emerging stories.
        </p>
        <Link href="/map" className="group mt-10 inline-flex items-center gap-3 border-b border-foreground pb-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-accent-signal hover:border-accent-signal">
          Enter ATIS
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:py-20">
          <div>
            <SectionLabel index="01" title="The system" />
            <h2 className="mt-8 max-w-sm text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              Information becomes more useful when its relationships can be followed.
            </h2>
          </div>
          <div className="flex flex-col justify-between gap-12">
            <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              ATIS connects information so it can be explored as a connected system rather than as isolated records. The aim is not simply to summarise what happened, but to help make the surrounding context visible.
            </p>
            <div className="border-y border-border py-6 font-mono text-[11px] uppercase tracking-[0.18em]">
              {['Information', 'Entities', 'Relationships', 'Context', 'Intelligence'].map((item, index) => (
                <div key={item} className="flex items-center gap-4 py-2">
                  <span className="w-5 text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                  {index < 4 && <Minus className="ml-auto size-3 text-border" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-xl">
          <SectionLabel index="02" title="What you can do" />
          <p className="mt-7 text-lg leading-8 text-muted-foreground">A set of paths for moving from a question to the evidence, entities and relationships that can help answer it.</p>
        </div>
        <div className="mt-12 border-t border-border">
          {capabilities.map(([number, title, description]) => (
            <div key={number} className="grid gap-4 border-b border-border py-6 sm:grid-cols-[4rem_13rem_1fr] sm:items-baseline sm:gap-6">
              <span className="font-mono text-[11px] text-accent-signal">{number}</span>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.15em]">{title}</h3>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:py-24">
          <div>
            <SectionLabel index="03" title="A layer within ATIS" />
            <h2 className="mt-8 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">RITA reads between developments.</h2>
          </div>
          <div className="flex flex-col gap-7 text-muted-foreground">
            <div>
              <Eyebrow>Relationship Intelligence &amp; Triage Analyst</Eyebrow>
              <p className="mt-5 text-lg leading-8">RITA examines how new information connects to what is already known, helping turn developments into contextual intelligence rather than simply summarising headlines.</p>
            </div>
            <div className="border-t border-border pt-5 text-sm leading-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground">Current pilot</span>
              <p className="mt-3">Zimbabwe-focused development environment. The wider vision is a connected intelligence system for African markets.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <SectionLabel index="04" title="Pilot note" />
          </div>
          <div className="max-w-2xl">
            <p className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">A serious system can still begin as a working question.</p>
            <p className="mt-7 text-base leading-7 text-muted-foreground">ATIS is currently being developed and tested through a Zimbabwe-focused pilot. Some relationships and AI-generated analysis remain experimental and should be treated as material for investigation rather than verified fact.</p>
            <Link href="/map" className="group mt-10 inline-flex items-center gap-3 border-b border-foreground pb-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-accent-signal hover:border-accent-signal">
              Enter the system
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>ATIS / First public chapter</span>
          <span>Illustrative concept · 2026</span>
        </div>
      </footer>
    </main>
  )
}
