import { z } from "zod";

export const qualifyFormSchema = z.object({
  tenderId: z.string().optional(),
  tenderTitle: z.string().min(4),
  contactName: z.string().min(2),
  role: z.string().min(2).optional().or(z.literal("")),
  email: z.string().email(),
  phone: z.string().min(7),
  businessName: z.string().min(2),
  serviceType: z.string().min(2),
  businessAge: z.string().optional().or(z.literal("")),
  cqcStatus: z.string().min(2),
  cqcRating: z.string().optional().or(z.literal("")),
  currentContracts: z.string().optional().or(z.literal("")),
  capacityBand: z.string().optional().or(z.literal("")),
  regions: z.string().optional().or(z.literal("")),
  tenderExperience: z.string().optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
  contactPreference: z.enum(["CALLBACK", "ZOOM", "EMAIL"])
});

export type QualifyFormInput = z.infer<typeof qualifyFormSchema>;
