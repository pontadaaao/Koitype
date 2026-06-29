-- ============================================================
-- Koitype 恋愛コラム テーブル
-- Supabaseのコンソール → SQL Editor で実行してください
-- ============================================================

create table if not exists public.columns (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  category         text not null default 'その他',
  tags             text[] not null default '{}',
  eyecatch_url     text,
  content          text not null default '',
  status           text not null default 'draft' check (status in ('draft', 'published')),
  seo_title        text,
  seo_description  text,
  related_diagnosis text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  published_at     timestamptz
);

-- スラッグに一意インデックス（既にunique制約があるが念のため）
create unique index if not exists columns_slug_unique on public.columns (slug);

-- updated_at を自動更新するトリガー
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_columns_updated on public.columns;
create trigger on_columns_updated
  before update on public.columns
  for each row
  execute procedure public.handle_updated_at();

-- ============================================================
-- RLS（Row Level Security）設定
-- ============================================================

-- RLSを有効化
alter table public.columns enable row level security;

-- 公開記事は誰でも読める（公開ページ用）
create policy "Public can read published columns"
  on public.columns
  for select
  using (status = 'published');

-- サービスロールはすべての操作が可能（管理画面用）
-- サービスロールキーを使ったクライアントはRLSをバイパスするため追加設定不要

-- ============================================================
-- サンプルデータ（必要に応じて削除してください）
-- ============================================================

insert into public.columns (
  title, slug, category, tags, content, status, seo_title, seo_description, published_at
) values (
  '片思い中でも送っていいLINEとダメなLINE',
  'kataomoi-line',
  '片思い',
  array['LINE', '片思い', '連絡'],
  '<p>好きな人に送るLINEって、どこまでがOKでどこからがNG？</p><h2>送っていいLINE</h2><p>反応しやすいメッセージは好印象です。たとえば「最近どう？」より「今日〇〇があったんだけど聞いてもらえる？」のように、相手が返しやすい内容がベターです。</p><h2>注意が必要なLINE</h2><p>一方的な長文や「なんで返信くれないの？」というような責め方は逆効果。まずは相手のペースを尊重しましょう。</p>',
  'published',
  '片思いで送っていいLINEとダメなLINE【恋愛コラム】',
  '片思いの相手へのLINEで悩んでいませんか？好印象を与えるLINEと、避けるべきLINEの違いをわかりやすく解説します。',
  now()
);
