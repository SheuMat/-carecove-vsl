import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { syncContractsFinderTenders } from "@/lib/tenders/ingest";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization");
  const headerSecret = request.headers.get("x-cron-secret");

  return (
    (authHeader && authHeader === `Bearer ${env.cronSecret}`) ||
    (headerSecret && headerSecret === env.cronSecret)
  );
}

export async function GET(request: Request) {
  if (!env.cronSecret || !isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await syncContractsFinderTenders();
  revalidatePath("/");
  revalidatePath("/tenders");

  return NextResponse.json(result);
}
