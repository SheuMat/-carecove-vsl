import { Prisma } from "@prisma/client";

import { getDb } from "@/lib/db";
import { fetchContractsFinderCareCandidates } from "@/lib/tenders/contracts-finder";
import { classifyTender } from "@/lib/tenders/classify";
import { INGEST_QUERY_GROUPS } from "@/lib/tenders/rules";

type SyncResult = {
  fetchedCount: number;
  storedCount: number;
  filteredCount: number;
  notes: string[];
};

export async function syncContractsFinderTenders(
  searchTerms = INGEST_QUERY_GROUPS.map((group) => group.label)
): Promise<SyncResult> {
  const db = getDb();
  const run = await db.syncRun.create({
    data: {
      source: "contracts_finder",
      searchTerms,
      status: "RUNNING"
    }
  });

  let fetchedCount = 0;
  let storedCount = 0;
  let filteredCount = 0;
  const notes: string[] = [];
  const runStartedAt = new Date();

  try {
    const { candidates, fetchedCount: sourceFetchedCount, queryGroups } =
      await fetchContractsFinderCareCandidates();
    fetchedCount = sourceFetchedCount;

    const staged = new Map<string, ReturnType<typeof classifyTender>>();

    for (const candidate of candidates) {
      const classified = classifyTender(candidate);
      const dedupeKey = `${classified.source}:${classified.sourceNoticeId}`;

      if (!classified.relevant) {
        filteredCount += 1;
        continue;
      }

      const existing = staged.get(dedupeKey);
      if (!existing || existing.relevanceScore < classified.relevanceScore) {
        staged.set(dedupeKey, classified);
      }
    }

    for (const candidate of staged.values()) {
      const existing = await db.tender.findFirst({
        where: {
          source: candidate.source,
          sourceNoticeId: candidate.sourceNoticeId
        },
        select: {
          id: true
        }
      });

      const data = {
        source: candidate.source,
        sourceNoticeId: candidate.sourceNoticeId,
        fingerprint: candidate.fingerprint,
        slug: candidate.slug,
        title: candidate.title,
        buyer: candidate.buyer,
        description: candidate.description,
        summary: candidate.summary,
        valueAmount: candidate.valueAmount,
        valueCurrency: candidate.valueCurrency,
        region: candidate.region,
        locationText: candidate.locationText,
        publishedAt: candidate.publishedAt,
        closingAt: candidate.closingAt,
        sourceUrl: candidate.sourceUrl,
        category: candidate.category,
        tags: candidate.tags,
        relevanceScore: candidate.relevanceScore,
        relevanceReasons: candidate.relevanceReasons,
        eligibilityNotes: candidate.eligibilityNotes,
        deadlineUrgency: candidate.deadlineUrgency,
        status:
          candidate.closingAt && candidate.closingAt.getTime() < Date.now() ? "EXPIRED" : "ACTIVE",
        searchText: candidate.searchText,
        rawPayload: candidate.rawPayload ?? Prisma.JsonNull,
        syncedAt: new Date()
      } as const;

      if (existing) {
        await db.tender.update({
          where: { id: existing.id },
          data
        });
      } else {
        await db.tender.create({
          data
        });
      }

      storedCount += 1;
    }

    await db.tender.updateMany({
      where: {
        source: "contracts_finder",
        syncedAt: {
          lt: runStartedAt
        },
        status: "ACTIVE"
      },
      data: {
        status: "STALE"
      }
    });

    await db.tender.updateMany({
      where: {
        closingAt: {
          lt: new Date()
        }
      },
      data: {
        status: "EXPIRED"
      }
    });

    await db.syncRun.update({
      where: { id: run.id },
      data: {
        searchTerms: queryGroups,
        fetchedCount,
        storedCount,
        filteredCount,
        status: "SUCCEEDED",
        notes: notes.join("\n"),
        completedAt: new Date()
      }
    });

    return {
      fetchedCount,
      storedCount,
      filteredCount,
      notes
    };
  } catch (error) {
    await db.syncRun.update({
      where: { id: run.id },
      data: {
        fetchedCount,
        storedCount,
        filteredCount,
        status: "FAILED",
        notes: error instanceof Error ? error.message : "Unknown sync failure",
        completedAt: new Date()
      }
    });

    throw error;
  }
}
