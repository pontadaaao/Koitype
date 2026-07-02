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
