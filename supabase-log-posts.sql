-- ============================================================
-- 恋ログ 投稿テーブル セットアップ（冪等・再実行OK）
-- Supabase ダッシュボード → SQL Editor に貼り付けて実行
-- ============================================================

-- ① テーブル作成（存在しなければ作成）
CREATE TABLE IF NOT EXISTS public.log_posts (
  id         BIGSERIAL   PRIMARY KEY,
  category   TEXT        NOT NULL,
  name       TEXT        NOT NULL,
  text       TEXT        NOT NULL,
  reacts     JSONB       NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ② RLS 有効化
ALTER TABLE public.log_posts ENABLE ROW LEVEL SECURITY;

-- ③ ポリシーを一度削除して再作成（冪等）
DROP POLICY IF EXISTS "Anyone can read log_posts"   ON public.log_posts;
DROP POLICY IF EXISTS "Anyone can insert log_posts" ON public.log_posts;
DROP POLICY IF EXISTS "Anyone can update reacts"    ON public.log_posts;

-- 全員が読める（匿名タイムライン）
CREATE POLICY "Anyone can read log_posts"
  ON public.log_posts
  FOR SELECT
  USING (true);

-- 全員が投稿できる（匿名投稿）
CREATE POLICY "Anyone can insert log_posts"
  ON public.log_posts
  FOR INSERT
  WITH CHECK (true);

-- リアクション更新のみ許可
CREATE POLICY "Anyone can update reacts"
  ON public.log_posts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ④ anon ロールへの権限付与
--    RLS ポリシーがあっても GRANT がないと anon キーから操作できない
GRANT SELECT, INSERT, UPDATE
  ON public.log_posts
  TO anon;

GRANT USAGE
  ON SEQUENCE public.log_posts_id_seq
  TO anon;

-- ============================================================
-- 確認クエリ（実行後にこれも走らせると状態を確認できる）
-- ============================================================

-- テーブル存在確認
-- SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public' AND table_name = 'log_posts';

-- カラム確認
-- SELECT column_name, data_type, is_nullable, column_default
--   FROM information_schema.columns
--  WHERE table_name = 'log_posts'
--  ORDER BY ordinal_position;

-- RLS ポリシー確認
-- SELECT policyname, cmd, qual, with_check
--   FROM pg_policies
--  WHERE tablename = 'log_posts';

-- GRANT 確認
-- SELECT grantee, privilege_type
--   FROM information_schema.role_table_grants
--  WHERE table_name = 'log_posts';
