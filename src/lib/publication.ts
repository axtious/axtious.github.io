import { site } from "../config/site.ts";

export function todayInAlgiers(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: site.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) =>
    parts.find((entry) => entry.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function isPublished(
  data: { draft: boolean; pubDate: string },
  now = new Date(),
): boolean {
  return !data.draft && data.pubDate <= todayInAlgiers(now);
}
