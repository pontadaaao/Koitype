import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_NAME, siteTitle } from "@/lib/site";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: siteTitle("プライバシーポリシー"),
  description: `${SITE_NAME}のプライバシーポリシーです。`,
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
