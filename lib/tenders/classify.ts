import type { DeadlineUrgency, TenderCategory } from "@prisma/client";

import {
  BUYER_BONUSES,
  CHILDREN_HINT_TERMS,
  COMMUNITY_HINT_TERMS,
  GENERIC_CARE_TERMS,
  MINIMUM_RELEVANCE_SCORE,
  NEGATIVE_RULES,
  POSITIVE_RULES
} from "@/lib/tenders/rules";
import type {
  ClassifiedTenderCandidate,
  NormalizedTenderCandidate
} from "@/lib/tenders/types";

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function createTenderFingerprint(candidate: NormalizedTenderCandidate) {
  return [
    candidate.source.toLowerCase().trim(),
    candidate.sourceNoticeId.toLowerCase().trim(),
    slugify(candidate.title),
    candidate.publishedAt ? candidate.publishedAt.toISOString().slice(0, 10) : "tbc"
  ].join("|");
}

export function summariseDescription(description: string) {
  const cleaned = stripHtml(description);
  if (!cleaned) {
    return "Summary will appear after the next refresh.";
  }

  if (cleaned.length <= 240) {
    return cleaned;
  }

  return `${cleaned.slice(0, 237).trim()}...`;
}

export function buildSearchText(candidate: NormalizedTenderCandidate) {
  return [
    candidate.title,
    candidate.buyer,
    candidate.description,
    candidate.region,
    candidate.locationText
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getDeadlineUrgency(closingAt: Date | null): DeadlineUrgency {
  if (!closingAt) {
    return "TBC";
  }

  const now = Date.now();
  const diff = closingAt.getTime() - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days <= 7) {
    return "URGENT";
  }

  if (days <= 14) {
    return "SOON";
  }

  return "OPEN";
}

function deriveEligibilityNotes(searchable: string) {
  const notes = new Set<string>();

  if (searchable.includes("cqc")) {
    notes.add("CQC registration is likely to be expected.");
  }

  if (searchable.includes("good") || searchable.includes("outstanding")) {
    notes.add("The notice appears to reference minimum quality or inspection expectations.");
  }

  if (searchable.includes("minimum") || searchable.includes("experience")) {
    notes.add("Prior delivery experience may be important for qualification.");
  }

  if (searchable.includes("framework")) {
    notes.add("Review framework entry terms and lot structure before bidding.");
  }

  if (searchable.includes("tupe")) {
    notes.add("TUPE implications may need review.");
  }

  if (searchable.includes("mobilisation")) {
    notes.add("The mobilisation plan may be an important evaluation factor.");
  }

  return Array.from(notes);
}

function inferFallbackCategory(searchable: string): TenderCategory {
  if (CHILDREN_HINT_TERMS.some((term) => searchable.includes(term))) {
    return "CHILDRENS_SERVICES";
  }

  if (COMMUNITY_HINT_TERMS.some((term) => searchable.includes(term))) {
    return "COMMUNITY_SUPPORT";
  }

  return "SOCIAL_CARE";
}

export function classifyTender(candidate: NormalizedTenderCandidate): ClassifiedTenderCandidate {
  const cleanedDescription = stripHtml(candidate.description);
  const searchable = [
    candidate.title,
    candidate.buyer,
    cleanedDescription,
    candidate.region,
    candidate.locationText
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let score = 0;
  let winningCategory: TenderCategory = "OTHER";
  let winningWeight = 0;

  const tags = new Set<string>();
  const relevanceReasons = new Set<string>();

  for (const rule of POSITIVE_RULES) {
    const matchedKeywords = rule.keywords.filter((keyword) => searchable.includes(keyword));
    if (!matchedKeywords.length) {
      continue;
    }

    const titleBonus = matchedKeywords.some((keyword) =>
      candidate.title.toLowerCase().includes(keyword)
    )
      ? 6
      : 0;

    score += rule.weight + titleBonus;

    for (const tag of rule.tags) {
      tags.add(tag);
    }

    relevanceReasons.add(
      `${rule.label} terms matched: ${matchedKeywords.slice(0, 2).join(", ")}`
    );

    if (rule.weight > winningWeight) {
      winningWeight = rule.weight;
      winningCategory = rule.category;
    }
  }

  const genericContextMatches = GENERIC_CARE_TERMS.filter((term) => searchable.includes(term));
  if (genericContextMatches.length >= 3) {
    score += 10;
    relevanceReasons.add("Broad care-sector language detected");
  } else if (genericContextMatches.length >= 2) {
    score += 5;
  }

  for (const buyerRule of BUYER_BONUSES) {
    if (buyerRule.keywords.some((keyword) => searchable.includes(keyword))) {
      score += buyerRule.weight;
      relevanceReasons.add(buyerRule.reason);
    }
  }

  if (
    BUYER_BONUSES.some((rule) => rule.keywords.some((keyword) => searchable.includes(keyword))) &&
    genericContextMatches.length >= 2
  ) {
    score += 6;
    relevanceReasons.add("Public buyer and care context strengthen relevance");
  }

  for (const negativeRule of NEGATIVE_RULES) {
    if (negativeRule.keywords.some((keyword) => searchable.includes(keyword))) {
      score += negativeRule.weight;
      relevanceReasons.add(`Penalty: ${negativeRule.reason}`);
    }
  }

  const eligibilityNotes = deriveEligibilityNotes(searchable);
  const summary = summariseDescription(cleanedDescription);
  const slugBase = slugify(candidate.title);
  const slug = `${slugBase || "tender"}-${candidate.sourceNoticeId
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(-10)}`;

  const relevant = score >= MINIMUM_RELEVANCE_SCORE;
  if (winningCategory === "OTHER" && relevant) {
    winningCategory = inferFallbackCategory(searchable);
  }

  return {
    ...candidate,
    description: cleanedDescription,
    fingerprint: createTenderFingerprint(candidate),
    slug,
    summary,
    category: winningCategory,
    tags: Array.from(tags),
    relevanceScore: Math.max(score, 0),
    relevanceReasons: Array.from(relevanceReasons).slice(0, 4),
    eligibilityNotes,
    deadlineUrgency: getDeadlineUrgency(candidate.closingAt),
    searchText: searchable,
    relevant
  };
}
