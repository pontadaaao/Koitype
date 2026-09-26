import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { KOI_MIKUJI_FORTUNES, getKoiMikujiFortune } from "@/lib/koi-mikuji";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

// 恋みくじの結果シェア用ページ。X/LINE でリンクカードに結果の札を出すためだけのページなので
// noindex にし、canonical は恋みくじ本体へ向ける。
interface Props {
  params: { fortune: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return KOI_MIKUJI_FORTUNES.map((f) => ({ fortune: f.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const fortune = getKoiMikujiFortune(params.fortune);
  if (!fortune) return {};

  const title = `今日の恋愛運は「${fortune.key}」でした♡ | 恋みくじ`;
  const description = `${fortune.lines.join("")} あなたも今日の恋愛運をおみくじで占ってみて。1日1回・無料の恋みくじ | ${SITE_NAME}`;
  const url = `${SITE_DEFAULT_URL}/koi-mikuji/r/${fortune.slug}`;
  // ルートレイアウトの twitter:image（サイト共通画像）を上書きする。
  // og:image は同じ階層の opengraph-image.tsx から自動で入る。
  const image = `${url}/opengraph-image`;

  return {
    title: siteTitle(`恋みくじ「${fortune.key}」`),
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_DEFAULT_URL}/koi-mikuji` },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function KoiMikujiSharePage({ params }: Props) {
  const fortune = getKoiMikujiFortune(params.fortune);
  if (!fortune) notFound();

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />
      <main className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-10 text-center">
        <p className="text-sm font-medium text-text-sub">友だちの今日の恋愛運は…♡</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/koi-mikuji/r/${fortune.slug}/opengraph-image`}
          alt={`恋みくじ「${fortune.key}」${fortune.lines.join("")}`}
          width={1200}
          height={630}
          className="h-auto w-full rounded-2xl"
        />
        <a
          href="/koi-mikuji"
          className="rounded-full bg-[#fe6c9e] px-8 py-3.5 font-bold text-white shadow-[0_6px_16px_rgba(254,108,158,.35)] transition-colors hover:bg-[#f5588f]"
        >
          あなたも恋みくじを引いてみる
        </a>
        <p className="text-xs text-text-sub">1日1回・無料で今日の恋愛運を占えます</p>
        <Link href="/" className="text-sm text-accent underline">
          ほかの恋愛診断を見る
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
