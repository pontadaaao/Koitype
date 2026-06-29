import Link from "next/link";
import { adminGetColumns } from "@/lib/columns";
import type { ColumnSummary } from "@/lib/column-types";
import AdminColumnDeleteButton from "./DeleteButton";

export default async function AdminColumnsPage() {
  let columns: ColumnSummary[] = [];
  let error = "";

  try {
    columns = await adminGetColumns();
  } catch (e) {
    error = String(e);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold text-text-main">コラム一覧</h1>
          <p className="mt-0.5 text-sm text-text-sub">{columns.length}件</p>
        </div>
        <Link href="/admin/columns/new" className="btn-primary !w-auto px-5 py-2.5 text-sm">
          + 新規作成
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          記事の取得に失敗しました。Supabaseの設定を確認してください。
        </div>
      )}

      {columns.length === 0 && !error ? (
        <div className="rounded-2xl border border-pink-light bg-base py-16 text-center">
          <p className="font-medium text-text-main">まだ記事がありません</p>
          <p className="mt-1 text-sm text-text-sub">最初のコラムを書いてみましょう</p>
          <Link href="/admin/columns/new" className="btn-primary mt-6 !w-auto inline-block px-8">
            記事を作成する
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-pink-light bg-base">
          {/* テーブルヘッダー（デスクトップ） */}
          <div className="hidden grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-pink-light bg-sub-bg px-4 py-2.5 text-xs font-medium text-text-sub sm:grid">
            <span>タイトル</span>
            <span>カテゴリ</span>
            <span>ステータス</span>
            <span>更新日</span>
            <span></span>
          </div>

          {columns.map((col, i) => (
            <div
              key={col.id}
              className={`flex flex-col gap-2 px-4 py-4 sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto] sm:items-center sm:gap-4 ${
                i !== 0 ? "border-t border-pink-light" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-main">{col.title}</p>
                <p className="text-xs text-text-sub">/{col.slug}</p>
              </div>
              <span className="w-fit rounded-full bg-sub-bg px-2.5 py-0.5 text-xs text-text-sub">
                {col.category}
              </span>
              <span
                className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  col.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {col.status === "published" ? "公開中" : "下書き"}
              </span>
              <span className="text-xs text-text-sub">
                {new Date(col.updated_at).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/columns/edit/${col.id}`}
                  className="rounded-lg border border-pink-light px-3 py-1.5 text-xs text-text-sub transition-colors hover:border-accent/40 hover:text-accent"
                >
                  編集
                </Link>
                {col.status === "published" && (
                  <Link
                    href={`/columns/${col.slug}`}
                    target="_blank"
                    className="rounded-lg border border-pink-light px-3 py-1.5 text-xs text-text-sub transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    表示
                  </Link>
                )}
                <AdminColumnDeleteButton id={col.id} title={col.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
