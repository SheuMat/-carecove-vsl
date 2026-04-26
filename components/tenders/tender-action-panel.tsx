"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { QualifyModal } from "@/components/tenders/qualify-modal";
import { publicConfig } from "@/lib/public-config";
import type { TenderListItem } from "@/lib/tenders/types";
import { formatCurrency, formatDate } from "@/lib/utils/format";

type TenderActionPanelProps = {
  tender: TenderListItem;
};

export function TenderActionPanel({ tender }: TenderActionPanelProps) {
  const [open, setOpen] = useState(false);

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
    <>
      <div className="rounded-[2rem] border border-plum-100 bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-700/60">
          Tender actions
        </p>
        <h3 className="mt-3 font-display text-3xl text-ink-900">Move on this tender with confidence.</h3>
        <p className="mt-4 text-base leading-8 text-plum-800/72">
          Use the qualification flow for a structured fit-check or jump straight into a prefilled tender
          writing call.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={() => setOpen(true)} variant="gold">
            Can I Qualify?
          </Button>
          <Button href={bookingUrl.toString()} target="_blank" variant="primary">
            Write This For Me
          </Button>
          <Button href={tender.sourceUrl} target="_blank" variant="outline">
            View Source Notice
          </Button>
        </div>
      </div>
      <QualifyModal onClose={() => setOpen(false)} open={open} tender={tender} />
    </>
  );
}
