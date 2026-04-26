import type { TenderCategory, DeadlineUrgency } from "@prisma/client";

type FilterToolbarProps = {
  q: string;
  region: string;
  service: string;
  urgency: string;
  sort: string;
  availableRegions: string[];
  availableServices: Array<{
    value: TenderCategory;
    label: string;
  }>;
  onChange: (field: "q" | "region" | "service" | "urgency" | "sort", value: string) => void;
};

const urgencyOptions: Array<{ value: DeadlineUrgency; label: string }> = [
  { value: "URGENT", label: "Closing this week" },
  { value: "SOON", label: "Closing in 14 days" },
  { value: "OPEN", label: "Open tenders" },
  { value: "TBC", label: "Deadline TBC" }
];

export function FilterToolbar({
  q,
  region,
  service,
  urgency,
  sort,
  availableRegions,
  availableServices,
  onChange
}: FilterToolbarProps) {
  return (
    <div className="sticky top-[88px] z-30 rounded-[2rem] border border-plum-100 bg-white/95 p-5 shadow-soft backdrop-blur">
      <div className="grid gap-4 lg:grid-cols-[1.4fr,repeat(4,minmax(0,1fr))]">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-plum-600/70">
            Search
          </span>
          <input
            className="w-full rounded-2xl border border-plum-100 bg-mist px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-plum-400 focus:bg-white"
            onChange={(event) => onChange("q", event.target.value)}
            placeholder="Search care tenders..."
            value={q}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-plum-600/70">
            Region
          </span>
          <select
            className="w-full rounded-2xl border border-plum-100 bg-mist px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-plum-400 focus:bg-white"
            onChange={(event) => onChange("region", event.target.value)}
            value={region}
          >
            <option value="">All regions</option>
            {availableRegions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-plum-600/70">
            Service
          </span>
          <select
            className="w-full rounded-2xl border border-plum-100 bg-mist px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-plum-400 focus:bg-white"
            onChange={(event) => onChange("service", event.target.value)}
            value={service}
          >
            <option value="">All services</option>
            {availableServices.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-plum-600/70">
            Urgency
          </span>
          <select
            className="w-full rounded-2xl border border-plum-100 bg-mist px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-plum-400 focus:bg-white"
            onChange={(event) => onChange("urgency", event.target.value)}
            value={urgency}
          >
            <option value="">All deadlines</option>
            {urgencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-plum-600/70">
            Sort by
          </span>
          <select
            className="w-full rounded-2xl border border-plum-100 bg-mist px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-plum-400 focus:bg-white"
            onChange={(event) => onChange("sort", event.target.value)}
            value={sort}
          >
            <option value="relevance">Highest relevance</option>
            <option value="closing">Closing soonest</option>
            <option value="newest">Newest first</option>
            <option value="value">Highest value</option>
          </select>
        </label>
      </div>
    </div>
  );
}
