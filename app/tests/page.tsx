import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { loveTests } from "@/lib/love-tests";
import LoveTestIcon from "@/components/LoveTestIcon";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle("恋愛心理テスト"),
  description: "あなたの恋愛タイプや本音がわかる無料の心理テストを集めました。1問で診断できる恋愛心理テスト多数。",
  alternates: { canonical: `${SITE_DEFAULT_URL}/tests` },
  openGraph: {
    title: `恋愛心理テスト | ${SITE_NAME}`,
    description: "あなたの恋愛タイプや本音がわかる無料の心理テスト多数。",
    url: `${SITE_DEFAULT_URL}/tests`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `恋愛心理テスト | ${SITE_NAME}`,
    description: "あなたの恋愛タイプや本音がわかる無料の心理テスト多数。",
  },
};

const CARD_STYLES = [
  { bg: "linear-gradient(145deg, #fff0f5, #ffe4f0)", border: "#ffd6e7", accent: "#F067A6" },
  { bg: "linear-gradient(145deg, #f5f0ff, #ede4fd)", border: "#e0d4f7", accent: "#9B6FD4" },
];

const PER_PAGE = 10;

function getPageNumbers(currentPage: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const windowStart = Math.min(Math.max(currentPage - 1, 1), totalPages - 2);
  const windowEnd = windowStart + 2;
  const pages: (number | "…")[] = [];
  for (let i = windowStart; i <= windowEnd; i++) pages.push(i);
  return pages;
}

interface Props {
  searchParams: { page?: string };
}

export default function TestsPage({ searchParams }: Props) {
  const raw = parseInt(searchParams.page ?? "1", 10);
  const totalPages = Math.ceil(loveTests.length / PER_PAGE);
  const currentPage = Math.min(Math.max(isNaN(raw) ? 1 : raw, 1), totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pagedTests = loveTests.slice(start, start + PER_PAGE);

  return (
    <>
      <div className="min-h-screen bg-base">
        <SiteHeader showBack={false} solidBg />

        <main>
          {/* Hero */}
          <div className="mx-auto max-w-[1080px] px-4 pt-8 text-center sm:pt-10">
            <div className="mb-8 text-center">
              <p className="mb-1 font-cormorant text-sm italic tracking-widest text-accent/70">
                Love Test
              </p>
              <h1 className="font-heading text-2xl font-bold text-accent sm:text-3xl">
                恋愛心理テスト
              </h1>
              <p className="mt-2 text-xs text-text-main">
                あなたの恋愛タイプや本音がわかる心理テストを集めました♡
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="mx-auto max-w-[1080px] px-4 py-6 sm:py-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pagedTests.map((test, i) => {
                const s = CARD_STYLES[(start + i) % 2];
                return (
                  <Link
                    key={test.slug}
                    href={`/tests/${test.slug}`}
                    className="group flex flex-col rounded-3xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      background: s.bg,
                      borderColor: s.border,
                      boxShadow: "0 2px 12px rgba(254,108,158,0.07)",
                    }}
                  >
                    <div className="flex items-start gap-4 p-5 sm:p-6">
                      {/* Icon */}
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                        style={{ background: `${s.accent}18` }}
                      >
                        <LoveTestIcon id={test.icon} color={s.accent} className="h-6 w-6" />
                      </span>

                      <div className="min-w-0 flex-1">
                        {/* Category */}
                        <span
                          className="mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                          style={{ backgroundColor: `${s.accent}18`, color: s.accent }}
                        >
                          #{test.category}
                        </span>
                        {/* Title */}
                        <h2 className="font-heading text-sm font-black leading-snug sm:text-base" style={{ color: "#5C4033" }}>
                          {test.title}
                        </h2>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                      <div
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-bold text-white transition-opacity group-hover:opacity-90"
                        style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)` }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        診断する
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2" aria-label="ページ">
                {/* First page */}
                {currentPage > 1 ? (
                  <Link
                    href="/tests?page=1"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50"
                    style={{ color: "#F067A6" }}
                    aria-label="最初のページ"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M17 18l-6-6 6-6" />
                      <path d="M11 18l-6-6 6-6" />
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30"
                    style={{ color: "#F067A6" }}
                    aria-disabled="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M17 18l-6-6 6-6" />
                      <path d="M11 18l-6-6 6-6" />
                    </svg>
                  </span>
                )}

                {/* Prev */}
                {currentPage > 1 ? (
                  <Link
                    href={`/tests?page=${currentPage - 1}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50"
                    style={{ color: "#F067A6" }}
                    aria-label="前のページ"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30"
                    style={{ color: "#F067A6" }}
                    aria-disabled="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </span>
                )}

                {/* Page numbers */}
                {getPageNumbers(currentPage, totalPages).map((p) =>
                  p === currentPage ? (
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
                      href={`/tests?page=${p}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 text-xs font-normal transition-colors hover:bg-pink-50"
                      style={{ color: "#5C4033" }}
                    >
                      {p}
                    </Link>
                  )
                )}

                {/* Next */}
                {currentPage < totalPages ? (
                  <Link
                    href={`/tests?page=${currentPage + 1}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50"
                    style={{ color: "#F067A6" }}
                    aria-label="次のページ"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30"
                    style={{ color: "#F067A6" }}
                    aria-disabled="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </span>
                )}

                {/* Last page */}
                {currentPage < totalPages ? (
                  <Link
                    href={`/tests?page=${totalPages}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50"
                    style={{ color: "#F067A6" }}
                    aria-label="最後のページ"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M7 18l6-6-6-6" />
                      <path d="M13 18l6-6-6-6" />
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30"
                    style={{ color: "#F067A6" }}
                    aria-disabled="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M7 18l6-6-6-6" />
                      <path d="M13 18l6-6-6-6" />
                    </svg>
                  </span>
                )}
              </nav>
            )}

            {/* Page count */}
            {totalPages > 1 && (
              <p className="mt-4 text-center text-xs" style={{ color: "#5C4033", opacity: 0.5 }}>
                {currentPage} / {totalPages} ページ（全 {loveTests.length} 件）
              </p>
            )}
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
