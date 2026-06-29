import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DiagnosisClient from "@/components/DiagnosisClient";
import { getDiagnosisById, getResultById } from "@/lib/diagnoses";
import { siteTitle } from "@/lib/site";

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

  if (!searchParams?.result) {
    return {
      title: siteTitle(diagnosis.title),
      description: diagnosis.description,
    };
  }

  const result = getResultById(diagnosis.id, searchParams.result);

  if (!result) {
    return {
      title: siteTitle(diagnosis.title),
      description: diagnosis.description,
    };
  }

  return {
    title: siteTitle(`私の恋愛スタイルは「${result.name}」でした`),
    description: result.desc,
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

export default function DiagnosisPage({ params }: DiagnosisPageProps) {
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

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-base">
          <p className="text-text-sub">読み込み中...</p>
        </div>
      }
    >
      <DiagnosisClient diagnosis={diagnosis} />
    </Suspense>
  );
}
