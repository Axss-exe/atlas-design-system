import { COUNTRY_FACTS, getCountry } from './countries'
import type { Entity, EntityType } from './types'

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function eid(countryId: string, name: string): string {
  return `${countryId}:${slug(name)}`
}

// ---------------------------------------------------------------------------
// Curated, high-detail entity sets for flagship countries
// ---------------------------------------------------------------------------

const CURATED: Record<string, Entity[]> = {
  // Zimbabwe — built around the lithium / Masvingo / Chinese-ownership thesis
  '716': [
    {
      id: '716:masvingo-province',
      countryId: '716',
      name: 'Masvingo Province',
      type: 'Region',
      summary:
        'A south-eastern province at the centre of Zimbabwe’s lithium boom, home to the Bikita pegmatite field — one of the oldest known lithium deposits in the world.',
      keyFacts: [
        { label: 'Provincial Capital', value: 'Masvingo' },
        { label: 'Primary Resource', value: 'Lithium (Petalite)' },
        { label: 'Notable Site', value: 'Bikita Pegmatites' },
        { label: 'Secondary Resources', value: 'Gold, Chrome' },
      ],
      relationships: [
        { label: 'Hosts', targetName: 'Bikita Minerals', targetId: '716:bikita-minerals' },
        { label: 'Regulated By', targetName: 'Ministry of Mines & Mining Development', targetId: '716:ministry-of-mines' },
      ],
      relatedIds: ['716:bikita-minerals', '716:lithium'],
    },
    {
      id: '716:bikita-minerals',
      countryId: '716',
      name: 'Bikita Minerals',
      type: 'Company',
      summary:
        'Zimbabwe’s flagship lithium producer in Masvingo, acquired by China’s Sinomine Resource Group. Operates one of Africa’s largest lithium concentrate plants.',
      keyFacts: [
        { label: 'Beneficial Owner', value: 'Sinomine Resource Group (China)' },
        { label: 'Mineral', value: 'Lithium — Petalite & Spodumene' },
        { label: 'Location', value: 'Bikita, Masvingo Province' },
        { label: 'Status', value: 'Operating' },
      ],
      relationships: [
        { label: 'Located In', targetName: 'Masvingo Province', targetId: '716:masvingo-province' },
        { label: 'Regulated By', targetName: 'Ministry of Mines & Mining Development', targetId: '716:ministry-of-mines' },
        { label: 'Subject To', targetName: 'Base Minerals Export Control Order', targetId: '716:lithium-export-ban' },
      ],
      relatedDocuments: [
        { title: 'Sinomine Acquisition Filing', meta: 'Corporate registry · 2022' },
        { title: 'Bikita Expansion Environmental Assessment', meta: 'EMA · 2023' },
      ],
      relatedLaws: ['716:lithium-export-ban', '716:mines-minerals-act'],
      relatedProjects: ['716:sandawana-lithium'],
      relatedIds: ['716:masvingo-province', '716:lithium', '716:arcadia'],
    },
    {
      id: '716:arcadia',
      countryId: '716',
      name: 'Arcadia Lithium Mine',
      type: 'Company',
      summary:
        'A hard-rock spodumene operation near Harare owned by China’s Huayou Cobalt, supplying lithium concentrate into the battery supply chain.',
      keyFacts: [
        { label: 'Beneficial Owner', value: 'Zhejiang Huayou Cobalt (China)' },
        { label: 'Mineral', value: 'Lithium — Spodumene' },
        { label: 'Location', value: 'Goromonzi, Mashonaland East' },
        { label: 'Status', value: 'Operating' },
      ],
      relationships: [
        { label: 'Regulated By', targetName: 'Ministry of Mines & Mining Development', targetId: '716:ministry-of-mines' },
        { label: 'Subject To', targetName: 'Base Minerals Export Control Order', targetId: '716:lithium-export-ban' },
      ],
      relatedLaws: ['716:lithium-export-ban'],
      relatedIds: ['716:bikita-minerals', '716:lithium'],
    },
    {
      id: '716:sandawana-lithium',
      countryId: '716',
      name: 'Sandawana Lithium Project',
      type: 'Project',
      summary:
        'A redevelopment of the historic Sandawana emerald mines into a lithium operation, led by the state-linked Kuvimba Mining House.',
      keyFacts: [
        { label: 'Operator', value: 'Kuvimba Mining House' },
        { label: 'Region', value: 'Mberengwa, Midlands' },
        { label: 'Stage', value: 'Development' },
        { label: 'Target Mineral', value: 'Lithium' },
      ],
      relationships: [
        { label: 'Regulated By', targetName: 'Ministry of Mines & Mining Development', targetId: '716:ministry-of-mines' },
      ],
      relatedIds: ['716:lithium', '716:bikita-minerals'],
    },
    {
      id: '716:ministry-of-mines',
      countryId: '716',
      name: 'Ministry of Mines & Mining Development',
      type: 'Regulator',
      summary:
        'The principal authority governing mineral rights, licensing, and the enforcement of beneficiation policy across Zimbabwe’s mining sector.',
      keyFacts: [
        { label: 'Type', value: 'Government Ministry' },
        { label: 'Mandate', value: 'Licensing, Mineral Policy, Beneficiation' },
        { label: 'Seat', value: 'Harare' },
      ],
      relationships: [
        { label: 'Oversees', targetName: 'Bikita Minerals', targetId: '716:bikita-minerals' },
        { label: 'Oversees', targetName: 'Arcadia Lithium Mine', targetId: '716:arcadia' },
        { label: 'Administers', targetName: 'Mines and Minerals Act', targetId: '716:mines-minerals-act' },
      ],
      relatedIds: ['716:zmdc', '716:mines-minerals-act'],
    },
    {
      id: '716:zmdc',
      countryId: '716',
      name: 'Zimbabwe Mining Development Corporation',
      type: 'Regulator',
      summary:
        'The state mining company holding equity in strategic deposits and partnering with foreign investors on joint ventures.',
      keyFacts: [
        { label: 'Type', value: 'State-Owned Enterprise' },
        { label: 'Role', value: 'State Equity & Joint Ventures' },
      ],
      relationships: [
        { label: 'Reports To', targetName: 'Ministry of Mines & Mining Development', targetId: '716:ministry-of-mines' },
      ],
      relatedIds: ['716:ministry-of-mines'],
    },
    {
      id: '716:lithium-export-ban',
      countryId: '716',
      name: 'Base Minerals Export Control Order',
      type: 'Law',
      summary:
        'A 2022 instrument banning the export of unprocessed lithium ore, designed to force domestic beneficiation and capture more value onshore.',
      keyFacts: [
        { label: 'Enacted', value: '2022' },
        { label: 'Effect', value: 'Bans raw lithium ore exports' },
        { label: 'Objective', value: 'Domestic beneficiation' },
      ],
      relationships: [
        { label: 'Administered By', targetName: 'Ministry of Mines & Mining Development', targetId: '716:ministry-of-mines' },
        { label: 'Constrains', targetName: 'Bikita Minerals', targetId: '716:bikita-minerals' },
      ],
      relatedIds: ['716:lithium', '716:bikita-minerals'],
    },
    {
      id: '716:mines-minerals-act',
      countryId: '716',
      name: 'Mines and Minerals Act',
      type: 'Law',
      summary:
        'The foundational legislation governing the acquisition of mining rights, claims, and special mining leases in Zimbabwe.',
      keyFacts: [
        { label: 'Domain', value: 'Mineral Rights & Tenure' },
        { label: 'Instrument', value: 'Primary Mining Statute' },
      ],
      relationships: [
        { label: 'Administered By', targetName: 'Ministry of Mines & Mining Development', targetId: '716:ministry-of-mines' },
        { label: 'Enables', targetName: 'Special Mining Lease', targetId: '716:special-mining-lease' },
      ],
      relatedIds: ['716:special-mining-lease'],
    },
    {
      id: '716:special-mining-lease',
      countryId: '716',
      name: 'Special Mining Lease',
      type: 'Permit',
      summary:
        'A premium tenure granted to large-scale, export-oriented operations, offering enhanced security of title for major investors.',
      keyFacts: [
        { label: 'Granting Law', value: 'Mines and Minerals Act' },
        { label: 'Applies To', value: 'Large-scale exporters' },
      ],
      relationships: [
        { label: 'Granted Under', targetName: 'Mines and Minerals Act', targetId: '716:mines-minerals-act' },
      ],
      relatedIds: ['716:mines-minerals-act'],
    },
    {
      id: '716:lithium',
      countryId: '716',
      name: 'Lithium',
      type: 'Resource',
      summary:
        'Zimbabwe holds Africa’s largest lithium reserves. Petalite and spodumene from the Bikita and Arcadia deposits feed global battery supply chains, increasingly under Chinese ownership.',
      keyFacts: [
        { label: 'Reserves Rank', value: 'Largest in Africa' },
        { label: 'Forms', value: 'Petalite, Spodumene' },
        { label: 'Key Buyers', value: 'Chinese processors' },
      ],
      relationships: [
        { label: 'Produced By', targetName: 'Bikita Minerals', targetId: '716:bikita-minerals' },
        { label: 'Produced By', targetName: 'Arcadia Lithium Mine', targetId: '716:arcadia' },
        { label: 'Governed By', targetName: 'Base Minerals Export Control Order', targetId: '716:lithium-export-ban' },
      ],
      relatedIds: ['716:bikita-minerals', '716:arcadia', '716:lithium-export-ban'],
    },
    {
      id: '716:beitbridge-rail',
      countryId: '716',
      name: 'Beitbridge–Harare Railway',
      type: 'Infrastructure',
      summary:
        'The primary rail artery connecting Zimbabwe’s mineral belts to the South African border at Beitbridge and onward to export ports.',
      keyFacts: [
        { label: 'Operator', value: 'National Railways of Zimbabwe' },
        { label: 'Role', value: 'Mineral export logistics' },
        { label: 'Connects', value: 'Harare ↔ Beitbridge' },
      ],
      relationships: [
        { label: 'Serves', targetName: 'Masvingo Province', targetId: '716:masvingo-province' },
      ],
      relatedIds: ['716:masvingo-province'],
    },
  ],

  // DRC — cobalt / copper critical minerals
  '180': [
    {
      id: '180:katanga-copperbelt',
      countryId: '180',
      name: 'Katanga Copperbelt',
      type: 'Region',
      summary:
        'The mineral-rich south-eastern region that produces the bulk of the world’s cobalt and a major share of African copper.',
      keyFacts: [
        { label: 'Hub City', value: 'Lubumbashi / Kolwezi' },
        { label: 'Primary Resources', value: 'Cobalt, Copper' },
        { label: 'Global Role', value: 'Dominant cobalt supply' },
      ],
      relationships: [
        { label: 'Hosts', targetName: 'Tenke Fungurume Mine', targetId: '180:tenke-fungurume' },
      ],
      relatedIds: ['180:tenke-fungurume', '180:cobalt'],
    },
    {
      id: '180:tenke-fungurume',
      countryId: '180',
      name: 'Tenke Fungurume Mine',
      type: 'Company',
      summary:
        'One of the world’s largest copper-cobalt operations, controlled by China Molybdenum (CMOC) in the Katanga Copperbelt.',
      keyFacts: [
        { label: 'Beneficial Owner', value: 'CMOC Group (China)' },
        { label: 'Minerals', value: 'Copper, Cobalt' },
        { label: 'Status', value: 'Operating' },
      ],
      relationships: [
        { label: 'Located In', targetName: 'Katanga Copperbelt', targetId: '180:katanga-copperbelt' },
        { label: 'Regulated By', targetName: 'Gécamines', targetId: '180:gecamines' },
      ],
      relatedIds: ['180:cobalt', '180:gecamines'],
    },
    {
      id: '180:gecamines',
      countryId: '180',
      name: 'Gécamines',
      type: 'Regulator',
      summary:
        'The DRC’s state mining enterprise, holding equity stakes across the copper-cobalt belt and partnering with foreign operators.',
      keyFacts: [
        { label: 'Type', value: 'State-Owned Enterprise' },
        { label: 'Role', value: 'State equity, joint ventures' },
      ],
      relationships: [
        { label: 'Partners With', targetName: 'Tenke Fungurume Mine', targetId: '180:tenke-fungurume' },
      ],
      relatedIds: ['180:tenke-fungurume'],
    },
    {
      id: '180:mining-code',
      countryId: '180',
      name: 'DRC Mining Code (2018 Revision)',
      type: 'Law',
      summary:
        'The revised code raising royalties on strategic minerals — including cobalt — and increasing state participation in mining ventures.',
      keyFacts: [
        { label: 'Revised', value: '2018' },
        { label: 'Effect', value: 'Higher royalties on strategic minerals' },
      ],
      relationships: [
        { label: 'Affects', targetName: 'Tenke Fungurume Mine', targetId: '180:tenke-fungurume' },
      ],
      relatedIds: ['180:cobalt'],
    },
    {
      id: '180:cobalt',
      countryId: '180',
      name: 'Cobalt',
      type: 'Resource',
      summary:
        'The DRC supplies the majority of the world’s mined cobalt, a critical input for lithium-ion batteries, concentrated in the Katanga Copperbelt.',
      keyFacts: [
        { label: 'Global Share', value: 'Majority of world supply' },
        { label: 'Use', value: 'EV battery cathodes' },
        { label: 'Region', value: 'Katanga Copperbelt' },
      ],
      relationships: [
        { label: 'Produced By', targetName: 'Tenke Fungurume Mine', targetId: '180:tenke-fungurume' },
      ],
      relatedIds: ['180:tenke-fungurume', '180:katanga-copperbelt'],
    },
    {
      id: '180:inga-dams',
      countryId: '180',
      name: 'Inga Dams Complex',
      type: 'Infrastructure',
      summary:
        'A vast hydropower complex on the Congo River with the potential to power mining operations and export electricity across the region.',
      keyFacts: [
        { label: 'River', value: 'Congo River' },
        { label: 'Potential', value: 'Continental-scale hydropower' },
      ],
      relationships: [
        { label: 'Could Power', targetName: 'Katanga Copperbelt', targetId: '180:katanga-copperbelt' },
      ],
      relatedIds: ['180:katanga-copperbelt'],
    },
  ],

  // Nigeria — oil, refining, fintech
  '566': [
    {
      id: '566:dangote-refinery',
      countryId: '566',
      name: 'Dangote Refinery',
      type: 'Project',
      summary:
        'The largest single-train refinery in the world, located in Lagos, designed to end Nigeria’s reliance on imported refined fuels.',
      keyFacts: [
        { label: 'Owner', value: 'Dangote Group' },
        { label: 'Capacity', value: '~650,000 bpd' },
        { label: 'Location', value: 'Lekki, Lagos' },
      ],
      relationships: [
        { label: 'Regulated By', targetName: 'NUPRC', targetId: '566:nuprc' },
        { label: 'Processes', targetName: 'Crude Oil', targetId: '566:crude-oil' },
      ],
      relatedIds: ['566:crude-oil', '566:nuprc'],
    },
    {
      id: '566:nnpc',
      countryId: '566',
      name: 'NNPC Limited',
      type: 'Company',
      summary:
        'The national oil company, commercialised under the Petroleum Industry Act, holding stakes across the upstream and downstream value chain.',
      keyFacts: [
        { label: 'Type', value: 'State-Owned (commercialised)' },
        { label: 'Sector', value: 'Oil & Gas' },
      ],
      relationships: [
        { label: 'Governed By', targetName: 'Petroleum Industry Act', targetId: '566:pia' },
      ],
      relatedIds: ['566:crude-oil', '566:pia'],
    },
    {
      id: '566:nuprc',
      countryId: '566',
      name: 'Nigerian Upstream Petroleum Regulatory Commission',
      type: 'Regulator',
      summary:
        'The upstream regulator created by the Petroleum Industry Act, responsible for licensing, royalties, and reserves oversight.',
      keyFacts: [
        { label: 'Type', value: 'Statutory Regulator' },
        { label: 'Domain', value: 'Upstream oil & gas' },
      ],
      relationships: [
        { label: 'Created By', targetName: 'Petroleum Industry Act', targetId: '566:pia' },
        { label: 'Regulates', targetName: 'Dangote Refinery', targetId: '566:dangote-refinery' },
      ],
      relatedIds: ['566:pia'],
    },
    {
      id: '566:pia',
      countryId: '566',
      name: 'Petroleum Industry Act',
      type: 'Law',
      summary:
        'Landmark 2021 legislation overhauling the fiscal and governance framework of Nigeria’s petroleum sector.',
      keyFacts: [
        { label: 'Enacted', value: '2021' },
        { label: 'Effect', value: 'Restructured oil-sector governance' },
      ],
      relationships: [
        { label: 'Established', targetName: 'NUPRC', targetId: '566:nuprc' },
      ],
      relatedIds: ['566:nuprc', '566:nnpc'],
    },
    {
      id: '566:lagos-tech',
      countryId: '566',
      name: 'Lagos Technology Corridor',
      type: 'Region',
      summary:
        'The Yaba–Lekki innovation belt of Lagos, home to Africa’s densest cluster of fintech unicorns and venture capital.',
      keyFacts: [
        { label: 'Hub', value: 'Yaba "Yabacon Valley"' },
        { label: 'Sector', value: 'Fintech, Software' },
      ],
      relationships: [],
      relatedIds: [],
    },
    {
      id: '566:crude-oil',
      countryId: '566',
      name: 'Crude Oil',
      type: 'Resource',
      summary:
        'Nigeria’s Bonny Light and Forcados grades anchor government revenue and exports, primarily from the Niger Delta.',
      keyFacts: [
        { label: 'Key Grades', value: 'Bonny Light, Forcados' },
        { label: 'Region', value: 'Niger Delta' },
      ],
      relationships: [
        { label: 'Refined By', targetName: 'Dangote Refinery', targetId: '566:dangote-refinery' },
      ],
      relatedIds: ['566:dangote-refinery', '566:nnpc'],
    },
  ],

  // South Africa — PGMs, finance
  '710': [
    {
      id: '710:bushveld-complex',
      countryId: '710',
      name: 'Bushveld Igneous Complex',
      type: 'Region',
      summary:
        'The world’s largest known reserve of platinum-group metals, stretching across the country’s northern provinces.',
      keyFacts: [
        { label: 'Resource', value: 'Platinum-Group Metals' },
        { label: 'Global Role', value: 'Largest PGM reserve' },
      ],
      relationships: [
        { label: 'Hosts', targetName: 'Anglo American Platinum', targetId: '710:amplats' },
      ],
      relatedIds: ['710:platinum', '710:amplats'],
    },
    {
      id: '710:amplats',
      countryId: '710',
      name: 'Anglo American Platinum',
      type: 'Company',
      summary:
        'The world’s largest primary producer of platinum, operating across the Bushveld Complex.',
      keyFacts: [
        { label: 'Listing', value: 'Johannesburg Stock Exchange' },
        { label: 'Minerals', value: 'Platinum, Palladium, Rhodium' },
      ],
      relationships: [
        { label: 'Located In', targetName: 'Bushveld Igneous Complex', targetId: '710:bushveld-complex' },
        { label: 'Regulated By', targetName: 'DMRE', targetId: '710:dmre' },
      ],
      relatedIds: ['710:platinum', '710:dmre'],
    },
    {
      id: '710:dmre',
      countryId: '710',
      name: 'Department of Mineral Resources & Energy',
      type: 'Regulator',
      summary:
        'The authority administering mining rights and the Mining Charter’s empowerment requirements.',
      keyFacts: [
        { label: 'Type', value: 'Government Department' },
        { label: 'Domain', value: 'Mining & Energy' },
      ],
      relationships: [
        { label: 'Administers', targetName: 'Mining Charter', targetId: '710:mining-charter' },
      ],
      relatedIds: ['710:mining-charter'],
    },
    {
      id: '710:mining-charter',
      countryId: '710',
      name: 'Mining Charter',
      type: 'Law',
      summary:
        'The framework mandating Black Economic Empowerment ownership and procurement thresholds in the mining sector.',
      keyFacts: [
        { label: 'Focus', value: 'BEE ownership thresholds' },
        { label: 'Domain', value: 'Mining transformation' },
      ],
      relationships: [
        { label: 'Administered By', targetName: 'DMRE', targetId: '710:dmre' },
      ],
      relatedIds: ['710:dmre'],
    },
    {
      id: '710:jse',
      countryId: '710',
      name: 'Johannesburg Stock Exchange',
      type: 'Infrastructure',
      summary:
        'Africa’s largest and most liquid stock exchange and the financial gateway to the continent’s capital markets.',
      keyFacts: [
        { label: 'Rank', value: 'Largest exchange in Africa' },
        { label: 'Location', value: 'Sandton, Johannesburg' },
      ],
      relationships: [
        { label: 'Lists', targetName: 'Anglo American Platinum', targetId: '710:amplats' },
      ],
      relatedIds: ['710:amplats'],
    },
    {
      id: '710:platinum',
      countryId: '710',
      name: 'Platinum',
      type: 'Resource',
      summary:
        'South Africa supplies the majority of the world’s platinum, central to autocatalysts and emerging hydrogen technologies.',
      keyFacts: [
        { label: 'Global Share', value: 'Majority of world supply' },
        { label: 'Use', value: 'Autocatalysts, hydrogen' },
      ],
      relationships: [
        { label: 'Produced By', targetName: 'Anglo American Platinum', targetId: '710:amplats' },
      ],
      relatedIds: ['710:amplats', '710:bushveld-complex'],
    },
  ],

  // Kenya — services, fintech, geothermal
  '404': [
    {
      id: '404:nairobi-hub',
      countryId: '404',
      name: 'Nairobi Innovation Hub',
      type: 'Region',
      summary:
        'East Africa’s commercial capital and the heart of the “Silicon Savannah” technology ecosystem.',
      keyFacts: [
        { label: 'Nickname', value: 'Silicon Savannah' },
        { label: 'Sectors', value: 'Fintech, Services' },
      ],
      relationships: [
        { label: 'Hosts', targetName: 'Safaricom', targetId: '404:safaricom' },
      ],
      relatedIds: ['404:safaricom'],
    },
    {
      id: '404:safaricom',
      countryId: '404',
      name: 'Safaricom',
      type: 'Company',
      summary:
        'Kenya’s largest telecom and the operator of M-Pesa, the mobile-money platform that redefined African financial inclusion.',
      keyFacts: [
        { label: 'Flagship', value: 'M-Pesa mobile money' },
        { label: 'Listing', value: 'Nairobi Securities Exchange' },
      ],
      relationships: [
        { label: 'Regulated By', targetName: 'Communications Authority of Kenya', targetId: '404:cak' },
      ],
      relatedIds: ['404:cak'],
    },
    {
      id: '404:cak',
      countryId: '404',
      name: 'Communications Authority of Kenya',
      type: 'Regulator',
      summary:
        'The regulator overseeing telecommunications, including mobile-money interoperability and licensing.',
      keyFacts: [
        { label: 'Type', value: 'Statutory Regulator' },
        { label: 'Domain', value: 'Telecoms & ICT' },
      ],
      relationships: [
        { label: 'Regulates', targetName: 'Safaricom', targetId: '404:safaricom' },
      ],
      relatedIds: ['404:safaricom'],
    },
    {
      id: '404:olkaria',
      countryId: '404',
      name: 'Olkaria Geothermal Project',
      type: 'Project',
      summary:
        'A major Rift Valley geothermal complex supplying a large share of Kenya’s renewable baseload power.',
      keyFacts: [
        { label: 'Operator', value: 'KenGen' },
        { label: 'Resource', value: 'Geothermal' },
        { label: 'Location', value: 'Rift Valley' },
      ],
      relationships: [
        { label: 'Produces', targetName: 'Geothermal Power', targetId: '404:geothermal' },
      ],
      relatedIds: ['404:geothermal'],
    },
    {
      id: '404:mombasa-port',
      countryId: '404',
      name: 'Port of Mombasa',
      type: 'Infrastructure',
      summary:
        'East Africa’s busiest port and the gateway serving Kenya, Uganda, and the wider Northern Corridor.',
      keyFacts: [
        { label: 'Role', value: 'Northern Corridor gateway' },
        { label: 'Operator', value: 'Kenya Ports Authority' },
      ],
      relationships: [],
      relatedIds: [],
    },
    {
      id: '404:geothermal',
      countryId: '404',
      name: 'Geothermal Power',
      type: 'Resource',
      summary:
        'The Rift Valley’s geothermal endowment provides Kenya with reliable, low-carbon baseload electricity.',
      keyFacts: [
        { label: 'Region', value: 'Great Rift Valley' },
        { label: 'Role', value: 'Renewable baseload' },
      ],
      relationships: [
        { label: 'Harnessed By', targetName: 'Olkaria Geothermal Project', targetId: '404:olkaria' },
      ],
      relatedIds: ['404:olkaria'],
    },
  ],
}

// ---------------------------------------------------------------------------
// Generator for all other countries
// ---------------------------------------------------------------------------

function generateEntities(countryId: string): Entity[] {
  const facts = COUNTRY_FACTS[countryId]
  if (!facts) return []
  const { name, capital, sectors, resources } = facts
  const primarySector = sectors[0] ?? 'Resources'
  const topResource = resources[0] ?? 'Minerals'

  const regulatorName = `${name} Ministry of Mines & Energy`
  const investmentAuthName = `${name} Investment Authority`
  const companyName = `${name} National ${primarySector.replace(/ &.*/, '')} Corporation`
  const projectName = `${topResource} Development Programme`
  const regionName = `${capital} Metropolitan Region`
  const lawName = `${name} Mining & Investment Code`
  const permitName = 'Strategic Resource Concession'
  const infraName = `${capital} International Gateway`

  const entities: Entity[] = [
    {
      id: eid(countryId, regionName),
      countryId,
      name: regionName,
      type: 'Region',
      summary: `The administrative and commercial heart of ${name}, centred on the capital ${capital} and its surrounding economic zone.`,
      keyFacts: [
        { label: 'Administrative Seat', value: capital },
        { label: 'Primary Sectors', value: sectors.slice(0, 2).join(', ') },
        { label: 'Region', value: facts.region },
      ],
      relationships: [
        { label: 'Hosts', targetName: companyName, targetId: eid(countryId, companyName) },
      ],
      relatedIds: [eid(countryId, companyName)],
    },
    {
      id: eid(countryId, companyName),
      countryId,
      name: companyName,
      type: 'Company',
      summary: `A leading enterprise in ${name}’s ${primarySector.toLowerCase()} sector, central to national export earnings.`,
      keyFacts: [
        { label: 'Sector', value: primarySector },
        { label: 'Headquarters', value: capital },
        { label: 'Primary Output', value: topResource },
      ],
      relationships: [
        { label: 'Regulated By', targetName: regulatorName, targetId: eid(countryId, regulatorName) },
        { label: 'Located In', targetName: regionName, targetId: eid(countryId, regionName) },
      ],
      relatedIds: [eid(countryId, regulatorName), eid(countryId, topResource)],
    },
    {
      id: eid(countryId, projectName),
      countryId,
      name: projectName,
      type: 'Project',
      summary: `A flagship initiative to expand ${name}’s ${topResource.toLowerCase()} output and downstream processing capacity.`,
      keyFacts: [
        { label: 'Target Resource', value: topResource },
        { label: 'Stage', value: 'Development' },
        { label: 'Location', value: capital },
      ],
      relationships: [
        { label: 'Overseen By', targetName: investmentAuthName, targetId: eid(countryId, investmentAuthName) },
      ],
      relatedIds: [eid(countryId, topResource)],
    },
    {
      id: eid(countryId, regulatorName),
      countryId,
      name: regulatorName,
      type: 'Regulator',
      summary: `The principal authority licensing resource extraction and energy projects across ${name}.`,
      keyFacts: [
        { label: 'Type', value: 'Government Ministry' },
        { label: 'Domain', value: 'Mining & Energy' },
        { label: 'Seat', value: capital },
      ],
      relationships: [
        { label: 'Administers', targetName: lawName, targetId: eid(countryId, lawName) },
        { label: 'Oversees', targetName: companyName, targetId: eid(countryId, companyName) },
      ],
      relatedIds: [eid(countryId, lawName), eid(countryId, companyName)],
    },
    {
      id: eid(countryId, investmentAuthName),
      countryId,
      name: investmentAuthName,
      type: 'Regulator',
      summary: `The agency promoting and screening foreign direct investment into ${name}.`,
      keyFacts: [
        { label: 'Type', value: 'Investment Promotion Agency' },
        { label: 'Mandate', value: 'FDI facilitation & screening' },
      ],
      relationships: [
        { label: 'Oversees', targetName: projectName, targetId: eid(countryId, projectName) },
      ],
      relatedIds: [eid(countryId, projectName)],
    },
    {
      id: eid(countryId, lawName),
      countryId,
      name: lawName,
      type: 'Law',
      summary: `The statutory framework governing mineral rights, royalties, and investment incentives in ${name}.`,
      keyFacts: [
        { label: 'Domain', value: 'Mining & Investment' },
        { label: 'Instrument', value: 'Primary resource statute' },
      ],
      relationships: [
        { label: 'Administered By', targetName: regulatorName, targetId: eid(countryId, regulatorName) },
        { label: 'Enables', targetName: permitName, targetId: eid(countryId, permitName) },
      ],
      relatedIds: [eid(countryId, regulatorName), eid(countryId, permitName)],
    },
    {
      id: eid(countryId, permitName),
      countryId,
      name: permitName,
      type: 'Permit',
      summary: `A licence granting rights to develop strategic resource assets under ${name}’s investment code.`,
      keyFacts: [
        { label: 'Granting Law', value: lawName },
        { label: 'Applies To', value: 'Large-scale investors' },
      ],
      relationships: [
        { label: 'Granted Under', targetName: lawName, targetId: eid(countryId, lawName) },
      ],
      relatedIds: [eid(countryId, lawName)],
    },
    {
      id: eid(countryId, infraName),
      countryId,
      name: infraName,
      type: 'Infrastructure',
      summary: `The principal logistics gateway connecting ${name}’s production centres to regional and global markets.`,
      keyFacts: [
        { label: 'Location', value: capital },
        { label: 'Role', value: 'Trade & export logistics' },
      ],
      relationships: [
        { label: 'Serves', targetName: regionName, targetId: eid(countryId, regionName) },
      ],
      relatedIds: [eid(countryId, regionName)],
    },
    ...resources.slice(0, 4).map<Entity>((res) => ({
      id: eid(countryId, res),
      countryId,
      name: res,
      type: 'Resource',
      summary: `${res} is among ${name}’s strategic resources, contributing to export earnings and industrial development.`,
      keyFacts: [
        { label: 'Country', value: name },
        { label: 'Class', value: 'Strategic Resource' },
      ],
      relationships: [
        { label: 'Produced By', targetName: companyName, targetId: eid(countryId, companyName) },
      ],
      relatedIds: [eid(countryId, companyName)],
    })),
  ]

  return entities
}

// ---------------------------------------------------------------------------
// Public access helpers
// ---------------------------------------------------------------------------

const _cache = new Map<string, Entity[]>()

export function getEntities(countryId: string): Entity[] {
  if (_cache.has(countryId)) return _cache.get(countryId)!
  const list = CURATED[countryId] ?? generateEntities(countryId)
  _cache.set(countryId, list)
  return list
}

export function getEntitiesByType(countryId: string, type: EntityType): Entity[] {
  return getEntities(countryId).filter((e) => e.type === type)
}

export function getEntity(entityId: string): Entity | undefined {
  const countryId = entityId.split(':')[0]
  return getEntities(countryId).find((e) => e.id === entityId)
}

export function isFlagship(countryId: string): boolean {
  return countryId in CURATED
}

export const ENTITY_TYPE_LABELS: Record<EntityType, string> = {
  Company: 'Company',
  Project: 'Project',
  Regulator: 'Regulator',
  Region: 'Region',
  Law: 'Law',
  Permit: 'Permit',
  Infrastructure: 'Infrastructure',
  Resource: 'Resource',
}

export { getCountry }
