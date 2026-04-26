import Link from "next/link";

import { servicePages } from "@/content/services";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServicesSection() {
  return (
    <section className="px-5 py-20 sm:px-8" id="solution">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          intro="Care Cove is a UK-wide care business consultancy supporting providers with CQC registration support, care tender writing, private client growth, Google Ads, and AI systems built for real care-sector growth."
          label="The Care Cove Way"
          title="National consultancy services built specifically for care providers."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {servicePages.map((service, index) => (
            <article
              className="group rounded-[2rem] border border-plum-100 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
              key={service.slug}
            >
              <div className="inline-flex rounded-full border border-gold-200 bg-gold-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 font-display text-3xl leading-tight text-ink-900">
                {service.name}
              </h3>
              <p className="mt-4 text-base leading-8 text-plum-800/72">{service.excerpt}</p>
              <Link
                className="mt-6 inline-flex text-sm font-semibold text-plum-800 transition-colors hover:text-gold-500"
                href={`/services/${service.slug}`}
              >
                Explore this UK service
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            className="inline-flex text-sm font-semibold text-plum-800 transition-colors hover:text-gold-500"
            href="/services"
          >
            View all consultancy services
          </Link>
        </div>
      </div>
    </section>
  );
}
