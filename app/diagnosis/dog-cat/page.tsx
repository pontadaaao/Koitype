import type { Metadata } from "next";
import { Suspense } from "react";
import DogCatClient from "@/components/DogCatClient";
import QuizContent from "@/components/QuizContent";
import { getResultById, results } from "@/lib/dog-cat-diagnosis";
import { buildDogCatContent } from "@/lib/quiz-content";
import { SITE_DEFAULT_URL, siteTitle } from "@/lib/site";

const PAGE_URL = `${SITE_DEFAULT_URL}/diagnosis/dog-cat`;

interface DogCatPageProps {
  searchParams: { result?: string; dogPct?: string };
}

export async function generateMetadata({
  searchParams,
}: DogCatPageProps): Promise<Metadata> {
  const defaultMeta: Metadata = {
    title: siteTitle("犬系？猫系？恋愛スタイル診断"),
    description:
      "12の質問で、あなたの恋愛スタイルが犬系か猫系かを診断。バランスメーターで傾向をチェック。",
    alternates: { canonical: PAGE_URL },
  };

  if (!searchParams?.result) {
    return defaultMeta;
  }

  const result = getResultById(searchParams.result);

  if (!result) {
    return defaultMeta;
  }

  const ogParams = new URLSearchParams({ result: searchParams.result });
  if (searchParams.dogPct) {
    ogParams.set("dogPct", searchParams.dogPct);
  }

  return {
    title: siteTitle(`私の恋愛スタイルは「${result.name}」でした`),
    description: result.catch,
    robots: { index: false, follow: false },
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: `私の恋愛スタイルは「${result.name}」でした`,
      description: result.catch,
      images: [`/api/og?${ogParams.toString()}`],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle(`私の恋愛スタイルは「${result.name}」でした`),
      description: result.catch,
      images: [`/api/og?${ogParams.toString()}`],
    },
  };
}

export default function DogCatPage({ searchParams }: DogCatPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-base">
          <p className="text-text-sub">読み込み中...</p>
        </div>
      }
    >
      <DogCatClient>
        {!searchParams?.result && (
          <QuizContent {...buildDogCatContent(results)} />
        )}
      </DogCatClient>
    </Suspense>
  );
}
