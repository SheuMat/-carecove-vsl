import { NextResponse } from "next/server";

import { parseTenderQuery } from "@/lib/tenders/query";
import { listTenders } from "@/lib/tenders/repository";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = parseTenderQuery(url.searchParams);
  const data = await listTenders(query);

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
    }
  });
}
