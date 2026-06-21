'use client'

import { useCallback, useState } from 'react'
import { getCountry } from '@/lib/atis/countries'
import { getEntity } from '@/lib/atis/entities'
import { AboutView } from './about-view'
import { EntityView } from './entity-view'
import { LandingView } from './landing-view'
import { SearchView } from './search-view'
import { TopNav } from './top-nav'
import { WorkspaceView } from './workspace-view'

type View =
  | { name: 'landing' }
  | { name: 'about' }
  | { name: 'workspace'; countryId: string }
  | { name: 'entity'; entityId: string }
  | { name: 'search'; countryId: string | null }

export function AtisApp() {
  const [view, setView] = useState<View>({ name: 'landing' })
  // Track where the user came from so "Back" is sensible
  const [lastCountryId, setLastCountryId] = useState<string | null>(null)

  const goLanding = useCallback(() => setView({ name: 'landing' }), [])
  const goAbout = useCallback(() => setView({ name: 'about' }), [])

  const openCountry = useCallback((countryId: string) => {
    setLastCountryId(countryId)
    setView({ name: 'workspace', countryId })
    window.scrollTo({ top: 0 })
  }, [])

  const openEntity = useCallback((entityId: string) => {
    const e = getEntity(entityId)
    if (e) setLastCountryId(e.countryId)
    setView({ name: 'entity', entityId })
    window.scrollTo({ top: 0 })
  }, [])

  const openSearch = useCallback(
    (countryId: string | null) => {
      setView({ name: 'search', countryId: countryId ?? lastCountryId })
      window.scrollTo({ top: 0 })
    },
    [lastCountryId],
  )

  // Context label for the nav bar
  const context =
    view.name === 'workspace'
      ? getCountry(view.countryId)?.name
      : view.name === 'entity'
        ? getEntity(view.entityId)?.name
        : view.name === 'search'
          ? 'Intelligence search'
          : null

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav
        context={context}
        onHome={goLanding}
        onAbout={goAbout}
        onWorkspace={() => openSearch(lastCountryId)}
        onSearch={() => openSearch(lastCountryId)}
      />

      <main className="flex-1">
        {view.name === 'landing' && <LandingView onEnterCountry={openCountry} />}

        {view.name === 'about' && <AboutView onBack={goLanding} />}

        {view.name === 'workspace' && (
          <WorkspaceView
            countryId={view.countryId}
            onBack={goLanding}
            onOpenEntity={openEntity}
            onSearch={() => openSearch(view.countryId)}
          />
        )}

        {view.name === 'entity' && (
          <EntityView
            entityId={view.entityId}
            onBack={() => (lastCountryId ? openCountry(lastCountryId) : goLanding())}
            onOpenEntity={openEntity}
            onOpenCountry={openCountry}
          />
        )}

        {view.name === 'search' && (
          <SearchView
            countryId={view.countryId}
            onBack={() => (lastCountryId ? openCountry(lastCountryId) : goLanding())}
            onOpenCountry={openCountry}
          />
        )}
      </main>

      <footer className="border-t border-border px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            ATIS — Analytical Trade Intelligence System
          </span>
          <span className="text-[11px] text-muted-foreground">
            Illustrative dataset · 50 nations mapped
          </span>
        </div>
      </footer>
    </div>
  )
}
