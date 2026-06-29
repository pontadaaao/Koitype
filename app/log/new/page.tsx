import type { Metadata } from "next";
import PostNewClient from "@/components/PostNewClient";
import { siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle("恋ログに投稿"),
  description: "恋ログに名前・内容・カテゴリーで投稿できます。",
};

export default function LogNewPage() {
  return <PostNewClient />;
}
