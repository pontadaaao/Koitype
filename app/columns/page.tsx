import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getStaticColumns, type StaticColumn } from "@/lib/static-columns";
import { COLUMN_CATEGORIES, type ColumnCategory } from "@/lib/column-types";
import { siteTitle, SITE_DEFAULT_URL, SITE_NAME } from "@/lib/site";

const COLUMNS_DESCRIPTION = "恋愛テクニック・片思い・カップル・心理まで。Koitypeの恋愛コラムで、もっと恋愛を知ろう。";

export const metadata: Metadata = {
  title: siteTitle("恋愛コラム"),
  description: COLUMNS_DESCRIPTION,
  alternates: { canonical: `${SITE_DEFAULT_URL}/columns` },
  openGraph: {
    title: `恋愛コラム | ${SITE_NAME}`,
    description: COLUMNS_DESCRIPTION,
    url: `${SITE_DEFAULT_URL}/columns`,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: `恋愛コラム | ${SITE_NAME}`,
    description: COLUMNS_DESCRIPTION,
  },
};


function getPageNumbers(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.min(Math.max(currentPage - 1, 1), totalPages - 2);
  return [start, start + 1, start + 2];
}

const CATEGORY_COLORS: Record<string, string> = {
  "片思い":       "bg-fuchsia-100 text-fuchsia-700",
  "カップル":     "bg-red-100 text-red-700",
  "別れ・失恋":   "bg-indigo-100 text-indigo-700",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}分前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}日前`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}ヶ月前`;
  return `${Math.floor(months / 12)}年前`;
}

function ColumnListItem({ column }: { column: StaticColumn }) {
  const pillClass = CATEGORY_COLORS[column.category] ?? "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/columns/${column.slug}`}
      className="group flex items-center justify-between border-b border-pink-light/60 px-4 py-5 transition-colors last:border-b-0 hover:bg-pink-pale/30"
    >
      <div className="min-w-0 flex-1">
        <h2 className="font-heading text-[15px] font-bold leading-snug transition-colors group-hover:text-accent sm:text-base" style={{ color: "#5C4033" }}>
          {column.title}
        </h2>
        <div className="mt-1.5 flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${pillClass}`}>
            {column.category}
          </span>
          <span className="text-xs text-text-sub">{timeAgo(column.publishedAt)}</span>
        </div>
      </div>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-3 h-4 w-4 shrink-0 text-text-sub/40 transition-colors group-hover:text-accent"
        aria-hidden
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  );
}

interface ColumnsPageProps {
  searchParams: { page?: string; category?: string };
}

export default function ColumnsPage({ searchParams }: ColumnsPageProps) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const category = searchParams.category as ColumnCategory | undefined;
  const { columns, total, totalPages } = getStaticColumns(page, category);

  return (
    <>
      <SiteHeader showBack={false} />

      <main className="mx-auto max-w-2xl px-4 pb-20 pt-8">
        {/* ヘッダー */}
        <div className="mb-8 text-center">
          <p className="mb-1 font-cormorant text-sm italic tracking-widest text-accent/70">
            Column
          </p>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl" style={{ color: "#5C4033" }}>
            恋愛コラム
          </h1>
          <p className="mt-2 text-xs text-text-main">
            恋愛の疑問・テクニック・心理を、読みやすくお届け
          </p>
        </div>

        {/* カテゴリフィルター */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Link
            href="/columns"
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              !category
                ? "bg-pink-400 text-white"
                : "border border-pink-light text-text-sub hover:border-accent/40 hover:text-accent"
            }`}
          >
            すべて
          </Link>
          {COLUMN_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/columns?category=${encodeURIComponent(cat)}`}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                category === cat
                  ? "bg-pink-400 text-white"
                  : "border border-pink-light text-text-sub hover:border-accent/40 hover:text-accent"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* リスト */}
        {columns.length === 0 ? (
          <div className="rounded-2xl border border-pink-light bg-sub-bg py-16 text-center">
            <p className="text-text-sub">
              {category ? "このカテゴリにはまだ記事がありません" : "まだ記事がありません"}
            </p>
          </div>
        ) : (
          <div>
            {columns.map((col) => (
              <ColumnListItem key={col.slug} column={col} />
            ))}
          </div>
        )}

        {/* 件数 */}
        {total > 0 && (
          <p className="mt-3 text-right text-xs text-text-sub">
            全 {total} 件
            {totalPages > 1 && `　${page} / ${totalPages} ページ`}
          </p>
        )}

        {/* ページネーション */}
        {totalPages > 1 && (
          <nav className="mt-6 flex items-center justify-center gap-2" aria-label="ページ">
            {/* First */}
            {page > 1 ? (
              <Link
                href={`/columns?page=1${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50"
                style={{ color: "#F067A6" }}
                aria-label="最初のページ"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M17 18l-6-6 6-6" /><path d="M11 18l-6-6 6-6" />
                </svg>
              </Link>
            ) : (
              <span className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30" style={{ color: "#F067A6" }} aria-disabled="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M17 18l-6-6 6-6" /><path d="M11 18l-6-6 6-6" />
                </svg>
              </span>
            )}
            {/* Prev */}
            {page > 1 ? (
              <Link
                href={`/columns?page=${page - 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50"
                style={{ color: "#F067A6" }}
                aria-label="前のページ"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Link>
            ) : (
              <span className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30" style={{ color: "#F067A6" }} aria-disabled="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </span>
            )}
            {/* Page numbers */}
            {getPageNumbers(page, totalPages).map((p) =>
              p === page ? (
                <span
                  key={p}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                  style={{ background: "linear-gradient(135deg, #F067A6, #F067A6cc)" }}
                  aria-current="page"
                >
                  {p}
                </span>
              ) : (
                <Link
                  key={p}
                  href={`/columns?page=${p}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 text-xs font-normal transition-colors hover:bg-pink-50"
                  style={{ color: "#5C4033" }}
                >
                  {p}
                </Link>
              )
            )}
            {/* Next */}
            {page < totalPages ? (
              <Link
                href={`/columns?page=${page + 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50"
                style={{ color: "#F067A6" }}
                aria-label="次のページ"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ) : (
              <span className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30" style={{ color: "#F067A6" }} aria-disabled="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            )}
            {/* Last */}
            {page < totalPages ? (
              <Link
                href={`/columns?page=${totalPages}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50"
                style={{ color: "#F067A6" }}
                aria-label="最後のページ"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M7 18l6-6-6-6" /><path d="M13 18l6-6-6-6" />
                </svg>
              </Link>
            ) : (
              <span className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30" style={{ color: "#F067A6" }} aria-disabled="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M7 18l6-6-6-6" /><path d="M13 18l6-6-6-6" />
                </svg>
              </span>
            )}
          </nav>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
