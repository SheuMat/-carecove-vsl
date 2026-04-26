import { JsonLd } from "@/components/schemas/json-ld";
import { env } from "@/lib/env";

export function WebsiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Care Cove Limited",
        url: env.siteUrl,
        inLanguage: "en-GB",
        description:
          "UK-wide consultancy for care providers covering CQC registration support, tender writing, private client growth, Google Ads, and AI systems."
      }}
    />
  );
}
