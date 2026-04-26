import type {
  DeadlineUrgency,
  TenderCategory,
  TenderStatus
} from "@prisma/client";

import { TENDER_CATEGORY_LABELS } from "@/lib/tenders/rules";
import type { TenderListItem, TenderListResponse } from "@/lib/tenders/types";

const DEADLINE_URGENCY_VALUES = new Set<DeadlineUrgency>(["URGENT", "SOON", "OPEN", "TBC"]);
const TENDER_STATUS_VALUES = new Set<TenderStatus>(["ACTIVE", "EXPIRED", "STALE"]);
const TENDER_CATEGORY_VALUES = new Set<TenderCategory>(Object.keys(TENDER_CATEGORY_LABELS) as TenderCategory[]);

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNullableString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
      }
    } catch {
      return [trimmed];
    }

    return [trimmed];
  }

  return [];
}

function asCategory(value: unknown): TenderCategory {
  return typeof value === "string" && TENDER_CATEGORY_VALUES.has(value as TenderCategory)
    ? (value as TenderCategory)
    : "OTHER";
}

function asDeadlineUrgency(value: unknown): DeadlineUrgency {
  return typeof value === "string" && DEADLINE_URGENCY_VALUES.has(value as DeadlineUrgency)
    ? (value as DeadlineUrgency)
    : "TBC";
}

function asTenderStatus(value: unknown): TenderStatus {
  return typeof value === "string" && TENDER_STATUS_VALUES.has(value as TenderStatus)
    ? (value as TenderStatus)
    : "ACTIVE";
}

export function normalizeTenderListItem(input: Partial<TenderListItem> & Record<string, unknown>): TenderListItem {
  return {
    id: asString(input.id, asString(input.sourceNoticeId, "")),
    slug: asString(input.slug, ""),
    source: asString(input.source, "contracts_finder"),
    sourceNoticeId: asString(input.sourceNoticeId, ""),
    title: asString(input.title, "Untitled tender"),
    buyer: asString(input.buyer, "Public sector buyer"),
    description: asNullableString(input.description),
    summary: asNullableString(input.summary),
    valueAmount: asNumber(input.valueAmount),
    valueCurrency: asNullableString(input.valueCurrency) || "GBP",
    region: asNullableString(input.region),
    locationText: asNullableString(input.locationText),
    publishedAt: asNullableString(input.publishedAt),
    closingAt: asNullableString(input.closingAt),
    sourceUrl: asString(input.sourceUrl, "#"),
    category: asCategory(input.category),
    tags: asStringArray(input.tags),
    relevanceScore: typeof input.relevanceScore === "number" ? input.relevanceScore : 0,
    relevanceReasons: asStringArray(input.relevanceReasons),
    eligibilityNotes: asStringArray(input.eligibilityNotes),
    deadlineUrgency: asDeadlineUrgency(input.deadlineUrgency),
    status: asTenderStatus(input.status),
    syncedAt: asString(input.syncedAt, new Date(0).toISOString())
  };
}

export function normalizeTenderListResponse(
  input: Partial<TenderListResponse> & Record<string, unknown>
): TenderListResponse {
  const items = Array.isArray(input.items)
    ? input.items
        .map((item) =>
          typeof item === "object" && item !== null
            ? normalizeTenderListItem(item as Partial<TenderListItem> & Record<string, unknown>)
            : normalizeTenderListItem({})
        )
    : [];

  const availableServices = Array.isArray(input.availableServices)
    ? input.availableServices
        .map((item) => ({
          value: asCategory(typeof item === "object" && item !== null ? item.value : undefined),
          label:
            typeof item === "object" && item !== null && typeof item.label === "string" && item.label.trim().length > 0
              ? item.label
              : TENDER_CATEGORY_LABELS[
                  asCategory(typeof item === "object" && item !== null ? item.value : undefined)
                ]
        }))
    : [];

  const availableRegions = Array.isArray(input.availableRegions)
    ? input.availableRegions.filter(
        (item): item is string => typeof item === "string" && item.trim().length > 0
      )
    : [];

  const total = typeof input.total === "number" ? input.total : items.length;
  const pageSize = typeof input.pageSize === "number" ? input.pageSize : 9;
  const totalPages =
    typeof input.totalPages === "number" ? input.totalPages : Math.max(1, Math.ceil(total / pageSize));

  return {
    items,
    total,
    page: typeof input.page === "number" ? input.page : 1,
    pageSize,
    totalPages,
    availableRegions,
    availableServices,
    summary: {
      total: typeof input.summary?.total === "number" ? input.summary.total : items.length,
      urgent: typeof input.summary?.urgent === "number" ? input.summary.urgent : 0,
      refreshedAt:
        typeof input.summary?.refreshedAt === "string"
          ? input.summary.refreshedAt
          : new Date(0).toISOString()
    }
  };
}
