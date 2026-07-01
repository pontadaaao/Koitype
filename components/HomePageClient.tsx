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


export default function HomePageClient() {
  const { t } = useLanguage();
  const [shinriTests, setShinriTests] = useState<LoveTest[]>([]);

  useEffect(() => {
    const shuffled = [...loveTests].sort(() => Math.random() - 0.5).slice(0, 6);
    setShinriTests(shuffled);
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
          <DiagnosisSlider />
          <HomeSectionHeading
            title={t.sections.loveDiagnosis.title}
            description="恋愛タイプがわかる診断一覧"
            icon="heart"
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
              description="本音や隠れた性格が見えてくる"
              icon="bulb"
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
            description="恋愛のヒントなどを記事にしてお届け"
            icon="leaf"
            titleClassName="text-[#333333]"
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
                    <h2 className="font-heading text-sm font-bold leading-snug text-text-main transition-colors group-hover:text-accent">
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
          <div className="mx-auto flex max-w-xl gap-5">
            <a
              id="koi-mikuji"
              href="/koi-mikuji/index.html"
              className="group relative flex flex-1 flex-col overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "#fdf8f0",
                borderRadius: "8px",
                border: "1px solid #a83838",
                boxShadow: "0 8px 24px rgba(120,20,20,0.15), inset 0 0 0 3px #fdf8f0, inset 0 0 0 5px #d9a0a0",
              }}
            >
              {/* 赤帯ヘッダー */}
              <div
                className="flex flex-col items-center pb-3 pt-3"
                style={{ background: "linear-gradient(180deg, #b82020 0%, #991515 100%)" }}
              >
                <span className="text-[13px] font-bold tracking-[0.3em] text-white" style={{ opacity: 0.95 }}>
                  恋 み く じ
                </span>
              </div>

              {/* 二重線区切り */}
              <div className="mx-3 mt-2">
                <div className="border-t" style={{ borderColor: "#a83838" }} />
                <div className="mt-[3px] border-t" style={{ borderColor: "#a83838" }} />
              </div>

              {/* 本文エリア */}
              <div className="flex flex-1 flex-col items-center justify-center gap-2.5 px-4 py-4">
                <svg viewBox="0 0 24 24" fill="#b82020" className="h-6 w-6">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <p className="text-center font-heading text-sm font-bold leading-tight" style={{ color: "#3a0a0a" }}>
                  {t.sections.koiMikuji.title}
                </p>
              </div>

              {/* 二重線区切り */}
              <div className="mx-3 mb-2">
                <div className="border-t" style={{ borderColor: "#a83838" }} />
                <div className="mt-[3px] border-t" style={{ borderColor: "#a83838" }} />
              </div>

              {/* 引くボタン */}
              <div className="px-4 pb-4">
                <div
                  className="flex w-full items-center justify-center py-2 text-[11px] font-bold tracking-[0.25em] text-white"
                  style={{
                    background: "linear-gradient(180deg, #c82828 0%, #991515 100%)",
                    borderRadius: "2px",
                  }}
                >
                  一 枚 引 く
                </div>
              </div>
            </a>
            <a
              id="log"
              href="/log"
              className="group relative flex flex-1 flex-col overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "#fdf5ff",
                  borderRadius: "8px",
                  border: "1.5px solid #c37fd4",
                  boxShadow: "0 8px 22px rgba(155,111,212,0.18), inset 0 0 0 3px #fdf5ff, inset 0 0 0 5px #e8c8f0",
                }}
              >
                {/* ノート横線 */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 18px, rgba(195,127,212,0.18) 19px)",
                  }}
                />

                {/* パープルヘッダー帯 */}
                <div
                  className="relative flex flex-col items-center pb-3 pt-3"
                  style={{ background: "linear-gradient(180deg, #b05fc8 0%, #8b3db5 100%)" }}
                >
                  <span className="text-[13px] font-bold tracking-[0.3em] text-white" style={{ opacity: 0.95 }}>
                    恋 ロ グ
                  </span>
                </div>

                {/* 二重線 */}
                <div className="relative mx-3 mt-2">
                  <div className="border-t" style={{ borderColor: "#c37fd4" }} />
                  <div className="mt-[3px] border-t" style={{ borderColor: "#c37fd4" }} />
                </div>

                {/* 本文 */}
                <div className="relative flex flex-1 flex-col items-center justify-center gap-2.5 px-4 py-4">
                  <svg viewBox="0 0 24 24" fill="#b05fc8" className="h-6 w-6">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <p className="text-center font-heading text-sm font-bold leading-tight" style={{ color: "#3a0a3a" }}>
                    {t.sections.log.title}
                  </p>
                </div>

                {/* 二重線 */}
                <div className="relative mx-3 mb-2">
                  <div className="border-t" style={{ borderColor: "#c37fd4" }} />
                  <div className="mt-[3px] border-t" style={{ borderColor: "#c37fd4" }} />
                </div>

                {/* ボタン */}
                <div className="relative px-4 pb-4">
                  <div
                    className="flex w-full items-center justify-center py-2 text-[11px] font-bold tracking-[0.25em] text-white"
                    style={{
                      background: "linear-gradient(180deg, #c070d8 0%, #8b3db5 100%)",
                      borderRadius: "2px",
                    }}
                  >
                    読 む · 書 く
                  </div>
                </div>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
