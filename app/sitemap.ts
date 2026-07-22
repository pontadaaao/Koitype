import type { MetadataRoute } from "next";
import { SITE_DEFAULT_URL } from "@/lib/site";
import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";
import { BLOG_CATEGORY_SLUGS } from "@/lib/microcms";
import { getBlogArticleSlugs } from "@/lib/blog-data";

const base = SITE_DEFAULT_URL.replace(/\/$/, "");

type SitemapEntry = MetadataRoute.Sitemap[number];

const BUILD_DATE = new Date();

const staticRoutes: { path: string; priority: number; changeFrequency: SitemapEntry["changeFrequency"]; lastModified?: Date }[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily", lastModified: BUILD_DATE },
  { path: "/love-diagnosis", priority: 0.9, changeFrequency: "weekly", lastModified: BUILD_DATE },
  { path: "/tests", priority: 0.9, changeFrequency: "weekly", lastModified: BUILD_DATE },
  { path: "/compatibility", priority: 0.9, changeFrequency: "weekly", lastModified: BUILD_DATE },
  { path: "/koi-mikuji", priority: 0.8, changeFrequency: "daily", lastModified: BUILD_DATE },
  { path: "/blog", priority: 0.8, changeFrequency: "daily", lastModified: BUILD_DATE },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/about", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/sitemap", priority: 0.3, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${base}${path}`,
    priority,
    changeFrequency,
    lastModified,
  }));

  const diagnosisEntries: MetadataRoute.Sitemap = [
    ...diagnoses
      .filter((d) => d.id !== "compatibility")
      .map((d) => ({
        url: `${base}/diagnosis/${d.id}`,
        priority: 0.7,
        changeFrequency: "monthly" as const,
        lastModified: BUILD_DATE,
      })),
    {
      url: `${base}/diagnosis/dog-cat`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: BUILD_DATE,
    },
  ];

  const testEntries: MetadataRoute.Sitemap = loveTests.map((t) => ({
    url: `${base}/tests/${t.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    lastModified: BUILD_DATE,
  }));

  // 恋愛ブログ: カテゴリー一覧 + 記事詳細（microCMS + 既存コラム統合）
  // 旧 /columns/* は /blog/* へ 301 リダイレクトするため sitemap には含めない。
  const blogEntries: MetadataRoute.Sitemap = BLOG_CATEGORY_SLUGS.map((slug) => ({
    url: `${base}/blog/category/${slug}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
    lastModified: BUILD_DATE,
  }));

  try {
    const articles = await getBlogArticleSlugs();
    for (const a of articles) {
      blogEntries.push({
        url: `${base}/blog/${a.slug}`,
        priority: 0.7,
        changeFrequency: "weekly" as const,
        lastModified: a.revisedAt
          ? new Date(a.revisedAt)
          : a.publishedAt
          ? new Date(a.publishedAt)
          : undefined,
      });
    }
  } catch {
    // microCMS 未設定・取得失敗時はブログ記事を含めない
  }

  return [
    ...staticEntries,
    ...diagnosisEntries,
    ...testEntries,
    ...blogEntries,
  ];
}
