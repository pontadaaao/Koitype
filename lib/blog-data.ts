// ============================================================
// 恋愛ブログ データ統合レイヤー（サーバー専用）
// ------------------------------------------------------------
// microCMS の記事 と 既存コラム（static + Supabase）を統合して返す。
// ページはこのモジュール経由でデータを取得する（microcms を直接使わない）。
// ※ 大きな static-columns / Supabase を含むため、クライアントからは import しない。
// ============================================================

import {
  getAllArticles as getMicrocmsArticles,
  getArticleBySlug as getMicrocmsArticleBySlug,
  type BlogArticle,
  type BlogCategorySlug,
} from "@/lib/microcms";
import {
  getColumnArticles,
  getColumnArticleBySlug,
} from "@/lib/blog-columns";

function sortByPublishedDesc(a: BlogArticle, b: BlogArticle): number {
  return (
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** 全記事（microCMS + コラム）。slug 重複は microCMS 優先。公開日降順。 */
export async function getBlogArticles(): Promise<BlogArticle[]> {
  const [microcms, columns] = await Promise.all([
    getMicrocmsArticles(),
    getColumnArticles(),
  ]);
  const seen = new Set(microcms.map((a) => a.slug));
  const merged = [...microcms, ...columns.filter((a) => !seen.has(a.slug))];
  return merged.sort(sortByPublishedDesc);
}

/**
 * microCMS で「おすすめ」指定された記事を新着順で取得（最大 limit 件）。
 * おすすめは microCMS のみ対象（既存コラムは含めない）。
 */
export async function getRecommendedArticles(
  limit = 5
): Promise<BlogArticle[]> {
  const microcms = await getMicrocmsArticles();
  return microcms.filter((a) => a.recommended).slice(0, limit);
}

/** slug で1記事を本文込みで取得。microCMS → コラムの順。無ければ null。 */
export async function getBlogArticleBySlug(
  slug: string
): Promise<BlogArticle | null> {
  const fromCms = await getMicrocmsArticleBySlug(slug);
  if (fromCms) return fromCms;
  return getColumnArticleBySlug(slug);
}

/** カテゴリー別。column は既存コラムを含む。 */
export async function getBlogArticlesByCategory(
  slug: BlogCategorySlug
): Promise<BlogArticle[]> {
  const all = await getBlogArticles();
  return all.filter((a) => a.categorySlug === slug);
}

/** sitemap 用の全 slug と日付。 */
export async function getBlogArticleSlugs(): Promise<
  { slug: string; revisedAt: string | null; publishedAt: string }[]
> {
  const all = await getBlogArticles();
  return all.map((a) => ({
    slug: a.slug,
    revisedAt: a.revisedAt,
    publishedAt: a.publishedAt,
  }));
}
