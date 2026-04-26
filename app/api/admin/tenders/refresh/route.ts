import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { syncContractsFinderTenders } from "@/lib/tenders/ingest";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization");
  const headerSecret = request.headers.get("x-refresh-secret");

  return (
    (authHeader && authHeader === `Bearer ${env.refreshSecret}`) ||
    (headerSecret && headerSecret === env.refreshSecret)
  );
}

export async function POST(request: Request) {
  if (!env.refreshSecret || !isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await syncContractsFinderTenders();
  revalidatePath("/");
  revalidatePath("/tenders");

  return NextResponse.json(result);
}
