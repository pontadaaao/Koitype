import Link from "next/link";
import { adminGetColumns } from "@/lib/columns";
import type { ColumnSummary } from "@/lib/column-types";

export default async function AdminDashboardPage() {
  let columns: ColumnSummary[] = [];
  let error = "";

  try {
    columns = await adminGetColumns();
  } catch (e) {
    error = String(e);
  }

  const published = columns.filter((c) => c.status === "published").length;
  const drafts = columns.filter((c) => c.status === "draft").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-xl font-bold text-text-main">ダッシュボード</h1>
        <p className="mt-1 text-sm text-text-sub">Koitypeの記事を管理できます</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Supabaseへの接続に失敗しました。環境変数を確認してください。
          <br />
          <code className="text-xs">{error}</code>
        </div>
      )}

      {/* 統計 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-pink-light bg-base p-5">
          <p className="text-xs text-text-sub">総記事数</p>
          <p className="mt-1 font-heading text-3xl font-bold text-text-main">{columns.length}</p>
        </div>
        <div className="rounded-2xl border border-pink-light bg-base p-5">
          <p className="text-xs text-text-sub">公開中</p>
          <p className="mt-1 font-heading text-3xl font-bold text-accent">{published}</p>
        </div>
        <div className="rounded-2xl border border-pink-light bg-base p-5">
          <p className="text-xs text-text-sub">下書き</p>
          <p className="mt-1 font-heading text-3xl font-bold text-text-sub">{drafts}</p>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="space-y-3">
        <h2 className="font-heading text-base font-bold text-text-main">クイックアクション</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/admin/columns/new"
            className="flex items-center gap-3 rounded-2xl border border-pink-light bg-base p-4 transition-all hover:border-accent/40 hover:shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white text-lg">
              +
            </span>
            <div>
              <p className="font-medium text-text-main">新しいコラムを書く</p>
              <p className="text-xs text-text-sub">新規記事を作成</p>
            </div>
          </Link>
          <Link
            href="/admin/columns"
            className="flex items-center gap-3 rounded-2xl border border-pink-light bg-base p-4 transition-all hover:border-accent/40 hover:shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sub-bg text-accent text-lg font-bold">
              ≡
            </span>
            <div>
              <p className="font-medium text-text-main">コラム一覧を見る</p>
              <p className="text-xs text-text-sub">記事の編集・削除</p>
            </div>
          </Link>
        </div>
      </div>

      {/* 最近の記事 */}
      {columns.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-heading text-base font-bold text-text-main">最近の記事</h2>
          <div className="overflow-hidden rounded-2xl border border-pink-light bg-base">
            {columns.slice(0, 5).map((col, i) => (
              <Link
                key={col.id}
                href={`/admin/columns/edit/${col.id}`}
                className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-sub-bg ${
                  i !== 0 ? "border-t border-pink-light" : ""
                }`}
              >
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    col.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {col.status === "published" ? "公開" : "下書き"}
                </span>
                <span className="flex-1 truncate text-sm text-text-main">{col.title}</span>
                <span className="shrink-0 text-xs text-text-sub">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
