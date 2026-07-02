"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PostComposer from "@/components/PostComposer";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { insertPost } from "@/lib/supabase-posts";
import type { Post } from "@/lib/posts";

interface PostNewClientProps {
  embedded?: boolean;
}

export default function PostNewClient({ embedded = false }: PostNewClientProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: Omit<Post, "id" | "createdAt" | "reacts">) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await insertPost(data);
      router.push("/log");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "投稿に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  const content = (
    <>
      {embedded && (
        <div className="mb-4">
          <Link
            href="/log"
            className="text-sm text-text-sub transition-colors hover:text-accent"
          >
            ← 恋ログに戻る
          </Link>
        </div>
      )}

      <section className={embedded ? "mb-4" : "mb-5"}>
        <h1 className="font-heading text-xl font-bold text-text-main">
          投稿する
        </h1>
        <p className="mt-1 text-sm text-text-sub">
          名前・内容・カテゴリーを入力して投稿できます。
        </p>
      </section>

      {submitError && (
        <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {submitError}
        </p>
      )}
      <section className="overflow-hidden rounded-2xl border border-log-border">
        <PostComposer onSubmit={handleSubmit} submitLabel="投稿する" submitting={submitting} />
      </section>
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader backHref="/log" backLabel="恋ログへ" showNavTabs={false} showSearch={false} />
      <main className="mx-auto max-w-xl px-4 py-6 sm:py-8">{content}</main>
      <SiteFooter />
    </div>
  );
}
