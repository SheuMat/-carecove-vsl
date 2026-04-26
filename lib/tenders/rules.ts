import type { TenderCategory } from "@prisma/client";

type RuleGroup = {
  category: TenderCategory;
  label: string;
  weight: number;
  keywords: string[];
  tags: string[];
};

type NegativeRule = {
  weight: number;
  keywords: string[];
  reason: string;
};

export type IngestQueryGroup = {
  key: string;
  label: string;
  queryString: string;
};

export const CONTRACTS_FINDER_LOOKBACK_DAYS = 150;
export const CONTRACTS_FINDER_SEARCH_SIZE = 250;
export const CONTRACTS_FINDER_MIN_WINDOW_DAYS = 21;

export const INGEST_QUERY_GROUPS: IngestQueryGroup[] = [
  {
    key: "home-based-care",
    label: "Home-based care",
    queryString:
      "\"domiciliary care\" OR \"home care\" OR \"care at home\" OR \"home support\" OR reablement OR re-ablement"
  },
  {
    key: "supported-living",
    label: "Supported living",
    queryString:
      "\"supported living\" OR \"independent living\" OR \"supported accommodation\" OR \"supported housing\" OR \"extra care\""
  },
  {
    key: "residential-and-nursing",
    label: "Residential and nursing care",
    queryString:
      "\"residential care\" OR \"care home\" OR \"nursing care\" OR \"nursing home\" OR \"older people care\""
  },
  {
    key: "mental-health-and-recovery",
    label: "Mental health and recovery",
    queryString:
      "\"mental health\" OR wellbeing OR \"wellbeing support\" OR recovery OR rehabilitation OR \"community healthcare\""
  },
  {
    key: "learning-disability-and-autism",
    label: "Learning disability and autism",
    queryString:
      "\"learning disability\" OR \"learning disabilities\" OR autism OR \"disability support\" OR \"vulnerable adults\""
  },
  {
    key: "respite-and-family",
    label: "Respite, children and families",
    queryString:
      "respite OR \"short breaks\" OR \"children's services\" OR \"family support\" OR \"carers support\""
  },
  {
    key: "social-care-and-community-support",
    label: "Social care and community support",
    queryString:
      "\"adult social care\" OR \"social care\" OR \"care services\" OR \"community support\" OR \"outreach support\" OR \"day services\""
  },
  {
    key: "complex-care-and-staffing",
    label: "Complex care and staffing",
    queryString:
      "\"complex care\" OR \"healthcare staffing\" OR \"care staffing\" OR \"support workers\" OR \"community care\""
  }
];

export const TENDER_CATEGORY_LABELS: Record<TenderCategory, string> = {
  DOMICILIARY_CARE: "Domiciliary care",
  HOME_CARE: "Home care",
  SUPPORTED_LIVING: "Supported living",
  RESIDENTIAL_CARE: "Residential care",
  NURSING_CARE: "Nursing care",
  MENTAL_HEALTH: "Mental health",
  LEARNING_DISABILITIES: "Learning disabilities",
  AUTISM: "Autism",
  RESPITE: "Respite / short breaks",
  CHILDRENS_SERVICES: "Children's services",
  COMMUNITY_SUPPORT: "Community support",
  COMPLEX_CARE: "Complex care",
  HEALTHCARE_STAFFING: "Healthcare staffing",
  SOCIAL_CARE: "Social care",
  DAY_SERVICES: "Day services",
  OTHER: "Other"
};

export const GENERIC_CARE_TERMS = [
  "care",
  "support",
  "living",
  "community",
  "social",
  "disability",
  "mental",
  "autism",
  "carers",
  "wellbeing",
  "rehabilitation",
  "recovery",
  "reablement",
  "vulnerable adults",
  "family"
];

export const COMMUNITY_HINT_TERMS = [
  "community",
  "outreach",
  "independent living",
  "support at home",
  "day support"
];

export const CHILDREN_HINT_TERMS = [
  "children",
  "young people",
  "family support",
  "carers support"
];

export const POSITIVE_RULES: RuleGroup[] = [
  {
    category: "DOMICILIARY_CARE",
    label: "Domiciliary care",
    weight: 30,
    keywords: [
      "domiciliary care",
      "care at home",
      "visiting care",
      "home based care",
      "home-based care"
    ],
    tags: ["Domiciliary care", "Home visits"]
  },
  {
    category: "HOME_CARE",
    label: "Home care",
    weight: 26,
    keywords: ["home care", "homecare", "home support", "support at home", "care in your own home"],
    tags: ["Home care"]
  },
  {
    category: "SUPPORTED_LIVING",
    label: "Supported living",
    weight: 30,
    keywords: [
      "supported living",
      "independent living",
      "supported accommodation",
      "supported housing",
      "extra care"
    ],
    tags: ["Supported living"]
  },
  {
    category: "RESIDENTIAL_CARE",
    label: "Residential care",
    weight: 28,
    keywords: [
      "residential care",
      "care home",
      "older people care",
      "older persons care",
      "residential home"
    ],
    tags: ["Residential care"]
  },
  {
    category: "NURSING_CARE",
    label: "Nursing care",
    weight: 24,
    keywords: ["nursing care", "nursing home", "registered nursing", "continuing healthcare"],
    tags: ["Nursing care"]
  },
  {
    category: "MENTAL_HEALTH",
    label: "Mental health",
    weight: 24,
    keywords: [
      "mental health",
      "wellbeing support",
      "recovery support",
      "community mental health",
      "rehabilitation"
    ],
    tags: ["Mental health", "Recovery"]
  },
  {
    category: "LEARNING_DISABILITIES",
    label: "Learning disabilities",
    weight: 28,
    keywords: ["learning disability", "learning disabilities", "ld services"],
    tags: ["Learning disabilities"]
  },
  {
    category: "AUTISM",
    label: "Autism",
    weight: 24,
    keywords: ["autism", "autistic adults", "autistic people"],
    tags: ["Autism"]
  },
  {
    category: "RESPITE",
    label: "Respite care",
    weight: 24,
    keywords: ["respite", "short breaks", "short break services", "breaks for carers"],
    tags: ["Respite", "Carers"]
  },
  {
    category: "CHILDRENS_SERVICES",
    label: "Children and family services",
    weight: 24,
    keywords: [
      "children's services",
      "children services",
      "young people",
      "family support",
      "carers support"
    ],
    tags: ["Children", "Families"]
  },
  {
    category: "COMMUNITY_SUPPORT",
    label: "Community support",
    weight: 20,
    keywords: [
      "community support",
      "outreach support",
      "community outreach",
      "community healthcare",
      "independent living"
    ],
    tags: ["Community support"]
  },
  {
    category: "COMPLEX_CARE",
    label: "Complex care",
    weight: 22,
    keywords: [
      "complex care",
      "high dependency",
      "brain injury",
      "physical disabilities",
      "reablement"
    ],
    tags: ["Complex care"]
  },
  {
    category: "HEALTHCARE_STAFFING",
    label: "Healthcare staffing",
    weight: 14,
    keywords: [
      "healthcare staffing",
      "care staffing",
      "support workers",
      "care workers",
      "nursing staff"
    ],
    tags: ["Staffing"]
  },
  {
    category: "SOCIAL_CARE",
    label: "Social care",
    weight: 22,
    keywords: [
      "adult social care",
      "social care",
      "care services",
      "care and support",
      "disability support",
      "care provider",
      "vulnerable adults"
    ],
    tags: ["Social care"]
  },
  {
    category: "DAY_SERVICES",
    label: "Day services",
    weight: 20,
    keywords: ["day services", "day opportunities", "day support", "day care"],
    tags: ["Day services"]
  }
];

export const NEGATIVE_RULES: NegativeRule[] = [
  {
    weight: -40,
    keywords: ["cleaning services", "janitorial", "catering services", "security services"],
    reason: "Non-care operational service"
  },
  {
    weight: -45,
    keywords: ["construction", "refurbishment", "building works", "civil engineering", "housing repairs"],
    reason: "Capital works procurement"
  },
  {
    weight: -34,
    keywords: ["software licence", "software support", "it managed service", "hardware supply"],
    reason: "IT procurement rather than care delivery"
  },
  {
    weight: -30,
    keywords: ["grounds maintenance", "fleet management", "waste collection", "stationery supply", "vehicle leasing"],
    reason: "General local authority supplier opportunity"
  },
  {
    weight: -24,
    keywords: ["legal services", "accountancy services", "audit services", "marketing services", "printing services"],
    reason: "Professional services unrelated to care delivery"
  }
];

export const BUYER_BONUSES = [
  {
    keywords: [
      "nhs",
      "integrated care board",
      "nhs trust",
      "borough council",
      "county council",
      "city council",
      "local authority",
      "metropolitan borough",
      "children's trust"
    ],
    weight: 8,
    reason: "Typical care-sector commissioner"
  }
];

export const MINIMUM_RELEVANCE_SCORE = 24;
