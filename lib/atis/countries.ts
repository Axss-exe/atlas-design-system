import type { CountryFacts } from './types'

// Keyed by the numeric geography id used in public/africa.geo.json
export const COUNTRY_FACTS: Record<string, CountryFacts> = {
  '12': {
    id: '12',
    name: 'Algeria',
    capital: 'Algiers',
    population: '45.6M',
    region: 'North Africa',
    summary:
      'The largest country in Africa by land area, anchored by vast Saharan hydrocarbon reserves and a state-led economy.',
    sectors: ['Hydrocarbons', 'Natural Gas', 'Agriculture', 'Construction'],
    resources: ['Crude Oil', 'Natural Gas', 'Iron Ore', 'Phosphates'],
    investmentClimate: 'State-controlled, opening selectively to foreign partners.',
    overview:
      'Algeria’s economy remains dominated by the state energy champion Sonatrach, with hydrocarbons providing the majority of export earnings. Recent reforms aim to diversify toward mining, renewables, and agriculture.',
  },
  '24': {
    id: '24',
    name: 'Angola',
    capital: 'Luanda',
    population: '35.6M',
    region: 'Central Africa',
    summary:
      'A major oil producer rebuilding its economy after decades of conflict, now courting diversified foreign investment.',
    sectors: ['Oil & Gas', 'Diamonds', 'Agriculture', 'Fisheries'],
    resources: ['Crude Oil', 'Diamonds', 'Iron Ore', 'Gold'],
    investmentClimate: 'Reform-minded, recovering from oil dependence.',
    overview:
      'Angola is sub-Saharan Africa’s second-largest oil producer. A privatisation programme and the Lobito Corridor rail link are reshaping its investment landscape.',
  },
  '204': {
    id: '204',
    name: 'Benin',
    capital: 'Porto-Novo',
    population: '13.4M',
    region: 'West Africa',
    summary:
      'A stable coastal economy built on cotton, port logistics, and regional trade through the Port of Cotonou.',
    sectors: ['Cotton', 'Port Logistics', 'Agriculture', 'Trade'],
    resources: ['Cotton', 'Cashew', 'Limestone', 'Gold'],
    investmentClimate: 'Open and improving, logistics-driven.',
    overview:
      'Benin serves as a trade gateway for the Sahel. The Glo-Djigbé Industrial Zone is driving a shift from raw cotton exports toward textile manufacturing.',
  },
  '72': {
    id: '72',
    name: 'Botswana',
    capital: 'Gaborone',
    population: '2.7M',
    region: 'Southern Africa',
    summary:
      'A diamond-rich, prudently governed economy widely regarded as one of Africa’s strongest credit profiles.',
    sectors: ['Diamonds', 'Mining', 'Tourism', 'Financial Services'],
    resources: ['Diamonds', 'Copper', 'Coal', 'Nickel'],
    investmentClimate: 'Highly stable, investment-grade governance.',
    overview:
      'Botswana’s partnership with De Beers through Debswana underpins public finances. Diversification efforts focus on copper, services, and high-value tourism.',
  },
  '854': {
    id: '854',
    name: 'Burkina Faso',
    capital: 'Ouagadougou',
    population: '23.3M',
    region: 'West Africa',
    summary:
      'A leading West African gold producer navigating security pressures across the Sahel.',
    sectors: ['Gold Mining', 'Cotton', 'Agriculture', 'Livestock'],
    resources: ['Gold', 'Zinc', 'Manganese', 'Cotton'],
    investmentClimate: 'Resource-rich but security-constrained.',
    overview:
      'Gold has overtaken cotton as Burkina Faso’s primary export. The sector is concentrated among foreign-listed miners operating across the central plateau.',
  },
  '108': {
    id: '108',
    name: 'Burundi',
    capital: 'Gitega',
    population: '12.9M',
    region: 'East Africa',
    summary:
      'A landlocked, agriculture-dependent economy with emerging nickel and rare-earth potential.',
    sectors: ['Agriculture', 'Coffee', 'Mining', 'Tea'],
    resources: ['Nickel', 'Rare Earths', 'Coffee', 'Tea'],
    investmentClimate: 'Frontier, early-stage mining interest.',
    overview:
      'Burundi’s economy is dominated by smallholder coffee and tea. The Musongati nickel deposit represents one of the world’s largest undeveloped reserves.',
  },
  '120': {
    id: '120',
    name: 'Cameroon',
    capital: 'Yaoundé',
    population: '28.6M',
    region: 'Central Africa',
    summary:
      'A diversified Central African economy and logistics hub serving landlocked neighbours via the Port of Douala.',
    sectors: ['Oil & Gas', 'Agriculture', 'Timber', 'Port Logistics'],
    resources: ['Crude Oil', 'Bauxite', 'Iron Ore', 'Cocoa'],
    investmentClimate: 'Diversified, regionally connected.',
    overview:
      'Often called “Africa in miniature,” Cameroon combines oil, cocoa, and timber exports with a strategic transit role for Chad and the Central African Republic.',
  },
  '140': {
    id: '140',
    name: 'Central African Republic',
    capital: 'Bangui',
    population: '5.6M',
    region: 'Central Africa',
    summary:
      'A resource-endowed but fragile state with significant diamond, gold, and timber reserves.',
    sectors: ['Diamonds', 'Gold', 'Timber', 'Agriculture'],
    resources: ['Diamonds', 'Gold', 'Uranium', 'Timber'],
    investmentClimate: 'High-risk frontier environment.',
    overview:
      'The Central African Republic holds substantial mineral wealth concentrated in alluvial diamond and gold fields, though development is constrained by instability.',
  },
  '148': {
    id: '148',
    name: 'Chad',
    capital: "N'Djamena",
    population: '17.7M',
    region: 'Central Africa',
    summary:
      'A landlocked oil producer dependent on the Chad–Cameroon pipeline for export access.',
    sectors: ['Oil', 'Livestock', 'Cotton', 'Agriculture'],
    resources: ['Crude Oil', 'Uranium', 'Gold', 'Natron'],
    investmentClimate: 'Oil-dependent frontier market.',
    overview:
      'Chad’s economy hinges on oil exported through Cameroon. Diversification toward agriculture and livestock remains an official priority.',
  },
  '178': {
    id: '178',
    name: 'Republic of the Congo',
    capital: 'Brazzaville',
    population: '6.1M',
    region: 'Central Africa',
    summary:
      'A heavily oil-reliant Central African economy with emerging potash and iron ore projects.',
    sectors: ['Oil & Gas', 'Timber', 'Mining', 'Agriculture'],
    resources: ['Crude Oil', 'Potash', 'Iron Ore', 'Timber'],
    investmentClimate: 'Oil-concentrated, diversifying slowly.',
    overview:
      'Congo-Brazzaville is among sub-Saharan Africa’s larger crude producers. New potash and iron ore ventures aim to broaden the resource base.',
  },
  '384': {
    id: '384',
    name: "Côte d'Ivoire",
    capital: 'Yamoussoukro',
    population: '28.9M',
    region: 'West Africa',
    summary:
      'The world’s largest cocoa producer and one of West Africa’s fastest-growing, most diversified economies.',
    sectors: ['Cocoa', 'Agriculture', 'Oil & Gas', 'Manufacturing'],
    resources: ['Cocoa', 'Gold', 'Crude Oil', 'Cashew'],
    investmentClimate: 'Fast-growing, increasingly attractive.',
    overview:
      'Côte d’Ivoire anchors the WAEMU economy. Beyond cocoa, gold mining and offshore gas discoveries are drawing significant foreign capital.',
  },
  '180': {
    id: '180',
    name: 'Democratic Republic of the Congo',
    capital: 'Kinshasa',
    population: '102M',
    region: 'Central Africa',
    summary:
      'The strategic heart of the global energy transition, holding the world’s dominant cobalt reserves and vast copper deposits.',
    sectors: ['Mining', 'Cobalt', 'Copper', 'Hydropower'],
    resources: ['Cobalt', 'Copper', 'Coltan', 'Diamonds', 'Gold'],
    investmentClimate: 'Critical minerals magnet, high complexity.',
    overview:
      'The DRC supplies the majority of the world’s cobalt and ranks among the top copper producers. Its Copperbelt is central to electric-vehicle supply chains, drawing intense Chinese and Western competition.',
  },
  '262': {
    id: '262',
    name: 'Djibouti',
    capital: 'Djibouti City',
    population: '1.1M',
    region: 'East Africa',
    summary:
      'A strategically located logistics and port state controlling access to the Bab-el-Mandeb strait.',
    sectors: ['Port Logistics', 'Shipping', 'Military Bases', 'Trade'],
    resources: ['Salt', 'Geothermal', 'Limestone', 'Gypsum'],
    investmentClimate: 'Logistics hub, geopolitically pivotal.',
    overview:
      'Djibouti’s economy is built on its deep-water ports serving landlocked Ethiopia and its hosting of multiple foreign military installations.',
  },
  '818': {
    id: '818',
    name: 'Egypt',
    capital: 'Cairo',
    population: '112M',
    region: 'North Africa',
    summary:
      'A continental heavyweight bridging Africa and the Middle East, anchored by the Suez Canal and a large industrial base.',
    sectors: ['Suez Canal Logistics', 'Natural Gas', 'Tourism', 'Manufacturing'],
    resources: ['Natural Gas', 'Crude Oil', 'Gold', 'Phosphates'],
    investmentClimate: 'Large market undergoing structural reform.',
    overview:
      'Egypt commands the Suez Canal trade artery and a major eastern Mediterranean gas province. Mega-projects and a new administrative capital define its current investment cycle.',
  },
  '226': {
    id: '226',
    name: 'Equatorial Guinea',
    capital: 'Malabo',
    population: '1.7M',
    region: 'Central Africa',
    summary:
      'A small, oil-and-gas-dependent state with one of the highest per-capita incomes in Africa.',
    sectors: ['Oil & Gas', 'LNG', 'Fishing', 'Timber'],
    resources: ['Crude Oil', 'Natural Gas', 'Timber', 'Gold'],
    investmentClimate: 'Hydrocarbon-dependent, narrow base.',
    overview:
      'Equatorial Guinea’s offshore oil and LNG underpin its economy. A “Gas Mega Hub” strategy aims to monetise regional gas through its Punta Europa facilities.',
  },
  '232': {
    id: '232',
    name: 'Eritrea',
    capital: 'Asmara',
    population: '3.7M',
    region: 'East Africa',
    summary:
      'A tightly controlled Red Sea state with significant gold, copper, and potash mining potential.',
    sectors: ['Mining', 'Agriculture', 'Fisheries', 'Ports'],
    resources: ['Gold', 'Copper', 'Zinc', 'Potash'],
    investmentClimate: 'Closed, selective mining ventures.',
    overview:
      'Eritrea’s Bisha mine demonstrated commercial viability of its mineral belt. The Colluli potash project targets a large, low-cost reserve near the Red Sea.',
  },
  '231': {
    id: '231',
    name: 'Ethiopia',
    capital: 'Addis Ababa',
    population: '126M',
    region: 'East Africa',
    summary:
      'Africa’s second most populous nation, pursuing state-led industrialisation and large-scale hydropower.',
    sectors: ['Agriculture', 'Manufacturing', 'Hydropower', 'Textiles'],
    resources: ['Hydropower', 'Gold', 'Coffee', 'Potash'],
    investmentClimate: 'Liberalising large frontier market.',
    overview:
      'Ethiopia’s Grand Ethiopian Renaissance Dam reshapes regional power markets. Recent liberalisation has opened telecoms and banking to foreign entrants.',
  },
  '266': {
    id: '266',
    name: 'Gabon',
    capital: 'Libreville',
    population: '2.4M',
    region: 'Central Africa',
    summary:
      'An oil and manganese producer with extensive rainforest and a pioneering carbon-credit strategy.',
    sectors: ['Oil', 'Manganese', 'Timber', 'Forestry'],
    resources: ['Crude Oil', 'Manganese', 'Timber', 'Gold'],
    investmentClimate: 'Resource-rich, forestry-forward.',
    overview:
      'Gabon is a top global manganese supplier via Moanda. Its forest conservation and timber-processing policies have become a continental model.',
  },
  '270': {
    id: '270',
    name: 'Gambia',
    capital: 'Banjul',
    population: '2.7M',
    region: 'West Africa',
    summary:
      'A small West African economy reliant on agriculture, tourism, and re-export trade.',
    sectors: ['Tourism', 'Agriculture', 'Groundnuts', 'Re-export Trade'],
    resources: ['Groundnuts', 'Fish', 'Ilmenite', 'Zircon'],
    investmentClimate: 'Small, tourism-led economy.',
    overview:
      'The Gambia’s economy centres on tourism along the Atlantic coast and groundnut exports, with mineral sands offering modest upside.',
  },
  '288': {
    id: '288',
    name: 'Ghana',
    capital: 'Accra',
    population: '34.1M',
    region: 'West Africa',
    summary:
      'A stable democracy and Africa’s largest gold producer, with growing oil and cocoa industries.',
    sectors: ['Gold Mining', 'Cocoa', 'Oil & Gas', 'Services'],
    resources: ['Gold', 'Crude Oil', 'Cocoa', 'Bauxite', 'Manganese'],
    investmentClimate: 'Open, stable, investor-friendly.',
    overview:
      'Ghana overtook South Africa as the continent’s top gold producer. Offshore oil at Jubilee and a robust cocoa sector diversify its export base.',
  },
  '324': {
    id: '324',
    name: 'Guinea',
    capital: 'Conakry',
    population: '14.2M',
    region: 'West Africa',
    summary:
      'Holder of the world’s largest bauxite reserves and the giant Simandou iron ore deposit.',
    sectors: ['Bauxite', 'Iron Ore', 'Gold', 'Agriculture'],
    resources: ['Bauxite', 'Iron Ore', 'Gold', 'Diamonds'],
    investmentClimate: 'Mineral superpower, infrastructure-led.',
    overview:
      'Guinea supplies a large share of global bauxite. The Simandou project — the world’s largest untapped high-grade iron ore reserve — is now under development with Chinese and Anglo-Australian backing.',
  },
  '624': {
    id: '624',
    name: 'Guinea-Bissau',
    capital: 'Bissau',
    population: '2.1M',
    region: 'West Africa',
    summary:
      'A small economy reliant on cashew exports with undeveloped bauxite and phosphate reserves.',
    sectors: ['Cashew', 'Agriculture', 'Fisheries', 'Mining'],
    resources: ['Cashew', 'Bauxite', 'Phosphates', 'Fish'],
    investmentClimate: 'Frontier, cashew-dependent.',
    overview:
      'Cashew nuts dominate Guinea-Bissau’s exports. Offshore fisheries and undeveloped bauxite reserves represent longer-term opportunities.',
  },
  '404': {
    id: '404',
    name: 'Kenya',
    capital: 'Nairobi',
    population: '55.1M',
    region: 'East Africa',
    summary:
      'East Africa’s commercial and technology hub, with a diversified services-led economy and the “Silicon Savannah.”',
    sectors: ['Services', 'Technology', 'Agriculture', 'Tourism', 'Finance'],
    resources: ['Tea', 'Coffee', 'Geothermal', 'Soda Ash', 'Titanium'],
    investmentClimate: 'Diversified, innovation-driven.',
    overview:
      'Kenya is the gateway to East Africa, home to a vibrant fintech ecosystem led by M-Pesa, a deep financial sector, and the region’s busiest port at Mombasa.',
  },
  '426': {
    id: '426',
    name: 'Lesotho',
    capital: 'Maseru',
    population: '2.3M',
    region: 'Southern Africa',
    summary:
      'A mountainous kingdom exporting water to South Africa and producing high-value diamonds and textiles.',
    sectors: ['Water Exports', 'Diamonds', 'Textiles', 'Agriculture'],
    resources: ['Water', 'Diamonds', 'Wool', 'Mohair'],
    investmentClimate: 'Niche exporter, water and gems.',
    overview:
      'Lesotho’s Highlands Water Project supplies South Africa’s industrial heartland. Its mines produce some of the world’s largest and most valuable diamonds.',
  },
  '430': {
    id: '430',
    name: 'Liberia',
    capital: 'Monrovia',
    population: '5.4M',
    region: 'West Africa',
    summary:
      'An iron ore and rubber economy rebuilding institutions and infrastructure after civil conflict.',
    sectors: ['Iron Ore', 'Rubber', 'Mining', 'Maritime Registry'],
    resources: ['Iron Ore', 'Gold', 'Rubber', 'Diamonds'],
    investmentClimate: 'Recovering resource economy.',
    overview:
      'Liberia hosts one of the world’s largest open ship registries. Iron ore concessions and rubber plantations anchor the formal export economy.',
  },
  '434': {
    id: '434',
    name: 'Libya',
    capital: 'Tripoli',
    population: '6.9M',
    region: 'North Africa',
    summary:
      'Holder of Africa’s largest proven oil reserves, with output recovering amid political fragmentation.',
    sectors: ['Oil & Gas', 'Petrochemicals', 'Construction', 'Trade'],
    resources: ['Crude Oil', 'Natural Gas', 'Gypsum', 'Iron Ore'],
    investmentClimate: 'High-reserve, politically fragmented.',
    overview:
      'Libya’s economy is almost entirely hydrocarbon-based. Reconstruction and stabilising oil production define the near-term investment outlook.',
  },
  '450': {
    id: '450',
    name: 'Madagascar',
    capital: 'Antananarivo',
    population: '30.3M',
    region: 'Southern Africa',
    summary:
      'An island economy rich in nickel, cobalt, graphite, and the world’s dominant vanilla supply.',
    sectors: ['Mining', 'Vanilla', 'Agriculture', 'Textiles'],
    resources: ['Nickel', 'Cobalt', 'Graphite', 'Vanilla', 'Ilmenite'],
    investmentClimate: 'Resource-rich island frontier.',
    overview:
      'Madagascar supplies most of the world’s vanilla and hosts major nickel-cobalt operations at Ambatovy, alongside growing graphite production for battery markets.',
  },
  '454': {
    id: '454',
    name: 'Malawi',
    capital: 'Lilongwe',
    population: '20.9M',
    region: 'Southern Africa',
    summary:
      'A landlocked agricultural economy with emerging rare-earth and uranium mining prospects.',
    sectors: ['Agriculture', 'Tobacco', 'Mining', 'Tea'],
    resources: ['Tobacco', 'Rare Earths', 'Uranium', 'Tea'],
    investmentClimate: 'Agriculture-led, mining-emerging.',
    overview:
      'Tobacco dominates Malawi’s exports. The Kangankunde rare-earth and Kayelekera uranium projects signal a pivot toward strategic minerals.',
  },
  '466': {
    id: '466',
    name: 'Mali',
    capital: 'Bamako',
    population: '23.3M',
    region: 'West Africa',
    summary:
      'A major Sahelian gold producer balancing mining wealth against persistent security challenges.',
    sectors: ['Gold Mining', 'Cotton', 'Agriculture', 'Livestock'],
    resources: ['Gold', 'Cotton', 'Lithium', 'Phosphates'],
    investmentClimate: 'Gold-rich, security-sensitive.',
    overview:
      'Mali ranks among Africa’s top gold producers. The Goulamina deposit is positioning the country as an emerging lithium supplier.',
  },
  '478': {
    id: '478',
    name: 'Mauritania',
    capital: 'Nouakchott',
    population: '4.9M',
    region: 'West Africa',
    summary:
      'An iron ore and fisheries economy emerging as a major gas and green-hydrogen frontier.',
    sectors: ['Iron Ore', 'Fisheries', 'Gold', 'Gas'],
    resources: ['Iron Ore', 'Gold', 'Natural Gas', 'Fish'],
    investmentClimate: 'Mining and green-energy frontier.',
    overview:
      'Mauritania’s SNIM iron ore exports anchor the economy. The cross-border GTA gas project and ambitious green-hydrogen plans define its future.',
  },
  '504': {
    id: '504',
    name: 'Morocco',
    capital: 'Rabat',
    population: '37.8M',
    region: 'North Africa',
    summary:
      'A diversified industrial hub holding the world’s largest phosphate reserves and a fast-growing automotive sector.',
    sectors: ['Phosphates', 'Automotive', 'Aerospace', 'Tourism', 'Renewables'],
    resources: ['Phosphates', 'Phosphoric Acid', 'Silver', 'Cobalt'],
    investmentClimate: 'Stable, industrial, export-oriented.',
    overview:
      'Morocco controls roughly three-quarters of global phosphate reserves through OCP Group. It has built Africa’s leading automotive manufacturing base and major solar capacity at Noor Ouarzazate.',
  },
  '508': {
    id: '508',
    name: 'Mozambique',
    capital: 'Maputo',
    population: '33.9M',
    region: 'Southern Africa',
    summary:
      'A coal, gas, and aluminium economy poised for transformation by world-scale LNG developments.',
    sectors: ['Natural Gas', 'Coal', 'Aluminium', 'Agriculture'],
    resources: ['Natural Gas', 'Coal', 'Graphite', 'Heavy Sands', 'Aluminium'],
    investmentClimate: 'LNG-driven, high-potential.',
    overview:
      'Mozambique’s Rovuma Basin holds some of the largest gas discoveries of the past decade. Major LNG projects led by TotalEnergies and ENI are reshaping the economy.',
  },
  '516': {
    id: '516',
    name: 'Namibia',
    capital: 'Windhoek',
    population: '2.6M',
    region: 'Southern Africa',
    summary:
      'A uranium and diamond producer emerging as a green-hydrogen and offshore-oil frontier.',
    sectors: ['Uranium', 'Diamonds', 'Mining', 'Green Hydrogen'],
    resources: ['Uranium', 'Diamonds', 'Lithium', 'Crude Oil', 'Copper'],
    investmentClimate: 'Stable, energy-transition frontier.',
    overview:
      'Namibia is among the world’s top uranium producers. Recent Orange Basin oil discoveries and large green-hydrogen plans have made it a frontier of intense interest.',
  },
  '562': {
    id: '562',
    name: 'Niger',
    capital: 'Niamey',
    population: '26.2M',
    region: 'West Africa',
    summary:
      'A landlocked Sahelian state that is a globally significant uranium supplier with growing oil output.',
    sectors: ['Uranium', 'Oil', 'Agriculture', 'Livestock'],
    resources: ['Uranium', 'Crude Oil', 'Gold', 'Coal'],
    investmentClimate: 'Strategic minerals, security-sensitive.',
    overview:
      'Niger has long been a key uranium supplier to European reactors. A new export pipeline to Benin is expanding its role as a crude oil producer.',
  },
  '566': {
    id: '566',
    name: 'Nigeria',
    capital: 'Abuja',
    population: '223M',
    region: 'West Africa',
    summary:
      'Africa’s most populous nation and largest economy, anchored by oil and gas alongside a booming tech and entertainment sector.',
    sectors: ['Oil & Gas', 'Financial Services', 'Technology', 'Agriculture', 'Entertainment'],
    resources: ['Crude Oil', 'Natural Gas', 'Tin', 'Limestone', 'Lead-Zinc'],
    investmentClimate: 'Vast market, reform-dependent.',
    overview:
      'Nigeria is the continent’s demographic and economic giant. Its Dangote Refinery, deep capital markets, and thriving fintech and Nollywood industries define a complex, high-potential economy.',
  },
  '646': {
    id: '646',
    name: 'Rwanda',
    capital: 'Kigali',
    population: '13.8M',
    region: 'East Africa',
    summary:
      'A small, well-governed economy positioning itself as a regional services, conference, and logistics hub.',
    sectors: ['Services', 'Tourism', 'Mining', 'Conferences', 'ICT'],
    resources: ['Tin', 'Tantalum', 'Tungsten', 'Gold', 'Coffee'],
    investmentClimate: 'Business-friendly, well-administered.',
    overview:
      'Rwanda has built a reputation for ease of doing business and clean administration. It is a significant refiner and trading point for tantalum and other 3T minerals.',
  },
  '728': {
    id: '728',
    name: 'South Sudan',
    capital: 'Juba',
    population: '11.1M',
    region: 'East Africa',
    summary:
      'The world’s youngest nation, almost entirely dependent on crude oil exported through Sudan.',
    sectors: ['Oil', 'Agriculture', 'Livestock', 'Construction'],
    resources: ['Crude Oil', 'Gold', 'Timber', 'Limestone'],
    investmentClimate: 'High-risk, oil-dependent.',
    overview:
      'South Sudan’s economy is overwhelmingly reliant on oil shipped via pipelines through Sudan to Port Sudan, leaving it exposed to regional stability.',
  },
  '686': {
    id: '686',
    name: 'Senegal',
    capital: 'Dakar',
    population: '17.7M',
    region: 'West Africa',
    summary:
      'A stable democracy becoming a major oil and gas producer while sustaining a diversified service economy.',
    sectors: ['Oil & Gas', 'Fisheries', 'Agriculture', 'Services', 'Phosphates'],
    resources: ['Crude Oil', 'Natural Gas', 'Phosphates', 'Gold', 'Zircon'],
    investmentClimate: 'Stable, energy-emerging.',
    overview:
      'Senegal’s Sangomar oil field and the cross-border GTA gas project mark its entry into hydrocarbon production, complementing a robust services and fisheries economy.',
  },
  '694': {
    id: '694',
    name: 'Sierra Leone',
    capital: 'Freetown',
    population: '8.6M',
    region: 'West Africa',
    summary:
      'A mineral economy built on iron ore, diamonds, and rutile, rebuilding after conflict and Ebola.',
    sectors: ['Mining', 'Diamonds', 'Iron Ore', 'Agriculture'],
    resources: ['Iron Ore', 'Diamonds', 'Rutile', 'Bauxite'],
    investmentClimate: 'Recovering mining frontier.',
    overview:
      'Sierra Leone holds world-class rutile and iron ore deposits. Diamond exports remain significant, with reforms aimed at improving transparency.',
  },
  '706': {
    id: '706',
    name: 'Somalia',
    capital: 'Mogadishu',
    population: '17.6M',
    region: 'East Africa',
    summary:
      'A livestock and fisheries economy with untapped offshore hydrocarbon potential along a strategic coastline.',
    sectors: ['Livestock', 'Fisheries', 'Telecoms', 'Remittances'],
    resources: ['Livestock', 'Fish', 'Crude Oil', 'Uranium'],
    investmentClimate: 'High-risk, rebuilding state.',
    overview:
      'Somalia possesses Africa’s longest coastline and large untapped offshore acreage. Livestock exports and a resilient telecoms sector sustain the economy.',
  },
  '710': {
    id: '710',
    name: 'South Africa',
    capital: 'Pretoria',
    population: '60.4M',
    region: 'Southern Africa',
    summary:
      'The continent’s most industrialised and financially deep economy, and the world’s leading source of platinum-group metals.',
    sectors: ['Mining', 'Financial Services', 'Manufacturing', 'Energy', 'Agriculture'],
    resources: ['Platinum', 'Gold', 'Coal', 'Manganese', 'Chrome', 'Diamonds'],
    investmentClimate: 'Deep markets, energy-constrained.',
    overview:
      'South Africa hosts Africa’s most sophisticated capital markets and the Johannesburg Stock Exchange. It dominates global platinum-group-metal supply, though power reliability remains a structural constraint.',
  },
  '729': {
    id: '729',
    name: 'Sudan',
    capital: 'Khartoum',
    population: '48.1M',
    region: 'North Africa',
    summary:
      'A gold-rich agricultural economy with significant Red Sea port and gum-arabic export roles.',
    sectors: ['Gold Mining', 'Agriculture', 'Livestock', 'Gum Arabic'],
    resources: ['Gold', 'Crude Oil', 'Gum Arabic', 'Livestock'],
    investmentClimate: 'High-risk, resource-rich.',
    overview:
      'Sudan is one of Africa’s largest gold producers and the dominant global supplier of gum arabic. Its Red Sea coastline holds strategic logistics value.',
  },
  '834': {
    id: '834',
    name: 'Tanzania',
    capital: 'Dodoma',
    population: '67.4M',
    region: 'East Africa',
    summary:
      'A gold and gas producer with the world’s only known tanzanite deposit and a strategic port corridor.',
    sectors: ['Gold Mining', 'Agriculture', 'Tourism', 'Natural Gas'],
    resources: ['Gold', 'Tanzanite', 'Natural Gas', 'Graphite', 'Nickel'],
    investmentClimate: 'Resource-rich, infrastructure-building.',
    overview:
      'Tanzania is a major gold producer and the sole source of tanzanite. New graphite and nickel projects plus the East African Crude Oil Pipeline anchor its outlook.',
  },
  '768': {
    id: '768',
    name: 'Togo',
    capital: 'Lomé',
    population: '8.8M',
    region: 'West Africa',
    summary:
      'A logistics-driven economy whose deep-water port serves as a transshipment hub for the Sahel.',
    sectors: ['Port Logistics', 'Phosphates', 'Agriculture', 'Cotton'],
    resources: ['Phosphates', 'Limestone', 'Cotton', 'Coffee'],
    investmentClimate: 'Logistics-led, reform-oriented.',
    overview:
      'The Port of Lomé is one of West Africa’s busiest transshipment hubs. Phosphate mining and agriculture round out Togo’s export economy.',
  },
  '788': {
    id: '788',
    name: 'Tunisia',
    capital: 'Tunis',
    population: '12.5M',
    region: 'North Africa',
    summary:
      'A diversified North African economy strong in manufacturing, phosphates, and Mediterranean services.',
    sectors: ['Manufacturing', 'Phosphates', 'Tourism', 'Agriculture'],
    resources: ['Phosphates', 'Crude Oil', 'Olive Oil', 'Natural Gas'],
    investmentClimate: 'Diversified, reform-dependent.',
    overview:
      'Tunisia hosts a sizeable export-manufacturing base linked to Europe. Phosphates, olive oil, and tourism remain core pillars of the economy.',
  },
  '800': {
    id: '800',
    name: 'Uganda',
    capital: 'Kampala',
    population: '48.6M',
    region: 'East Africa',
    summary:
      'An agricultural economy on the verge of becoming an oil producer via the East African Crude Oil Pipeline.',
    sectors: ['Agriculture', 'Oil', 'Coffee', 'Services'],
    resources: ['Crude Oil', 'Coffee', 'Gold', 'Copper'],
    investmentClimate: 'Pre-oil-production frontier.',
    overview:
      'Uganda’s Lake Albert oil developments and the EACOP pipeline to Tanzania are set to transform the economy, which today rests on coffee and diversified agriculture.',
  },
  '732': {
    id: '732',
    name: 'Western Sahara',
    capital: 'El Aaiún',
    population: '0.6M',
    region: 'North Africa',
    summary:
      'A disputed territory with notable phosphate reserves and rich Atlantic fishing grounds.',
    sectors: ['Phosphates', 'Fisheries', 'Salt', 'Agriculture'],
    resources: ['Phosphates', 'Fish', 'Salt', 'Iron Ore'],
    investmentClimate: 'Disputed-status territory.',
    overview:
      'Western Sahara holds significant phosphate deposits at Bou Craa and productive coastal fisheries. Its contested political status shapes all economic activity.',
  },
  '894': {
    id: '894',
    name: 'Zambia',
    capital: 'Lusaka',
    population: '20.6M',
    region: 'Southern Africa',
    summary:
      'Africa’s second-largest copper producer, central to the continent’s critical-minerals and battery ambitions.',
    sectors: ['Copper Mining', 'Cobalt', 'Agriculture', 'Energy'],
    resources: ['Copper', 'Cobalt', 'Emeralds', 'Gold', 'Manganese'],
    investmentClimate: 'Copperbelt revival, reform-driven.',
    overview:
      'Zambia’s Copperbelt is being revitalised with major investment targeting a tripling of copper output. It is positioning itself, with the DRC, as a battery-supply-chain hub.',
  },
  '716': {
    id: '716',
    name: 'Zimbabwe',
    capital: 'Harare',
    population: '16.3M',
    region: 'Southern Africa',
    summary:
      'A resource-rich nation holding Africa’s largest lithium reserves, alongside platinum, gold, and chrome.',
    sectors: ['Mining', 'Lithium', 'Platinum', 'Agriculture', 'Tobacco'],
    resources: ['Lithium', 'Platinum', 'Gold', 'Chrome', 'Diamonds'],
    investmentClimate: 'Mineral-rich, policy-volatile.',
    overview:
      'Zimbabwe holds Africa’s largest lithium reserves, concentrated in the Masvingo and Mashonaland belts. A 2022 ban on raw lithium ore exports has drawn substantial Chinese investment into domestic processing.',
  },
  '748': {
    id: '748',
    name: 'Eswatini',
    capital: 'Mbabane',
    population: '1.2M',
    region: 'Southern Africa',
    summary:
      'A small kingdom with sugar, forestry, and coal industries closely tied to the South African economy.',
    sectors: ['Sugar', 'Forestry', 'Manufacturing', 'Coal'],
    resources: ['Coal', 'Sugar', 'Timber', 'Diamonds'],
    investmentClimate: 'Small, SACU-integrated economy.',
    overview:
      'Eswatini’s economy is deeply integrated with South Africa through the customs union. Sugar, soft-drink concentrate manufacturing, and forestry lead exports.',
  },
}

export const COUNTRY_IDS = Object.keys(COUNTRY_FACTS)

export function getCountry(id: string): CountryFacts | undefined {
  return COUNTRY_FACTS[id]
}
