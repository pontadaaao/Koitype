import type { Metadata } from "next";
import { Suspense } from "react";
import DogLoverClient from "@/components/DogLoverClient";
import QuizContent from "@/components/QuizContent";
import { getResultById, results } from "@/lib/dog-lover-diagnosis";
import { buildDogLoverContent } from "@/lib/quiz-content";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

interface DogLoverPageProps {
  searchParams: { result?: string };
}

const PAGE_DESCRIPTION =
  "あなたの恋愛スタイルはどんな犬タイプ？8つの質問から、忠犬・甘えんぼ・バランス・オオカミ寄りの4タイプに診断します。";

export async function generateMetadata({
  searchParams,
}: DogLoverPageProps): Promise<Metadata> {
  const pageUrl = `${SITE_DEFAULT_URL}/diagnosis/dog-lover`;

  if (!searchParams?.result) {
    return {
      title: siteTitle("恋愛犬タイプ診断"),
      description: PAGE_DESCRIPTION,
      alternates: { canonical: pageUrl },
      openGraph: {
        title: `恋愛犬タイプ診断 | ${SITE_NAME}`,
        description: PAGE_DESCRIPTION,
        url: pageUrl,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `恋愛犬タイプ診断 | ${SITE_NAME}`,
        description: PAGE_DESCRIPTION,
      },
    };
  }

  const result = getResultById(searchParams.result);

  if (!result) {
    return {
      title: siteTitle("恋愛犬タイプ診断"),
      description: PAGE_DESCRIPTION,
      alternates: { canonical: pageUrl },
    };
  }

  const ogTitle = `私の恋愛タイプは「${result.name}」でした`;
  const ogDesc = `${result.title} ${result.tags.map((t) => "#" + t).join(" ")}`;

  return {
    title: siteTitle(ogTitle),
    description: ogDesc,
    robots: { index: false, follow: false },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      images: [`/diagnosis/dog-lover/opengraph-image?result=${searchParams.result}`],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle(ogTitle),
      description: ogDesc,
      images: [`/diagnosis/dog-lover/opengraph-image?result=${searchParams.result}`],
    },
  };
}

export default function DogLoverPage({ searchParams }: DogLoverPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-base">
          <p className="text-text-sub">読み込み中...</p>
        </div>
      }
    >
      <DogLoverClient>
        {!searchParams?.result && (
          <QuizContent {...buildDogLoverContent(results)} />
        )}
      </DogLoverClient>
    </Suspense>
  );
}
