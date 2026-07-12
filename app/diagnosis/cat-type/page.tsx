import type { Metadata } from "next";
import { Suspense } from "react";
import CatTypeClient from "@/components/CatTypeClient";
import QuizContent from "@/components/QuizContent";
import { getCatResultById, results } from "@/lib/cat-type-diagnosis";
import { buildCatTypeContent } from "@/lib/quiz-content";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

interface CatTypePageProps {
  searchParams: { result?: string; start?: string };
}

const DEFAULT_TITLE = "猫系診断｜あなたはどの猫タイプ？恋愛猫タイプ診断【無料】";
const DEFAULT_DESC =
  "8つの質問であなたの恋愛猫タイプを診断！デレ隠し黒猫・気分屋にゃんこ・甘え上手にゃんこ・あざと猫の4タイプからあなたの恋愛傾向がわかります。";
const PAGE_URL = `${SITE_DEFAULT_URL}/diagnosis/cat-type`;

export async function generateMetadata({
  searchParams,
}: CatTypePageProps): Promise<Metadata> {
  if (!searchParams?.result) {
    return {
      title: siteTitle(DEFAULT_TITLE),
      description: DEFAULT_DESC,
      alternates: { canonical: PAGE_URL },
      openGraph: {
        title: `${DEFAULT_TITLE} | ${SITE_NAME}`,
        description: DEFAULT_DESC,
        url: PAGE_URL,
        type: "website",
        images: [{ url: `/diagnosis/cat-type/opengraph-image` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${DEFAULT_TITLE} | ${SITE_NAME}`,
        description: DEFAULT_DESC,
        images: [{ url: `/diagnosis/cat-type/opengraph-image` }],
      },
    };
  }

  const result = getCatResultById(searchParams.result);

  if (!result) {
    return {
      title: siteTitle(DEFAULT_TITLE),
      description: DEFAULT_DESC,
      alternates: { canonical: PAGE_URL },
    };
  }

  const resultTitle = `私の恋愛猫タイプは「${result.name}」でした`;
  const resultDesc = `「${result.catch}」 #恋愛猫タイプ診断`;
  const ogImageUrl = `/diagnosis/cat-type/opengraph-image?result=${result.id}`;

  return {
    title: siteTitle(resultTitle),
    description: resultDesc,
    robots: { index: false, follow: false },
    openGraph: {
      title: resultTitle,
      description: resultDesc,
      images: [{ url: ogImageUrl }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resultTitle,
      description: resultDesc,
      images: [{ url: ogImageUrl }],
    },
  };
}

export default function CatTypePage({ searchParams }: CatTypePageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-base">
          <p className="text-text-sub">読み込み中...</p>
        </div>
      }
    >
      <CatTypeClient>
        {!searchParams?.result && (
          <QuizContent {...buildCatTypeContent(results)} />
        )}
      </CatTypeClient>
    </Suspense>
  );
}
