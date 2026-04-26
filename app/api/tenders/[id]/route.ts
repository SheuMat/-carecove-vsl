import { NextResponse } from "next/server";

import { getTenderById } from "@/lib/tenders/repository";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const params = await context.params;
  const tender = await getTenderById(params.id);

  if (!tender) {
    return NextResponse.json({ error: "Tender not found" }, { status: 404 });
  }

  return NextResponse.json(tender, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
    }
  });
}
