import { Prisma } from "@prisma/client";

import {
  CONTRACTS_FINDER_LOOKBACK_DAYS,
  CONTRACTS_FINDER_MIN_WINDOW_DAYS,
  CONTRACTS_FINDER_SEARCH_SIZE,
  INGEST_QUERY_GROUPS,
  type IngestQueryGroup
} from "@/lib/tenders/rules";
import type { NormalizedTenderCandidate } from "@/lib/tenders/types";

const CONTRACTS_FINDER_SEARCH_URL =
  "https://www.contractsfinder.service.gov.uk/api/rest/2/search_notices/json";

type ContractsFinderNoticeIndex = {
  id?: string;
  noticeIdentifier?: string;
  title?: string;
  description?: string;
  cpvDescription?: string;
  cpvDescriptionExpanded?: string;
  publishedDate?: string;
  deadlineDate?: string;
  valueLow?: number;
  valueHigh?: number;
  organisationName?: string;
  sector?: string;
  region?: string;
  regionText?: string;
  start?: string;
  end?: string;
};

type ContractsFinderSearchResponse = {
  hitCount?: number;
  maxHits?: number;
  noticeList?: Array<
    | {
        score?: number;
        item?: ContractsFinderNoticeIndex | null;
      }
    | ContractsFinderNoticeIndex
  >;
};

function toJsonValue(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function daysBetween(start: Date, end: Date) {
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function uniqueById(items: ContractsFinderNoticeIndex[]) {
  const seen = new Set<string>();
  const result: ContractsFinderNoticeIndex[] = [];

  for (const item of items) {
    const key = item.id || item.noticeIdentifier;
    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(item);
  }

  return result;
}

function extractItems(response: ContractsFinderSearchResponse) {
  return uniqueById(
    (response.noticeList || [])
      .map((entry) => ("item" in entry ? entry.item : entry))
      .filter((item): item is ContractsFinderNoticeIndex => Boolean(item))
  );
}

async function postContractsFinderSearch(
  queryGroup: IngestQueryGroup,
  publishedFrom: Date,
  publishedTo: Date
) {
  const body = {
    searchCriteria: {
      types: ["Contract"],
      statuses: ["Open"],
      queryString: queryGroup.queryString,
      publishedFrom: publishedFrom.toISOString(),
      publishedTo: publishedTo.toISOString(),
      deadlineFrom: new Date().toISOString()
    },
    size: CONTRACTS_FINDER_SEARCH_SIZE
  };

  const response = await fetch(CONTRACTS_FINDER_SEARCH_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20000)
  });

  if (!response.ok) {
    throw new Error(`Contracts Finder search failed with ${response.status}`);
  }

  return (await response.json()) as ContractsFinderSearchResponse;
}

async function fetchWindowedQueryResults(
  queryGroup: IngestQueryGroup,
  publishedFrom: Date,
  publishedTo: Date
): Promise<ContractsFinderNoticeIndex[]> {
  const response = await postContractsFinderSearch(queryGroup, publishedFrom, publishedTo);
  const items = extractItems(response);
  const hitCount = response.hitCount || items.length;
  const rangeDays = daysBetween(publishedFrom, publishedTo);

  if (hitCount > items.length && rangeDays > CONTRACTS_FINDER_MIN_WINDOW_DAYS) {
    const midpoint = new Date((publishedFrom.getTime() + publishedTo.getTime()) / 2);
    const leftResults = await fetchWindowedQueryResults(queryGroup, publishedFrom, midpoint);
    const rightResults = await fetchWindowedQueryResults(
      queryGroup,
      new Date(midpoint.getTime() + 60 * 1000),
      publishedTo
    );

    return uniqueById([...leftResults, ...rightResults]);
  }

  return items;
}

function mergeCandidates(
  existing: NormalizedTenderCandidate | undefined,
  incoming: NormalizedTenderCandidate
) {
  if (!existing) {
    return incoming;
  }

  return {
    ...existing,
    title: existing.title.length >= incoming.title.length ? existing.title : incoming.title,
    description:
      existing.description.length >= incoming.description.length
        ? existing.description
        : incoming.description,
    valueAmount: existing.valueAmount ?? incoming.valueAmount,
    region: existing.region || incoming.region,
    locationText: existing.locationText || incoming.locationText,
    publishedAt: existing.publishedAt || incoming.publishedAt,
    closingAt: existing.closingAt || incoming.closingAt,
    buyer: existing.buyer || incoming.buyer,
    sourceUrl: existing.sourceUrl || incoming.sourceUrl,
    rawPayload: existing.rawPayload || incoming.rawPayload
  };
}

export async function fetchContractsFinderCareCandidates(
  queryGroups = INGEST_QUERY_GROUPS
): Promise<{
  candidates: NormalizedTenderCandidate[];
  fetchedCount: number;
  queryGroups: string[];
}> {
  const publishedTo = new Date();
  const publishedFrom = new Date(publishedTo);
  publishedFrom.setDate(publishedFrom.getDate() - CONTRACTS_FINDER_LOOKBACK_DAYS);

  const staged = new Map<string, NormalizedTenderCandidate>();
  let fetchedCount = 0;

  for (const queryGroup of queryGroups) {
    const results = await fetchWindowedQueryResults(queryGroup, publishedFrom, publishedTo);
    fetchedCount += results.length;

    for (const result of results) {
      const normalized = normaliseContractsFinderNotice(result);
      if (!normalized) {
        continue;
      }

      const key = `${normalized.source}:${normalized.sourceNoticeId}`;
      staged.set(key, mergeCandidates(staged.get(key), normalized));
    }
  }

  return {
    candidates: Array.from(staged.values()),
    fetchedCount,
    queryGroups: queryGroups.map((group) => group.label)
  };
}

export function normaliseContractsFinderNotice(
  notice: ContractsFinderNoticeIndex
): NormalizedTenderCandidate | null {
  const sourceNoticeId = notice.id || notice.noticeIdentifier;
  if (!sourceNoticeId) {
    return null;
  }

  const description = [
    notice.description,
    notice.cpvDescriptionExpanded,
    notice.cpvDescription,
    notice.sector
  ]
    .filter(Boolean)
    .join(" ");

  return {
    source: "contracts_finder",
    sourceNoticeId,
    title: notice.title || "Untitled tender",
    buyer: notice.organisationName || "Public sector body",
    description,
    valueAmount:
      typeof notice.valueHigh === "number"
        ? notice.valueHigh
        : typeof notice.valueLow === "number"
          ? notice.valueLow
          : null,
    valueCurrency: "GBP",
    region: notice.regionText || notice.region || "United Kingdom",
    locationText: notice.regionText || notice.region || null,
    publishedAt: notice.publishedDate ? new Date(notice.publishedDate) : null,
    closingAt: notice.deadlineDate
      ? new Date(notice.deadlineDate)
      : notice.end
        ? new Date(notice.end)
        : null,
    sourceUrl: `https://www.contractsfinder.service.gov.uk/Notice/${notice.id || sourceNoticeId}`,
    rawPayload: toJsonValue(notice)
  };
}
