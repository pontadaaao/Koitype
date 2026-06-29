import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getStaticColumnBySlug, staticColumns } from "@/lib/static-columns";
import { SITE_DEFAULT_URL, siteTitle } from "@/lib/site";

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
      ...(column.eyecatchUrl ? { images: [{ url: column.eyecatchUrl }] } : {}),
      publishedTime: column.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: column.title,
      description: column.seoDescription,
      ...(column.eyecatchUrl ? { images: [column.eyecatchUrl] } : {}),
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "片思い": "bg-fuchsia-100 text-fuchsia-700",
  "カップル": "bg-red-100 text-red-700",
  "別れ・失恋": "bg-indigo-100 text-indigo-700",
};

export default function ColumnDetailPage({ params }: ColumnDetailPageProps) {
  const column = getStaticColumnBySlug(params.slug);
  if (!column) notFound();

  const colorClass = CATEGORY_COLORS[column.category] ?? "bg-gray-100 text-gray-600";

  return (
    <>
      <SiteHeader backHref="/columns" backLabel="コラム一覧" />
      <main className="mx-auto max-w-2xl px-4 pb-20 pt-6">
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
        <h1 className="font-heading text-xl font-bold leading-snug text-text-main sm:text-2xl">
          {column.title}
        </h1>

        {/* 日付 */}
        <time dateTime={column.publishedAt} className="mt-2 block text-xs text-log-hint">
          {new Date(column.publishedAt).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} 公開
        </time>

        {/* 本文 */}
        <article
          className="column-body mt-8"
          dangerouslySetInnerHTML={{ __html: column.content }}
        />

        {/* 一覧に戻る */}
        <div className="mt-12 text-center">
          <Link
            href="/columns"
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
            恋愛コラム一覧へ
          </Link>
        </div>
      </main>

      <style>{`
        .column-body {
          line-height: 1.9;
          color: #2a1a22;
          font-size: 0.97rem;
        }
        .column-body h2 {
          font-family: var(--font-zen-maru), sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 2.2rem 0 0.8rem;
          padding-bottom: 0.4rem;
          border-bottom: 2px solid #ffd6e7;
          color: #2a1a22;
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
