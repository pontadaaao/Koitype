// ============================================================
// 既存「恋愛コラム」を恋愛ブログのデータ形式(BlogArticle)へ変換
// ------------------------------------------------------------
// - lib/static-columns.ts（コード内36件）
// - Supabase columns テーブル（管理画面で追加した公開記事）
// をまとめて BlogArticle[] として返す。カテゴリーは全て "column"（恋愛コラム）。
// 元の細かいカテゴリー（恋愛テクニック等）はタグとして保持し、関連記事に活用。
// サーバー専用（Supabase / 大きな static-columns を読み込むためクライアントに含めない）。
// ============================================================

import { supabase } from "@/lib/supabase";
import { staticColumns, getStaticColumnBySlug } from "@/lib/static-columns";
import {
  categoryLabel,
  estimateReadingMinutes,
  stripHtml,
  type BlogArticle,
} from "@/lib/microcms";

const COLUMN_CATEGORY_LABEL = categoryLabel("column"); // 恋愛コラム

function toIso(date: string | null | undefined): string {
  if (!date) return new Date(0).toISOString();
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? new Date(0).toISOString() : d.toISOString();
}

function excerptFrom(desc: string | null | undefined, content: string): string {
  const explicit = desc?.trim();
  if (explicit) return explicit.length > 120 ? `${explicit.slice(0, 120)}…` : explicit;
  const text = stripHtml(content);
  return text.length > 120 ? `${text.slice(0, 120)}…` : text;
}

// ---- static-columns → BlogArticle -----------------------------------------

function staticToArticle(col: (typeof staticColumns)[number]): BlogArticle {
  const contentHtml = col.content ?? "";
  return {
    id: `column-static-${col.slug}`,
    slug: col.slug,
    title: col.title,
    eyecatch: col.eyecatchUrl ? { url: col.eyecatchUrl } : null,
    categorySlug: "column",
    categoryLabel: COLUMN_CATEGORY_LABEL,
    categoryName: COLUMN_CATEGORY_LABEL,
    contentHtml,
    excerpt: excerptFrom(col.seoDescription, contentHtml),
    metaTitle: null,
    metaDescription: col.seoDescription ?? null,
    tags: col.category ? [col.category] : [],
    recommended: false,
    publishedAt: toIso(col.publishedAt),
    revisedAt: null,
    readingMinutes: estimateReadingMinutes(contentHtml),
  };
}

// ---- Supabase columns → BlogArticle ---------------------------------------

interface DbColumnSummary {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  eyecatch_url: string | null;
  seo_description: string | null;
  published_at: string | null;
  updated_at: string | null;
}

interface DbColumnFull extends DbColumnSummary {
  content: string;
  seo_title: string | null;
  tags: string[] | null;
}

function dbSummaryToArticle(row: DbColumnSummary): BlogArticle {
  return {
    id: `column-db-${row.id}`,
    slug: row.slug,
    title: row.title,
    eyecatch: row.eyecatch_url ? { url: row.eyecatch_url } : null,
    categorySlug: "column",
    categoryLabel: COLUMN_CATEGORY_LABEL,
    categoryName: COLUMN_CATEGORY_LABEL,
    contentHtml: "",
    excerpt: excerptFrom(row.seo_description, ""),
    metaTitle: null,
    metaDescription: row.seo_description ?? null,
    tags: row.category ? [row.category] : [],
    recommended: false,
    publishedAt: toIso(row.published_at),
    revisedAt: row.updated_at ? toIso(row.updated_at) : null,
    // 一覧では本文を持たないため概算（詳細取得時に正確化）
    readingMinutes: Math.max(2, Math.ceil((row.seo_description?.length ?? 200) / 200)),
  };
}

function dbFullToArticle(row: DbColumnFull): BlogArticle {
  const contentHtml = row.content ?? "";
  return {
    id: `column-db-${row.id}`,
    slug: row.slug,
    title: row.title,
    eyecatch: row.eyecatch_url ? { url: row.eyecatch_url } : null,
    categorySlug: "column",
    categoryLabel: COLUMN_CATEGORY_LABEL,
    categoryName: COLUMN_CATEGORY_LABEL,
    contentHtml,
    excerpt: excerptFrom(row.seo_description, contentHtml),
    metaTitle: row.seo_title?.trim() || null,
    metaDescription: row.seo_description ?? null,
    tags: [
      ...(row.category ? [row.category] : []),
      ...(row.tags ?? []),
    ],
    recommended: false,
    publishedAt: toIso(row.published_at),
    revisedAt: row.updated_at ? toIso(row.updated_at) : null,
    readingMinutes: estimateReadingMinutes(contentHtml),
  };
}

/** Supabase の公開コラム（サマリ）を取得。失敗時は空配列。 */
async function fetchDbColumnSummaries(): Promise<BlogArticle[]> {
  try {
    const { data, error } = await supabase
      .from("columns")
      .select(
        "id, title, slug, category, eyecatch_url, seo_description, published_at, updated_at"
      )
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error || !data) return [];
    return (data as DbColumnSummary[]).map(dbSummaryToArticle);
  } catch {
    return [];
  }
}

// ---- 公開API ---------------------------------------------------------------

/**
 * 既存コラム（static + Supabase）を BlogArticle[] で返す（一覧・前後・関連用）。
 * slug 重複は static を優先。
 */
export async function getColumnArticles(): Promise<BlogArticle[]> {
  const staticArticles = staticColumns.map(staticToArticle);
  const seen = new Set(staticArticles.map((a) => a.slug));
  const dbArticles = (await fetchDbColumnSummaries()).filter(
    (a) => !seen.has(a.slug)
  );
  return [...staticArticles, ...dbArticles];
}

/** slug で1件のコラムを本文込みで取得。static → Supabase の順。 */
export async function getColumnArticleBySlug(
  slug: string
): Promise<BlogArticle | null> {
  const staticCol = getStaticColumnBySlug(slug);
  if (staticCol) return staticToArticle(staticCol);

  try {
    const { data, error } = await supabase
      .from("columns")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error || !data) return null;
    return dbFullToArticle(data as DbColumnFull);
  } catch {
    return null;
  }
}
