"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// 診断・テストの結果ページ下部に出す「この結果におすすめの恋愛ブログ」セクション。
// - /api/blog/cards から全記事の軽量カードを取得（引数なしで CDN キャッシュ済み）
// - 結果テキスト(matchText)に記事タグが含まれる数でスコアリングし、関連度順に表示
// - 一致が無くても新着記事を出してブログへ送客する（常に導線を作る）

interface BlogCard {
  slug: string;
  title: string;
  categoryName: string;
  tags: string[];
  eyecatchUrl: string | null;
  publishedAt: string;
}

/** 結果テキストとの関連度が高い順に n 件選ぶ。一致0でも新着で埋める。 */
function pickRelated(cards: BlogCard[], matchText: string, n: number): BlogCard[] {
  const text = matchText;
  const scored = cards.map((c) => ({
    card: c,
    score: c.tags.reduce((acc, tag) => (tag && text.includes(tag) ? acc + 1 : acc), 0),
  }));
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      new Date(b.card.publishedAt).getTime() - new Date(a.card.publishedAt).getTime()
  );
  return scored.slice(0, n).map((s) => s.card);
}

export default function RelatedBlogArticles({
  matchText,
  heading = "この結果におすすめの恋愛ブログ",
}: {
  matchText: string;
  heading?: string;
}) {
  const [cards, setCards] = useState<BlogCard[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/blog/cards")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && Array.isArray(d.cards)) setCards(d.cards as BlogCard[]);
      })
      .catch(() => {
        /* 取得失敗時は非表示（サイトは壊さない） */
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!cards || cards.length === 0) return null;
  const picked = pickRelated(cards, matchText, 3);
  if (picked.length === 0) return null;

  return (
    <section className="mt-2 border-t border-pink-light/60 bg-base px-4 py-8 text-left sm:px-6">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-3 flex items-center gap-1.5 font-heading text-base font-bold text-text-main">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-accent"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {heading}
        </h2>

        <ul className="space-y-2">
          {picked.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/blog/${c.slug}`}
                className="flex items-center gap-3 rounded-2xl border border-pink-light bg-white px-3 py-3 transition-colors hover:border-accent/40 hover:bg-pink-pale/30"
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-pink-pale">
                  {c.eyecatchUrl ? (
                    <Image
                      src={c.eyecatchUrl}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-accent/50">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </span>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 block text-sm font-medium leading-snug text-text-main">
                    {c.title}
                  </span>
                  <span className="mt-1 inline-block rounded-full bg-pink-pale px-2 py-0.5 text-[10px] font-medium text-accent">
                    {c.categoryName}
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 text-text-sub/40"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-white px-6 py-2.5 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            恋愛ブログをもっと見る
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
