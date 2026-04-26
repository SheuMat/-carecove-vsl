import { JsonLd } from "@/components/schemas/json-ld";
import { env } from "@/lib/env";

export function OrganizationSchema() {
  const logoUrl = new URL("/logo.png", env.siteUrl).toString();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Care Cove Limited",
    url: env.siteUrl,
    logo: logoUrl,
    areaServed: {
      "@type": "Country",
      name: "United Kingdom"
    },
    knowsAbout: [
      "CQC registration support UK",
      "care tender writing UK",
      "care business consultant UK",
      "private clients for care agencies",
      "healthcare growth consultant UK"
    ],
    sameAs: [
      "https://www.linkedin.com/in/sheu-matewe-66aa10379",
      "https://www.tiktok.com/@care_covelimited?_r=1&_t=ZN-94uKFr62uNq"
    ],
    description:
      "Care Cove helps UK care providers grow through CQC support, tender writing, private client growth, and commercial strategy."
  };

  return <JsonLd data={schema} />;
}
