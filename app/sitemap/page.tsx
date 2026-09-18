import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_NAME, siteTitle } from "@/lib/site";
import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";
import { getBlogArticles } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: siteTitle("サイトマップ"),
  description: `${SITE_NAME}に掲載している恋愛診断・心理テスト・恋愛ブログ記事・サイト情報ページの全一覧です。`,
  alternates: { canonical: "/sitemap" },
};

const mainPages = [
  { href: "/", label: "ホーム" },
  { href: "/love-diagnosis", label: "恋愛診断" },
  { href: "/tests", label: "心理テスト" },
  { href: "/compatibility", label: "相性診断" },
  { href: "/koi-mikuji", label: "恋みくじ" },
  { href: "/blog", label: "恋愛ブログ" },
];

const infopages = [
  { href: "/contact", label: "お問い合わせ" },
  { href: "/about", label: "運営者情報" },
  { href: "/privacy-policy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
];

const diagnosisPages = diagnoses
  .filter((d) => d.id !== "compatibility")
  .map((d) => ({ href: `/diagnosis/${d.id}`, label: d.title }));

const testPages = loveTests.map((t) => ({ href: `/tests/${t.slug}`, label: t.title }));

function SitemapSection({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <section>
      <h2 className="pp__h2">{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              prefetch={item.href === "/koi-mikuji" ? false : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const revalidate = 60;

export default async function SitemapPage() {
  // 恋愛ブログの記事も一覧に載せる（microCMS 取得に失敗しても他は表示する）
  let blogPages: { href: string; label: string }[] = [];
  try {
    const articles = await getBlogArticles();
    blogPages = articles.map((a) => ({
      href: `/blog/${a.slug}`,
      label: a.title,
    }));
  } catch {
    blogPages = [];
  }

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />

      <main className="pp">
        <h1 className="pp__title">サイトマップ</h1>

        <SitemapSection title="メインページ" items={mainPages} />
        <SitemapSection title="恋愛診断" items={diagnosisPages} />
        {blogPages.length > 0 && (
          <SitemapSection title="恋愛ブログ" items={blogPages} />
        )}
        <SitemapSection title="心理テスト" items={testPages} />
        <SitemapSection title="サイト情報" items={infopages} />
      </main>

      <SiteFooter />
    </div>
  );
}
