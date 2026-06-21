'use client'

import { ArrowUpRight } from 'lucide-react'
import type { Entity } from '@/lib/atis/types'
import { Pill } from './primitives'

const TYPE_TONE: Record<string, 'neutral' | 'accent' | 'watch'> = {
  Company: 'neutral',
  Project: 'accent',
  Regulator: 'neutral',
  Region: 'neutral',
  Law: 'neutral',
  Permit: 'watch',
  Infrastructure: 'neutral',
  Resource: 'accent',
}

export function EntityCard({
  entity,
  onOpen,
}: {
  entity: Entity
  onOpen: (id: string) => void
}) {
  return (
    <button
      onClick={() => onOpen(entity.id)}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-foreground hover:shadow-[0_2px_20px_-8px_rgba(0,0,0,0.15)]"
    >
      <div className="flex items-start justify-between gap-3">
        <Pill tone={TYPE_TONE[entity.type] ?? 'neutral'}>{entity.type}</Pill>
        <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
      <h3 className="font-serif text-xl leading-tight tracking-tight text-foreground">
        {entity.name}
      </h3>
      <p className="line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
        {entity.summary}
      </p>
      {entity.keyFacts.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3">
          {entity.keyFacts.slice(0, 2).map((f) => (
            <span key={f.label} className="text-[12px] text-muted-foreground">
              <span className="font-mono uppercase tracking-[0.1em] text-foreground/50">
                {f.label}:{' '}
              </span>
              <span className="text-foreground">{f.value}</span>
            </span>
          ))}
        </div>
      )}
    </button>
  )
}
