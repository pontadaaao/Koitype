import type { Metadata } from "next";
import LogTimeline from "@/components/LogTimeline";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle("恋ログ"),
  description: "みんなの恋バナを読んだり、自分の気持ちを投稿できます。匿名で恋愛の悩みをシェアしよう。",
  alternates: { canonical: `${SITE_DEFAULT_URL}/log` },
  openGraph: {
    title: `恋ログ | ${SITE_NAME}`,
    description: "みんなの恋バナを読んだり、自分の気持ちを投稿できます。",
    url: `${SITE_DEFAULT_URL}/log`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `恋ログ | ${SITE_NAME}`,
    description: "みんなの恋バナを読んだり、自分の気持ちを投稿できます。",
  },
};

export default function LogPage() {
  return <LogTimeline />;
}
