"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import AppIcon from "@/components/AppIcon";
import QuestionStep from "@/components/QuestionStep";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";
import SiteHeader from "@/components/SiteHeader";
import { calculateResult, getResultById } from "@/lib/diagnoses";
import type { Diagnosis, DiagnosisResult } from "@/lib/types";
import { useLanguage } from "@/components/LanguageProvider";
import { formatN } from "@/lib/i18n";

interface DiagnosisClientProps {
  diagnosis: Diagnosis;
}

export default function DiagnosisClient({ diagnosis }: DiagnosisClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const resultIdFromUrl = searchParams.get("result");
  const shouldAutoStart = searchParams.get("start") === "1";
  const initialResult = resultIdFromUrl
    ? getResultById(diagnosis.id, resultIdFromUrl) ?? null
    : null;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(initialResult);
  const [isVisible, setIsVisible] = useState(true);
  const [started, setStarted] = useState(
    shouldAutoStart || initialResult !== null
  );

  useEffect(() => {
    if (!resultIdFromUrl) {
      if (shouldAutoStart) setStarted(true);
      return;
    }
    const urlResult = getResultById(diagnosis.id, resultIdFromUrl);
    if (urlResult) {
      setResult(urlResult);
      setStarted(true);
    }
  }, [resultIdFromUrl, shouldAutoStart, diagnosis.id]);

  const handleStart = () => {
    setStarted(true);
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
    setIsVisible(true);
    router.replace(`/diagnosis/${diagnosis.id}`, { scroll: false });
  };

  const handleSelect = useCallback(
    (choiceIndex: number) => {
      if (!isVisible) return;

      const newAnswers = [...answers, choiceIndex];
      setAnswers(newAnswers);

      if (newAnswers.length >= diagnosis.questions.length) {
        const calculated = calculateResult(diagnosis, newAnswers);
        setResult(calculated);
        router.replace(
          `/diagnosis/${diagnosis.id}?result=${calculated.id}`,
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
    [answers, diagnosis, isVisible, router]
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
    setStarted(true);
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
    setIsVisible(true);
    router.replace(`/diagnosis/${diagnosis.id}?start=1`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader />

      <main className="mx-auto max-w-xl overflow-x-hidden px-4 py-6 sm:py-8">
        {!started && !result ? (
          <div className="text-center">
            <div className="overflow-hidden rounded-2xl border border-pink-light bg-base p-8 shadow-sm">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-pink-light bg-base shadow-sm">
                <AppIcon name={diagnosis.icon} size={40} className="text-accent" />
              </div>
              <h1 className="font-heading text-xl font-bold text-text-main sm:text-2xl">
                {diagnosis.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                {diagnosis.description}
              </p>
              <div className="mt-4 flex justify-center gap-2 text-xs text-text-sub">
                <span className="rounded-full border border-pink-light bg-base px-3 py-1">
                  {formatN(t.diagnosis.questionsLabel, diagnosis.questionCount)}
                </span>
                <span className="rounded-full border border-pink-light bg-base px-3 py-1">
                  {formatN(t.diagnosis.durationLabel, diagnosis.durationMinutes)}
                </span>
              </div>
            </div>
            <button type="button" onClick={handleStart} className="btn-primary mt-6">
              {t.diagnosis.start}
            </button>
          </div>
        ) : result ? (
          <div className="space-y-5">
            <ResultCard result={result} />
            <div className="card p-5">
              <ShareButtons diagnosisId={diagnosis.id} result={result} />
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
        ) : (
          <div className="card p-5 sm:p-6">
            <ProgressBar
              current={currentStep + 1}
              total={diagnosis.questions.length}
            />
            <div className="mt-8">
              <QuestionStep
                question={diagnosis.questions[currentStep]}
                questionNumber={currentStep + 1}
                onSelect={handleSelect}
                isVisible={isVisible}
                showBack={currentStep > 0}
                onBack={handleBack}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
