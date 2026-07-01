import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import LoveDiagnosisSection from "@/components/sections/LoveDiagnosisSection";
import DiagnosisSlider from "@/components/DiagnosisSlider";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle("恋愛診断"),
  description: "あなたの恋愛タイプやスタイルがわかる無料の恋愛診断一覧です。恋愛スタイル・犬系猫系・束縛度など多彩な診断で自分を知ろう。",
  alternates: { canonical: `${SITE_DEFAULT_URL}/love-diagnosis` },
  openGraph: {
    title: `恋愛診断 | ${SITE_NAME}`,
    description: "あなたの恋愛タイプやスタイルがわかる無料の恋愛診断一覧。",
    url: `${SITE_DEFAULT_URL}/love-diagnosis`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `恋愛診断 | ${SITE_NAME}`,
    description: "あなたの恋愛タイプやスタイルがわかる無料の恋愛診断一覧。",
  },
};

export default function LoveDiagnosisPage() {
  return (
    <>
      <div className="min-h-screen bg-base">
        <SiteHeader showBack={false} />

        <main className="mx-auto max-w-xl px-4 pb-6 pt-4 sm:max-w-3xl sm:pt-6 lg:max-w-5xl">
          <div className="mb-8 text-center">
            <p className="mb-1 font-cormorant text-sm italic tracking-widest text-accent/70">
              Diagnosis
            </p>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl" style={{ color: "#5C4033" }}>
              恋愛診断
            </h1>
            <p className="mt-2 text-xs text-text-main">
              恋愛タイプがわかる診断一覧
            </p>
          </div>
          <DiagnosisSlider />
          <LoveDiagnosisSection />
        </main>
      </div>

      <SiteFooter />
    </>
  );
}
