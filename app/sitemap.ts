import type { MetadataRoute } from "next";

import { servicePages } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/services", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/tenders", changeFrequency: "daily" as const, priority: 0.8 }
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority
    })),
    ...servicePages.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85
    }))
  ];
}
