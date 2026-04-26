import { classifyTender } from "@/lib/tenders/classify";
import type { TenderListItem } from "@/lib/tenders/types";

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

const demoBase = [
  {
    sourceNoticeId: "CC-DEMO-001",
    title: "Provision of Domiciliary Care Services for Adults with Learning Disabilities",
    buyer: "Birmingham City Council",
    description:
      "The Council is seeking a CQC-registered provider to deliver domiciliary care and community support for adults with learning disabilities. Providers should evidence safeguarding, mobilisation capability and prior experience delivering home-based packages of care.",
    valueAmount: 850000,
    region: "West Midlands",
    locationText: "Birmingham, West Midlands",
    publishedAt: daysFromNow(-2),
    closingAt: daysFromNow(6),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-002",
    title: "Supported Living Services for Adults with Complex Needs",
    buyer: "Leeds City Council",
    description:
      "Framework for supported living services supporting adults with complex physical health, mental health and behavioural needs. The notice references TUPE, transition planning and person-centred delivery outcomes across multiple lots.",
    valueAmount: 2400000,
    region: "Yorkshire",
    locationText: "Leeds, Yorkshire",
    publishedAt: daysFromNow(-1),
    closingAt: daysFromNow(12),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-003",
    title: "Short Breaks and Respite Care for Children and Young People",
    buyer: "Greater Manchester Combined Authority",
    description:
      "Providers are invited to deliver respite and short breaks for children and young people with disabilities. Services should support families, offer flexible community-based provision and demonstrate strong safeguarding practice.",
    valueAmount: 650000,
    region: "North West",
    locationText: "Manchester, North West",
    publishedAt: daysFromNow(-3),
    closingAt: daysFromNow(19),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-004",
    title: "Community Mental Health Recovery and Wellbeing Support Services",
    buyer: "NHS South East London Integrated Care Board",
    description:
      "The Integrated Care Board is procuring community mental health recovery and wellbeing services including outreach support, recovery planning, crisis prevention and peer support for adults across the region.",
    valueAmount: 3200000,
    region: "London",
    locationText: "South East London",
    publishedAt: daysFromNow(-5),
    closingAt: daysFromNow(10),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-005",
    title: "Residential Care Home Management for Older Persons Services",
    buyer: "London Borough of Hackney",
    description:
      "The Council invites tenders for the management of a residential care home for older people. Providers must demonstrate CQC registration, strong governance and experience operating high-quality residential care services.",
    valueAmount: 1800000,
    region: "London",
    locationText: "Hackney, London",
    publishedAt: daysFromNow(-7),
    closingAt: daysFromNow(27),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-006",
    title: "Autism Outreach and Day Opportunities Service",
    buyer: "Nottinghamshire County Council",
    description:
      "Nottinghamshire County Council seeks a provider for autism outreach support and day opportunities. The contract includes community participation, independence outcomes, support planning and carer liaison.",
    valueAmount: 520000,
    region: "East Midlands",
    locationText: "Nottinghamshire, East Midlands",
    publishedAt: daysFromNow(-1),
    closingAt: daysFromNow(8),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-007",
    title: "Reablement and Home Support Service for Adults Leaving Hospital",
    buyer: "Kent County Council",
    description:
      "Kent County Council is seeking providers for reablement and home support services for adults discharged from hospital. The contract covers short-term care at home, recovery support and independence-focused delivery.",
    valueAmount: 1450000,
    region: "South East",
    locationText: "Kent, South East",
    publishedAt: daysFromNow(-2),
    closingAt: daysFromNow(14),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-008",
    title: "Carers Support and Family Wellbeing Services",
    buyer: "Derbyshire County Council",
    description:
      "Provision of carers support, family wellbeing advice and community outreach for unpaid carers and families supporting adults with disabilities and long-term conditions.",
    valueAmount: 390000,
    region: "East Midlands",
    locationText: "Derbyshire, East Midlands",
    publishedAt: daysFromNow(-4),
    closingAt: daysFromNow(16),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-009",
    title: "Extra Care and Independent Living Support Services",
    buyer: "Liverpool City Council",
    description:
      "Contract for extra care and independent living support in specialist accommodation schemes, including personal care, wellbeing support and 24-hour responsive assistance.",
    valueAmount: 2100000,
    region: "North West",
    locationText: "Liverpool, North West",
    publishedAt: daysFromNow(-1),
    closingAt: daysFromNow(20),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-010",
    title: "Community Rehabilitation and Recovery Support for Adults",
    buyer: "NHS Greater Manchester Integrated Care Board",
    description:
      "The service supports adults with mental health needs through rehabilitation, recovery planning, community integration and personalised wellbeing support.",
    valueAmount: 1180000,
    region: "North West",
    locationText: "Greater Manchester, North West",
    publishedAt: daysFromNow(-3),
    closingAt: daysFromNow(9),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-011",
    title: "Supported Accommodation for Young Adults with Learning Disabilities",
    buyer: "Bristol City Council",
    description:
      "Providers are invited to deliver supported accommodation and transition support for young adults with learning disabilities moving into adulthood and more independent living arrangements.",
    valueAmount: 980000,
    region: "South West",
    locationText: "Bristol, South West",
    publishedAt: daysFromNow(-5),
    closingAt: daysFromNow(22),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-012",
    title: "Day Services and Community Access for Adults with Autism",
    buyer: "Essex County Council",
    description:
      "A county-wide day services framework for adults with autism, focused on structured activity, independence outcomes, life skills and supported community access.",
    valueAmount: 760000,
    region: "East of England",
    locationText: "Essex, East of England",
    publishedAt: daysFromNow(-2),
    closingAt: daysFromNow(18),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-013",
    title: "Children's Short Breaks and Disability Support Framework",
    buyer: "Surrey County Council",
    description:
      "Framework for short breaks, respite care and disability support for children and young people. The authority is seeking flexible providers with strong safeguarding and family partnership models.",
    valueAmount: 2750000,
    region: "South East",
    locationText: "Surrey, South East",
    publishedAt: daysFromNow(-6),
    closingAt: daysFromNow(24),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-014",
    title: "Complex Care Packages for Adults with Physical Disabilities",
    buyer: "West Sussex County Council",
    description:
      "Procurement of complex care packages for adults with physical disabilities and high support needs, including community-based personal care, oversight and coordinated support planning.",
    valueAmount: 1640000,
    region: "South East",
    locationText: "West Sussex, South East",
    publishedAt: daysFromNow(-2),
    closingAt: daysFromNow(13),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-015",
    title: "Residential Nursing Care for Adults with Dementia",
    buyer: "North Yorkshire Council",
    description:
      "Residential nursing care provision for adults with dementia and associated complex needs. Providers must demonstrate quality governance, staffing resilience and person-centred clinical oversight.",
    valueAmount: 3560000,
    region: "Yorkshire",
    locationText: "North Yorkshire, Yorkshire",
    publishedAt: daysFromNow(-8),
    closingAt: daysFromNow(29),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  },
  {
    sourceNoticeId: "CC-DEMO-016",
    title: "Community Support and Outreach for Vulnerable Adults",
    buyer: "London Borough of Croydon",
    description:
      "Outreach and community support service for vulnerable adults requiring practical support, wellbeing checks, signposting and coordinated access to adult social care provision.",
    valueAmount: 480000,
    region: "London",
    locationText: "Croydon, London",
    publishedAt: daysFromNow(-1),
    closingAt: daysFromNow(11),
    sourceUrl: "https://www.contractsfinder.service.gov.uk/Search"
  }
];

export function getDemoTenders(): TenderListItem[] {
  return demoBase
    .map((item) =>
      classifyTender({
        source: "contracts_finder",
        sourceNoticeId: item.sourceNoticeId,
        title: item.title,
        buyer: item.buyer,
        description: item.description,
        valueAmount: item.valueAmount,
        valueCurrency: "GBP",
        region: item.region,
        locationText: item.locationText,
        publishedAt: item.publishedAt,
        closingAt: item.closingAt,
        sourceUrl: item.sourceUrl,
        rawPayload: item
      })
    )
    .filter((item) => item.relevant)
    .map((item) => ({
      id: item.sourceNoticeId,
      slug: item.slug,
      source: item.source,
      sourceNoticeId: item.sourceNoticeId,
      title: item.title,
      buyer: item.buyer,
      description: item.description,
      summary: item.summary,
      valueAmount: item.valueAmount,
      valueCurrency: item.valueCurrency,
      region: item.region,
      locationText: item.locationText,
      publishedAt: item.publishedAt?.toISOString() || null,
      closingAt: item.closingAt?.toISOString() || null,
      sourceUrl: item.sourceUrl,
      category: item.category,
      tags: item.tags,
      relevanceScore: item.relevanceScore,
      relevanceReasons: item.relevanceReasons,
      eligibilityNotes: item.eligibilityNotes,
      deadlineUrgency: item.deadlineUrgency,
      status: "ACTIVE",
      syncedAt: new Date().toISOString()
    }));
}
