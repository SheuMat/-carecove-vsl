# Care Cove Website Rebuild

This project upgrades the original static Care Cove site into a production-oriented `Next.js + TypeScript + Tailwind + Prisma` application with a server-driven tender intelligence pipeline.

## What changed

- The landing page is now component-based and easier to extend.
- Tenders are designed to be ingested server-side, stored in Postgres, classified, deduplicated, and served from Care Cove's own API.
- The "Can I Qualify?" flow now submits to a backend route instead of relying on `mailto:`.
- The app includes protected refresh endpoints, a sync script, API routes, and database models for tenders, sync runs, and leads.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` using the variables documented in `docs/architecture.md`.
   A starter template is included in `.env.example`.

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Push the schema to your Postgres database:

```bash
npm run prisma:push
```

5. Optionally seed demo records:

```bash
npm run db:seed
```

6. Start the app:

```bash
npm run dev
```

## Main commands

- `npm run dev` - local development
- `npm run build` - production build
- `npm run start` - serve production build
- `npm run typecheck` - TypeScript checks
- `npm run lint` - linting
- `npm run sync:tenders` - run server-side Contracts Finder ingestion
- `npm run db:seed` - insert demo tenders

## Local modes

- `USE_DEMO_TENDERS=true` lets the UI run without a database while you review the landing page and tender experience.
- With `DATABASE_URL` configured, the app reads and writes real tender and lead records through Prisma.

## Vercel deployment

This project is configured as a dynamic Next.js app for Vercel deployment.

- `next.config.ts` does not use `output: "export"`.
- API routes under `app/api/*` stay active.
- Live tenders remain active at `/tenders` and `/tenders/[slug]`.
- `vercel.json` already includes a scheduled call to `/api/cron/tenders` every 6 hours.

### Deploy steps

1. Push the repo to GitHub, GitLab, or Bitbucket.
2. Import the project into Vercel as a Next.js app.
3. Keep the default Vercel build settings:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output: Next.js default
4. Add the environment variables from `.env.example` in the Vercel project settings.
5. Set `NEXT_PUBLIC_SITE_URL` to your real production domain so metadata and absolute logo URLs resolve correctly.
6. Ensure `DATABASE_URL` points to a reachable Postgres database before enabling live tenders in production.
7. Before the first production deploy, apply the Prisma schema with:

```bash
npm run prisma:generate
npm run prisma:push
```

8. Deploy on Vercel.

### Environment variables

Required for live tender and API features:

- `DATABASE_URL`: Postgres connection string for tenders, leads, and sync runs.
- `CRON_SECRET`: protects `/api/cron/tenders`.
- `TENDER_REFRESH_SECRET`: protects `/api/admin/tenders/refresh`.

Required for production metadata/logo URLs:

- `NEXT_PUBLIC_SITE_URL`: your production site URL, for example `https://care-cove.vercel.app`.

Optional:

- `QUALIFY_WEBHOOK_URL`: forwards lead submissions to Zapier, HubSpot, or another webhook target.
- `NEXT_PUBLIC_ZOOM_BOOKING_URL`: client-side booking URL override.
- `ZOOM_BOOKING_URL`: server-side booking URL override.
- `USE_DEMO_TENDERS`: set to `true` only for demo mode without the live tender database.

### Deployment notes

- Do not enable static export for this project.
- Do not remove API routes; the tender and lead flows rely on them.
- If your Vercel project uses cron, make sure `CRON_SECRET` is set so the scheduled sync can authenticate.
- If you want the tender sync to run immediately after deploy, call the protected refresh route once after the database is ready.

## Architecture

See [docs/architecture.md](/Users/sheumatewe/Library/CloudStorage/OneDrive-carecove.co.uk/Care Cove Limited/Care cove website/carecove-vsl/docs/architecture.md) for the end-to-end tender pipeline, schema, API design, and deployment notes.
