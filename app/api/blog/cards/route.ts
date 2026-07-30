import { NextResponse } from "next/server";
import { getBlogArticles } from "@/lib/blog-data";
import { toCardData } from "@/lib/microcms";

// 恋愛ブログの全記事を軽量カード配列で返す（診断・テスト結果ページの
// 「おすすめ記事」で使用）。引数なし＝全員同じレスポンスなので CDN キャッシュが効く。
export const revalidate = 60;

export async function GET() {
  const articles = await getBlogArticles();
  const cards = articles.map((a) => {
    const c = toCardData(a);
    return {
      slug: c.slug,
      title: c.title,
      categoryName: c.categoryName,
      tags: c.tags,
      eyecatchUrl: c.eyecatchUrl,
      publishedAt: c.publishedAt,
    };
  });
  return NextResponse.json({ cards });
}
