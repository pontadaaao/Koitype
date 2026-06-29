import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_NAME, siteTitle } from "@/lib/site";
import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";

export const metadata: Metadata = {
  title: siteTitle("サイトマップ"),
  description: `${SITE_NAME}のサイトマップです。`,
  alternates: { canonical: "/sitemap" },
};

const mainPages = [
  { href: "/", label: "ホーム" },
  { href: "/love-diagnosis", label: "恋愛診断" },
  { href: "/tests", label: "心理テスト" },
  { href: "/compatibility", label: "相性診断" },
  { href: "/koi-mikuji", label: "恋みくじ" },
  { href: "/log", label: "恋ログ" },
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
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />

      <main className="pp">
        <h1 className="pp__title">サイトマップ</h1>

        <SitemapSection title="メインページ" items={mainPages} />
        <SitemapSection title="恋愛診断" items={diagnosisPages} />
        <SitemapSection title="心理テスト" items={testPages} />
        <SitemapSection title="サイト情報" items={infopages} />
      </main>

      <SiteFooter />
    </div>
  );
}
