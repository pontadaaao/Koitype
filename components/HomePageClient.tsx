"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import HomeSectionHeading from "@/components/sections/HomeSectionHeading";
import LoveDiagnosisSection from "@/components/sections/LoveDiagnosisSection";
import DiagnosisSlider from "@/components/DiagnosisSlider";
import LoveTestIcon from "@/components/LoveTestIcon";
import { useLanguage } from "@/components/LanguageProvider";
import { loveTests, type LoveTest } from "@/lib/love-tests";
import { staticColumns } from "@/lib/static-columns";

const CARD_STYLES = [
  { bg: "linear-gradient(145deg, #fff0f5, #ffe4f0)", border: "#ffd6e7", accent: "#F067A6" },
  { bg: "linear-gradient(145deg, #f5f0ff, #ede4fd)", border: "#e0d4f7", accent: "#9B6FD4" },
];


const HERO_TEXT = "今日の恋、ちょっとのぞいてみない？♡";

export default function HomePageClient() {
  const { t } = useLanguage();
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

      <main id="top" className="mx-auto max-w-xl scroll-mt-52 px-4 pb-6 pt-0 sm:max-w-3xl sm:pb-8 lg:max-w-5xl">
        <section
          id="love-diagnosis"
          className="scroll-mt-52 pb-16 pt-4 first:border-t-0 sm:pt-6"
        >
          <div className="mb-8 mt-6 text-center">
            <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold tracking-wide text-accent">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a2 2 0 002-2H8a2 2 0 002 2z"/>
              </svg>
              【随時更新】最新情報はベルアイコンをクリック！
            </span>
            <p className="font-heading text-base font-black leading-snug sm:text-lg md:text-2xl" style={{ color: "#5C4033" }}>
              {typedText}
              <span
                className={`ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.05em] bg-[#5C4033] align-middle ${typingDone ? "animate-blink" : ""}`}
              />
            </p>
            <p className="mt-1 text-xs text-accent/70">
              あなたの恋愛タイプや相性がわかる無料診断。
            </p>
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {shinriTests.map((test, i) => {
                const s = CARD_STYLES[i % 2];
                return (
                  <Link
                    key={test.slug}
                    href={`/tests/${test.slug}`}
                    className="group flex items-center gap-4 rounded-3xl border-2 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: s.bg, borderColor: s.border, boxShadow: "0 2px 12px rgba(254,108,158,0.07)" }}
                  >
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
          <div className="overflow-hidden rounded-2xl border border-pink-light/60 bg-white">
            {staticColumns
              .slice()
              .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
              .slice(0, 5)
              .map((col, i, arr) => (
                <Link
                  key={col.slug}
                  href={`/columns/${col.slug}`}
                  className={`group flex items-center justify-between px-4 py-4 transition-colors hover:bg-pink-pale/30 ${i < arr.length - 1 ? "border-b border-pink-light/60" : ""}`}
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
              ))}
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
