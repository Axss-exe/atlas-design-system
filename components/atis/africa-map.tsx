'use client'

import { geoMercator, geoPath } from 'd3-geo'
import { useMemo, useRef, useState } from 'react'
import africaGeo from '@/lib/atis/africa-geo.json'
import { COUNTRY_FACTS } from '@/lib/atis/countries'

type GeoFeature = {
  type: 'Feature'
  id: string
  properties: { name: string }
  geometry: GeoJSON.Geometry
}

const FC = africaGeo as unknown as {
  type: 'FeatureCollection'
  features: GeoFeature[]
}

const WIDTH = 800
const HEIGHT = 840

export function AfricaMap({
  selectedId,
  onSelect,
  onEnter,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
  onEnter: (id: string) => void
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { projection, path, paths } = useMemo(() => {
    const projection = geoMercator().fitExtent(
      [
        [24, 16],
        [WIDTH - 24, HEIGHT - 16],
      ],
      FC as unknown as GeoJSON.FeatureCollection,
    )
    const path = geoPath(projection)
    const paths = FC.features.map((f) => ({
      id: f.id,
      name: COUNTRY_FACTS[f.id]?.name ?? f.properties.name,
      d: path(f as unknown as GeoJSON.Feature) ?? '',
      centroid: path.centroid(f as unknown as GeoJSON.Feature),
    }))
    return { projection, path, paths }
  }, [])

  // Gentle zoom toward the selected country
  const transform = useMemo(() => {
    if (!selectedId) return undefined
    const target = paths.find((p) => p.id === selectedId)
    if (!target) return undefined
    const [px, py] = target.centroid
    const s = 1.7
    const cx = WIDTH / 2
    const cy = HEIGHT / 2.15
    return `translate(${cx} ${cy}) scale(${s}) translate(${-px} ${-py})`
  }, [selectedId, paths])

  function handleMove(e: React.MouseEvent, name: string) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, name })
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-full max-h-full w-auto max-w-full"
        role="img"
        aria-label="Interactive map of Africa. Select a country to open its intelligence record."
      >
        <g
          style={{
            transform,
            transformOrigin: '0 0',
            transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {paths.map((p) => {
            const isHovered = hoveredId === p.id
            const isSelected = selectedId === p.id
            const dim = selectedId && !isSelected
            return (
              <path
                key={p.id}
                d={p.d}
                role="button"
                tabIndex={0}
                aria-label={p.name}
                onMouseEnter={(e) => {
                  setHoveredId(p.id)
                  handleMove(e, p.name)
                }}
                onMouseMove={(e) => handleMove(e, p.name)}
                onMouseLeave={() => {
                  setHoveredId(null)
                  setTooltip(null)
                }}
                onClick={() => onSelect(p.id)}
                onDoubleClick={() => onEnter(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect(p.id)
                  }
                }}
                fill={
                  isSelected
                    ? '#000000'
                    : isHovered
                      ? '#d1d5db'
                      : '#f0f1f2'
                }
                stroke={isSelected || isHovered ? '#000000' : '#ffffff'}
                strokeWidth={isSelected ? 0.6 : isHovered ? 0.9 : 0.8}
                style={{
                  cursor: 'pointer',
                  opacity: dim ? 0.35 : 1,
                  transition:
                    'fill 280ms ease, opacity 500ms ease, stroke 200ms ease',
                  outline: 'none',
                  vectorEffect: 'non-scaling-stroke',
                }}
              />
            )
          })}
        </g>
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-md border border-border bg-popover px-3 py-1.5 text-xs font-medium tracking-tight text-popover-foreground shadow-sm"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  )
}
