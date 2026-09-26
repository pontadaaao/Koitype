import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MyPageContent from "./MyPageContent";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

const DESCRIPTION = `${SITE_NAME}で受けた恋愛診断の結果をまとめて見返せるマイページです。`;

export const metadata: Metadata = {
  title: siteTitle("マイページ"),
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_DEFAULT_URL}/mypage` },
  openGraph: {
    title: siteTitle("マイページ"),
    description: DESCRIPTION,
    url: `${SITE_DEFAULT_URL}/mypage`,
    siteName: SITE_NAME,
    type: "website",
    locale: "ja_JP",
    images: [{ url: `${SITE_DEFAULT_URL}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle("マイページ"),
    description: DESCRIPTION,
    images: [`${SITE_DEFAULT_URL}/og-default.png`],
  },
  // 中身はブラウザごとの保存データなので検索結果には出さない
  robots: { index: false, follow: true },
};

export default function MyPage() {
  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />
      <MyPageContent />
      <SiteFooter />
    </div>
  );
}
