import type { Metadata } from "next";
import Link from "next/link";
import HomePageClient from "@/components/HomePageClient";
import SiteFooter from "@/components/SiteFooter";
import { getBlogArticles } from "@/lib/blog-data";
import { SITE_DEFAULT_URL, SITE_DESCRIPTION, SITE_NAME, siteTitle } from "@/lib/site";

const HOME_NAV_LINKS = [
  { href: "/love-diagnosis", label: "恋愛診断（全36種）" },
  { href: "/tests", label: "恋愛心理テスト（全77種）" },
  { href: "/compatibility", label: "誕生日の相性診断" },
  { href: "/koi-mikuji", label: "恋みくじ" },
  { href: "/blog", label: "恋愛ブログ" },
  { href: "/sitemap", label: "サイトマップ（全ページ一覧）" },
  { href: "/about", label: "運営者情報" },
];

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

      {/*
        以前ここに display:none の <nav> で全診断・全テストへのリンクを
        出していたが、閲覧者に見せずクローラーにだけ見せるリンクは
        検索エンジンのスパムポリシー上のリスクがあるうえ、
        d.href を無視していたため /diagnosis/compatibility（実体は
        /compatibility）への404リンクを毎ページ出していた。
        全ページのフッターから辿れる /sitemap が同じ役割を果たすので、
        ここでは見える形の導線だけを置く。
      */}
      <section className="mx-auto max-w-2xl px-4 pb-8">
        <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
          Koitype（コイタイプ）について
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-sub">
          Koitypeは、恋愛のタイプや相性を診断と心理テストで確かめられる無料のWebメディアです。
          5〜12問の恋愛診断が36種類、1問で終わる心理テストが77種類、
          それに誕生日で相性を見る診断と恋みくじ、片思いやカップルの悩みを扱う恋愛ブログを公開しています。
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-sub">
          会員登録もアプリのインストールも必要ありません。
          設問への回答はブラウザの中だけで処理され、サーバーに送信・保存されることはないので、
          何度でも気軽に試せます。
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-sub">
          診断・心理テストはKoitype編集部が独自に制作した、娯楽と自己理解のためのコンテンツです。
          心理学的な検査を再現したものではなく、結果は自分の傾向を言葉にするきっかけとしてお使いください。
        </p>
      </section>

      <nav
        aria-label="サイト内の主なコンテンツ"
        className="mx-auto max-w-5xl px-4 pb-10"
      >
        <div className="flex flex-wrap justify-center gap-2.5">
          {HOME_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // /koi-mikuji は静的HTMLへの rewrite なので RSC プリフェッチが 404 になる
              prefetch={link.href === "/koi-mikuji" ? false : undefined}
              className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      <SiteFooter />
    </>
  );
}
