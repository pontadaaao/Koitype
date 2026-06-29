import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_NAME, siteTitle } from "@/lib/site";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: siteTitle("運営者情報"),
  description: `${SITE_NAME}の運営者情報です。`,
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
