"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProgressBar from "@/components/ProgressBar";
import AppIcon from "@/components/AppIcon";
import {
  questions,
  calculateSukinaHitoType,
  getSukinaHitoResultById,
  type SukinaHitoResult,
} from "@/lib/sukina-hito-diagnosis";
import { SITE_TAG, siteUrl } from "@/lib/site";

type Screen = "intro" | "quiz" | "result";

const CHOICE_LABELS = ["A", "B", "C", "D"] as const;

// Per-type accent colors for result sections.
// Flat two-tone alternating palette (mirrors the dog-cat diagnosis result
// page's blue/pink block-and-wave style), with each type keeping its own hues.
const TYPE_COLORS: Record<string, { colorA: string; colorB: string }> = {
  healing: { colorA: "#F067A6", colorB: "#9333EA" },
  protect: { colorA: "#9B6FD4", colorB: "#C84B9E" },
  curious: { colorA: "#7C3AED", colorB: "#F067A6" },
  chase: { colorA: "#E11D77", colorB: "#7C3AED" },
};

const DEFAULT_COLORS = TYPE_COLORS.healing;

function WaveDown({ fill }: { fill: string }) {
  return (
    <svg
      viewBox="0 0 1080 80"
      preserveAspectRatio="none"
      className="block h-14 w-full -mb-[2px] sm:h-16"
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
  color = "white",
}: {
  en: string;
  ja: string;
  color?: "white" | "pink";
}) {
  const colorClass = color === "pink" ? "text-result-pink" : "text-white";

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

function buildShareText(result: SukinaHitoResult): string {
  return `好きな人から見た私は「${result.name}」でした\n本音：「${result.honesty[0]}」\n#好きな人から見たあなた診断 ${SITE_TAG}`;
}

function ShareSection({ result }: { result: SukinaHitoResult }) {
  const [toast, setToast] = useState<string | null>(null);

  const shareUrl = siteUrl(`/diagnosis/sukina-hito?result=${result.id}`);
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
          onClick={copyLink}
          className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-accent bg-base px-3 py-3 text-sm font-medium text-accent transition-colors hover:bg-pink-pale active:scale-[0.98]"
        >
          <AppIcon name="link" size={18} />
          URLをコピー
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

export default function SukinaHitoClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resultIdFromUrl = searchParams.get("result");
  const shouldAutoStart = searchParams.get("start") === "1";

  const initialResult = resultIdFromUrl
    ? (getSukinaHitoResultById(resultIdFromUrl) ?? null)
    : null;

  const [screen, setScreen] = useState<Screen>(() => {
    if (initialResult) return "result";
    if (shouldAutoStart) return "quiz";
    return "intro";
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<SukinaHitoResult | null>(initialResult);
  const [isVisible, setIsVisible] = useState(true);
  const [resultVisible, setResultVisible] = useState(!!initialResult);

  useEffect(() => {
    if (resultIdFromUrl) {
      const urlResult = getSukinaHitoResultById(resultIdFromUrl);
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
    router.replace("/diagnosis/sukina-hito", { scroll: false });
  };

  const handleSelect = useCallback(
    (index: number) => {
      if (!isVisible) return;

      const newAnswers = [...answers, index];
      setAnswers(newAnswers);

      if (newAnswers.length >= questions.length) {
        const calcResult = calculateSukinaHitoType(newAnswers);
        setResult(calcResult);
        setScreen("result");
        setResultVisible(false);
        router.replace(`/diagnosis/sukina-hito?result=${calcResult.id}`, {
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
    router.replace("/diagnosis/sukina-hito?start=1", { scroll: false });
  };

  const colors =
    result ? (TYPE_COLORS[result.id] ?? DEFAULT_COLORS) : DEFAULT_COLORS;

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader />

      <main
        className={`mx-auto overflow-x-hidden px-4 pb-6 sm:pb-8 ${
          screen === "result" ? "max-w-3xl" : "max-w-xl pt-6 sm:pt-8"
        }`}
      >
        {/* ── INTRO ── */}
        {screen === "intro" && (
          <div className="animate-fade-up">
            <section className="overflow-hidden rounded-2xl border border-pink-light">
              <div
                className="px-6 pb-14 pt-14 text-center"
                style={{
                  background:
                    "linear-gradient(160deg, #fdf0ff 0%, #fff0f5 50%, #fce7f3 100%)",
                }}
              >
                {/* Decorative hearts */}
                <div className="mb-5 flex justify-center gap-2 text-2xl">
                  <span style={{ color: "#f067a6" }}>♡</span>
                  <span style={{ color: "#c084fc" }}>♡</span>
                  <span style={{ color: "#f067a6" }}>♡</span>
                </div>
                <p
                  className="mb-1 font-cormorant text-sm italic tracking-widest"
                  style={{ color: "#c084fc" }}
                >
                  Love Diagnosis
                </p>
                <h1
                  className="font-heading text-2xl font-bold leading-snug sm:text-3xl"
                  style={{ color: "#5C2060" }}
                >
                  好きな人から見た
                  <br />
                  あなた診断
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-text-sub">
                  好きな人から見た私はどんな印象？
                  <br />
                  相手から見えている&quot;あなたの魅力&quot;を診断します♡
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
        {screen === "result" && result && (
          <div
            style={{
              transition: "opacity 500ms ease-out",
              opacity: resultVisible ? 1 : 0,
            }}
          >
            <div className="-mx-4 sm:mx-0">
              {/* TOP — gradient header */}
              <section className="text-center" style={{ background: colors.colorA }}>
                <div className="px-6 pb-12 pt-14 sm:px-8">
                  <div className="mb-6 flex items-center justify-center gap-3">
                    <span
                      className="h-px w-10 shrink-0 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                    />
                    <span
                      className="rounded-full px-5 py-1.5 text-xs font-bold tracking-[.3em]"
                      style={{ backgroundColor: "#ffffff", color: colors.colorA }}
                    >
                      好きな人から見たあなたは
                    </span>
                    <span
                      className="h-px w-10 shrink-0 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                    />
                  </div>

                  <h2
                    className="font-heading font-black leading-tight text-white"
                    style={{ fontSize: "clamp(18px, 4vw, 28px)" }}
                  >
                    {result.name}
                  </h2>
                </div>
                <WaveDown fill={colors.colorB} />
              </section>

              {/* 特徴 */}
              <section style={{ background: colors.colorB }} className="text-center">
                <div className="px-6 py-12 sm:px-8 sm:py-14">
                  <SectionHead en="Traits" ja="特徴" color="white" />
                  <ul className="mx-auto max-w-lg space-y-3 text-left">
                    {result.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-3 rounded-2xl p-4"
                        style={{ background: "rgba(255,255,255,0.18)" }}
                      >
                        <p className="text-sm font-medium leading-relaxed text-white sm:text-base">
                          {feat}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <WaveDown fill={colors.colorA} />
              </section>

              {/* 好きな人の本音 */}
              <section style={{ background: colors.colorA }} className="text-center">
                <div className="px-6 py-12 sm:px-8 sm:py-14">
                  <SectionHead en="Inner Voice" ja="好きな人の本音" color="white" />
                  <div className="mx-auto max-w-sm space-y-3">
                    {result.honesty.map((line) => (
                      <div
                        key={line}
                        className="rounded-2xl border-2 border-pink-light bg-white px-6 py-4"
                        style={{
                          boxShadow: "0 10px 22px -16px rgba(0,0,0,.15)",
                        }}
                      >
                        <p className="font-bold" style={{ color: colors.colorA }}>
                          「{line}」
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <WaveDown fill={colors.colorB} />
              </section>

              {/* 相性 */}
              <section style={{ background: colors.colorB }} className="text-center">
                <div className="px-6 py-12 sm:px-8 sm:py-14">
                  <SectionHead en="Compatibility" ja="相性の良いタイプ" color="white" />
                  <div
                    className="mx-auto flex max-w-sm items-center justify-center rounded-2xl border-2 border-pink-light bg-white px-6 py-4"
                    style={{
                      boxShadow: "0 10px 22px -16px rgba(0,0,0,.15)",
                    }}
                  >
                    <span className="text-lg font-bold" style={{ color: colors.colorB }}>
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
                <button type="button" onClick={handleRetry} className="btn-secondary">
                  もう一度診断する
                </button>
                <Link href="/" className="btn-primary">
                  他の恋愛診断を見る
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
