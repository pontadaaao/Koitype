import Link from "next/link";
import Image from "next/image";
import type { CrossLinkItem } from "@/lib/blog-cross-links";

// 記事末尾に出す「記事を読んだあなたにおすすめの診断」導線（回遊の輪）。
// サーバーコンポーネント：内部リンクをそのままHTMLに出力し、クロール性/SEOにも寄与。
export default function DiagnosisCallout({ items }: { items: CrossLinkItem[] }) {
  if (items.length === 0) return null;

  return (
    <section
      className="mt-10 rounded-2xl border border-accent/25 bg-gradient-to-br from-pink-pale/70 to-white p-4 sm:p-5"
      aria-labelledby="diagnosis-callout-heading"
    >
      <h2
        id="diagnosis-callout-heading"
        className="mb-1 flex items-center gap-1.5 font-heading text-base font-bold text-text-main"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-accent"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        あなたの恋愛タイプは？診断でチェック
      </h2>
      <p className="mb-3 text-xs text-text-sub">
        この記事に関連する無料診断・心理テストはこちら。
      </p>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-3 rounded-2xl border border-pink-light bg-white px-3 py-3 transition-colors hover:border-accent/50 hover:bg-pink-pale/40"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-pink-pale">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-accent"
                    aria-hidden="true"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="line-clamp-1 text-sm font-bold text-text-main">
                    {item.title}
                  </span>
                  <span className="shrink-0 rounded-full bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                    {item.kind === "diagnosis" ? "診断" : "心理テスト"}
                  </span>
                </span>
                <span className="mt-0.5 line-clamp-1 block text-xs text-text-sub">
                  {item.description}
                </span>
              </span>
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
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-3 text-center">
        <Link
          href="/love-diagnosis"
          className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
        >
          恋愛診断をすべて見る
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
