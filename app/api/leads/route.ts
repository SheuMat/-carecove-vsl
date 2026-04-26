import { NextResponse } from "next/server";

import { createLeadSubmission } from "@/lib/forms/lead-service";
import { qualifyFormSchema } from "@/lib/forms/lead-schema";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = qualifyFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid lead payload",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const result = await createLeadSubmission(parsed.data);

  return NextResponse.json(result, {
    status: 201
  });
}
