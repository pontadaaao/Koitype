import type { Metadata } from "next";
import Link from "next/link";
import HomePageClient from "@/components/HomePageClient";
import SiteFooter from "@/components/SiteFooter";
import { getBlogArticles } from "@/lib/blog-data";
import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";
import { SITE_DEFAULT_URL, SITE_DESCRIPTION, SITE_NAME, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle(),
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_DEFAULT_URL },
  openGraph: {
    title: siteTitle(),
    description: SITE_DESCRIPTION,
    url: SITE_DEFAULT_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle(),
    description: SITE_DESCRIPTION,
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const articles = await getBlogArticles();
  const latestColumns = articles.slice(0, 6).map((a) => ({
    slug: a.slug,
    title: a.title,
    eyecatchUrl: a.eyecatch?.url ?? null,
  }));

  return (
    <>
      <HomePageClient latestColumns={latestColumns} />

      {/* SSR: キャッシュ用の内部リンク一覧（Googleクローラー向け） */}
      <nav className="hidden">
        <h2>恋愛診断一覧</h2>
        {diagnoses.map((d) => (
          <Link key={d.id} href={`/diagnosis/${d.id}`}>
            {d.title}
          </Link>
        ))}

        <h2>恋愛心理テスト</h2>
        {loveTests.map((t) => (
          <Link key={t.slug} href={`/tests/${t.slug}`}>
            {t.title}
          </Link>
        ))}
      </nav>

      <SiteFooter />
    </>
  );
}
