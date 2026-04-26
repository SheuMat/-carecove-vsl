import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-[linear-gradient(135deg,#3d2278,#140a2e)] px-8 py-14 text-center text-white shadow-glow sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
          Limited spots available each month
        </p>
        <h2 className="mt-5 font-display text-5xl leading-tight">This is the call that changes everything.</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68">
          In 45 minutes, we&apos;ll look at exactly where your business is, where it needs to go, and
          what&apos;s been blocking you. No generic advice. No sales pitch. Just sharp, sector-specific
          strategy from someone who&apos;s built and sold a care business.
        </p>
        <div className="mt-8">
          <Button
            className="min-w-[280px]"
            href="https://scheduler.zoom.us/sheu-matewe/free-consultation"
            target="_blank"
            variant="gold"
          >
            Book Your Free Strategy Call With Sheu
          </Button>
        </div>
        <div className="mt-8 grid gap-3 text-left text-sm text-white/70 sm:grid-cols-2">
          <div>Completely free with no hidden charges</div>
          <div>Specific to your business and your challenges</div>
          <div>Walk away with a clear next step</div>
          <div>We only take on clients we can genuinely help</div>
        </div>
      </div>
    </section>
  );
}
