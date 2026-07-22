import type { Metadata } from "next";
import { redirect } from "next/navigation";
import HomePageClient from "@/components/HomePageClient";
import SiteFooter from "@/components/SiteFooter";
import { getBlogArticles } from "@/lib/blog-data";
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

interface HomePageProps {
  searchParams: { tab?: string; category?: string };
}

// 新着記事を反映するため ISR（60秒ごとに再生成）
export const revalidate = 60;

export default async function HomePage({ searchParams }: HomePageProps) {
  if (searchParams.category === "love-type") {
    redirect("/love-diagnosis");
  }
  if (searchParams.category === "compatibility") {
    redirect("/compatibility");
  }

  // 恋愛ブログ（microCMS + Supabase + static）の新着6件。追加すると自動で反映される。
  const articles = await getBlogArticles();
  const latestColumns = articles.slice(0, 6).map((a) => ({
    slug: a.slug,
    title: a.title,
    eyecatchUrl: a.eyecatch?.url ?? null,
  }));

  return (
    <>
      <HomePageClient latestColumns={latestColumns} />
      <SiteFooter />
    </>
  );
}
