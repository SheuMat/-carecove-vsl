import { JsonLd } from "@/components/schemas/json-ld";
import { FaqSchema } from "@/components/schemas/faq-schema";
import { OrganizationSchema } from "@/components/schemas/organization-schema";
import { WebsiteSchema } from "@/components/schemas/website-schema";
import { CtaSection } from "@/components/marketing/cta-section";
import { FounderSection } from "@/components/marketing/founder-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { ProblemSection } from "@/components/marketing/problem-section";
import { ServicesSection } from "@/components/marketing/services-section";
import { TenderPromoSection } from "@/components/marketing/tender-promo-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { VslSection } from "@/components/marketing/vsl-section";
import { servicePages } from "@/content/services";
import { siteContent } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { listTenders } from "@/lib/tenders/repository";

export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Care Business Consultant UK",
  description:
    "UK-wide consultancy for care providers offering CQC registration support UK, care tender writing UK, private client growth, Google Ads for care agencies, and AI systems for care providers.",
  path: "/",
  keywords: [
    "CQC registration support UK",
    "care tender writing UK",
    "care business consultant UK",
    "private clients for care agencies",
    "healthcare growth consultant UK"
  ]
});

export default async function HomePage() {
  const tenderData = await listTenders(
    {
      pageSize: 3
    },
    {
      sourceFallbackStrategy: "instant"
    }
  );

  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <FaqSchema items={siteContent.faq} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "UK care consultancy services",
          itemListElement: servicePages.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/services/${service.slug}`),
            name: service.name
          }))
        }}
      />
      <HeroSection />
      <VslSection />
      <ProblemSection />
      <ServicesSection />
      <TenderPromoSection total={tenderData.summary.total} urgent={tenderData.summary.urgent} />
      <FounderSection />
      <TestimonialsSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}
