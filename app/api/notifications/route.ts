import { NextResponse } from "next/server";
import { getBlogArticles } from "@/lib/blog-data";

// 恋愛ブログ（microCMS + Supabase + static）の新着をお知らせ用に配信。
// ISR: 新規記事は最大60秒で反映される。
export const revalidate = 60;

export async function GET() {
  try {
    const articles = await getBlogArticles();
    const blog = articles
      .map((a) => ({
        date: (a.publishedAt ?? "").slice(0, 10).replace(/-/g, "."),
        title: a.title,
      }))
      .filter((b) => /^\d{4}\.\d{2}\.\d{2}$/.test(b.date));
    return NextResponse.json({ blog });
  } catch {
    return NextResponse.json({ blog: [] });
  }
}
