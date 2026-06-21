import { getCountry } from './countries'
import { getEntities } from './entities'
import type { Entity, IntelligenceReport, ReportTag, Relationship } from './types'

const RELATION_KEYWORDS: { match: RegExp; label: string }[] = [
  { match: /chinese|china/i, label: 'Chinese Ownership' },
  { match: /own(ed|ership)?/i, label: 'Ownership' },
  { match: /regulat/i, label: 'Regulated By' },
  { match: /export|ban/i, label: 'Export Controls' },
  { match: /invest/i, label: 'Investment Climate' },
  { match: /licen[cs]e|permit/i, label: 'Licensing' },
  { match: /process|benefici/i, label: 'Beneficiation' },
]

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase())
}

export function buildReport(countryId: string, query: string): IntelligenceReport {
  const country = getCountry(countryId)
  const entities = getEntities(countryId)
  const q = query.trim()
  const lower = q.toLowerCase()

  // Match entities and resources mentioned in the query
  const matchedEntities = entities.filter((e) =>
    lower.includes(e.name.toLowerCase()) ||
    e.name.toLowerCase().split(/\s+/).some((w) => w.length > 4 && lower.includes(w)),
  )

  const matchedResources = (country?.resources ?? []).filter((r) =>
    lower.includes(r.toLowerCase()),
  )

  // Build the retrieval plan tags (editorial labels)
  const tags: ReportTag[] = []
  if (country) tags.push({ label: country.name, kind: 'place' })

  // Region tags from matched region entities
  const regionTags = matchedEntities
    .filter((e) => e.type === 'Region')
    .slice(0, 2)
  for (const r of regionTags) tags.push({ label: r.name, kind: 'place' })

  const resourceTags = matchedResources.length
    ? matchedResources
    : (country?.resources ?? []).slice(0, 1)
  for (const r of resourceTags.slice(0, 2)) tags.push({ label: r, kind: 'resource' })

  for (const e of matchedEntities.filter((e) => e.type === 'Company').slice(0, 2)) {
    tags.push({ label: e.name, kind: 'entity' })
  }

  for (const kw of RELATION_KEYWORDS) {
    if (kw.match.test(q)) {
      tags.push({ label: kw.label, kind: 'relation' })
      break
    }
  }

  // De-duplicate by label
  const seen = new Set<string>()
  const retrievalPlan = tags.filter((t) => {
    if (seen.has(t.label)) return false
    seen.add(t.label)
    return true
  })

  // Assemble relationships from matched entities (or notable defaults)
  const relPool = (matchedEntities.length ? matchedEntities : entities).flatMap(
    (e) => e.relationships.map((r) => ({ ...r })),
  )
  const relSeen = new Set<string>()
  const relationships: Relationship[] = relPool.filter((r) => {
    const key = `${r.label}|${r.targetName}`
    if (relSeen.has(key)) return false
    relSeen.add(key)
    return true
  }).slice(0, 6)

  // Findings sections
  const focusEntity: Entity | undefined =
    matchedEntities.find((e) => e.type === 'Company') ??
    matchedEntities.find((e) => e.type === 'Resource') ??
    matchedEntities[0]

  const interpretation = country
    ? `The system parsed this as an investigation into ${focusEntity ? `“${focusEntity.name}”` : resourceTags[0] ? `${resourceTags[0].toLowerCase()} assets` : 'strategic assets'} within ${country.name}${
        regionTags[0] ? `, focused on the ${regionTags[0].name}` : ''
      }. Retrieval was scoped to entities, ownership structures, regulators, and governing instruments most relevant to the query.`
    : 'The system could not resolve a country context for this query.'

  const findings = []

  findings.push({
    heading: 'Overview',
    body: country
      ? `${country.overview} The query "${q}" maps onto ${matchedEntities.length || 'several'} indexed entities across ${country.name}'s intelligence record.`
      : `No country context was available for "${q}".`,
  })

  if (focusEntity) {
    findings.push({
      heading: focusEntity.name,
      body:
        `${focusEntity.summary} ` +
        focusEntity.keyFacts.map((k) => `**${k.label}:** ${k.value}.`).join(' '),
    })
  }

  if (resourceTags.length) {
    findings.push({
      heading: 'Strategic Resources',
      body: `The investigation centres on **${resourceTags
        .map(titleCase)
        .join('**, **')}**. ${
        country
          ? `These sit within ${country.name}'s broader endowment of ${country.resources
              .slice(0, 4)
              .join(', ')}.`
          : ''
      }`,
    })
  }

  const regulators = (matchedEntities.length ? matchedEntities : entities).filter(
    (e) => e.type === 'Regulator' || e.type === 'Law',
  )
  if (regulators.length) {
    findings.push({
      heading: 'Governance & Oversight',
      body:
        `Relevant oversight and legal instruments include ` +
        regulators
          .slice(0, 3)
          .map((r) => `**${r.name}**`)
          .join(', ') +
        `. These define the licensing, royalty, and beneficiation conditions that shape the opportunity.`,
    })
  }

  const sources = [
    { title: `${country?.name ?? 'Country'} Mineral & Investment Register`, meta: 'ATIS Index · Primary' },
    ...(focusEntity?.relatedDocuments ?? []),
    { title: 'Cross-border Ownership Disclosures', meta: 'Corporate registries' },
    { title: 'Sector Regulatory Bulletins', meta: 'Government gazettes' },
  ].slice(0, 5)

  const title = focusEntity
    ? `${focusEntity.name}: Intelligence Brief`
    : country
      ? `${country.name}: ${resourceTags[0] ? titleCase(resourceTags[0]) + ' ' : ''}Investigation`
      : 'Intelligence Investigation'

  return {
    title,
    query: q,
    interpretation,
    retrievalPlan,
    findings,
    relationships,
    sources,
  }
}

export const SAMPLE_QUERIES: Record<string, string[]> = {
  '716': [
    'Which lithium mines in Masvingo have Chinese ownership?',
    'How is raw lithium export regulated in Zimbabwe?',
    'Who controls the Bikita pegmatite field?',
  ],
  '180': [
    'Who owns the cobalt operations in the Katanga Copperbelt?',
    'How does the 2018 Mining Code affect copper royalties?',
  ],
  '566': [
    'What is the regulatory status of the Dangote Refinery?',
    'How did the Petroleum Industry Act restructure NNPC?',
  ],
  '710': [
    'Who are the major platinum producers in the Bushveld Complex?',
    'How does the Mining Charter affect foreign ownership?',
  ],
  '404': [
    'How is mobile money regulated in Kenya?',
    'What powers the Olkaria geothermal complex?',
  ],
}

export function getSampleQueries(countryId: string): string[] {
  if (SAMPLE_QUERIES[countryId]) return SAMPLE_QUERIES[countryId]
  const c = getCountry(countryId)
  if (!c) return []
  const r = c.resources[0] ?? 'resources'
  return [
    `Who controls ${r.toLowerCase()} production in ${c.name}?`,
    `How is foreign investment regulated in ${c.name}?`,
    `What strategic projects are underway in ${c.name}?`,
  ]
}
