# Care Cove Architecture

## 1. Current build problems

The original website is visually strong, but the implementation creates technical risk:

- The site is split across static HTML, a large shared stylesheet, and imperative browser-side JavaScript.
- The live tenders experience depends on multiple browser requests to GOV.UK through public CORS proxy services.
- The tender page has no proper persistence, no reliable deduplication, no real caching layer, and no backend classification pipeline.
- The qualification flow ends in `mailto:`, which is fragile and blocks future CRM, webhook, booking, and admin integrations.
- Repeated markup and inline logic make the site hard to scale or maintain.

## 2. Chosen stack

- `Next.js` App Router for modern SSR, route handlers, page metadata, and deploy-ready structure.
- `TypeScript` for shared types across UI, APIs, and ingest services.
- `Tailwind CSS` for reusable, design-system-like styling while preserving the premium Care Cove direction.
- `Prisma + PostgreSQL` for tender storage, lead capture records, sync logging, and future admin/dashboard work.
- `Server-side API routes` for tenders, lead capture, and protected refresh jobs.

## 3. Why this is better than the static build

- Initial page loads can be server-rendered with cached data instead of waiting for browser fetch waterfalls.
- Tender search, filtering, and sorting operate against Care Cove's own API and database.
- The ingestion pipeline can deduplicate, normalise, classify, and score tenders before users ever see them.
- Lead capture becomes a backend workflow with validation and storage instead of email-only handoffs.
- Sections, cards, CTAs, schemas, and layouts are broken into reusable components.

## 4. Project structure

```text
app/
  api/
    admin/tenders/refresh/route.ts
    cron/tenders/route.ts
    leads/route.ts
    tenders/route.ts
    tenders/[id]/route.ts
  tenders/
    [slug]/page.tsx
    page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  layout/
  marketing/
  tenders/
  ui/
content/
  site.ts
docs/
  architecture.md
lib/
  forms/
  tenders/
  utils/
  db.ts
  demo-data.ts
  env.ts
  zoom.ts
prisma/
  schema.prisma
scripts/
  seed-demo.ts
  sync-tenders.ts
```

## 5. Database schema

### `Tender`

Stores the canonical tender record shown to users.

- source
- sourceNoticeId
- fingerprint
- slug
- title
- buyer
- description
- summary
- valueAmount / valueCurrency
- region
- locationText
- publishedAt / closingAt
- sourceUrl
- category
- tags
- relevanceScore
- relevanceReasons
- eligibilityNotes
- deadlineUrgency
- searchText
- rawPayload
- syncedAt / createdAt / updatedAt

### `LeadSubmission`

Stores "Can I Qualify?" submissions for later CRM or workflow integrations.

- contact details
- tender reference
- service type
- CQC status and rating
- operating regions
- preferred response type
- submission payload snapshot
- lead status

### `SyncRun`

Tracks ingestion health and helps operational visibility.

- source
- searchTerms
- fetchedCount
- storedCount
- filteredCount
- status
- notes
- startedAt / completedAt

## 6. Tender ingestion approach

### Source

Primary source is GOV.UK Contracts Finder using the OCDS search endpoint.

### Ingestion flow

1. A scheduled job or protected route triggers the sync.
2. The server searches Contracts Finder using a curated care-focused term list.
3. Raw releases are normalised into a common tender shape.
4. Each candidate is scored against inclusion and exclusion rules.
5. Only relevant tenders pass the relevance threshold.
6. Records are deduplicated using source identifiers plus a stable fingerprint.
7. Canonical tender rows are inserted or updated in Postgres.
8. Stale or expired tenders are marked accordingly after the run.

### Relevance model

The first version uses deterministic scoring instead of browser keyword matching:

- weighted care-sector keyword groups
- buyer/context bonuses
- exclusion rules for irrelevant procurement categories
- derived category and tags
- deadline urgency
- short summary and eligibility hints

This is intentionally built so AI summarisation or classification can be added later without changing the UI contract.

## 7. API design

### `GET /api/tenders`

Returns paginated tenders from Care Cove storage.

Supported query params:

- `q`
- `region`
- `service`
- `urgency`
- `sort`
- `page`
- `pageSize`

### `GET /api/tenders/[id]`

Returns the full single tender record for detail pages or integrations.

### `POST /api/leads`

Validates and records a qualification lead, optionally forwarding it to a webhook.

### `POST /api/admin/tenders/refresh`

Protected manual refresh endpoint for admin use.

### `GET /api/cron/tenders`

Protected endpoint for scheduled sync services such as Vercel Cron or external schedulers.

## 8. Performance model

- The tender page reads from local storage or Postgres instead of browser-direct GOV.UK calls.
- First page data can be server-rendered, so users see results immediately.
- API responses include cache headers, and Next revalidation hooks are available after ingest.
- Search and filters only query Care Cove's own API and only request the current page.
- The UI keeps result payloads lean by returning summaries instead of entire raw source documents.

## 9. Environment variables

```bash
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ZOOM_BOOKING_URL=https://scheduler.zoom.us/sheu-matewe/free-consultation
TENDER_REFRESH_SECRET=
CRON_SECRET=
QUALIFY_WEBHOOK_URL=
ZOOM_BOOKING_URL=https://scheduler.zoom.us/sheu-matewe/free-consultation
USE_DEMO_TENDERS=false
```

## 10. Where to change tender keywords

Tender ingestion keywords, scoring weights, and exclusions live in:

- [lib/tenders/rules.ts](/Users/sheumatewe/Library/CloudStorage/OneDrive-carecove.co.uk/Care Cove Limited/Care cove website/carecove-vsl/lib/tenders/rules.ts)

## 11. How scheduled refresh works

- Local/manual: `npm run sync:tenders`
- Admin trigger: `POST /api/admin/tenders/refresh`
- Cron trigger: `GET /api/cron/tenders`

Both protected routes expect the appropriate secret header so the tender source is never refreshed from public browser traffic.

## 12. Deployment notes

- The app is ready for Vercel-style deployment, including an example `vercel.json` cron entry.
- Set `DATABASE_URL` to Supabase Postgres, Neon, or another managed Postgres provider.
- Run `npm run prisma:generate` during install and `npm run prisma:push` against the target database before first launch.
- Protect `/api/admin/tenders/refresh` with `TENDER_REFRESH_SECRET` and `/api/cron/tenders` with `CRON_SECRET`.
