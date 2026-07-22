// ============================================================
// 恋愛ブログ 閲覧数（人気記事ランキング）
// ------------------------------------------------------------
// Supabase の blog_views テーブルに記事ごとの閲覧数を保存する。
// - 加算はクライアントから RPC (increment_blog_view) を呼ぶ（同一セッション重複防止）
// - ランキング取得はサーバー側で view_count 降順に上位を取得
// - Supabase 未設定・失敗時は null / 空配列を返し、機能を壊さない
// ============================================================

import { supabase } from "@/lib/supabase";

export interface BlogView {
  articleSlug: string;
  viewCount: number;
  updatedAt: string;
}

interface DbBlogView {
  article_slug: string;
  view_count: number;
  updated_at: string;
}

/** Supabase 設定が有効か（環境変数が揃っているか）。 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * 人気記事の slug を閲覧数の多い順で取得。
 * Supabase が使えない・テーブル未作成の場合は null を返す
 * （呼び出し側で人気記事セクションを非表示にできる）。
 */
export async function getPopularSlugs(
  limit = 5
): Promise<{ slug: string; viewCount: number }[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase
      .from("blog_views")
      .select("article_slug, view_count, updated_at")
      .order("view_count", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Supabase blog_views select error:", error.message);
      return null;
    }
    if (!data) return [];
    return (data as DbBlogView[]).map((r) => ({
      slug: r.article_slug,
      viewCount: r.view_count,
    }));
  } catch (err) {
    console.error("Supabase blog_views error:", err);
    return null;
  }
}

/**
 * 記事の閲覧数を +1 する（クライアントから呼ぶ）。
 * Postgres の RPC で原子的に upsert する。失敗しても例外を投げない。
 */
export async function incrementBlogView(slug: string): Promise<void> {
  if (!slug || !isSupabaseConfigured()) return;
  try {
    const { error } = await supabase.rpc("increment_blog_view", {
      slug_input: slug,
    });
    if (error) {
      // テーブル/関数未作成でも致命的にしない
      console.warn("increment_blog_view failed:", error.message);
    }
  } catch (err) {
    console.warn("increment_blog_view error:", err);
  }
}
