function normaliseSiteUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export const env = {
  siteUrl:
    normaliseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    normaliseSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    normaliseSiteUrl(process.env.VERCEL_URL) ||
    "http://localhost:3000",
  zoomBookingUrl:
    process.env.ZOOM_BOOKING_URL ||
    process.env.NEXT_PUBLIC_ZOOM_BOOKING_URL ||
    "https://scheduler.zoom.us/sheu-matewe/free-consultation",
  refreshSecret: process.env.TENDER_REFRESH_SECRET || "",
  cronSecret: process.env.CRON_SECRET || "",
  qualifyWebhookUrl: process.env.QUALIFY_WEBHOOK_URL || "",
  databaseUrl: process.env.DATABASE_URL || "",
  useDemoTenders: process.env.USE_DEMO_TENDERS === "true"
};

export function isDatabaseConfigured() {
  return Boolean(env.databaseUrl) && !env.useDemoTenders;
}
