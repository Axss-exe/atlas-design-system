export type EntityType =
  | 'Company'
  | 'Project'
  | 'Regulator'
  | 'Region'
  | 'Law'
  | 'Permit'
  | 'Infrastructure'
  | 'Resource'

export interface KeyFact {
  label: string
  value: string
}

export interface Relationship {
  label: string
  targetName: string
  targetId?: string
}

export interface RelatedDocument {
  title: string
  meta: string
}

export interface Entity {
  id: string
  countryId: string
  name: string
  type: EntityType
  summary: string
  keyFacts: KeyFact[]
  relationships: Relationship[]
  relatedDocuments?: RelatedDocument[]
  relatedLaws?: string[]
  relatedProjects?: string[]
  relatedIds?: string[]
}

export interface CountryFacts {
  id: string
  name: string
  capital: string
  population: string
  region: string
  summary: string
  sectors: string[]
  resources: string[]
  investmentClimate: string
  overview: string
}

export type WorkspaceCardKey =
  | 'economy'
  | 'government'
  | 'regions'
  | 'companies'
  | 'projects'
  | 'regulators'
  | 'permits'
  | 'infrastructure'
  | 'resources'
  | 'investment'

export interface ReportTag {
  label: string
  kind: 'place' | 'resource' | 'entity' | 'relation' | 'sector'
}

export interface ReportSection {
  heading: string
  body: string
}

export interface IntelligenceReport {
  title: string
  query: string
  interpretation: string
  retrievalPlan: ReportTag[]
  findings: ReportSection[]
  relationships: Relationship[]
  sources: RelatedDocument[]
}
