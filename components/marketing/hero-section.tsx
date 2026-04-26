import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteContent } from "@/content/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink-900 px-5 pb-16 pt-20 text-white sm:px-8 lg:pb-24 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-care-radial" />
      <div className="pointer-events-none absolute inset-0 grid-halo opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-plum-500/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-gold-300/25 bg-gold-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-100">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-emerald-300" />
            {siteContent.hero.eyebrow}
          </div>

          <h1 className="mt-8 max-w-4xl font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
            <span className="block">{siteContent.hero.title[0]}</span>
            <span className="mt-2 block text-gold-200">
              {siteContent.hero.title[1].split(" ").slice(0, -1).join(" ")}{" "}
              <em>{siteContent.hero.title[1].split(" ").slice(-1)}</em>
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-9 text-white/70 sm:text-xl">
            {siteContent.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              className="min-w-[240px]"
              href="https://scheduler.zoom.us/sheu-matewe/free-consultation"
              target="_blank"
              variant="gold"
            >
              {siteContent.hero.cta}
            </Button>
            <Button className="min-w-[220px]" href="/tenders" variant="ghost">
              Browse Live Tenders
            </Button>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <p className="text-sm text-white/55">{siteContent.hero.reassure}</p>
            <p className="text-sm text-white/60">
              Supporting care providers across the UK.{" "}
              <Link className="text-gold-200 transition-colors hover:text-gold-100" href="/services">
                Explore our consultancy services
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-glow backdrop-blur xl:grid-cols-4">
          {siteContent.hero.shelf.map((item) => (
            <div
              className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5"
              key={item.label}
            >
              <div className="font-display text-3xl text-gold-200">{item.value}</div>
              <div className="mt-2 text-sm text-white/58">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-full border border-white/10 bg-white/5 py-4">
          <div className="flex min-w-max items-center gap-5 px-6 text-sm uppercase tracking-[0.2em] text-white/50">
            {[...siteContent.hero.ticker, ...siteContent.hero.ticker].map((item, index) => (
              <div className="flex items-center gap-5" key={`${item}-${index}`}>
                <span>{item}</span>
                <span className="text-gold-200">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
