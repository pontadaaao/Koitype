import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NotificationsContent from "./NotificationsContent";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle("お知らせ"),
  description: `${SITE_NAME}からのお知らせ・更新情報をご確認いただけます。`,
  alternates: { canonical: `${SITE_DEFAULT_URL}/notifications` },
  openGraph: {
    title: `お知らせ | ${SITE_NAME}`,
    description: `${SITE_NAME}からのお知らせ・更新情報をご確認いただけます。`,
    url: `${SITE_DEFAULT_URL}/notifications`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `お知らせ | ${SITE_NAME}`,
    description: `${SITE_NAME}からのお知らせ・更新情報をご確認いただけます。`,
  },
};

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />
      <NotificationsContent />
      <SiteFooter />
    </div>
  );
}
