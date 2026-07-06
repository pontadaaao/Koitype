"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import HomeSectionHeading from "@/components/sections/HomeSectionHeading";
import LoveDiagnosisSection from "@/components/sections/LoveDiagnosisSection";
import DiagnosisSlider from "@/components/DiagnosisSlider";
import LoveTestIcon from "@/components/LoveTestIcon";
import { useLanguage } from "@/components/LanguageProvider";
import { loveTests, isNewLoveTest, type LoveTest } from "@/lib/love-tests";
import { staticColumns } from "@/lib/static-columns";
import { diagnoses } from "@/lib/diagnoses";

const CARD_STYLES = [
  { bg: "linear-gradient(145deg, #fff0f5, #ffe4f0)", border: "#ffd6e7", accent: "#F067A6" },
  { bg: "linear-gradient(145deg, #f5f0ff, #ede4fd)", border: "#e0d4f7", accent: "#9B6FD4" },
];


const HERO_TEXT = "今日の恋、1分でわかる♡";

const sortedColumns = staticColumns
  .slice()
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 6);

export default function HomePageClient() {
  const { t } = useLanguage();
  const router = useRouter();
  const [shinriTests, setShinriTests] = useState<LoveTest[]>([]);
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const shuffled = [...loveTests].sort(() => Math.random() - 0.5).slice(0, 6);
    setShinriTests(shuffled);
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedText(HERO_TEXT.slice(0, i));
      if (i >= HERO_TEXT.length) {
        setTypingDone(true);
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location;
      if (!hash) return;

      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />

      <main id="top" className="mx-auto max-w-xl scroll-mt-52 px-4 pb-6 pt-0 sm:max-w-3xl sm:px-6 sm:pb-8 lg:max-w-5xl lg:px-8">
        <section
          id="love-diagnosis"
          className="scroll-mt-52 pb-16 pt-4 first:border-t-0 sm:pt-6"
        >
          <div className="mb-6 mt-4 text-center sm:mb-8 sm:mt-6">
            <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold tracking-wide text-accent">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a2 2 0 002-2H8a2 2 0 002 2z"/>
              </svg>
              【随時更新】最新情報はベルアイコンをクリック！
            </span>
            <p className="mt-3 font-heading text-lg font-black leading-snug tracking-wider sm:mt-4 sm:text-xl md:text-2xl lg:text-3xl" style={{ color: "#5C4033" }}>
              {typedText}
              <span
                className={`ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.05em] bg-[#5C4033] align-middle ${typingDone ? "animate-blink" : ""}`}
              />
            </p>
            <p className="mt-1 text-xs text-accent/70 sm:text-sm">
              あなたの恋愛タイプや相性がわかる無料診断。
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
              <button
                onClick={() => {
                  const ids = diagnoses.map((d) => d.id);
                  const randomId = ids[Math.floor(Math.random() * ids.length)];
                  router.push(`/diagnosis/${randomId}`);
                }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-cat/50 bg-cat px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:scale-[1.04] hover:shadow-md active:scale-[0.97] sm:px-8 sm:py-3 sm:text-base"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-2.01C4.045 12.547 2 10.178 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.678-2.045 5.048-3.885 6.71a22.049 22.049 0 01-3.744 2.692l-.019.01-.005.003h-.001a.739.739 0 01-.69.001l-.001-.001z" />
                </svg>
                ランダム診断
              </button>
              <a
                href="/koi-mikuji/index.html"
                className="inline-flex items-center gap-2 rounded-full border-2 border-accent/50 bg-accent px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:scale-[1.04] hover:shadow-md active:scale-[0.97] sm:px-8 sm:py-3 sm:text-base"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill="currentColor"/>
                  <circle cx="7" cy="7" r="1.2" fill="#F067A6"/>
                </svg>
                恋みくじ
              </a>
            </div>
          </div>
          <DiagnosisSlider />
          <HomeSectionHeading
            title={t.sections.loveDiagnosis.title}
            subtitle="Diagnosis"
            description="恋愛タイプがわかる診断一覧"
            className="mt-10 sm:mt-12"
          />
          <LoveDiagnosisSection />
          <div className="mt-4 text-right">
            <Link href="/love-diagnosis" className="text-xs font-medium text-accent hover:underline">
              一覧へ →
            </Link>
          </div>
        </section>

        {shinriTests.length > 0 && (
          <section className="pb-16">
            <HomeSectionHeading
              title="人気の心理テスト"
              subtitle="Love Test"
              description="本音や隠れた性格が見えてくる"
              titleClassName="text-accent"
              subtitleClassName="text-accent/70"
              className="mt-6 sm:mt-8"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shinriTests.map((test, i) => {
                const s = CARD_STYLES[i % 2];
                return (
                  <Link
                    key={test.slug}
                    href={`/tests/${test.slug}`}
                    className="group relative flex items-center gap-4 rounded-3xl border-2 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: s.bg, borderColor: s.border, boxShadow: "0 2px 12px rgba(254,108,158,0.07)" }}
                  >
                    {isNewLoveTest(test) && (
                      <span className="absolute -right-1.5 -top-1.5 z-10 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                        NEW
                      </span>
                    )}
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                      style={{ background: `${s.accent}18` }}
                    >
                      <LoveTestIcon id={test.icon} color={s.accent} className="h-6 w-6" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span
                        className="inline-block self-start rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{ backgroundColor: `${s.accent}18`, color: s.accent }}
                      >
                        #{test.category}
                      </span>
                      <h2 className="font-heading text-sm font-black leading-snug" style={{ color: "#5C4033" }}>
                        {test.title}
                      </h2>
                    </div>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)` }}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd"/>
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 text-right">
              <Link href="/tests" className="text-xs font-medium text-accent hover:underline">
                一覧へ →
              </Link>
            </div>
          </section>
        )}

        <section className="pb-16">
          <HomeSectionHeading
            title="恋愛コラム"
            subtitle="Column"
            description="恋愛のヒントなどを記事にしてお届け"
            titleClassName="text-accent"
            subtitleClassName="text-accent/70"
            className="mt-6 sm:mt-8"
          />
          <div className="overflow-hidden rounded-2xl border border-pink-light/60 bg-white lg:grid lg:grid-cols-2">
            {sortedColumns.map((col, i) => {
              const isLastMobile = i === sortedColumns.length - 1;
              const isLeftCol = i % 2 === 0;
              const isLastRow = i >= sortedColumns.length - 2;
              return (
                <Link
                  key={col.slug}
                  href={`/columns/${col.slug}`}
                  className={[
                    "group flex items-center justify-between px-4 py-4 transition-colors hover:bg-pink-pale/30",
                    !isLastMobile ? "border-b border-pink-light/60" : "",
                    "lg:border-b-0",
                    !isLastRow ? "lg:border-b lg:border-pink-light/60" : "",
                    isLeftCol ? "lg:border-r lg:border-pink-light/60" : "",
                  ].join(" ")}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-4 w-4 shrink-0 text-accent/60">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading text-sm font-bold leading-snug transition-colors group-hover:text-accent" style={{ color: "#5C4033" }}>
                      {col.title}
                    </h2>
                    <span className="mt-1 inline-block rounded-full bg-pink-pale px-2 py-0.5 text-[10px] font-medium text-accent">
                      {col.category}
                    </span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-3 h-4 w-4 shrink-0 text-text-sub/40 transition-colors group-hover:text-accent">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>
          <div className="mt-3 text-right">
            <Link href="/columns" className="text-xs font-medium text-accent hover:underline">
              コラムをもっと見る →
            </Link>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              id="koi-mikuji"
              href="/koi-mikuji/index.html"
              className="block transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <img
                src="/koimikuji.png"
                alt="恋みくじを引く！"
                className="h-auto w-full max-w-[320px] sm:max-w-[280px]"
              />
            </a>
            <a
              id="log"
              href="/log"
              className="block transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <img
                src="/koilog.png"
                alt="恋ログをみる！"
                className="h-auto w-full max-w-[320px] sm:max-w-[280px]"
              />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
