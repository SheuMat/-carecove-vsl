import type {
  DeadlineUrgency,
  Prisma,
  TenderCategory,
  TenderStatus
} from "@prisma/client";

export const tenderSortOptions = ["relevance", "closing", "newest", "value"] as const;

export type TenderSort = (typeof tenderSortOptions)[number];

export type TenderQuery = {
  q?: string;
  region?: string;
  service?: string;
  urgency?: DeadlineUrgency | "";
  sort?: TenderSort;
  page?: number;
  pageSize?: number;
};

export type TenderListItem = {
  id: string;
  slug: string;
  source: string;
  sourceNoticeId: string;
  title: string;
  buyer: string;
  description: string | null;
  summary: string | null;
  valueAmount: number | null;
  valueCurrency: string | null;
  region: string | null;
  locationText: string | null;
  publishedAt: string | null;
  closingAt: string | null;
  sourceUrl: string;
  category: TenderCategory;
  tags: string[];
  relevanceScore: number;
  relevanceReasons: string[];
  eligibilityNotes: string[];
  deadlineUrgency: DeadlineUrgency;
  status: TenderStatus;
  syncedAt: string;
};

export type TenderListResponse = {
  items: TenderListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  availableRegions: string[];
  availableServices: Array<{
    value: TenderCategory;
    label: string;
  }>;
  summary: {
    total: number;
    urgent: number;
    refreshedAt: string;
  };
};

export type NormalizedTenderCandidate = {
  source: string;
  sourceNoticeId: string;
  title: string;
  buyer: string;
  description: string;
  valueAmount: number | null;
  valueCurrency: string | null;
  region: string | null;
  locationText: string | null;
  publishedAt: Date | null;
  closingAt: Date | null;
  sourceUrl: string;
  rawPayload: Prisma.InputJsonValue | null;
};

export type ClassifiedTenderCandidate = NormalizedTenderCandidate & {
  fingerprint: string;
  slug: string;
  summary: string;
  category: TenderCategory;
  tags: string[];
  relevanceScore: number;
  relevanceReasons: string[];
  eligibilityNotes: string[];
  deadlineUrgency: DeadlineUrgency;
  searchText: string;
  relevant: boolean;
};
