"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProgressBar from "@/components/ProgressBar";
import AppIcon from "@/components/AppIcon";
import {
  questions,
  calculateCatType,
  getCatResultById,
  type CatTypeId,
  type CatTypeResult,
} from "@/lib/cat-type-diagnosis";
import { SITE_TAG, siteUrl } from "@/lib/site";

type Screen = "intro" | "quiz" | "result";

const CHOICE_LABELS = ["A", "B", "C", "D"] as const;


// ---- Layout helpers (matching ResultCard pattern) ----

function WaveDown({ fill }: { fill: string }) {
  return (
    <svg
      viewBox="0 0 1080 80"
      preserveAspectRatio="none"
      className="block h-14 w-full -mb-px sm:h-16"
      aria-hidden
    >
      <path
        d="M0 50 C180 5 360 75 540 40 C720 8 900 65 1080 35 L1080 80 L0 80Z"
        fill={fill}
      />
    </svg>
  );
}

function HeartSVG({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function SectionHead({
  en,
  ja,
  color = "blue",
}: {
  en: string;
  ja: string;
  color?: "blue" | "pink" | "white";
}) {
  const colorClass =
    color === "white"
      ? "text-white"
      : color === "pink"
        ? "text-result-pink"
        : "text-result-blue";

  return (
    <div className={`mb-7 text-center ${colorClass}`}>
      <span className="block font-cormorant text-sm italic tracking-[.18em] opacity-80">
        {en}
      </span>
      <span className="mt-1 block font-heading text-xl font-bold tracking-wide sm:text-2xl">
        {ja}
      </span>
      <div className="mt-2.5 flex items-center justify-center gap-2">
        <span className="h-px w-8 rounded-full bg-current opacity-40" />
        <HeartSVG />
        <span className="h-px w-8 rounded-full bg-current opacity-40" />
      </div>
    </div>
  );
}

// ---- Share section ----

function buildShareText(result: CatTypeResult): string {
  return `私の恋愛猫タイプは「${result.name}」でした\n「${result.catch}」\n#恋愛猫タイプ診断 #猫系診断 ${SITE_TAG}`;
}

function ShareSection({ result }: { result: CatTypeResult }) {
  const [toast, setToast] = useState<string | null>(null);

  const shareUrl = siteUrl(`/diagnosis/cat-type?result=${result.id}`);
  const shareText = buildShareText(result);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    );
  };

  const shareLine = () => {
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`
    );
  };

  const shareInstagram = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      showToast("テキストをコピーしました！Instagramに貼り付けてください");
    } catch {
      showToast("コピーに失敗しました");
    }
  };

  const copyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const el = document.createElement("textarea");
        el.value = shareUrl;
        el.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      showToast("リンクをコピーしました");
    } catch {
      showToast("コピーに失敗しました");
    }
  };

  return (
    <>
      <p className="mb-3 text-center text-sm font-medium text-text-sub">
        結果をシェアする
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={shareX}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#1da1f2] px-3 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          <AppIcon name="brand-x" size={18} />X
        </button>
        <button
          type="button"
          onClick={shareLine}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#06c755] px-3 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          <AppIcon name="brand-line" size={18} />
          LINE
        </button>
        <button
          type="button"
          onClick={shareInstagram}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] px-3 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          <AppIcon name="brand-instagram" size={18} />
          Instagram
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center justify-center gap-2 rounded-xl border border-accent bg-base px-3 py-3 text-sm font-medium text-accent transition-colors hover:bg-pink-pale active:scale-[0.98]"
        >
          <AppIcon name="link" size={18} />
          コピー
        </button>
      </div>
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 w-max max-w-[90vw] -translate-x-1/2 rounded-full bg-text-main px-5 py-3 text-center text-sm text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </>
  );
}

// ---- Main component ----

export default function CatTypeClient({ children }: { children?: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resultIdFromUrl = searchParams.get("result");
  const shouldAutoStart = searchParams.get("start") === "1";

  const initialResult = resultIdFromUrl
    ? getCatResultById(resultIdFromUrl) ?? null
    : null;

  const [screen, setScreen] = useState<Screen>(() => {
    if (initialResult) return "result";
    if (shouldAutoStart) return "quiz";
    return "intro";
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<CatTypeResult | null>(initialResult);
  const [isVisible, setIsVisible] = useState(true);
  const [resultVisible, setResultVisible] = useState(!!initialResult);

  useEffect(() => {
    if (resultIdFromUrl) {
      const urlResult = getCatResultById(resultIdFromUrl);
      if (urlResult) {
        setResult(urlResult);
        setScreen("result");
        requestAnimationFrame(() => setResultVisible(true));
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
    setResultVisible(false);
    router.replace("/diagnosis/cat-type", { scroll: false });
  };

  const handleSelect = useCallback(
    (index: number) => {
      if (!isVisible) return;

      const newAnswers = [...answers, index];
      setAnswers(newAnswers);

      if (newAnswers.length >= questions.length) {
        const calcResult = calculateCatType(newAnswers);
        setResult(calcResult);
        setScreen("result");
        setResultVisible(false);
        router.replace(`/diagnosis/cat-type?result=${calcResult.id}`, {
          scroll: false,
        });
        requestAnimationFrame(() =>
          setTimeout(() => setResultVisible(true), 50)
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
    setIsVisible(true);
    setResultVisible(false);
    router.replace("/diagnosis/cat-type?start=1", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader />

      <main className={`mx-auto overflow-x-hidden px-4 py-6 sm:py-8 ${screen === "result" ? "max-w-3xl" : "max-w-xl"}`}>

        {/* ── INTRO ── */}
        {screen === "intro" && (
          <div className="animate-fade-up">
            <section className="overflow-hidden rounded-2xl border border-pink-light">
              <Image
                src="/cat-type-hero.png"
                alt="あなたはどの猫系？恋愛猫タイプ診断"
                width={1456}
                height={816}
                className="h-auto w-full"
                priority
              />
            </section>
            <button type="button" onClick={handleStart} className="btn-primary mt-6">
              診断をはじめる
            </button>
          </div>
        )}

        {/* ── QUIZ ── */}
        {screen === "quiz" && (
          <div className="card p-5 sm:p-6">
            <ProgressBar current={currentStep + 1} total={questions.length} />
            <div className="mt-8">
              <div
                style={{
                  transition: "opacity 200ms ease, transform 200ms ease",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {currentStep + 1}
                  </span>
                  <span className="text-sm font-medium text-text-sub">
                    質問 {currentStep + 1} / {questions.length}
                  </span>
                </div>
                <h2 className="font-heading mb-6 text-xl font-bold leading-relaxed text-text-main">
                  {questions[currentStep].text}
                </h2>
                <div className="flex flex-col gap-3">
                  {questions[currentStep].choices.map((choice, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect(index)}
                      className="flex items-center gap-4 rounded-2xl border border-pink-light bg-base p-4 text-left shadow-sm transition-all hover:border-accent/50 hover:bg-pink-pale hover:shadow-md active:scale-[0.98]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-pink-light bg-base text-xs font-bold text-tag-text">
                        {CHOICE_LABELS[index]}
                      </span>
                      <span className="text-sm leading-relaxed text-text-main">
                        {choice}
                      </span>
                    </button>
                  ))}
                </div>
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary mt-6"
                  >
                    前の質問に戻る
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {screen === "result" && result && (() => {
          return (
            <div
              style={{
                transition: "opacity 500ms ease-out",
                opacity: resultVisible ? 1 : 0,
              }}
            >
              {/* Full-width wave sections (matches ResultCard / DiagnosisClient layout) */}
              <div className="-mx-4 sm:mx-0">

                {/* TOP */}
                <section className="text-center" style={{ background: "linear-gradient(160deg, #F067A6, #FF8FB8)" }}>
                  <div className="px-6 pb-12 pt-14 sm:px-8">
                    {/* Label badge */}
                    <div className="mb-6 flex items-center justify-center gap-3">
                      <span
                        className="h-px w-10 shrink-0 rounded-full"
                        style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                      />
                      <span
                        className="rounded-full px-5 py-1.5 text-xs font-bold tracking-[.3em]"
                        style={{ backgroundColor: "#ffffff", color: "#F067A6" }}
                      >
                        あなたの恋愛猫タイプは
                      </span>
                      <span
                        className="h-px w-10 shrink-0 rounded-full"
                        style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                      />
                    </div>

                    <h2
                      className="font-heading font-black leading-tight"
                      style={{
                        fontSize: "clamp(18px, 4vw, 26px)",
                        color: "white",
                      }}
                    >
                      {result.name}
                    </h2>

                    {/* Catch phrase */}
                    <p className="mt-4 text-base font-medium italic text-white/80">
                      「{result.catch}」
                    </p>
                  </div>
                  <WaveDown fill="#00B7CE" />
                </section>

                {/* 特徴 (blue) */}
                <section style={{ background: "#00B7CE" }} className="text-center">
                  <div className="px-6 py-12 sm:px-8 sm:py-14">
                    <SectionHead en="Traits" ja="特徴" color="white" />
                    <ul className="mx-auto max-w-lg space-y-3 text-left">
                      {result.traits.map((trait) => (
                        <li
                          key={trait}
                          className="flex items-start gap-3 rounded-2xl p-4"
                          style={{ background: "rgba(255,255,255,0.18)" }}
                        >
                          <p className="text-sm font-medium leading-relaxed text-white sm:text-base">
                            {trait}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <WaveDown fill="#fff0f5" />
                </section>

                {/* 相性 (light pink) */}
                <section
                  style={{ background: "linear-gradient(to bottom, #fff0f5, #fff8fb)" }}
                  className="text-center"
                >
                  <div className="px-6 py-12 sm:px-8 sm:py-14">
                    <SectionHead en="Compatibility" ja="相性" color="pink" />
                    <div className="mx-auto flex max-w-sm items-center justify-center rounded-2xl border-2 border-pink-light bg-white px-6 py-4"
                      style={{ boxShadow: "0 10px 22px -16px rgba(240,103,166,.45)" }}>
                      <span className="text-lg font-bold text-accent">
                        {result.compat}
                      </span>
                    </div>
                  </div>
                  <WaveDown fill="#ffffff" />
                </section>
              </div>

              {/* Share + Action buttons */}
              <div className="mx-auto mt-5 max-w-xl space-y-5">
                <div className="card p-5">
                  <ShareSection result={result} />
                </div>
                <div className="flex flex-col gap-3 pb-4">
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="btn-secondary"
                  >
                    もう一度診断する
                  </button>
                  <Link href="/" className="btn-primary">
                    診断を見る
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
      </main>

      {children}
      <SiteFooter />
    </div>
  );
}
