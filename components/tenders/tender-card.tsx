import Link from "next/link";

import { Button } from "@/components/ui/button";
import { publicConfig } from "@/lib/public-config";
import type { TenderListItem } from "@/lib/tenders/types";
import { formatCurrency, formatDate, formatDeadlineLabel } from "@/lib/utils/format";

type TenderCardProps = {
  tender: TenderListItem;
  onQualify: (tender: TenderListItem) => void;
};

export function TenderCard({ tender, onQualify }: TenderCardProps) {
  const tags = Array.isArray(tender.tags) ? tender.tags : [];
  const relevanceReasons = Array.isArray(tender.relevanceReasons) ? tender.relevanceReasons : [];
  const bookingUrl = new URL(publicConfig.zoomBookingUrl);
  bookingUrl.searchParams.set("topic", `Tender Writing: ${tender.title.slice(0, 70)}`);
  bookingUrl.searchParams.set(
    "notes",
    [
      `Tender: ${tender.title}`,
      `Buyer: ${tender.buyer}`,
      `Closing: ${formatDate(tender.closingAt)}`,
      `Value: ${formatCurrency(tender.valueAmount, tender.valueCurrency || "GBP")}`
    ].join("\n")
  );

  return (
    <article className="rounded-[2rem] border border-plum-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-plum-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-plum-700">
          {tender.category.replaceAll("_", " ")}
        </span>
        <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
          Score {tender.relevanceScore}
        </span>
        {tender.deadlineUrgency === "URGENT" ? (
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
            Closing soon
          </span>
        ) : null}
      </div>

      <div className="mt-5">
        <Link className="font-display text-3xl leading-tight text-ink-900 hover:text-plum-700" href={`/tenders/${tender.slug}`}>
          {tender.title}
        </Link>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-plum-700/55">{tender.buyer}</p>
      </div>

      <p className="mt-5 text-base leading-8 text-plum-800/74">{tender.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.slice(0, 4).map((tag) => (
          <span className="rounded-full border border-plum-100 bg-mist px-3 py-1 text-sm text-plum-700" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <dl className="mt-6 grid gap-4 rounded-[1.5rem] border border-plum-100 bg-mist p-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-700/50">Region</dt>
          <dd className="mt-2 text-sm text-ink-900">{tender.region || "United Kingdom"}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-700/50">Value</dt>
          <dd className="mt-2 text-sm text-ink-900">
            {formatCurrency(tender.valueAmount, tender.valueCurrency || "GBP")}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-700/50">Closing</dt>
          <dd className="mt-2 text-sm text-ink-900">{formatDate(tender.closingAt)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-700/50">Urgency</dt>
          <dd className="mt-2 text-sm text-ink-900">{formatDeadlineLabel(tender.closingAt)}</dd>
        </div>
      </dl>

      {relevanceReasons.length ? (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-700/50">
            Why it matches
          </p>
          <ul className="mt-3 space-y-2 text-sm text-plum-800/72">
            {relevanceReasons.slice(0, 3).map((reason) => (
              <li key={reason}>• {reason}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button className="flex-1" onClick={() => onQualify(tender)} variant="gold">
          Can I Qualify?
        </Button>
        <Button className="flex-1" href={bookingUrl.toString()} target="_blank" variant="primary">
          Write This For Me
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-plum-700/55">
        <Link className="hover:text-plum-700" href={`/tenders/${tender.slug}`}>
          View details
        </Link>
        <a className="hover:text-plum-700" href={tender.sourceUrl} rel="noreferrer" target="_blank">
          Source notice
        </a>
      </div>
    </article>
  );
}
