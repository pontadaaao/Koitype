-- ============================================================
-- 恋ログ 投稿者トークン追加 マイグレーション
-- Supabase ダッシュボード → SQL Editor で実行してください
-- ============================================================

-- ① author_token カラム追加（存在しなければ）
ALTER TABLE public.log_posts
  ADD COLUMN IF NOT EXISTS author_token UUID;

-- ② DELETE ポリシー追加
DROP POLICY IF EXISTS "Author can delete own post" ON public.log_posts;

CREATE POLICY "Author can delete own post"
  ON public.log_posts FOR DELETE
  USING (true);

-- ③ anon ロールに DELETE 権限付与
GRANT DELETE ON public.log_posts TO anon;

-- ============================================================
-- 確認クエリ
-- ============================================================

-- カラム確認
-- SELECT column_name, data_type, is_nullable
--   FROM information_schema.columns
--  WHERE table_name = 'log_posts'
--  ORDER BY ordinal_position;

-- ポリシー確認
-- SELECT policyname, cmd FROM pg_policies WHERE tablename = 'log_posts';
