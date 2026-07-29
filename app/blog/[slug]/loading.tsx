import SiteHeader from "@/components/SiteHeader";

// 記事詳細の読み込み中に即時表示するスケルトン。
// これにより一覧→記事の遷移時、サーバー描画を待たずに画面が切り替わる。
export default function BlogDetailLoading() {
  return (
    <>
      <SiteHeader backHref="/blog" backLabel="恋愛ブログ" />

      <main className="mx-auto max-w-2xl px-4 pb-16 pt-4 sm:pb-20 sm:pt-6">
        {/* パンくず */}
        <div className="mb-4 flex gap-2">
          <div className="h-3 w-10 animate-pulse rounded bg-pink-light" />
          <div className="h-3 w-16 animate-pulse rounded bg-pink-light" />
        </div>

        {/* カテゴリー */}
        <div className="mb-3 h-5 w-24 animate-pulse rounded-full bg-pink-light" />

        {/* タイトル */}
        <div className="space-y-2">
          <div className="h-6 w-full animate-pulse rounded bg-pink-light" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-pink-light" />
        </div>

        {/* メタ情報 */}
        <div className="mt-3 flex gap-3">
          <div className="h-3 w-24 animate-pulse rounded bg-pink-light" />
          <div className="h-3 w-20 animate-pulse rounded bg-pink-light" />
        </div>

        {/* アイキャッチ */}
        <div className="mt-6 aspect-[16/9] w-full animate-pulse rounded-2xl bg-pink-light" />

        {/* 本文 */}
        <div className="mt-8 space-y-3">
          <div className="h-5 w-1/2 animate-pulse rounded bg-pink-light" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-3.5 w-full animate-pulse rounded bg-pink-light"
              style={{ width: i % 3 === 2 ? "70%" : "100%" }}
            />
          ))}
          <div className="h-5 w-2/5 animate-pulse rounded bg-pink-light" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-3.5 w-full animate-pulse rounded bg-pink-light"
              style={{ width: i % 2 === 1 ? "85%" : "100%" }}
            />
          ))}
        </div>
      </main>
    </>
  );
}
