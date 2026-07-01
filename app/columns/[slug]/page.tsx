import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getStaticColumnBySlug, staticColumns } from "@/lib/static-columns";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

interface ColumnDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return staticColumns.map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({ params }: ColumnDetailPageProps): Promise<Metadata> {
  const column = getStaticColumnBySlug(params.slug);
  if (!column) return { title: siteTitle("恋愛コラム") };

  const url = `${SITE_DEFAULT_URL}/columns/${column.slug}`;

  return {
    title: siteTitle(column.title),
    description: column.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: column.title,
      description: column.seoDescription,
      url,
      type: "article",
      siteName: SITE_NAME,
      locale: "ja_JP",
      publishedTime: column.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: column.title,
      description: column.seoDescription,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "片思い": "bg-fuchsia-100 text-fuchsia-700",
  "カップル": "bg-red-100 text-red-700",
  "別れ・失恋": "bg-indigo-100 text-indigo-700",
};

function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/g;
  const results: { id: string; text: string; level: number }[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(html)) !== null) {
    results.push({
      id: `heading-${i++}`,
      text: m[2].replace(/<[^>]+>/g, ""),
      level: parseInt(m[1], 10),
    });
  }
  return results;
}

function injectHeadingIds(html: string): string {
  let i = 0;
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/g, (_match, level, attrs, content) => {
    const id = `heading-${i++}`;
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
}

export default function ColumnDetailPage({ params }: ColumnDetailPageProps) {
  const column = getStaticColumnBySlug(params.slug);
  if (!column) notFound();

  const url = `${SITE_DEFAULT_URL}/columns/${column.slug}`;
  const colorClass = CATEGORY_COLORS[column.category] ?? "bg-gray-100 text-gray-600";
  const headings = extractHeadings(column.content);
  const contentWithIds = injectHeadingIds(column.content);

  const relatedColumns = staticColumns
    .filter((c) => c.slug !== column.slug && c.category === column.category)
    .slice(0, 3);
  const otherColumns = relatedColumns.length < 3
    ? [
        ...relatedColumns,
        ...staticColumns
          .filter((c) => c.slug !== column.slug && c.category !== column.category)
          .slice(0, 3 - relatedColumns.length),
      ]
    : relatedColumns;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: column.title,
    description: column.seoDescription,
    url,
    datePublished: column.publishedAt,
    dateModified: column.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_DEFAULT_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_DEFAULT_URL,
      logo: { "@type": "ImageObject", url: `${SITE_DEFAULT_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(column.eyecatchUrl ? { image: column.eyecatchUrl } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_DEFAULT_URL },
      { "@type": "ListItem", position: 2, name: "恋愛コラム", item: `${SITE_DEFAULT_URL}/columns` },
      { "@type": "ListItem", position: 3, name: column.title, item: url },
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

      <SiteHeader backHref="/columns" backLabel="コラム一覧" />

      <main className="mx-auto max-w-2xl px-4 pb-20 pt-6">
        {/* パンくずリスト */}
        <nav aria-label="パンくずリスト" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-text-sub">
            <li>
              <Link href="/" className="hover:text-accent">ホーム</Link>
            </li>
            <li aria-hidden="true" className="text-text-sub/40">›</li>
            <li>
              <Link href="/columns" className="hover:text-accent">恋愛コラム</Link>
            </li>
            <li aria-hidden="true" className="text-text-sub/40">›</li>
            <li className="text-text-main line-clamp-1">{column.title}</li>
          </ol>
        </nav>

        {/* カテゴリ */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Link
            href={`/columns?category=${encodeURIComponent(column.category)}`}
            className={`rounded-full px-3 py-0.5 text-xs font-medium ${colorClass}`}
          >
            {column.category}
          </Link>
        </div>

        {/* タイトル */}
        <h1 className="font-heading text-xl font-bold leading-snug sm:text-2xl" style={{ color: "#5C4033" }}>
          {column.title}
        </h1>

        {/* メタ情報（日付・著者） */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-log-hint">
          <time dateTime={column.publishedAt}>
            {new Date(column.publishedAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} 公開
          </time>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{SITE_NAME} 編集部</span>
          </span>
        </div>

        {/* 目次 */}
        {headings.length >= 3 && (
          <nav
            aria-label="目次"
            className="my-8 rounded-2xl border border-pink-light bg-sub-bg px-5 py-4"
          >
            <p className="mb-3 text-sm font-bold text-text-main">目次</p>
            <ol className="space-y-1.5">
              {headings.map((h, i) => (
                <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                  <a
                    href={`#${h.id}`}
                    className="flex items-start gap-2 text-sm text-accent hover:underline"
                  >
                    <span className="mt-0.5 shrink-0 text-[10px] font-bold text-accent/60">
                      {h.level === 2 ? `${i + 1}` : "└"}
                    </span>
                    <span>{h.text}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* 本文 */}
        <article
          className="column-body mt-8"
          dangerouslySetInnerHTML={{ __html: contentWithIds }}
        />

        {/* 関連記事 */}
        {otherColumns.length > 0 && (
          <aside className="mt-12">
            <h2 className="mb-4 font-heading text-base font-bold text-text-main">
              関連コラム
            </h2>
            <div className="space-y-2">
              {otherColumns.map((col) => {
                const pillClass = CATEGORY_COLORS[col.category] ?? "bg-gray-100 text-gray-600";
                return (
                  <Link
                    key={col.slug}
                    href={`/columns/${col.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-pink-light bg-sub-bg px-4 py-3 transition-colors hover:border-accent/40 hover:bg-pink-pale/30"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text-main line-clamp-2 leading-snug">
                        {col.title}
                      </p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${pillClass}`}>
                        {col.category}
                      </span>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-text-sub/40" aria-hidden="true">
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
            href="/columns"
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            恋愛コラム一覧へ
          </Link>
        </div>
      </main>

      <style>{`
        .column-body {
          line-height: 1.9;
          color: #5C4033;
          font-size: 0.97rem;
        }
        .column-body h2 {
          font-family: var(--font-zen-maru), sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 2.2rem 0 0.8rem;
          padding-bottom: 0.4rem;
          border-bottom: 2px solid #ffd6e7;
          color: #5C4033;
        }
        .column-body h3 {
          font-family: var(--font-zen-maru), sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin: 1.6rem 0 0.5rem;
          color: #F067A6;
        }
        .column-body p {
          margin-bottom: 1.2rem;
        }
        .column-body ul,
        .column-body ol {
          padding-left: 1.4em;
          margin-bottom: 1.2rem;
        }
        .column-body li {
          margin-bottom: 0.4rem;
        }
        .column-body blockquote {
          border-left: 3px solid #ffd6e7;
          padding: 0.6rem 1rem;
          background: #fff0f5;
          border-radius: 0 8px 8px 0;
          margin: 1.2rem 0;
          color: #7a5568;
          font-style: italic;
        }
        .column-body strong {
          color: #F067A6;
          font-weight: 700;
        }
        .column-body a {
          color: #F067A6;
          text-decoration: underline;
        }
        .column-body img {
          max-width: 100%;
          border-radius: 12px;
          margin: 1.2rem auto;
          display: block;
        }
        .column-body hr {
          display: none;
        }
      `}</style>

      <SiteFooter />
    </>
  );
}
