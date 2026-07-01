import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: siteTitle("運営者情報"),
  description: `${SITE_NAME}の運営者情報ページです。恋愛診断サイトKoitypeの運営について紹介しています。`,
  alternates: { canonical: `${SITE_DEFAULT_URL}/about` },
  openGraph: {
    title: `運営者情報 | ${SITE_NAME}`,
    description: `${SITE_NAME}の運営者情報ページです。`,
    url: `${SITE_DEFAULT_URL}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `運営者情報 | ${SITE_NAME}`,
    description: `${SITE_NAME}の運営者情報ページです。`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />
      <AboutContent />
      <SiteFooter />
    </div>
  );
}
