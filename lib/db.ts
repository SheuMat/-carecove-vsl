import { PrismaClient } from "@prisma/client";

import { isDatabaseConfigured } from "@/lib/env";

declare global {
  var __careCovePrisma: PrismaClient | undefined;
}

export function getDb() {
  if (!isDatabaseConfigured()) {
    throw new Error(
      "DATABASE_URL is not configured. Set DATABASE_URL or enable USE_DEMO_TENDERS for local UI-only mode."
    );
  }

  if (!global.__careCovePrisma) {
    global.__careCovePrisma = new PrismaClient();
  }

  return global.__careCovePrisma;
}
