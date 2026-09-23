import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: siteTitle("プライバシーポリシー"),
  description: `${SITE_NAME}のプライバシーポリシーです。取得する情報と利用目的、Cookie・広告（Google AdSense）・アクセス解析、外部送信について説明しています。`,
  alternates: { canonical: `${SITE_DEFAULT_URL}/privacy-policy` },
  openGraph: {
    title: `プライバシーポリシー | ${SITE_NAME}`,
    description: `${SITE_NAME}のプライバシーポリシーです。`,
    url: `${SITE_DEFAULT_URL}/privacy-policy`,
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />
      <PrivacyPolicyContent />
      <SiteFooter />
    </div>
  );
}
