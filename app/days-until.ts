// Whole calendar days from `now` until `day` (YYYY-MM-DD), counted in Eastern
// time so the number flips at midnight in Columbia, not in the viewer's zone.
// 0 means the event is today; negative means it has passed.
export function daysUntil(day: string, now: Date): number {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now); // en-CA formats as YYYY-MM-DD
  // Both parse as UTC midnight, so the difference is an exact number of days.
  return Math.round((Date.parse(day) - Date.parse(today)) / 86_400_000);
}
