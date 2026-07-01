import type { Metadata } from "next";
import { redirect } from "next/navigation";
import HomePageClient from "@/components/HomePageClient";
import SiteFooter from "@/components/SiteFooter";
import { SITE_DEFAULT_URL, SITE_DESCRIPTION, SITE_NAME, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle(),
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_DEFAULT_URL },
  openGraph: {
    title: siteTitle(),
    description: SITE_DESCRIPTION,
    url: SITE_DEFAULT_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle(),
    description: SITE_DESCRIPTION,
  },
};

interface HomePageProps {
  searchParams: { tab?: string; category?: string };
}

export default function HomePage({ searchParams }: HomePageProps) {
  if (searchParams.tab === "log") {
    redirect("/log");
  }
  if (searchParams.tab === "log-new") {
    redirect("/log/new");
  }
  if (searchParams.category === "love-type") {
    redirect("/love-diagnosis");
  }
  if (searchParams.category === "compatibility") {
    redirect("/compatibility");
  }

  return (
    <>
      <HomePageClient />
      <SiteFooter />
    </>
  );
}
