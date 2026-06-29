"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PostComposer from "@/components/PostComposer";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { addPost } from "@/lib/post-storage";
import type { Post } from "@/lib/posts";

interface PostNewClientProps {
  embedded?: boolean;
}

export default function PostNewClient({ embedded = false }: PostNewClientProps) {
  const router = useRouter();

  const handleSubmit = (data: Omit<Post, "id" | "time" | "reacts">) => {
    addPost(data);
    router.push("/log");
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

      <section className="overflow-hidden rounded-2xl border border-log-border">
        <PostComposer onSubmit={handleSubmit} submitLabel="投稿する" />
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
