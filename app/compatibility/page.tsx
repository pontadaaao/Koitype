import type { Metadata } from "next";
import { Suspense } from "react";
import CompatibilityClient from "@/components/CompatibilityClient";
import {
  calcCompatibility,
  parseBirthdaysFromParams,
} from "@/lib/compatibility";
import { siteTitle } from "@/lib/site";

interface CompatibilityPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function toSearchParams(
  params: Record<string, string | string[] | undefined>
): URLSearchParams {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") sp.set(key, value);
  }
  return sp;
}

export async function generateMetadata({
  searchParams,
}: CompatibilityPageProps): Promise<Metadata> {
  const defaultMeta: Metadata = {
    title: siteTitle("誕生日でわかる ふたりの相性診断"),
    description:
      "生年月日だけでふたりの相性をチェック。星座と数秘術からスコアを算出します。",
  };

  const sp = toSearchParams(searchParams);
  const birthdays = parseBirthdaysFromParams(sp);

  if (!birthdays) {
    return defaultMeta;
  }

  const result = calcCompatibility(birthdays.a, birthdays.b);
  const ogParams = new URLSearchParams({
    type: "compatibility",
    s1: result.s1.name,
    s2: result.s2.name,
    score: String(result.total),
    rank: result.rank.rank,
  });

  const title = siteTitle(
    `${result.s1.name}×${result.s2.name} 相性${result.total}点`
  );

  return {
    title,
    description: result.rank.catch,
    openGraph: {
      title,
      description: result.rank.catch,
      images: [`/api/og?${ogParams.toString()}`],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: result.rank.catch,
      images: [`/api/og?${ogParams.toString()}`],
    },
  };
}

export default function CompatibilityPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-base">
          <p className="text-text-sub">読み込み中...</p>
        </div>
      }
    >
      <CompatibilityClient />
    </Suspense>
  );
}
