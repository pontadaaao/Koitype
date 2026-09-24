import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MyPageContent from "./MyPageContent";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

// 中身はブラウザごとの保存データなので検索結果には出さない
export const metadata: Metadata = {
  title: siteTitle("マイページ"),
  description: `${SITE_NAME}で受けた恋愛診断の結果をまとめて見返せるマイページです。`,
  alternates: { canonical: `${SITE_DEFAULT_URL}/mypage` },
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
