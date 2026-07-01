import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_DEFAULT_URL } from "@/lib/site";
import { staticColumns } from "@/lib/static-columns";

export const metadata: Metadata = {
  title: "ページが見つかりません | Koitype",
  description: "お探しのページは見つかりませんでした。",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_DEFAULT_URL}/404` },
};

const popularDiagnoses = [
  { href: "/diagnosis/love-style", label: "恋愛スタイル診断" },
  { href: "/diagnosis/dog-cat", label: "犬系？猫系？診断" },
  { href: "/compatibility", label: "誕生日でわかる相性診断" },
  { href: "/love-diagnosis", label: "恋愛診断一覧" },
];

export default function NotFound() {
  const popularColumns = staticColumns.slice(0, 3);

  return (
    <>
      <SiteHeader showBack={false} />
      <main className="mx-auto max-w-2xl px-4 pb-20 pt-12 text-center">
        {/* 404 Hero */}
        <div className="mb-10">
          <p
            className="font-heading text-7xl font-black sm:text-8xl"
            style={{ color: "#F067A6", opacity: 0.15 }}
            aria-hidden="true"
          >
            404
          </p>
          <h1 className="mt-2 font-heading text-xl font-bold text-text-main sm:text-2xl">
            ページが見つかりませんでした
          </h1>
          <p className="mt-3 text-sm text-text-sub leading-relaxed">
            お探しのページは削除・移動されたか、URLが間違っている可能性があります。
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
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
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            ホームに戻る
          </Link>
        </div>

        {/* 人気診断 */}
        <section className="mb-10">
          <h2 className="mb-4 font-heading text-base font-bold text-text-main">
            人気の診断
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {popularDiagnoses.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center rounded-2xl border border-pink-light bg-sub-bg px-3 py-4 text-center text-xs font-medium text-text-main transition-colors hover:border-accent/40 hover:bg-pink-pale/30 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        {/* 人気コラム */}
        {popularColumns.length > 0 && (
          <section>
            <h2 className="mb-4 font-heading text-base font-bold text-text-main">
              人気のコラム
            </h2>
            <div className="space-y-2 text-left">
              {popularColumns.map((col) => (
                <Link
                  key={col.slug}
                  href={`/columns/${col.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-pink-light bg-sub-bg px-4 py-3 transition-colors hover:border-accent/40 hover:bg-pink-pale/30"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  <span className="text-sm font-medium text-text-main line-clamp-1">
                    {col.title}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/columns"
              className="mt-4 inline-block text-xs text-accent underline underline-offset-2"
            >
              コラム一覧をすべて見る
            </Link>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
