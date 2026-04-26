import type { DeadlineUrgency, TenderCategory } from "@prisma/client";

import { clamp } from "@/lib/utils/format";
import type { TenderQuery, TenderSort } from "@/lib/tenders/types";

export const defaultTenderQuery: Required<TenderQuery> = {
  q: "",
  region: "",
  service: "",
  urgency: "",
  sort: "relevance",
  page: 1,
  pageSize: 9
};

export function parseTenderQuery(input: URLSearchParams | Record<string, string | string[] | undefined>): TenderQuery {
  const get = (key: string) => {
    if (input instanceof URLSearchParams) {
      return input.get(key) || undefined;
    }

    const value = input[key];
    if (Array.isArray(value)) {
      return value[0];
    }

    return value;
  };

  const page = Number.parseInt(get("page") || "", 10);
  const pageSize = Number.parseInt(get("pageSize") || "", 10);
  const urgency = (get("urgency") || "") as DeadlineUrgency | "";
  const service = (get("service") || "") as TenderCategory | "";
  const sort = (get("sort") || defaultTenderQuery.sort) as TenderSort;

  return {
    q: get("q") || "",
    region: get("region") || "",
    service,
    urgency,
    sort,
    page: Number.isFinite(page) ? clamp(page, 1, 1000) : defaultTenderQuery.page,
    pageSize: Number.isFinite(pageSize)
      ? clamp(pageSize, 1, 24)
      : defaultTenderQuery.pageSize
  };
}
