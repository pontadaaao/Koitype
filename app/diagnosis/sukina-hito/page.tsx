import type { Metadata } from "next";
import { Suspense } from "react";
import SukinaHitoClient from "@/components/SukinaHitoClient";
import QuizContent from "@/components/QuizContent";
import { getSukinaHitoResultById, results } from "@/lib/sukina-hito-diagnosis";
import { buildSukinaHitoContent } from "@/lib/quiz-content";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

interface SukinaHitoPageProps {
  searchParams: { result?: string; start?: string };
}

const DEFAULT_TITLE = "好きな人から見たあなた診断｜相手から見えている私の印象【無料】";
const DEFAULT_DESC =
  "好きな人から見た私はどんな印象？8つの質問で「一緒にいると癒される人」「守ってあげたくなる人」「もっと知りたくなる人」「追いかけたくなる人」の4タイプに診断します。";
const PAGE_URL = `${SITE_DEFAULT_URL}/diagnosis/sukina-hito`;

export async function generateMetadata({
  searchParams,
}: SukinaHitoPageProps): Promise<Metadata> {
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
        images: [{ url: `/diagnosis/sukina-hito/opengraph-image` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${DEFAULT_TITLE} | ${SITE_NAME}`,
        description: DEFAULT_DESC,
        images: [{ url: `/diagnosis/sukina-hito/opengraph-image` }],
      },
    };
  }

  const result = getSukinaHitoResultById(searchParams.result);

  if (!result) {
    return {
      title: siteTitle(DEFAULT_TITLE),
      description: DEFAULT_DESC,
      alternates: { canonical: PAGE_URL },
    };
  }

  const resultTitle = `好きな人から見た私は「${result.name}」でした`;
  const resultDesc = `本音：「${result.honesty[0]}」 #好きな人から見たあなた診断`;
  const ogImageUrl = `/diagnosis/sukina-hito/opengraph-image?result=${result.id}`;

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

export default function SukinaHitoPage({ searchParams }: SukinaHitoPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-base">
          <p className="text-text-sub">読み込み中...</p>
        </div>
      }
    >
      <SukinaHitoClient>
        {!searchParams?.result && (
          <QuizContent {...buildSukinaHitoContent(results)} />
        )}
      </SukinaHitoClient>
    </Suspense>
  );
}
