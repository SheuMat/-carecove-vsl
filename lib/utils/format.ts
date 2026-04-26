const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

export function formatCurrency(value: number | null | undefined, currency = "GBP") {
  if (!value) {
    return "Value not disclosed";
  }

  if (value >= 1_000_000) {
    return `£${(value / 1_000_000).toFixed(1)}m`;
  }

  if (value >= 1_000) {
    return `£${(value / 1_000).toFixed(0)}k`;
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatDate(value: string | null | undefined) {
  if (!value) {
    return "Not specified";
  }

  return dateFormatter.format(new Date(value));
}

export function daysUntil(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const now = new Date();
  const target = new Date(value);
  const diff = target.getTime() - now.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDeadlineLabel(value: string | null | undefined) {
  const days = daysUntil(value);

  if (days === null) {
    return "Deadline TBC";
  }

  if (days <= 0) {
    return "Closed";
  }

  if (days <= 7) {
    return `${days} day${days === 1 ? "" : "s"} left`;
  }

  if (days <= 14) {
    return `${days} days left`;
  }

  return `Closes in ${days} days`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
