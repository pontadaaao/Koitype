import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import FavoriteButton from "@/components/blog/FavoriteButton";
import ViewCounter from "@/components/blog/ViewCounter";
import {
  getSanitizedContent,
  stripHtml,
  type BlogArticle,
} from "@/lib/microcms";
import { getBlogArticles, getBlogArticleBySlug } from "@/lib/blog-data";
import { extractHeadings, injectHeadingIds } from "@/lib/sanitize-html";
import { siteTitle, SITE_DEFAULT_URL, SITE_NAME } from "@/lib/site";

interface DetailPageProps {
  params: { slug: string };
}

export const revalidate = 60;

const CATEGORY_PILL: Record<string, string> = {
  column: "bg-fuchsia-100 text-fuchsia-700",
  blog: "bg-violet-100 text-violet-700",
};

function resolveDescription(article: BlogArticle): string {
  if (article.metaDescription) return article.metaDescription;
  if (article.excerpt) return article.excerpt;
  const text = stripHtml(article.contentHtml);
  return text.length > 120 ? `${text.slice(0, 120)}…` : text;
}

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const article = await getBlogArticleBySlug(params.slug);
  if (!article) return { title: siteTitle("恋愛ブログ") };

  const url = `${SITE_DEFAULT_URL}/blog/${article.slug}`;
  const title = article.metaTitle || article.title;
  const description = resolveDescription(article);
  const images = article.eyecatch?.url ? [article.eyecatch.url] : undefined;

  return {
    title: siteTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: SITE_NAME,
      locale: "ja_JP",
      publishedTime: article.publishedAt,
      modifiedTime: article.revisedAt ?? article.publishedAt,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** 前後の記事を公開日基準で判定（同カテゴリー優先）。 */
function pickAdjacent(
  candidates: BlogArticle[],
  category: string | null
): BlogArticle | null {
  if (candidates.length === 0) return null;
  const sameCat = candidates.find((a) => a.categorySlug === category);
  return sameCat ?? candidates[0];
}

/** 関連記事: 同タグ > 同カテゴリー > 新着 の優先で最大3件。 */
function pickRelated(current: BlogArticle, all: BlogArticle[]): BlogArticle[] {
  const pool = all.filter((a) => a.slug !== current.slug);
  const picked: BlogArticle[] = [];
  const seen = new Set<string>();
  const add = (a: BlogArticle) => {
    if (seen.has(a.slug)) return;
    seen.add(a.slug);
    picked.push(a);
  };

  if (current.tags.length > 0) {
    const tagSet = new Set(current.tags);
    for (const a of pool) {
      if (a.tags.some((t) => tagSet.has(t))) add(a);
      if (picked.length >= 3) return picked.slice(0, 3);
    }
  }
  for (const a of pool) {
    if (a.categorySlug === current.categorySlug) add(a);
    if (picked.length >= 3) return picked.slice(0, 3);
  }
  for (const a of pool) {
    add(a);
    if (picked.length >= 3) break;
  }
  return picked.slice(0, 3);
}

export default async function BlogDetailPage({ params }: DetailPageProps) {
  const article = await getBlogArticleBySlug(params.slug);
  if (!article) notFound();

  const all = await getBlogArticles();
  const url = `${SITE_DEFAULT_URL}/blog/${article.slug}`;
  const pill = article.categorySlug
    ? CATEGORY_PILL[article.categorySlug] ?? "bg-pink-100 text-pink-700"
    : "bg-gray-100 text-gray-600";

  // 本文をサニタイズ → 見出し抽出 → id 付与
  const sanitized = getSanitizedContent(article);
  const headings = extractHeadings(sanitized);
  const contentWithIds = injectHeadingIds(sanitized);

  // 公開日でソート（新しい順）して前後を判定
  const sorted = [...all].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const currentTime = new Date(article.publishedAt).getTime();
  const olderCandidates = sorted.filter(
    (a) => a.slug !== article.slug && new Date(a.publishedAt).getTime() < currentTime
  ); // 新しい順 → 直近の古い記事が先頭
  const newerCandidates = sorted
    .filter(
      (a) =>
        a.slug !== article.slug && new Date(a.publishedAt).getTime() > currentTime
    )
    .reverse(); // 古い順 → 直近の新しい記事が先頭

  const prevArticle = pickAdjacent(olderCandidates, article.categorySlug); // 前の記事（古い）
  const nextArticle = pickAdjacent(newerCandidates, article.categorySlug); // 次の記事（新しい）
  const related = pickRelated(article, all);

  const title = article.metaTitle || article.title;
  const description = resolveDescription(article);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    url,
    datePublished: article.publishedAt,
    dateModified: article.revisedAt ?? article.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_DEFAULT_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_DEFAULT_URL,
      logo: { "@type": "ImageObject", url: `${SITE_DEFAULT_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(article.eyecatch?.url ? { image: article.eyecatch.url } : {}),
    ...(article.tags.length > 0 ? { keywords: article.tags.join(", ") } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_DEFAULT_URL },
      { "@type": "ListItem", position: 2, name: "恋愛ブログ", item: `${SITE_DEFAULT_URL}/blog` },
      { "@type": "ListItem", position: 3, name: article.categoryLabel, item: article.categorySlug ? `${SITE_DEFAULT_URL}/blog/category/${article.categorySlug}` : `${SITE_DEFAULT_URL}/blog` },
      { "@type": "ListItem", position: 4, name: article.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ViewCounter slug={article.slug} />
      <SiteHeader backHref="/blog" backLabel="恋愛ブログ" />

      <main className="mx-auto max-w-2xl px-4 pb-16 pt-4 sm:pb-20 sm:pt-6">
        {/* パンくずリスト */}
        <nav aria-label="パンくずリスト" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-text-sub">
            <li>
              <Link href="/" className="hover:text-accent">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true" className="text-text-sub/40">›</li>
            <li>
              <Link href="/blog" className="hover:text-accent">
                恋愛ブログ
              </Link>
            </li>
            <li aria-hidden="true" className="text-text-sub/40">›</li>
            <li className="text-text-main line-clamp-1">{article.title}</li>
          </ol>
        </nav>

        {/* カテゴリー */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Link
            href={
              article.categorySlug
                ? `/blog/category/${article.categorySlug}`
                : "/blog"
            }
            className={`rounded-full px-3 py-0.5 text-xs font-medium ${pill}`}
          >
            {article.categoryLabel}
          </Link>
        </div>

        {/* タイトル */}
        <h1
          className="font-heading text-xl font-bold leading-snug sm:text-2xl"
          style={{ color: "#5C4033" }}
        >
          {article.title}
        </h1>

        {/* メタ情報 */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-log-hint">
          {formatDate(article.publishedAt) && (
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)} 公開
            </time>
          )}
          {article.revisedAt &&
            formatDate(article.revisedAt) &&
            article.revisedAt !== article.publishedAt && (
              <time dateTime={article.revisedAt}>
                {formatDate(article.revisedAt)} 更新
              </time>
            )}
          <span className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            約{article.readingMinutes}分で読めます
          </span>
        </div>

        {/* お気に入り */}
        <div className="mt-4">
          <FavoriteButton slug={article.slug} variant="detail" />
        </div>

        {/* アイキャッチ */}
        {article.eyecatch?.url && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-pink-pale">
            <Image
              src={article.eyecatch.url}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* 目次 */}
        <TableOfContents headings={headings} />

        {/* 本文 */}
        <article
          className="blog-body mt-8"
          dangerouslySetInnerHTML={{ __html: contentWithIds }}
        />

        {/* タグ（クリックで同じタグの記事一覧へ） */}
        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="rounded-full bg-pink-pale px-3 py-1 text-xs text-accent transition-colors hover:bg-accent hover:text-white"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* シェア */}
        <div className="mt-8 border-t border-pink-light/60 pt-6">
          <ShareButtons title={article.title} url={url} />
        </div>

        {/* 前後の記事 */}
        {(prevArticle || nextArticle) && (
          <nav
            aria-label="前後の記事"
            className="mt-10 grid gap-3 sm:grid-cols-2"
          >
            {prevArticle && (
              <AdjacentLink article={prevArticle} direction="prev" />
            )}
            {nextArticle && (
              <AdjacentLink article={nextArticle} direction="next" />
            )}
          </nav>
        )}

        {/* 関連記事 */}
        {related.length > 0 && (
          <aside className="mt-12">
            <h2 className="mb-4 font-heading text-[1rem] font-bold text-text-main">
              関連記事
            </h2>
            <div className="space-y-2">
              {related.map((rel) => {
                const relPill = rel.categorySlug
                  ? CATEGORY_PILL[rel.categorySlug] ?? "bg-pink-100 text-pink-700"
                  : "bg-gray-100 text-gray-600";
                return (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-pink-light bg-white px-3 py-3 transition-colors hover:border-accent/40 hover:bg-pink-pale/30"
                  >
                    {rel.eyecatch?.url && (
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-pink-pale">
                        <Image
                          src={rel.eyecatch.url}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 block text-sm font-medium leading-snug text-text-main">
                        {rel.title}
                      </span>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${relPill}`}
                      >
                        {rel.categoryLabel}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-text-sub/40"
                      aria-hidden="true"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </aside>
        )}

        {/* 一覧に戻る */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
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

      <style>{BLOG_BODY_STYLES}</style>
      <SiteFooter />
    </>
  );
}

function AdjacentLink({
  article,
  direction,
}: {
  article: BlogArticle;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`flex items-center gap-3 rounded-2xl border border-pink-light bg-white px-3 py-3 transition-colors hover:border-accent/40 hover:bg-pink-pale/30 ${
        isPrev ? "" : "sm:flex-row-reverse sm:text-right"
      }`}
    >
      {article.eyecatch?.url && (
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-pink-pale">
          <Image
            src={article.eyecatch.url}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold text-accent/70">
          {isPrev ? "前の記事" : "次の記事"}
        </span>
        <span className="line-clamp-2 mt-0.5 block text-sm font-medium leading-snug text-text-main">
          {article.title}
        </span>
      </span>
    </Link>
  );
}

const BLOG_BODY_STYLES = `
  .blog-body {
    line-height: 1.9;
    color: #5C4033;
    font-size: 0.94rem;
  }
  @media (min-width: 640px) {
    .blog-body { font-size: 0.97rem; }
  }
  .blog-body h2 {
    font-size: 1.08rem;
    font-weight: 700;
    margin: 1.8rem 0 0.7rem;
    padding-bottom: 0.4rem;
    border-bottom: 2px solid #ffd6e7;
    color: #5C4033;
    scroll-margin-top: 80px;
  }
  @media (min-width: 640px) {
    .blog-body h2 { font-size: 1.2rem; margin: 2.2rem 0 0.8rem; }
  }
  .blog-body h3 {
    font-size: 0.97rem;
    font-weight: 700;
    margin: 1.4rem 0 0.5rem;
    color: #F067A6;
    scroll-margin-top: 80px;
  }
  @media (min-width: 640px) {
    .blog-body h3 { font-size: 1rem; margin: 1.6rem 0 0.5rem; }
  }
  .blog-body p { margin-bottom: 1.1rem; }
  @media (min-width: 640px) {
    .blog-body p { margin-bottom: 1.2rem; }
  }
  .blog-body ul, .blog-body ol { padding-left: 1.4em; margin-bottom: 1.1rem; }
  .blog-body li { margin-bottom: 0.4rem; }
  .blog-body blockquote {
    border-left: 3px solid #ffd6e7;
    padding: 0.5rem 0.85rem;
    background: #fff0f5;
    border-radius: 0 8px 8px 0;
    margin: 1rem 0;
    color: #7a5568;
    font-style: italic;
  }
  .blog-body strong { color: #F067A6; font-weight: 700; }
  .blog-body hr { display: none; }
  .blog-body .num-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5em;
    height: 1.5em;
    padding: 0 0.4em;
    margin-right: 0.4em;
    border-radius: 9999px;
    background: #F067A6;
    color: #fff;
    font-size: 0.78em;
    font-weight: 700;
    line-height: 1;
    vertical-align: text-bottom;
  }
  .blog-body a { color: #F067A6; text-decoration: underline; }
  .blog-body img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 1.2rem auto;
    display: block;
  }
  .blog-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.2rem 0;
    font-size: 0.88rem;
  }
  .blog-body th, .blog-body td {
    border: 1px solid #ffd6e7;
    padding: 0.5rem 0.7rem;
    text-align: left;
  }
  .blog-body th { background: #fff0f5; }
`;
