import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FaqSchema } from "@/components/schemas/faq-schema";
import { JsonLd } from "@/components/schemas/json-ld";
import { getServicePageBySlug, servicePages } from "@/content/services";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400;

export function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({
  params
}: ServiceDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServicePageBySlug(resolvedParams.slug);

  if (!service) {
    return buildMetadata({
      title: "Service not found",
      description: "The requested service page could not be found.",
      path: `/services/${resolvedParams.slug}`
    });
  }

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const resolvedParams = await params;
  const service = getServicePageBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white px-5 pb-20 pt-12 sm:px-8">
      <FaqSchema items={service.faq} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.name,
          areaServed: {
            "@type": "Country",
            name: "United Kingdom"
          },
          provider: {
            "@type": "Organization",
            name: "Care Cove Limited",
            url: absoluteUrl("/")
          },
          description: service.metaDescription,
          url: absoluteUrl(`/services/${service.slug}`),
          audience: {
            "@type": "Audience",
            audienceType: "UK care providers"
          }
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
            },
            {
              "@type": "ListItem",
              position: 3,
              name: service.name,
              item: absoluteUrl(`/services/${service.slug}`)
            }
          ]
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link className="text-sm font-medium text-plum-700 transition-colors hover:text-gold-500" href="/services">
            ← Back to all services
          </Link>
        </div>

        <section className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#140a2e,#3d2278,#5535a0)] px-8 py-12 text-white shadow-glow sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-gold-300/30 bg-gold-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-100">
                <span className="h-2 w-2 animate-pulse-glow rounded-full bg-emerald-300" />
                UK-wide service for care providers
              </div>
              <h1 className="mt-6 font-display text-5xl leading-tight sm:text-6xl">
                {service.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-white/72">{service.intro}</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">
                {service.nationalPitch}
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

            <aside className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-100/80">
                Ideal For
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/75">
                {service.idealFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/7 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-100/75">
                  Target Keywords
                </p>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {service.keywords.slice(0, 3).join(" · ")}
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.08fr,0.92fr]">
          <div className="space-y-8">
            {service.sections.map((section) => (
              <article
                className="rounded-[2rem] border border-plum-100 bg-white p-8 shadow-soft"
                key={section.title}
              >
                <h2 className="font-display text-4xl leading-tight text-ink-900">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-plum-800/76">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-plum-100 bg-mist p-8 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-500">
                Outcomes
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink-900">
                What this service is designed to improve.
              </h2>
              <ul className="mt-6 space-y-3 text-base leading-8 text-plum-800/76">
                {service.outcomes.map((outcome) => (
                  <li key={outcome}>• {outcome}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-plum-100 bg-white p-8 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-500">
                Deliverables
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink-900">
                What support can include.
              </h2>
              <ul className="mt-6 space-y-3 text-base leading-8 text-plum-800/76">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>• {deliverable}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2.5rem] bg-[linear-gradient(135deg,#3d2278,#140a2e)] px-8 py-12 text-white shadow-glow sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
                {service.ctaTitle}
              </p>
              <h2 className="mt-4 font-display text-5xl leading-tight">
                Strategy first. Execution that actually fits the care sector.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
                {service.ctaBody}
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-100/80">
                Next Step
              </p>
              <p className="mt-4 text-base leading-8 text-white/72">
                If you want a UK-wide consultancy partner that understands care-sector pressure and
                growth reality, start with a focused strategy conversation.
              </p>
              <div className="mt-6 flex flex-col gap-4">
                <Button
                  href="https://scheduler.zoom.us/sheu-matewe/free-consultation"
                  target="_blank"
                  variant="gold"
                >
                  Book Your Free Strategy Call
                </Button>
                <Button href="/services" variant="ghost">
                  Explore More Services
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-plum-100 bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-500">
            Frequently Asked Questions
          </p>
          <div className="mt-6 space-y-4">
            {service.faq.map((item) => (
              <details
                className="group rounded-[1.5rem] border border-plum-100 bg-mist px-6 py-5"
                key={item.question}
              >
                <summary className="cursor-pointer list-none font-display text-2xl text-ink-900">
                  {item.question}
                </summary>
                <p className="mt-4 text-base leading-8 text-plum-800/74">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
