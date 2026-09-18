import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogListClient from "@/components/blog/BlogListClient";
import RecommendedCarousel from "@/components/blog/RecommendedCarousel";
import type { BlogCardData } from "@/components/blog/types";
import { toCardData } from "@/lib/microcms";
import { getBlogArticles, getRecommendedArticles } from "@/lib/blog-data";
import { getPopularSlugs } from "@/lib/supabase-blog-views";
import { siteTitle, SITE_DEFAULT_URL, SITE_NAME } from "@/lib/site";

const BLOG_DESCRIPTION =
  "恋愛コラムと恋愛ブログをお届け。片思い・カップル・恋の悩みまで、Koitypeの恋愛ブログで、もっと恋愛を知ろう。";

export const metadata: Metadata = {
  title: siteTitle("恋愛ブログ"),
  description: BLOG_DESCRIPTION,
  alternates: { canonical: `${SITE_DEFAULT_URL}/blog` },
  openGraph: {
    title: `恋愛ブログ | ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
    url: `${SITE_DEFAULT_URL}/blog`,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: `恋愛ブログ | ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
  },
};

// microCMS の新着記事を反映するため 60 秒ごとに再生成（ISR）
export const revalidate = 60;

export default async function BlogPage() {
  const articles = await getBlogArticles();
  const cards: BlogCardData[] = articles.map(toCardData);

  // microCMS でおすすめ指定された新着記事（最大5件・横スクロール表示）
  const recommended: BlogCardData[] = (await getRecommendedArticles(5)).map(
    toCardData
  );

  // 人気記事ランキング（Supabase 未設定/失敗時は null → 非表示）
  const popularSlugs = await getPopularSlugs(5);
  let popular: { article: BlogCardData; viewCount: number }[] | null = null;
  if (popularSlugs) {
    const bySlug = new Map(cards.map((c) => [c.slug, c]));
    popular = popularSlugs
      .map((p) => {
        const article = bySlug.get(p.slug);
        return article ? { article, viewCount: p.viewCount } : null;
      })
      .filter((x): x is { article: BlogCardData; viewCount: number } => x !== null);
  }

  return (
    <>
      <SiteHeader showBack={false} />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-5 sm:pb-20 sm:pt-8">
        {/* ページヘッダー */}
        <div className="mb-8 text-center">
          <p className="mb-1 font-cormorant text-sm italic tracking-widest text-accent/70">
            Blog
          </p>
          <h1
            className="font-heading text-2xl font-bold sm:text-3xl"
            style={{ color: "#5C4033" }}
          >
            恋愛ブログ
          </h1>
          <p className="mt-2 text-xs text-text-main sm:text-sm">
            恋愛コラムと恋愛ブログで、あなたの恋をそっと応援
          </p>
        </div>

        <RecommendedCarousel articles={recommended} />

        <BlogListClient articles={cards} popular={popular} />
      </main>

      <SiteFooter />
    </>
  );
}
