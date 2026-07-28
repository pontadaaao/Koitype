// クライアント側で扱う記事カードの軽量データ（本文HTMLを含まない）。
import type { BlogCategorySlug } from "@/lib/microcms";

export interface BlogCardData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  eyecatchUrl: string | null;
  eyecatchWidth: number | null;
  eyecatchHeight: number | null;
  categorySlug: BlogCategorySlug | null;
  categoryLabel: string;
  /** microCMS で設定された具体的なカテゴリ名（例: 実際の体験談）。 */
  categoryName: string;
  tags: string[];
  recommended: boolean;
  publishedAt: string;
  readingMinutes: number;
}
