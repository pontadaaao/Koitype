"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import QuestionStep from "@/components/QuestionStep";
import ResultSummary from "@/components/ResultSummary";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  calculateDogCatScore,
  defaultDogPctForResult,
  getResultById,
  questions,
} from "@/lib/dog-cat-diagnosis";
import type { DogCatResult } from "@/lib/types";

type Screen = "intro" | "quiz" | "result";

export default function DogCatClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resultIdFromUrl = searchParams.get("result");
  const dogPctFromUrl = searchParams.get("dogPct");
  const shouldAutoStart = searchParams.get("start") === "1";
  const initialResult = resultIdFromUrl
    ? getResultById(resultIdFromUrl) ?? null
    : null;
  const initialDogPct =
    initialResult && dogPctFromUrl
      ? parseInt(dogPctFromUrl, 10)
      : initialResult
        ? defaultDogPctForResult(initialResult.id)
        : 0;

  const [screen, setScreen] = useState<Screen>(() => {
    if (initialResult) return "result";
    if (shouldAutoStart) return "quiz";
    return "intro";
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<DogCatResult | null>(initialResult);
  const [dogPct, setDogPct] = useState(initialDogPct);
  const [catPct, setCatPct] = useState(
    initialResult ? 100 - initialDogPct : 0
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (resultIdFromUrl) {
      const urlResult = getResultById(resultIdFromUrl);
      if (urlResult) {
        setResult(urlResult);
        const pct = dogPctFromUrl
          ? parseInt(dogPctFromUrl, 10)
          : defaultDogPctForResult(resultIdFromUrl);
        setDogPct(pct);
        setCatPct(100 - pct);
        setScreen("result");
      }
      return;
    }
    if (shouldAutoStart) {
      setScreen("quiz");
    }
  }, [resultIdFromUrl, dogPctFromUrl, shouldAutoStart]);

  const handleStart = () => {
    setScreen("quiz");
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
    setDogPct(0);
    setCatPct(0);
    setIsVisible(true);
    router.replace("/diagnosis/dog-cat", { scroll: false });
  };

  const handleSelect = useCallback(
    (index: number) => {
      if (!isVisible) return;

      const newAnswers = [...answers, index];
      setAnswers(newAnswers);

      if (newAnswers.length >= questions.length) {
        const score = calculateDogCatScore(newAnswers);
        setResult(score.result);
        setDogPct(score.dogPct);
        setCatPct(score.catPct);
        setScreen("result");
        router.replace(
          `/diagnosis/dog-cat?result=${score.result.id}&dogPct=${score.dogPct}`,
          { scroll: false }
        );
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
    setDogPct(0);
    setCatPct(0);
    setIsVisible(true);
    router.replace("/diagnosis/dog-cat?start=1", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader />

      <main className="mx-auto max-w-xl overflow-x-hidden px-4 py-6 sm:py-8">
        {screen === "intro" && (
          <div className="text-center">
            <section className="overflow-hidden rounded-2xl border border-pink-light">
              <Image
                src="/dog-cat-hero.png"
                alt="犬系？猫系？恋愛スタイル診断"
                width={1024}
                height={576}
                className="h-auto w-full"
                priority
              />
            </section>
            <button type="button" onClick={handleStart} className="btn-primary mt-6">
              診断をはじめる
            </button>
          </div>
        )}

        {screen === "quiz" && (
          <div className="card p-5 sm:p-6">
            <ProgressBar
              current={currentStep + 1}
              total={questions.length}
              variant="dog-cat"
            />
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
          <ResultSummary
            result={result}
            dogPct={dogPct}
            catPct={catPct}
            onRetry={handleRetry}
            isVisible={isVisible}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
