-- ============================================================
-- 恋愛ブログ 閲覧数テーブル セットアップ（冪等・再実行OK）
-- Supabase ダッシュボード → SQL Editor に貼り付けて実行
-- ============================================================

-- ① テーブル作成（存在しなければ作成）
CREATE TABLE IF NOT EXISTS public.blog_views (
  article_slug TEXT        PRIMARY KEY,
  view_count   BIGINT      NOT NULL DEFAULT 0,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ② 閲覧数を集計する index（ランキング取得の高速化）
CREATE INDEX IF NOT EXISTS blog_views_count_idx
  ON public.blog_views (view_count DESC);

-- ③ RLS 有効化
ALTER TABLE public.blog_views ENABLE ROW LEVEL SECURITY;

-- ④ ポリシー（読み取りは全員可。直接の書き込みは不可＝関数経由のみ）
DROP POLICY IF EXISTS "Anyone can read blog_views" ON public.blog_views;
CREATE POLICY "Anyone can read blog_views"
  ON public.blog_views
  FOR SELECT
  USING (true);

-- ⑤ 閲覧数を +1 する関数（原子的 upsert）
--    SECURITY DEFINER によりテーブルの直接書き込み権限が無くても実行可能。
CREATE OR REPLACE FUNCTION public.increment_blog_view(slug_input TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.blog_views (article_slug, view_count, updated_at)
    VALUES (slug_input, 1, NOW())
  ON CONFLICT (article_slug)
  DO UPDATE SET
    view_count = public.blog_views.view_count + 1,
    updated_at = NOW();
END;
$$;

-- ⑥ 権限付与
GRANT SELECT ON public.blog_views TO anon;
GRANT EXECUTE ON FUNCTION public.increment_blog_view(TEXT) TO anon;

-- ============================================================
-- 確認クエリ（任意）
-- ============================================================
-- SELECT * FROM public.blog_views ORDER BY view_count DESC LIMIT 5;
-- SELECT public.increment_blog_view('test-slug');
