import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";

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

/**
 * 恋愛ブログ記事（microCMS + Supabase + static を統合）由来のお知らせ材料。
 * ブログはサーバー専用データのため、/api/notifications 経由でクライアントに渡す。
 */
export type BlogNotifEntry = { date: string; title: string };

function toDisplayDate(iso: string): string {
  return iso.replace(/-/g, ".");
}

/** コード内データ（リリース・診断・心理テスト）由来のお知らせ。クライアントで即時利用可。 */
export function buildStaticEntries(): RawEntry[] {
  return [
    ...specialEntries,
    ...diagnoses
      .filter((d) => d.publishedAt)
      .map((d) => ({ date: toDisplayDate(d.publishedAt!), category: "love-diagnosis" as const, title: d.title })),
    ...loveTests
      .filter((t) => t.publishedAt)
      .map((t) => ({ date: toDisplayDate(t.publishedAt!), category: "psychology-test" as const, title: t.title })),
  ];
}

/** コード内データ + 恋愛ブログ（API取得）を統合した全お知らせ材料。 */
export function buildAllEntries(blog: BlogNotifEntry[] = []): RawEntry[] {
  return [
    ...buildStaticEntries(),
    ...blog.map((b) => ({ date: b.date, category: "love-column" as const, title: b.title })),
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

/**
 * 集計済みお知らせリストから未読件数を算出。
 * lastVisited: YYYY-MM-DD 形式（localStorage）。null なら全件未読。
 */
export function getUnreadCount(items: AggregatedItem[], lastVisited: string | null): number {
  if (!lastVisited) return items.length;
  // display date は YYYY.MM.DD なので変換して比較
  const lastDisplay = lastVisited.replace(/-/g, ".");
  return items.filter((item) => item.date > lastDisplay).length;
}
