"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import ArticleCard from "@/components/blog/ArticleCard";
import Pagination from "@/components/blog/Pagination";
import {
  FAVORITES_CHANGED_EVENT,
  getFavorites,
} from "@/components/blog/favorites";
import type { BlogCardData } from "@/components/blog/types";
import {
  BLOG_CATEGORY_SLUGS,
  BLOG_CATEGORY_LABEL,
  type BlogCategorySlug,
} from "@/lib/microcms";

interface PopularItem {
  article: BlogCardData;
  viewCount: number;
}

interface BlogListClientProps {
  articles: BlogCardData[];
  /** 人気記事（閲覧数順）。Supabase 未使用時は null で非表示。 */
  popular: PopularItem[] | null;
}

const PAGE_SIZE = 10;
type CategoryFilter = "all" | BlogCategorySlug;

/** 検索用に正規化（小文字化・全角/半角スペースを吸収）。 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/　/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function BlogListClient({
  articles,
  popular,
}: BlogListClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  // お気に入りの同期（クライアントのみ）
  useEffect(() => {
    const sync = () => setFavorites(getFavorites());
    sync();
    window.addEventListener(FAVORITES_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAVORITES_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // メニューの「お気に入り」から遷移した場合（?favorites=1）は絞り込みを有効化
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("favorites") === "1") setFavoritesOnly(true);
  }, []);

  // フィルタ・検索の変更時は1ページ目に戻す
  useEffect(() => {
    setPage(1);
  }, [query, category, favoritesOnly]);

  const filtered = useMemo(() => {
    const tokens = normalize(query).split(" ").filter(Boolean);
    const favSet = new Set(favorites);

    return articles.filter((a) => {
      if (category !== "all" && a.categorySlug !== category) return false;
      if (favoritesOnly && !favSet.has(a.slug)) return false;
      if (tokens.length > 0) {
        const haystack = normalize(
          [a.title, a.excerpt, a.categoryLabel, ...a.tags].join(" ")
        );
        if (!tokens.every((tok) => haystack.includes(tok))) return false;
      }
      return true;
    });
  }, [articles, query, category, favoritesOnly, favorites]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const shown = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const favCount = favorites.length;

  const goToPage = (next: number) => {
    setPage(next);
    // 一覧の先頭までスクロール（ヘッダー分の余白を残す）
    if (listTopRef.current) {
      const top =
        listTopRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* 人気記事ランキング */}
      {popular && popular.length > 0 && (
        <section className="mb-8" aria-labelledby="popular-heading">
          <h2
            id="popular-heading"
            className="mb-3 flex items-center gap-1.5 font-heading text-[1rem] font-bold text-text-main"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-accent"
              aria-hidden="true"
            >
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
            </svg>
            人気記事ランキング
          </h2>
          <ol className="overflow-hidden rounded-2xl border border-pink-light/70 bg-white shadow-sm">
            {popular.map((item, i) => (
              <li key={item.article.slug}>
                <Link
                  href={`/blog/${item.article.slug}`}
                  className="flex items-center gap-3 border-b border-pink-light/50 px-3 py-3 transition-colors last:border-b-0 hover:bg-pink-pale/40"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      i < 3
                        ? "bg-accent text-white"
                        : "bg-pink-pale text-accent"
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {item.article.eyecatchUrl && (
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-pink-pale">
                      <Image
                        src={item.article.eyecatchUrl}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </span>
                  )}
                  <span className="line-clamp-2 min-w-0 flex-1 text-[13px] font-medium leading-snug text-text-main">
                    {item.article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 検索欄 */}
      <div className="mb-4">
        <label htmlFor="blog-search" className="sr-only">
          記事を検索
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-sub/50">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            id="blog-search"
            type="search"
            inputMode="search"
            enterKeyHint="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="キーワードで記事を検索"
            className="w-full rounded-full border border-pink-light bg-white py-2.5 pl-10 pr-10 text-sm text-text-main placeholder:text-text-sub/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="検索をクリア"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-text-sub/60 transition-colors hover:bg-pink-pale hover:text-accent"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* カテゴリー切り替え */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <FilterChip
          active={category === "all"}
          onClick={() => setCategory("all")}
        >
          すべて
        </FilterChip>
        {BLOG_CATEGORY_SLUGS.map((slug) => (
          <FilterChip
            key={slug}
            active={category === slug}
            onClick={() => setCategory(slug)}
          >
            {BLOG_CATEGORY_LABEL[slug]}
          </FilterChip>
        ))}
      </div>

      {/* お気に入り表示中の見出し（メニューから遷移したとき） */}
      {favoritesOnly && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-accent/30 bg-pink-pale/40 px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-sm font-bold text-accent">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.8l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94z" />
            </svg>
            お気に入り{favCount > 0 ? `(${favCount})` : ""}
          </span>
          <button
            type="button"
            onClick={() => {
              setFavoritesOnly(false);
              window.history.replaceState(null, "", "/blog");
            }}
            className="text-xs font-medium text-text-sub transition-colors hover:text-accent"
          >
            すべての記事を見る
          </button>
        </div>
      )}

      {/* 記事グリッド */}
      <div ref={listTopRef} className="scroll-mt-20">
        {shown.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {shown.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onChange={goToPage}
            />
          </>
        ) : (
          <EmptyState favoritesOnly={favoritesOnly} hasQuery={query.length > 0} />
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-accent text-white shadow-sm"
          : "bg-white text-text-sub border border-pink-light hover:border-accent/50 hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({
  favoritesOnly,
  hasQuery,
}: {
  favoritesOnly: boolean;
  hasQuery: boolean;
}) {
  let message = "記事がまだありません。";
  if (favoritesOnly) message = "お気に入りに登録した記事はまだありません。";
  else if (hasQuery) message = "条件に一致する記事が見つかりませんでした。";

  return (
    <div className="rounded-2xl border border-dashed border-pink-light bg-pink-pale/30 px-6 py-14 text-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto h-9 w-9 text-accent/60"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <p className="mt-3 text-sm text-text-sub">{message}</p>
    </div>
  );
}
