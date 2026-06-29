import type { Metadata } from "next";
import LogTimeline from "@/components/LogTimeline";
import { siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle("恋ログ"),
  description: "みんなの恋バナを読んだり、自分の気持ちを投稿できます。",
};

export default function LogPage() {
  return <LogTimeline />;
}
