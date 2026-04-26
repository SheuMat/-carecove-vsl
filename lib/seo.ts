import type { Metadata } from "next";

import { env } from "@/lib/env";

export function absoluteUrl(path = "/") {
  return new URL(path, env.siteUrl).toString();
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website"
}: BuildMetadataInput): Metadata {
  const fullTitle = `${title} | Care Cove Limited`;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Care Cove Limited",
      locale: "en_GB",
      type
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
