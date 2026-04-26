import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { env } from "@/lib/env";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Care Business Consultant UK | Care Cove Limited",
    template: "%s | Care Cove Limited",
  },
  description:
    "UK-wide consultancy for care providers covering CQC registration support, care tender writing, private client growth, Google Ads, AI systems, and healthcare growth strategy.",
  keywords: [
    "CQC registration support UK",
    "care tender writing UK",
    "care business consultant UK",
    "private clients for care agencies",
    "healthcare growth consultant UK",
  ],
  openGraph: {
    title: "Care Business Consultant UK | Care Cove Limited",
    description:
      "UK-wide consultancy for care providers: CQC registration support, care tender writing, private client growth, Google Ads, AI systems, and strategy.",
    url: env.siteUrl,
    siteName: "Care Cove Limited",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Business Consultant UK | Care Cove Limited",
    description:
      "UK-wide consultancy for care providers: CQC registration support, care tender writing, private client growth, Google Ads, AI systems, and strategy.",
  },
  verification: {
    google: "shNMp2JfOgl3VYPTyvW8CuIno_HY79k3Rb4gv9BADbA",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans text-ink-900 antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}