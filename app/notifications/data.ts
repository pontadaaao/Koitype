import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";
import { staticColumns } from "@/lib/static-columns";

export type SpecialCategory = "launch";
export type ContentCategory = "love-diagnosis" | "psychology-test" | "love-column";
export type NotificationCategory = ContentCategory | SpecialCategory;

export type NotificationEntry = {
  date: string; // YYYY.MM.DD
  category: NotificationCategory;
  title: string;
};

// リリースや特別なお知らせはここに追加
export const specialEntries: NotificationEntry[] = [
  { date: "2026.07.02", category: "launch", title: "Koitypeをリリースしました" },
];

export type RawEntry = { date: string; category: NotificationCategory; title: string };
export type AggregatedItem = { key: string; date: string; category: NotificationCategory; titles: string[] };

function toDisplayDate(iso: string): string {
  return iso.replace(/-/g, ".");
}

export function buildAllEntries(): RawEntry[] {
  return [
    ...specialEntries,
    ...diagnoses
      .filter((d) => d.publishedAt)
      .map((d) => ({ date: toDisplayDate(d.publishedAt!), category: "love-diagnosis" as const, title: d.title })),
    ...loveTests
      .filter((t) => t.publishedAt)
      .map((t) => ({ date: toDisplayDate(t.publishedAt!), category: "psychology-test" as const, title: t.title })),
    ...staticColumns.map((c) => ({
      date: toDisplayDate(c.publishedAt),
      category: "love-column" as const,
      title: c.title,
    })),
  ];
}

export function aggregate(entries: RawEntry[]): AggregatedItem[] {
  const map = new Map<string, AggregatedItem>();
  for (const e of entries) {
    const key = `${e.date}__${e.category}`;
    const existing = map.get(key);
    if (existing) {
      existing.titles.push(e.title);
    } else {
      map.set(key, { key, date: e.date, category: e.category, titles: [e.title] });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
}

export const NOTIFICATIONS_LS_KEY = "koitype_notifications_last_visited";

// lastVisited: YYYY-MM-DD 形式の文字列（localStorage から取得）
export function getUnreadCount(lastVisited: string | null): number {
  const all = aggregate(buildAllEntries());
  if (!lastVisited) return all.length;
  // display date は YYYY.MM.DD なので変換して比較
  const lastDisplay = lastVisited.replace(/-/g, ".");
  return all.filter((item) => item.date > lastDisplay).length;
}
