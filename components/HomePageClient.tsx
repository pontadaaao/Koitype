"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import UpdatesTicker from "@/components/UpdatesTicker";
import HomeSectionHeading from "@/components/sections/HomeSectionHeading";
import LoveDiagnosisSection from "@/components/sections/LoveDiagnosisSection";
import DiagnosisSlider from "@/components/DiagnosisSlider";
import LoveTestIcon from "@/components/LoveTestIcon";
import { useLanguage } from "@/components/LanguageProvider";
import { loveTests, isNewLoveTest, type LoveTest } from "@/lib/love-tests";
import { diagnoses } from "@/lib/diagnoses";

const CARD_STYLES = [
  { bg: "linear-gradient(145deg, #fff0f5, #ffe4f0)", border: "#ffd6e7", accent: "#F067A6" },
  { bg: "linear-gradient(145deg, #f5f0ff, #ede4fd)", border: "#e0d4f7", accent: "#9B6FD4" },
];


const HERO_TEXT = "今日の恋、1分でわかる♡";

/** TOPの恋愛ブログに表示する新着記事カード（サーバーから受け取る）。 */
export interface HomeBlogCard {
  slug: string;
  title: string;
  eyecatchUrl: string | null;
}

export default function HomePageClient({
  latestColumns,
}: {
  latestColumns: HomeBlogCard[];
}) {
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
          <div className="mb-6 mt-4 flex flex-col items-center text-center sm:mb-8 sm:mt-6">
            <UpdatesTicker />
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
                href="/koi-mikuji"
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
            title="恋愛ブログ"
            subtitle="Blog"
            description="恋愛のヒントなどを記事にしてお届け"
            titleClassName="text-accent"
            subtitleClassName="text-accent/70"
            className="mt-6 sm:mt-8"
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {latestColumns.map((col) => (
              <Link
                key={col.slug}
                href={`/blog/${col.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-pink-light/60 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-pink-pale">
                  {col.eyecatchUrl && (
                    <Image
                      src={col.eyecatchUrl}
                      alt={col.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <h2 className="line-clamp-2 font-heading text-xs font-bold leading-snug transition-colors group-hover:text-accent sm:text-sm" style={{ color: "#5C4033" }}>
                    {col.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 text-right">
            <Link href="/blog" className="text-xs font-medium text-accent hover:underline">
              恋愛ブログをもっと見る →
            </Link>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              id="koi-mikuji"
              href="/koi-mikuji"
              className="block transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <img
                src="/koimikuji.png"
                alt="恋みくじを引く！"
                className="h-auto w-full max-w-[320px] sm:max-w-[280px]"
              />
            </a>
          </div>
        </section>

        <section className="pb-16">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/pipiiipi39?s=11&t=ZYE4VPx6GhRZ7hm-WI2FyQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X（旧Twitter）"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-light bg-white text-accent shadow-sm transition-colors hover:border-accent/40 hover:bg-pink-pale/40"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
