import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle("恋みくじ"),
  description: "今日の恋愛運をおみくじで占おう。Koitypeの恋みくじで毎日の恋愛アドバイスを受け取って。",
  alternates: { canonical: `${SITE_DEFAULT_URL}/koi-mikuji` },
  openGraph: {
    title: `恋みくじ | ${SITE_NAME}`,
    description: "今日の恋愛運をおみくじで占おう。",
    url: `${SITE_DEFAULT_URL}/koi-mikuji`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `恋みくじ | ${SITE_NAME}`,
    description: "今日の恋愛運をおみくじで占おう。",
  },
};

export default function KoiMikujiPage() {
  redirect("/koi-mikuji/index.html");
}
