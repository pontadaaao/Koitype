import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogCategoryList from "@/components/blog/BlogCategoryList";
import type { BlogCardData } from "@/components/blog/types";
import {
  BLOG_CATEGORY_LABEL,
  BLOG_CATEGORY_SLUGS,
  toCardData,
  type BlogCategorySlug,
} from "@/lib/microcms";
import { getBlogArticlesByCategory } from "@/lib/blog-data";
import { siteTitle, SITE_DEFAULT_URL, SITE_NAME } from "@/lib/site";

interface CategoryPageProps {
  params: { category: string };
}

// 各カテゴリーページ固有の説明文（重複判定対策・独自コンテンツ）
const CATEGORY_DESCRIPTION: Record<BlogCategorySlug, string> = {
  column:
    "恋愛コラムでは、片思い・カップル・別れ・婚活・恋愛心理まで、恋のあらゆる悩みに役立つ実用的な記事をお届けします。今日から使えるテクニックやヒントを、テーマ別にわかりやすくまとめました。気になるタイトルから、あなたの恋のヒントを見つけてください。",
  blog:
    "恋愛ブログでは、リアルな体験談や恋愛あるある、デートで使えるスポット情報など、読んで共感できる読み物をお届けします。等身大の恋のエピソードを通して、日々の恋愛のヒントやちょっとした勇気が見つかるはずです。",
};

function isValidCategory(value: string): value is BlogCategorySlug {
  return (BLOG_CATEGORY_SLUGS as string[]).includes(value);
}

export const revalidate = 60;

export function generateStaticParams() {
  return BLOG_CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  if (!isValidCategory(params.category)) return { title: siteTitle("恋愛ブログ") };
  const label = BLOG_CATEGORY_LABEL[params.category];
  const url = `${SITE_DEFAULT_URL}/blog/category/${params.category}`;
  const description = `${label}の記事一覧。Koitypeの恋愛ブログでお届けする${label}をまとめました。`;

  return {
    title: siteTitle(label),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${label} | ${SITE_NAME}`,
      description,
      url,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: `${label} | ${SITE_NAME}`,
      description,
    },
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  if (!isValidCategory(params.category)) notFound();

  const category = params.category;
  const label = BLOG_CATEGORY_LABEL[category];
  const articles = await getBlogArticlesByCategory(category);
  const cards: BlogCardData[] = articles.map(toCardData);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_DEFAULT_URL },
      { "@type": "ListItem", position: 2, name: "恋愛ブログ", item: `${SITE_DEFAULT_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `${SITE_DEFAULT_URL}/blog/category/${category}`,
      },
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
            <li className="text-text-main">{label}</li>
          </ol>
        </nav>

        {/* カテゴリー切り替え */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Link
            href="/blog"
            className="rounded-full border border-pink-light bg-white px-4 py-1.5 text-xs font-medium text-text-sub transition-colors hover:border-accent/50 hover:text-accent"
          >
            すべて
          </Link>
          {BLOG_CATEGORY_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/blog/category/${slug}`}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                slug === category
                  ? "bg-accent text-white shadow-sm"
                  : "border border-pink-light bg-white text-text-sub hover:border-accent/50 hover:text-accent"
              }`}
            >
              {BLOG_CATEGORY_LABEL[slug]}
            </Link>
          ))}
        </div>

        <h1
          className="mb-2 font-heading text-xl font-bold sm:text-2xl"
          style={{ color: "#5C4033" }}
        >
          {label}
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-text-sub">
          {CATEGORY_DESCRIPTION[category]}
        </p>

        {cards.length > 0 ? (
          <BlogCategoryList articles={cards} />
        ) : (
          <div className="rounded-2xl border border-dashed border-pink-light bg-pink-pale/30 px-6 py-14 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto h-9 w-9 text-accent/60"
              aria-hidden="true"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
            </svg>
            <p className="mt-3 text-sm text-text-sub">
              このカテゴリーにはまだ記事がありません。
            </p>
          </div>
        )}

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
