import { getDb } from "@/lib/db";
import { env, isDatabaseConfigured } from "@/lib/env";
import { buildZoomBookingUrl } from "@/lib/zoom";
import type { QualifyFormInput } from "@/lib/forms/lead-schema";

export async function createLeadSubmission(input: QualifyFormInput) {
  const bookingUrl = buildZoomBookingUrl({
    tenderTitle: input.tenderTitle,
    contactName: input.contactName,
    businessName: input.businessName,
    serviceType: input.serviceType,
    cqcStatus: input.cqcStatus,
    cqcRating: input.cqcRating
  });

  let leadId = `demo_${Date.now()}`;

  if (isDatabaseConfigured()) {
    const lead = await getDb().leadSubmission.create({
      data: {
        tenderId: input.tenderId,
        tenderTitle: input.tenderTitle,
        contactName: input.contactName,
        role: input.role || null,
        email: input.email,
        phone: input.phone,
        businessName: input.businessName,
        serviceType: input.serviceType,
        businessAge: input.businessAge || null,
        cqcStatus: input.cqcStatus,
        cqcRating: input.cqcRating || null,
        currentContracts: input.currentContracts || null,
        capacityBand: input.capacityBand || null,
        regions: input.regions || null,
        tenderExperience: input.tenderExperience || null,
        notes: input.notes || null,
        contactPreference: input.contactPreference,
        payload: input
      }
    });

    leadId = lead.id;
  }

  if (env.qualifyWebhookUrl) {
    await fetch(env.qualifyWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        leadId,
        bookingUrl,
        ...input
      })
    }).catch(() => null);
  }

  return {
    leadId,
    bookingUrl
  };
}
