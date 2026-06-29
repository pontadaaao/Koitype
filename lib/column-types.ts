export type ColumnStatus = "draft" | "published";

export type ColumnCategory =
  | "恋愛テクニック"
  | "心理・性格"
  | "告白・アプローチ"
  | "片思い"
  | "カップル"
  | "別れ・失恋"
  | "婚活・結婚"
  | "その他";

export const COLUMN_CATEGORIES: ColumnCategory[] = [
  "恋愛テクニック",
  "心理・性格",
  "告白・アプローチ",
  "片思い",
  "カップル",
  "別れ・失恋",
  "婚活・結婚",
];

export interface Column {
  id: string;
  title: string;
  slug: string;
  category: ColumnCategory;
  eyecatch_url: string | null;
  content: string;
  status: ColumnStatus;
  seo_title: string | null;
  seo_description: string | null;
  related_diagnosis: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

// 一覧取得用（contentを含まない）
export type ColumnSummary = Omit<Column, "content">;

export interface ColumnFormValues {
  title: string;
  slug: string;
  category: ColumnCategory;
  tags: string;
  eyecatch_url: string;
  content: string;
  status: ColumnStatus;
  seo_title: string;
  seo_description: string;
  related_diagnosis: string;
}
