import Link from "next/link";

import { Button } from "@/components/ui/button";

type TenderPromoSectionProps = {
  total: number;
  urgent: number;
};

export function TenderPromoSection({ total, urgent }: TenderPromoSectionProps) {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] bg-[linear-gradient(135deg,#140a2e,#3d2278,#5535a0)] px-8 py-10 text-white shadow-glow lg:grid-cols-[1.2fr,0.9fr] lg:px-12">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-gold-300/30 bg-gold-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-100">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-emerald-300" />
            Updated from Contracts Finder
          </div>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Looking for live care contracts to bid for?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
            Browse our faster, server-driven tender intelligence page. Relevant notices are fetched
            server-side, classified for the care sector, deduplicated, and served from Care
            Cove&apos;s own API.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/tenders" variant="gold">
              Browse Live Tenders
            </Button>
            <Button
              href="https://scheduler.zoom.us/sheu-matewe/free-consultation"
              target="_blank"
              variant="ghost"
            >
              Book a Tender Review Call
            </Button>
          </div>
          <p className="mt-4 text-sm text-white/62">
            Need bid support too?{" "}
            <Link className="text-gold-200 transition-colors hover:text-gold-100" href="/services/tender-writing">
              Explore our care tender writing service
            </Link>
            .
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6">
            <div className="font-display text-4xl text-gold-200">{total}</div>
            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/48">Active tenders</p>
          </div>
          <div className="rounded-[2rem] border border-gold-300/30 bg-gold-300/10 p-6">
            <div className="font-display text-4xl text-gold-100">{urgent}</div>
            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-gold-100/70">
              Closing this week
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6">
            <div className="font-display text-3xl text-white">Can I Qualify?</div>
            <p className="mt-3 text-base leading-7 text-white/65">
              Submit a proper backend qualification request instead of relying on clunky email flows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
