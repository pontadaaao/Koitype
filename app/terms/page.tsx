import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: siteTitle("利用規約"),
  description: `${SITE_NAME}の利用規約です。サービスの利用条件について説明しています。`,
  alternates: { canonical: `${SITE_DEFAULT_URL}/terms` },
  openGraph: {
    title: `利用規約 | ${SITE_NAME}`,
    description: `${SITE_NAME}の利用規約です。`,
    url: `${SITE_DEFAULT_URL}/terms`,
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />
      <TermsContent />
      <SiteFooter />
    </div>
  );
}
