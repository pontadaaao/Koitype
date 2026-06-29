"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AdminColumnDeleteButtonProps {
  id: string;
  title: string;
}

export default function AdminColumnDeleteButton({ id, title }: AdminColumnDeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`「${title}」を削除しますか？この操作は取り消せません。`)) return;
    setLoading(true);
    const res = await fetch(`/api/admin/columns/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error ?? "削除に失敗しました");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? "..." : "削除"}
    </button>
  );
}
