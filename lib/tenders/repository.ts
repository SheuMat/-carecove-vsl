import type {
  DeadlineUrgency,
  Prisma,
  Tender,
  TenderCategory
} from "@prisma/client";

import { getDb } from "@/lib/db";
import { classifyTender } from "@/lib/tenders/classify";
import { fetchContractsFinderCareCandidates } from "@/lib/tenders/contracts-finder";
import { getDemoTenders } from "@/lib/demo-data";
import { env, isDatabaseConfigured } from "@/lib/env";
import { normalizeTenderListItem, normalizeTenderListResponse } from "@/lib/tenders/normalize";
import { TENDER_CATEGORY_LABELS } from "@/lib/tenders/rules";
import type { TenderListItem, TenderListResponse, TenderQuery } from "@/lib/tenders/types";
import { defaultTenderQuery } from "@/lib/tenders/query";

let sourceFallbackCache:
  | {
      items: TenderListItem[];
      expiresAt: number;
    }
  | undefined;

let sourceFallbackPromise: Promise<TenderListItem[]> | undefined;

type SourceFallbackStrategy = "blocking" | "instant";

function serializeTender(item: Tender): TenderListItem {
  return normalizeTenderListItem({
    id: item.id,
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
    status: item.status,
    syncedAt: item.syncedAt.toISOString()
  });
}

function serializeClassifiedTender(item: ReturnType<typeof classifyTender>): TenderListItem {
  return normalizeTenderListItem({
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
  });
}

async function refreshSourceFallbackTenders() {
  if (sourceFallbackCache && sourceFallbackCache.expiresAt > Date.now()) {
    return sourceFallbackCache.items;
  }

  if (sourceFallbackPromise) {
    return sourceFallbackPromise;
  }

  sourceFallbackPromise = (async () => {
    const { candidates } = await fetchContractsFinderCareCandidates();
    const items = candidates
      .map((candidate) => classifyTender(candidate))
      .filter((candidate) => candidate.relevant)
      .map(serializeClassifiedTender)
      .sort((left, right) => right.relevanceScore - left.relevanceScore);

    sourceFallbackCache = {
      items,
      expiresAt: Date.now() + 30 * 60 * 1000
    };

    return items;
  })();

  try {
    return await sourceFallbackPromise;
  } finally {
    sourceFallbackPromise = undefined;
  }
}

async function getSourceFallbackTenders(strategy: SourceFallbackStrategy = "blocking") {
  if (sourceFallbackCache && sourceFallbackCache.expiresAt > Date.now()) {
    return sourceFallbackCache.items;
  }

  if (strategy === "instant") {
    void refreshSourceFallbackTenders().catch(() => undefined);
    return getDemoTenders();
  }

  return refreshSourceFallbackTenders();
}

function applyLocalQuery(items: TenderListItem[], query: Required<TenderQuery>) {
  let filtered = [...items];

  if (query.q) {
    const search = query.q.toLowerCase();
    filtered = filtered.filter((item) =>
      [item.title, item.buyer, item.summary, item.description, item.region]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }

  if (query.region) {
    filtered = filtered.filter((item) => item.region?.toLowerCase() === query.region.toLowerCase());
  }

  if (query.service) {
    filtered = filtered.filter((item) => item.category === query.service);
  }

  if (query.urgency) {
    filtered = filtered.filter((item) => item.deadlineUrgency === query.urgency);
  }

  filtered.sort((left, right) => {
    if (query.sort === "closing") {
      return (
        new Date(left.closingAt || "9999-12-31").getTime() -
        new Date(right.closingAt || "9999-12-31").getTime()
      );
    }

    if (query.sort === "newest") {
      return (
        new Date(right.publishedAt || "1970-01-01").getTime() -
        new Date(left.publishedAt || "1970-01-01").getTime()
      );
    }

    if (query.sort === "value") {
      return (right.valueAmount || 0) - (left.valueAmount || 0);
    }

    return right.relevanceScore - left.relevanceScore;
  });

  return filtered;
}

function buildLocalResponse(items: TenderListItem[], query: Required<TenderQuery>): TenderListResponse {
  const filtered = applyLocalQuery(items, query);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
  const start = (query.page - 1) * query.pageSize;
  const paginated = filtered.slice(start, start + query.pageSize);

  return normalizeTenderListResponse({
    items: paginated,
    total,
    page: query.page,
    pageSize: query.pageSize,
    totalPages,
    availableRegions: Array.from(new Set(items.map((item) => item.region).filter(Boolean))) as string[],
    availableServices: Array.from(new Set(items.map((item) => item.category))).map((category) => ({
      value: category,
      label: TENDER_CATEGORY_LABELS[category]
    })),
    summary: {
      total: items.length,
      urgent: items.filter((item) => item.deadlineUrgency === "URGENT").length,
      refreshedAt: items[0]?.syncedAt || new Date().toISOString()
    }
  });
}

export async function listTenders(
  query: TenderQuery = {},
  options: {
    sourceFallbackStrategy?: SourceFallbackStrategy;
  } = {}
): Promise<TenderListResponse> {
  const normalized: Required<TenderQuery> = {
    ...defaultTenderQuery,
    ...query
  };
  const sourceFallbackStrategy = options.sourceFallbackStrategy || "blocking";

  if (!isDatabaseConfigured()) {
    if (env.useDemoTenders) {
      return buildLocalResponse(getDemoTenders(), normalized);
    }

    try {
      const liveFallbackItems = await getSourceFallbackTenders(sourceFallbackStrategy);
      if (liveFallbackItems.length) {
        return buildLocalResponse(liveFallbackItems, normalized);
      }
    } catch {
      return buildLocalResponse(getDemoTenders(), normalized);
    }

    return buildLocalResponse(getDemoTenders(), normalized);
  }

  const where: Prisma.TenderWhereInput = {
    status: "ACTIVE"
  };

  if (normalized.q) {
    where.searchText = {
      contains: normalized.q.toLowerCase()
    };
  }

  if (normalized.region) {
    where.region = {
      equals: normalized.region,
      mode: "insensitive"
    };
  }

  if (normalized.service) {
    where.category = normalized.service as TenderCategory;
  }

  if (normalized.urgency) {
    where.deadlineUrgency = normalized.urgency as DeadlineUrgency;
  }

  const orderBy: Prisma.TenderOrderByWithRelationInput[] =
    normalized.sort === "closing"
      ? [{ closingAt: "asc" }, { relevanceScore: "desc" }]
      : normalized.sort === "newest"
        ? [{ publishedAt: "desc" }, { relevanceScore: "desc" }]
        : normalized.sort === "value"
          ? [{ valueAmount: "desc" }, { relevanceScore: "desc" }]
          : [{ relevanceScore: "desc" }, { closingAt: "asc" }];

  const db = getDb();
  const [items, total, regions, services, urgentCount, latest] = await Promise.all([
    db.tender.findMany({
      where,
      orderBy,
      skip: (normalized.page - 1) * normalized.pageSize,
      take: normalized.pageSize
    }),
    db.tender.count({ where }),
    db.tender.findMany({
      where: { status: "ACTIVE" },
      distinct: ["region"],
      select: { region: true },
      orderBy: { region: "asc" }
    }),
    db.tender.findMany({
      where: { status: "ACTIVE" },
      distinct: ["category"],
      select: { category: true }
    }),
    db.tender.count({
      where: { status: "ACTIVE", deadlineUrgency: "URGENT" }
    }),
    db.tender.findFirst({
      orderBy: { syncedAt: "desc" },
      select: { syncedAt: true }
    })
  ]);

  return normalizeTenderListResponse({
    items: items.map(serializeTender),
    total,
    page: normalized.page,
    pageSize: normalized.pageSize,
    totalPages: Math.max(1, Math.ceil(total / normalized.pageSize)),
    availableRegions: regions
      .map((item) => item.region)
      .filter((value): value is string => Boolean(value)),
    availableServices: services.map((item) => ({
      value: item.category,
      label: TENDER_CATEGORY_LABELS[item.category]
    })),
    summary: {
      total,
      urgent: urgentCount,
      refreshedAt: latest?.syncedAt.toISOString() || new Date().toISOString()
    }
  });
}

export async function getTenderBySlug(slug: string) {
  if (!isDatabaseConfigured()) {
    if (env.useDemoTenders) {
      return getDemoTenders().find((item) => item.slug === slug) || null;
    }

    try {
      return (await getSourceFallbackTenders()).find((item) => item.slug === slug) || null;
    } catch {
      return getDemoTenders().find((item) => item.slug === slug) || null;
    }
  }

  const item = await getDb().tender.findUnique({
    where: { slug }
  });

  return item ? serializeTender(item) : null;
}

export async function getTenderById(id: string) {
  if (!isDatabaseConfigured()) {
    if (env.useDemoTenders) {
      return getDemoTenders().find((item) => item.id === id || item.sourceNoticeId === id) || null;
    }

    try {
      return (
        (await getSourceFallbackTenders()).find(
          (item) => item.id === id || item.sourceNoticeId === id
        ) || null
      );
    } catch {
      return getDemoTenders().find((item) => item.id === id || item.sourceNoticeId === id) || null;
    }
  }

  const item = await getDb().tender.findFirst({
    where: {
      OR: [{ id }, { sourceNoticeId: id }]
    }
  });

  return item ? serializeTender(item) : null;
}
