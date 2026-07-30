import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DiagnosisClient from "@/components/DiagnosisClient";
import SiteFooter from "@/components/SiteFooter";
import QuizContent from "@/components/QuizContent";
import { getDiagnosisById, getResultById } from "@/lib/diagnoses";
import { buildDiagnosisContent } from "@/lib/quiz-content";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

interface DiagnosisPageProps {
  params: { id: string };
  searchParams: { result?: string };
}

export async function generateMetadata({
  params,
  searchParams,
}: DiagnosisPageProps): Promise<Metadata> {
  const diagnosis = getDiagnosisById(params.id);

  if (!diagnosis) {
    return { title: siteTitle("恋愛診断") };
  }

  const diagnosisUrl = `${SITE_DEFAULT_URL}/diagnosis/${diagnosis.id}`;

  if (!searchParams?.result) {
    const ogImages = diagnosis.thumbnail
      ? [
          {
            url: `${SITE_DEFAULT_URL}${diagnosis.thumbnail}`,
            alt: `${diagnosis.title} | ${SITE_NAME}`,
          },
        ]
      : undefined;

    const metaDescription = diagnosis.seoDescription ?? diagnosis.description;

    return {
      title: siteTitle(diagnosis.title),
      description: metaDescription,
      alternates: { canonical: diagnosisUrl },
      openGraph: {
        title: `${diagnosis.title} | ${SITE_NAME}`,
        description: metaDescription,
        url: diagnosisUrl,
        type: "website",
        images: ogImages,
      },
      twitter: {
        card: "summary_large_image",
        title: `${diagnosis.title} | ${SITE_NAME}`,
        description: metaDescription,
        images: ogImages,
      },
    };
  }

  const result = getResultById(diagnosis.id, searchParams.result);

  if (!result) {
    return {
      title: siteTitle(diagnosis.title),
      description: diagnosis.description,
      alternates: { canonical: diagnosisUrl },
    };
  }

  return {
    title: siteTitle(`私の恋愛スタイルは「${result.name}」でした`),
    description: result.desc,
    robots: { index: false, follow: false },
    openGraph: {
      title: `私の恋愛スタイルは「${result.name}」でした`,
      description: result.desc,
      images: [`/api/og?result=${searchParams.result}`],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle(`私の恋愛スタイルは「${result.name}」でした`),
      description: result.desc,
      images: [`/api/og?result=${searchParams.result}`],
    },
  };
}

export default function DiagnosisPage({ params, searchParams }: DiagnosisPageProps) {
  if (params.id === "dog-cat") {
    redirect("/diagnosis/dog-cat");
  }

  if (params.id === "compatibility") {
    redirect("/compatibility");
  }

  const diagnosis = getDiagnosisById(params.id);

  if (!diagnosis || diagnosis.questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base px-4">
        <div className="text-center">
          <p className="text-text-sub">診断が見つかりませんでした</p>
          <Link href="/" className="mt-4 inline-block text-accent underline">
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_DEFAULT_URL },
      { "@type": "ListItem", position: 2, name: "恋愛診断", item: `${SITE_DEFAULT_URL}/love-diagnosis` },
      { "@type": "ListItem", position: 3, name: diagnosis.title, item: `${SITE_DEFAULT_URL}/diagnosis/${diagnosis.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-base">
            <p className="text-text-sub">読み込み中...</p>
          </div>
        }
      >
        <DiagnosisClient diagnosis={diagnosis} />
      </Suspense>
      {!searchParams?.result && (
        <>
          <QuizContent {...buildDiagnosisContent(diagnosis)} />
          <SiteFooter />
        </>
      )}
    </>
  );
}
