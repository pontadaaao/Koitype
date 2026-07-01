import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: siteTitle("お問い合わせ"),
  description: `${SITE_NAME}へのお問い合わせフォームです。ご意見・ご要望・不具合報告などお気軽にご連絡ください。`,
  alternates: { canonical: `${SITE_DEFAULT_URL}/contact` },
  openGraph: {
    title: `お問い合わせ | ${SITE_NAME}`,
    description: `${SITE_NAME}へのお問い合わせフォームです。`,
    url: `${SITE_DEFAULT_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `お問い合わせ | ${SITE_NAME}`,
    description: `${SITE_NAME}へのお問い合わせフォームです。`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-pale via-sub-bg to-base">
      <SiteHeader showBack={false} />
      <ContactPageContent />
      <SiteFooter />
    </div>
  );
}
