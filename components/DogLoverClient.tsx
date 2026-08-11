"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import QuestionStep from "@/components/QuestionStep";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  calculateScore,
  getResultByScore,
  getResultById,
  questions,
} from "@/lib/dog-lover-diagnosis";
import { useLanguage } from "@/components/LanguageProvider";
import type { DiagnosisResult, DogLoverResult } from "@/lib/types";

type Screen = "intro" | "quiz" | "result";

function toResultCard(r: DogLoverResult): DiagnosisResult {
  return {
    id: r.id,
    icon: "paw",
    name: r.name,
    resultLabel: "あなたの恋愛スタイルは",
    tags: r.tags,
    desc: `「${r.title}」`,
    aru: r.traits,
    compat: [{ name: "向いている相手", desc: r.partner, score: "♡" }],
    prescription: r.advice,
  };
}

export default function DogLoverClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const resultIdFromUrl = searchParams.get("result");
  const shouldAutoStart = searchParams.get("start") === "1";
  const initialResult = resultIdFromUrl ? (getResultById(resultIdFromUrl) ?? null) : null;

  const [screen, setScreen] = useState<Screen>(() => {
    if (initialResult) return "result";
    if (shouldAutoStart) return "quiz";
    return "intro";
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<DogLoverResult | null>(initialResult);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (resultIdFromUrl) {
      const found = getResultById(resultIdFromUrl);
      if (found) {
        setResult(found);
        setScreen("result");
      }
      return;
    }
    if (shouldAutoStart) setScreen("quiz");
  }, [resultIdFromUrl, shouldAutoStart]);

  const handleStart = () => {
    setScreen("quiz");
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
    setIsVisible(true);
    router.replace("/diagnosis/dog-lover", { scroll: false });
  };

  const handleSelect = useCallback(
    (index: number) => {
      if (!isVisible) return;

      const newAnswers = [...answers, index];
      setAnswers(newAnswers);

      if (newAnswers.length >= questions.length) {
        const score = calculateScore(newAnswers);
        const found = getResultByScore(score);
        setResult(found);
        setScreen("result");
        router.replace(`/diagnosis/dog-lover?result=${found.id}`, { scroll: false });
        return;
      }

      setIsVisible(false);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsVisible(true);
      }, 200);
    },
    [answers, isVisible, router]
  );

  const handleBack = () => {
    if (currentStep === 0 || !isVisible) return;

    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      setAnswers((prev) => prev.slice(0, -1));
      setIsVisible(true);
    }, 200);
  };

  const handleRetry = () => {
    setScreen("quiz");
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
    setIsVisible(true);
    router.replace("/diagnosis/dog-lover?start=1", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader />

      <main className={`mx-auto overflow-x-hidden px-4 py-6 sm:py-8 ${screen === "result" ? "max-w-3xl" : "max-w-xl"}`}>
        {screen === "intro" && (
          <div className="text-center">
            <div className="overflow-hidden rounded-2xl border border-pink-light bg-base shadow-sm">
              <div
                className="px-6 pb-10 pt-12"
                style={{ background: "linear-gradient(160deg, #fff4f9 0%, #fdf0ff 100%)" }}
              >
                <p className="mb-1 font-cormorant text-sm italic tracking-widest text-accent/70">
                  Love Diagnosis
                </p>
                <h1 className="font-heading text-2xl font-bold sm:text-3xl" style={{ color: "#5C4033" }}>
                  恋愛犬タイプ診断
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-text-sub">
                  あなたの恋愛スタイルはどんな犬タイプ？
                  <br />
                  8つの質問から、あなたの恋愛傾向を診断します。
                </p>
                <div className="mt-5 flex justify-center gap-2 text-xs text-text-sub">
                  <span className="rounded-full border border-pink-light bg-white px-3 py-1">
                    全8問
                  </span>
                  <span className="rounded-full border border-pink-light bg-white px-3 py-1">
                    約3分
                  </span>
                </div>
              </div>
            </div>
            <button type="button" onClick={handleStart} className="btn-primary mt-6">
              診断をはじめる
            </button>
          </div>
        )}

        {screen === "quiz" && (
          <div className="card p-5 sm:p-6">
            <ProgressBar current={currentStep + 1} total={questions.length} />
            <div className="mt-8">
              <QuestionStep
                question={questions[currentStep]}
                questionNumber={currentStep + 1}
                onSelect={handleSelect}
                isVisible={isVisible}
                showBack={currentStep > 0}
                onBack={handleBack}
              />
            </div>
          </div>
        )}

        {screen === "result" && result && (
          <div className="space-y-5">
            <ResultCard result={toResultCard(result)} />
            <div className="mx-auto max-w-xl space-y-5">
              <div className="card p-5">
                <ShareButtons diagnosisId="dog-lover" result={toResultCard(result)} />
              </div>
              <div className="flex flex-col gap-3 pb-4">
                <button type="button" onClick={handleRetry} className="btn-secondary">
                  {t.diagnosis.retry}
                </button>
                <Link href="/" className="btn-primary">
                  {t.diagnosis.seeMore}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
