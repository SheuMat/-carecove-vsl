import { getDb } from "@/lib/db";
import { getDemoTenders } from "@/lib/demo-data";

async function main() {
  const db = getDb();
  const demoTenders = getDemoTenders();

  for (const tender of demoTenders) {
    await db.tender.upsert({
      where: {
        fingerprint: `${tender.title.toLowerCase()}|${tender.buyer.toLowerCase()}|${tender.closingAt || "tbc"}|${tender.valueAmount || "na"}`
      },
      update: {
        title: tender.title,
        buyer: tender.buyer,
        description: tender.description,
        summary: tender.summary,
        valueAmount: tender.valueAmount,
        valueCurrency: tender.valueCurrency,
        region: tender.region,
        locationText: tender.locationText,
        publishedAt: tender.publishedAt ? new Date(tender.publishedAt) : null,
        closingAt: tender.closingAt ? new Date(tender.closingAt) : null,
        sourceUrl: tender.sourceUrl,
        category: tender.category,
        tags: tender.tags,
        relevanceScore: tender.relevanceScore,
        relevanceReasons: tender.relevanceReasons,
        eligibilityNotes: tender.eligibilityNotes,
        deadlineUrgency: tender.deadlineUrgency,
        status: tender.status,
        searchText: [tender.title, tender.summary, tender.description, tender.region].filter(Boolean).join(" ").toLowerCase(),
        syncedAt: new Date()
      },
      create: {
        source: tender.source,
        sourceNoticeId: tender.sourceNoticeId,
        fingerprint: `${tender.title.toLowerCase()}|${tender.buyer.toLowerCase()}|${tender.closingAt || "tbc"}|${tender.valueAmount || "na"}`,
        slug: tender.slug,
        title: tender.title,
        buyer: tender.buyer,
        description: tender.description,
        summary: tender.summary,
        valueAmount: tender.valueAmount,
        valueCurrency: tender.valueCurrency,
        region: tender.region,
        locationText: tender.locationText,
        publishedAt: tender.publishedAt ? new Date(tender.publishedAt) : null,
        closingAt: tender.closingAt ? new Date(tender.closingAt) : null,
        sourceUrl: tender.sourceUrl,
        category: tender.category,
        tags: tender.tags,
        relevanceScore: tender.relevanceScore,
        relevanceReasons: tender.relevanceReasons,
        eligibilityNotes: tender.eligibilityNotes,
        deadlineUrgency: tender.deadlineUrgency,
        status: tender.status,
        searchText: [tender.title, tender.summary, tender.description, tender.region].filter(Boolean).join(" ").toLowerCase(),
        rawPayload: tender,
        syncedAt: new Date()
      }
    });
  }

  console.log(`Seeded ${demoTenders.length} tenders`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
