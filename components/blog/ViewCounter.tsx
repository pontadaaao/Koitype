"use client";

import { useEffect } from "react";
import { incrementBlogView } from "@/lib/supabase-blog-views";

/**
 * 記事詳細を開いたときに閲覧数を加算する（表示は無し）。
 * - sessionStorage で同一セッション・同一記事の重複加算を防止
 * - Supabase 未設定・失敗時も何もせず壊れない
 */
export default function ViewCounter({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;
    const key = `koitype_blog_viewed_${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage 不可でも加算は試みる
    }
    void incrementBlogView(slug);
  }, [slug]);

  return null;
}
