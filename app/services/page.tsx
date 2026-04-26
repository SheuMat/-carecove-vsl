import Link from "next/link";

import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/schemas/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { servicePages } from "@/content/services";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Care Business Consultant UK",
  description:
    "Explore UK-wide consultancy services for care providers including CQC registration support, care tender writing, private client growth, Google Ads, and AI systems.",
  path: "/services",
  keywords: [
    "care business consultant UK",
    "healthcare growth consultant UK",
    "CQC registration support UK",
    "care tender writing UK",
    "private clients for care agencies"
  ]
});

export const revalidate = 86400;

export default function ServicesHubPage() {
  return (
    <div className="bg-white px-5 pb-20 pt-12 sm:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Care consultancy services",
          url: absoluteUrl("/services"),
          description:
            "UK-wide consultancy services for care providers covering CQC registration support, care tender writing, private client growth, Google Ads, and AI systems."
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: absoluteUrl("/")
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: absoluteUrl("/services")
            }
          ]
        }}
      />

      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#140a2e,#3d2278,#5535a0)] px-8 py-12 text-white shadow-glow sm:px-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-gold-300/30 bg-gold-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-100">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-emerald-300" />
              UK-wide consultancy for care providers
            </div>
            <h1 className="mt-6 font-display text-5xl leading-tight sm:text-6xl">
              Strategic services built to help UK care providers grow properly.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-white/72">
              Care Cove works nationally with care businesses that need stronger compliance,
              better tenders, more private clients, smarter demand generation, and systems that
              support scale rather than stress.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                href="https://scheduler.zoom.us/sheu-matewe/free-consultation"
                target="_blank"
                variant="gold"
              >
                Book Your Free Strategy Call
              </Button>
              <Button href="/tenders" variant="ghost">
                Browse Live Tenders
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading
            intro="These pages are designed for providers searching nationally for care-sector expertise, but the work itself remains practical, commercial, and tailored to your specific growth stage."
            label="Core Services"
            title="Specialist support across the growth problems care providers face most."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {servicePages.map((service) => (
              <article
                className="flex h-full flex-col rounded-[2rem] border border-plum-100 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
                key={service.slug}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-500">
                  {service.metaTitle}
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink-900">
                  {service.name}
                </h2>
                <p className="mt-4 text-base leading-8 text-plum-800/72">{service.excerpt}</p>
                <ul className="mt-6 space-y-3 text-sm text-plum-800/72">
                  {service.outcomes.slice(0, 3).map((outcome) => (
                    <li key={outcome}>• {outcome}</li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    className="inline-flex text-sm font-semibold text-plum-800 transition-colors hover:text-gold-500"
                    href={`/services/${service.slug}`}
                  >
                    Read the full service page
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2.5rem] border border-plum-100 bg-mist px-8 py-12 shadow-soft sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-500">
                Why Providers Choose Care Cove
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink-900 sm:text-5xl">
                National positioning. Practical execution. Care-sector credibility.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-plum-800/75">
                We are not a generic marketing agency or a consultant trying to retrofit general
                business advice onto care. Care Cove is positioned as a UK-wide growth partner for
                care providers because the support is rooted in care-sector reality: CQC, tenders,
                commissioners, private-pay families, systems, and scale.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-plum-700/55">
                Next Step
              </p>
              <h3 className="mt-3 font-display text-3xl text-ink-900">
                Book a strategy call and get a clearer commercial plan.
              </h3>
              <p className="mt-4 text-base leading-8 text-plum-800/72">
                We will look at your current growth bottlenecks, where revenue is being lost, and
                which service will create the strongest next move.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Button
                  href="https://scheduler.zoom.us/sheu-matewe/free-consultation"
                  target="_blank"
                  variant="gold"
                >
                  Book Your Free Strategy Call
                </Button>
                <Button href="/" variant="outline">
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
