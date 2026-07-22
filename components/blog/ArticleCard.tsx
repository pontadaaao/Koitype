"use client";

import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/blog/FavoriteButton";
import type { BlogCardData } from "@/components/blog/types";

const CATEGORY_PILL: Record<string, string> = {
  column: "bg-fuchsia-100 text-fuchsia-700",
  blog: "bg-violet-100 text-violet-700",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  // 2カラムの狭いカードでもカテゴリタグと1行に並ぶよう短い形式にする
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}

/** 恋愛ブログの記事カード。1列（スマホ）〜複数列（PC）のグリッドで使用。 */
export default function ArticleCard({ article }: { article: BlogCardData }) {
  const pill = article.categorySlug
    ? CATEGORY_PILL[article.categorySlug] ?? "bg-pink-100 text-pink-700"
    : "bg-gray-100 text-gray-600";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-pink-light/70 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
      <Link
        href={`/blog/${article.slug}`}
        className="flex h-full flex-col"
        aria-label={article.title}
      >
        {/* アイキャッチ（無い場合はプレースホルダー） */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-pink-pale">
          {article.eyecatchUrl ? (
            <Image
              src={article.eyecatchUrl}
              alt={article.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-pale to-cat-light">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-9 w-9 text-accent/50"
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
              </svg>
            </div>
          )}
        </div>

        {/* 本文 */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <h2 className="line-clamp-2 font-heading text-[13px] font-bold leading-snug text-text-main transition-colors group-hover:text-accent sm:text-[15px]">
            {article.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-log-hint sm:mt-3 sm:text-[11px]">
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 font-medium ${pill}`}
            >
              {article.categoryLabel}
            </span>
            {formatDate(article.publishedAt) && (
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            )}
          </div>
        </div>
      </Link>

      {/* お気に入りボタン（リンクの外側に重ねて配置） */}
      <div className="absolute right-2.5 top-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur-sm">
          <FavoriteButton slug={article.slug} variant="card" />
        </span>
      </div>
    </article>
  );
}
