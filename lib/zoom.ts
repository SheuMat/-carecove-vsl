import { env } from "@/lib/env";

type ZoomLeadContext = {
  tenderTitle: string;
  contactName: string;
  businessName: string;
  serviceType: string;
  cqcStatus: string;
  cqcRating?: string | null;
};

export function buildZoomBookingUrl(context: ZoomLeadContext) {
  const topic = `Tender Qualification: ${context.tenderTitle.slice(0, 70)}`;
  const notes = [
    `Name: ${context.contactName}`,
    `Business: ${context.businessName}`,
    `Service type: ${context.serviceType}`,
    `CQC: ${context.cqcStatus}${context.cqcRating ? ` (${context.cqcRating})` : ""}`,
    `Tender: ${context.tenderTitle}`
  ].join("\n");

  const url = new URL(env.zoomBookingUrl);
  url.searchParams.set("topic", topic);
  url.searchParams.set("notes", notes);
  return url.toString();
}
