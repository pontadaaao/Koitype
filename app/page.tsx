import { redirect } from "next/navigation";
import HomePageClient from "@/components/HomePageClient";
import SiteFooter from "@/components/SiteFooter";

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
