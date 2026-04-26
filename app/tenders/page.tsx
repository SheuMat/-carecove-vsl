import type { Metadata } from "next";

import { TendersPageClient } from "@/components/tenders/tenders-page-client";
import { parseTenderQuery } from "@/lib/tenders/query";
import { listTenders } from "@/lib/tenders/repository";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Live Care Tenders UK",
  description:
    "Browse relevant UK care tenders, supported living tenders, and healthcare opportunities with server-side filtering, qualification support, and care tender writing pathways.",
  path: "/tenders",
  keywords: [
    "live care tenders UK",
    "care tender writing UK",
    "supported living tenders UK",
    "domiciliary care tenders UK",
    "healthcare tenders UK"
  ]
});

export const revalidate = 300;

type TendersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TendersPage({ searchParams }: TendersPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = parseTenderQuery(resolvedSearchParams);
  const initialData = await listTenders(query, {
    sourceFallbackStrategy: "instant"
  });

  return (
    <div className="px-5 pb-20 pt-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#140a2e,#3d2278,#5535a0)] px-8 py-12 text-white shadow-glow sm:px-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-gold-300/30 bg-gold-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-100">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-emerald-300" />
              Stored, filtered, and deduplicated server-side
            </div>
            <h1 className="mt-6 font-display text-5xl leading-tight sm:text-6xl">
              Active care and health tenders, rebuilt properly.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-white/70">
              This is no longer a browser-side proxy hack. Care Cove now serves stored tender data from
              its own pipeline with scoring, relevance filtering, pagination, and backend qualification
              capture.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="Live tenders" value={String(initialData.summary.total)} />
              <StatCard label="Closing this week" value={String(initialData.summary.urgent)} />
              <StatCard label="Fast load path" value="Server-driven" />
            </div>
          </div>
        </section>

        <div className="mt-10">
          <TendersPageClient initialData={initialData} initialQuery={query} refreshOnMount />
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
      <div className="font-display text-3xl text-gold-200">{value}</div>
      <div className="mt-2 text-sm text-white/60">{label}</div>
    </div>
  );
}
