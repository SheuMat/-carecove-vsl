import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TenderActionPanel } from "@/components/tenders/tender-action-panel";
import { getTenderBySlug } from "@/lib/tenders/repository";
import { absoluteUrl } from "@/lib/seo";
import { formatCurrency, formatDate, formatDeadlineLabel } from "@/lib/utils/format";

type TenderDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: TenderDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tender = await getTenderBySlug(resolvedParams.slug);

  if (!tender) {
    return {
      title: "Tender not found"
    };
  }

  return {
    title: tender.title,
    description:
      tender.summary ||
      tender.description ||
      "Care-sector tender opportunity with UK-wide tender writing support available.",
    keywords: [
      tender.title,
      "care tender writing UK",
      "live care tenders UK",
      tender.category.replaceAll("_", " ").toLowerCase()
    ],
    alternates: {
      canonical: absoluteUrl(`/tenders/${tender.slug}`)
    },
    openGraph: {
      title: `${tender.title} | Care Cove Limited`,
      description:
        tender.summary ||
        tender.description ||
        "Care-sector tender opportunity with UK-wide tender writing support available.",
      url: absoluteUrl(`/tenders/${tender.slug}`),
      type: "article",
      siteName: "Care Cove Limited",
      locale: "en_GB"
    },
    twitter: {
      card: "summary_large_image",
      title: `${tender.title} | Care Cove Limited`,
      description:
        tender.summary ||
        tender.description ||
        "Care-sector tender opportunity with UK-wide tender writing support available."
    }
  };
}

export default async function TenderDetailPage({ params }: TenderDetailPageProps) {
  const resolvedParams = await params;
  const tender = await getTenderBySlug(resolvedParams.slug);

  if (!tender) {
    notFound();
  }

  const relevanceReasons = Array.isArray(tender.relevanceReasons) ? tender.relevanceReasons : [];
  const eligibilityNotes = Array.isArray(tender.eligibilityNotes) ? tender.eligibilityNotes : [];

  return (
    <div className="px-5 pb-20 pt-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.75fr]">
          <section className="rounded-[2.5rem] border border-plum-100 bg-white p-8 shadow-glow">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-plum-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-plum-700">
                {tender.category.replaceAll("_", " ")}
              </span>
              <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                Relevance {tender.relevanceScore}
              </span>
            </div>

            <h1 className="mt-6 font-display text-5xl leading-tight text-ink-900">{tender.title}</h1>
            <p className="mt-4 text-sm uppercase tracking-[0.24em] text-plum-700/55">{tender.buyer}</p>

            <p className="mt-8 text-lg leading-9 text-plum-800/78">
              {tender.summary || "No summary available yet."}
            </p>

            <dl className="mt-8 grid gap-4 rounded-[2rem] border border-plum-100 bg-mist p-5 sm:grid-cols-2">
              <Metric label="Region" value={tender.region || "United Kingdom"} />
              <Metric
                label="Value"
                value={formatCurrency(tender.valueAmount, tender.valueCurrency || "GBP")}
              />
              <Metric label="Published" value={formatDate(tender.publishedAt)} />
              <Metric label="Closing" value={`${formatDate(tender.closingAt)} · ${formatDeadlineLabel(tender.closingAt)}`} />
            </dl>

            {relevanceReasons.length ? (
              <section className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-700/55">
                  Why this tender looks relevant
                </h2>
                <ul className="mt-4 space-y-3 text-base leading-8 text-plum-800/74">
                  {relevanceReasons.map((reason) => (
                    <li key={reason}>• {reason}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {eligibilityNotes.length ? (
              <section className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-700/55">
                  Eligibility notes
                </h2>
                <ul className="mt-4 space-y-3 text-base leading-8 text-plum-800/74">
                  {eligibilityNotes.map((note) => (
                    <li key={note}>• {note}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {tender.description ? (
              <section className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-700/55">
                  Tender description
                </h2>
                <div className="mt-4 rounded-[2rem] border border-plum-100 bg-mist p-6 text-base leading-8 text-plum-800/76">
                  {tender.description}
                </div>
              </section>
            ) : null}
          </section>

          <aside className="space-y-6">
            <TenderActionPanel tender={tender} />
            <div className="rounded-[2rem] border border-plum-100 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-700/55">
                Source
              </p>
              <p className="mt-3 text-base leading-8 text-plum-800/74">
                Source ID: {tender.sourceNoticeId}
                <br />
                Last synced: {new Date(tender.syncedAt).toLocaleString("en-GB")}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-700/50">{label}</dt>
      <dd className="mt-2 text-sm text-ink-900">{value}</dd>
    </div>
  );
}
