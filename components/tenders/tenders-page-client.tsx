"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FilterToolbar } from "@/components/tenders/filter-toolbar";
import { QualifyModal } from "@/components/tenders/qualify-modal";
import { TenderCard } from "@/components/tenders/tender-card";
import { normalizeTenderListResponse } from "@/lib/tenders/normalize";
import type { TenderListItem, TenderListResponse, TenderQuery } from "@/lib/tenders/types";
import { defaultTenderQuery } from "@/lib/tenders/query";

type TendersPageClientProps = {
  initialData: TenderListResponse;
  initialQuery: TenderQuery;
  refreshOnMount?: boolean;
};

export function TendersPageClient({
  initialData,
  initialQuery,
  refreshOnMount = false
}: TendersPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const initialised = useRef(false);
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState({
    ...defaultTenderQuery,
    ...initialQuery
  });
  const deferredSearch = useDeferredValue(query.q);
  const [data, setData] = useState(() => normalizeTenderListResponse(initialData));
  const [error, setError] = useState<string | null>(null);
  const [selectedTender, setSelectedTender] = useState<TenderListItem | null>(null);

  const activeQuery = useMemo(
    () => ({
      ...query,
      q: deferredSearch
    }),
    [query, deferredSearch]
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (activeQuery.q) params.set("q", activeQuery.q);
    if (activeQuery.region) params.set("region", activeQuery.region);
    if (activeQuery.service) params.set("service", activeQuery.service);
    if (activeQuery.urgency) params.set("urgency", activeQuery.urgency);
    if (activeQuery.sort !== defaultTenderQuery.sort) params.set("sort", activeQuery.sort);
    if (activeQuery.page !== defaultTenderQuery.page) params.set("page", String(activeQuery.page));
    if (activeQuery.pageSize !== defaultTenderQuery.pageSize) {
      params.set("pageSize", String(activeQuery.pageSize));
    }

    const nextUrl = params.size ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });

    if (!initialised.current) {
      initialised.current = true;

      if (!refreshOnMount) {
        return;
      }
    }

    const controller = new AbortController();
    setError(null);

    startTransition(() => {
      fetch(`/api/tenders?${params.toString()}`, {
        signal: controller.signal,
        cache: "no-store"
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Unable to load tenders right now.");
          }

          return normalizeTenderListResponse((await response.json()) as TenderListResponse);
        })
        .then(setData)
        .catch((requestError) => {
          if (requestError instanceof DOMException && requestError.name === "AbortError") {
            return;
          }

          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load tenders right now."
          );
        });
    });

    return () => controller.abort();
  }, [activeQuery, pathname, refreshOnMount, router]);

  function updateField(field: "q" | "region" | "service" | "urgency" | "sort", value: string) {
    setQuery((current) => ({
      ...current,
      [field]: value,
      page: 1
    }));
  }

  function updatePage(nextPage: number) {
    setQuery((current) => ({
      ...current,
      page: nextPage
    }));
  }

  return (
    <>
      <FilterToolbar
        availableRegions={data.availableRegions}
        availableServices={data.availableServices}
        onChange={updateField}
        q={query.q}
        region={query.region}
        service={query.service}
        sort={query.sort}
        urgency={query.urgency}
      />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-plum-700/55">
            Results
          </p>
          <h2 className="mt-2 font-display text-4xl text-ink-900">
            {data.total} relevant tenders available
          </h2>
        </div>
        <div className="rounded-full border border-plum-100 bg-white px-5 py-3 text-sm text-plum-800/72 shadow-soft">
          Updated {new Date(data.summary.refreshedAt).toLocaleString("en-GB")}
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-[2rem] border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {isPending ? (
        <div className="mt-6 rounded-[2rem] border border-gold-200 bg-gold-50 px-6 py-4 text-sm text-gold-500">
          Refreshing stored tender results...
        </div>
      ) : null}

      {data.items.length ? (
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {data.items.map((tender) => (
            <TenderCard key={tender.id} onQualify={setSelectedTender} tender={tender} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[2rem] border border-plum-100 bg-white px-8 py-12 text-center shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-plum-700/55">
            No matches
          </p>
          <h3 className="mt-3 font-display text-4xl text-ink-900">No tenders match this filter set.</h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-plum-800/72">
            Try widening the region, removing service filters, or searching with a broader care-sector
            term.
          </p>
        </div>
      )}

      {data.totalPages > 1 ? (
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-plum-100 bg-white px-6 py-5 shadow-soft">
          <div className="text-sm text-plum-700/65">
            Page {data.page} of {data.totalPages}
          </div>
          <div className="flex gap-3">
            <Button
              disabled={data.page <= 1}
              onClick={() => updatePage(Math.max(1, data.page - 1))}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              disabled={data.page >= data.totalPages}
              onClick={() => updatePage(Math.min(data.totalPages, data.page + 1))}
              variant="primary"
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}

      <QualifyModal onClose={() => setSelectedTender(null)} open={Boolean(selectedTender)} tender={selectedTender} />
    </>
  );
}
