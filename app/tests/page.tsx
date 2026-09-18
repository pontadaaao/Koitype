import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { loveTests, isNewLoveTest } from "@/lib/love-tests";
import LoveTestIcon from "@/components/LoveTestIcon";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

const PER_PAGE = 10;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const raw = parseInt(searchParams.page ?? "1", 10);
  const totalPages = Math.ceil(loveTests.length / PER_PAGE);
  const page = Math.min(
    Math.max(Number.isNaN(raw) ? 1 : raw, 1),
    Math.max(totalPages, 1)
  );

  // 心理テスト詳細は noindex にしたため、2ページ目以降はカードが並ぶだけの
  // 薄いページになる。1ページ目のみインデックスし、以降は noindex,follow。
  // noindex と canonical は同時に出さない（矛盾シグナルになる）。
  const url =
    page > 1
      ? `${SITE_DEFAULT_URL}/tests?page=${page}`
      : `${SITE_DEFAULT_URL}/tests`;

  const title = page > 1 ? `恋愛心理テスト（${page}ページ目）` : "恋愛心理テスト";
  const description =
    page > 1
      ? `あなたの恋愛タイプや本音がわかる無料の心理テスト一覧（${page}/${totalPages}ページ）。1問で診断できる恋愛心理テストを${loveTests.length}種類掲載しています。`
      : `あなたの恋愛タイプや本音がわかる無料の心理テストを${loveTests.length}種類集めました。1問で診断できる恋愛心理テスト多数。`;

  return {
    title: siteTitle(title),
    description,
    ...(page > 1
      ? { robots: { index: false, follow: true } }
      : { alternates: { canonical: url } }),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

const CARD_STYLES = [
  { bg: "linear-gradient(145deg, #fff0f5, #ffe4f0)", border: "#ffd6e7", accent: "#F067A6" },
  { bg: "linear-gradient(145deg, #f5f0ff, #ede4fd)", border: "#e0d4f7", accent: "#9B6FD4" },
];

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
                    className="group relative flex flex-col rounded-3xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      background: s.bg,
                      borderColor: s.border,
                      boxShadow: "0 2px 12px rgba(254,108,158,0.07)",
                    }}
                  >
                    {isNewLoveTest(test) && (
                      <span className="absolute -right-1.5 -top-1.5 z-10 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                        NEW
                      </span>
                    )}
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
              <nav className="mt-10 flex items-center justify-center gap-1 sm:gap-2" aria-label="ページ">
                {/* First page */}
                {currentPage > 1 ? (
                  <Link
                    href="/tests?page=1"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50 sm:h-10 sm:w-10"
                    style={{ color: "#F067A6" }}
                    aria-label="最初のページ"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                      <path d="M17 18l-6-6 6-6" />
                      <path d="M11 18l-6-6 6-6" />
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30 sm:h-10 sm:w-10"
                    style={{ color: "#F067A6" }}
                    aria-disabled="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                      <path d="M17 18l-6-6 6-6" />
                      <path d="M11 18l-6-6 6-6" />
                    </svg>
                  </span>
                )}

                {/* Prev */}
                {currentPage > 1 ? (
                  <Link
                    href={`/tests?page=${currentPage - 1}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50 sm:h-10 sm:w-10"
                    style={{ color: "#F067A6" }}
                    aria-label="前のページ"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30 sm:h-10 sm:w-10"
                    style={{ color: "#F067A6" }}
                    aria-disabled="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </span>
                )}

                {/* Page numbers */}
                {getPageNumbers(currentPage, totalPages).map((p) =>
                  p === currentPage ? (
                    <span
                      key={p}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white sm:h-10 sm:w-10"
                      style={{ background: "linear-gradient(135deg, #F067A6, #F067A6cc)" }}
                      aria-current="page"
                    >
                      {p}
                    </span>
                  ) : (
                    <Link
                      key={p}
                      href={`/tests?page=${p}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-200 text-sm font-normal transition-colors hover:bg-pink-50 sm:h-10 sm:w-10"
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
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50 sm:h-10 sm:w-10"
                    style={{ color: "#F067A6" }}
                    aria-label="次のページ"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30 sm:h-10 sm:w-10"
                    style={{ color: "#F067A6" }}
                    aria-disabled="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </span>
                )}

                {/* Last page */}
                {currentPage < totalPages ? (
                  <Link
                    href={`/tests?page=${totalPages}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50 sm:h-10 sm:w-10"
                    style={{ color: "#F067A6" }}
                    aria-label="最後のページ"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                      <path d="M7 18l6-6-6-6" />
                      <path d="M13 18l6-6-6-6" />
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-pink-100 opacity-30 sm:h-10 sm:w-10"
                    style={{ color: "#F067A6" }}
                    aria-disabled="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
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

          {/*
            以前このページはカードのタイトルが並ぶだけで、
            心理テストが何なのか・診断と何が違うのかを説明する文章が無かった。
            一覧ページとしての説明をサーバー側で出す。
          */}
          <section className="mx-auto max-w-2xl space-y-9 px-4 pb-14">
            <div>
              <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
                Koitypeの恋愛心理テストについて
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                ここに掲載しているのは、質問1問だけで終わる短い心理テストです。
                選んだ答えに表れやすい傾向を、4つのタイプに分けて紹介しています。
                1つあたり数十秒で終わるので、待ち時間や休憩中に気軽に試せます。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                すべて無料・登録不要です。回答はお使いのブラウザの中だけで処理され、
                サーバーに送信・保存されることはありません。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
                恋愛診断との違い
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                心理テストは1問だけなので、結果はあくまで「その答えを選んだ人に多い傾向」です。
                複数の質問から傾向を組み立てる恋愛診断と比べると、結果の幅は狭くなります。
                自分の恋愛のクセをもう少し詳しく知りたい場合は、5〜12問の恋愛診断のほうが向いています。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                心理テストは、友達や恋人と一緒に答えて違いを見る、という使い方が向いています。
                同じ質問でも人によって選ぶ答えが違うので、そこから話が広がります。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
                結果の扱いについて
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                各テストは、Koitype編集部が独自に作成した娯楽向けのコンテンツです。
                心理学の検査を再現したものではなく、精度の検証や専門家による監修は行っていません。
                結果を、自分や他人を決めつけるためのラベルとしては使わないでください。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                本サイトのコンテンツは、医学的・心理学的な診断や治療の代わりにはなりません。
                心身の不調を感じる場合は、医療機関や公的な相談窓口にご相談ください。
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/love-diagnosis"
                className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
              >
                もっと詳しい恋愛診断
              </Link>
              <Link
                href="/compatibility"
                className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
              >
                誕生日でわかる相性診断
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
              >
                恋愛ブログ
              </Link>
            </div>
          </section>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
