"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "エラーが発生しました");
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-pink-light bg-base p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="font-heading text-xl font-bold text-text-main">
            <span className="text-accent">Koitype</span> 管理画面
          </p>
          <p className="mt-1 text-sm text-text-sub">パスワードを入力してください</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-main">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="mt-1.5 w-full rounded-xl border border-pink-light bg-base px-4 py-3 text-sm text-text-main outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="パスワード"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-60"
          >
            {loading ? "確認中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sub-bg px-4">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
