import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogCategoryList from "@/components/blog/BlogCategoryList";
import type { BlogCardData } from "@/components/blog/types";
import { toCardData } from "@/lib/microcms";
import { getBlogArticlesByTag } from "@/lib/blog-data";
import { siteTitle, SITE_DEFAULT_URL, SITE_NAME } from "@/lib/site";

interface TagPageProps {
  params: { tag: string };
}

export const revalidate = 60;

function decodeTag(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const tag = decodeTag(params.tag);
  const url = `${SITE_DEFAULT_URL}/blog/tag/${encodeURIComponent(tag)}`;
  const description = `「${tag}」に関する恋愛ブログの記事一覧。Koitypeで${tag}の記事をまとめてお届けします。`;

  return {
    title: siteTitle(`#${tag}`),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `#${tag} | ${SITE_NAME}`,
      description,
      url,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tag} | ${SITE_NAME}`,
      description,
    },
  };
}

export default async function BlogTagPage({ params }: TagPageProps) {
  const tag = decodeTag(params.tag);
  const articles = await getBlogArticlesByTag(tag);

  // 該当記事が無いタグは 404（薄いページのインデックスを避ける）
  if (articles.length === 0) notFound();

  const cards: BlogCardData[] = articles.map(toCardData);
  const url = `${SITE_DEFAULT_URL}/blog/tag/${encodeURIComponent(tag)}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_DEFAULT_URL },
      { "@type": "ListItem", position: 2, name: "恋愛ブログ", item: `${SITE_DEFAULT_URL}/blog` },
      { "@type": "ListItem", position: 3, name: `#${tag}`, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <SiteHeader backHref="/blog" backLabel="恋愛ブログ" />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-4 sm:pb-20 sm:pt-6">
        {/* パンくずリスト */}
        <nav aria-label="パンくずリスト" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-text-sub">
            <li>
              <Link href="/" className="hover:text-accent">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true" className="text-text-sub/40">
              ›
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent">
                恋愛ブログ
              </Link>
            </li>
            <li aria-hidden="true" className="text-text-sub/40">
              ›
            </li>
            <li className="text-text-main">#{tag}</li>
          </ol>
        </nav>

        <h1
          className="mb-1 font-heading text-xl font-bold sm:text-2xl"
          style={{ color: "#5C4033" }}
        >
          #{tag}
        </h1>
        <p className="mb-6 text-xs text-text-sub sm:text-sm">
          「{tag}」の記事 {articles.length}件
        </p>

        <BlogCategoryList articles={cards} />

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            恋愛ブログ一覧へ
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
