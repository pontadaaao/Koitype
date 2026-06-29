import Link from "next/link";
import ColumnForm from "../ColumnForm";

export default function AdminColumnNewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/columns" className="text-sm text-text-sub hover:text-accent">
          ← コラム一覧
        </Link>
        <span className="text-text-sub">/</span>
        <h1 className="font-heading text-xl font-bold text-text-main">新規記事作成</h1>
      </div>
      <ColumnForm mode="new" />
    </div>
  );
}
