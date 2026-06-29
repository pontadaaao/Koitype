"use client";

import { useState } from "react";
import Link from "next/link";
import type { LoveTest, LoveTestChoice } from "@/lib/love-tests";
import LoveTestIcon from "@/components/LoveTestIcon";

interface Props {
  test: LoveTest;
  otherTests: LoveTest[];
}

const LABEL_BG: Record<string, string> = {
  A: "#F067A6",
  B: "#9B6FD4",
  C: "#F067A6",
  D: "#9B6FD4",
};

// 同カテゴリ・関連カテゴリを定義
const CATEGORY_AFFINITY: Record<string, string[]> = {
  "恋愛メンタル":  ["恋愛傾向", "嫉妬・独占欲", "恋愛本性", "恋愛タイプ"],
  "恋愛傾向":     ["恋愛メンタル", "恋愛タイプ", "嫉妬・独占欲", "恋愛スタイル"],
  "元恋人":       ["恋愛メンタル", "恋愛本性", "恋愛傾向"],
  "嫉妬・独占欲":  ["恋愛メンタル", "恋愛傾向", "恋愛本性", "恋愛タイプ"],
  "恋愛タイプ":   ["恋愛スタイル", "恋愛心理", "愛情表現", "恋愛スキル"],
  "恋愛スキル":   ["恋愛タイプ", "愛情表現", "恋愛スタイル"],
  "恋愛本性":     ["恋愛メンタル", "嫉妬・独占欲", "元恋人"],
  "恋愛スタイル":  ["恋愛タイプ", "愛情表現", "恋愛心理", "恋愛価値観"],
  "愛情表現":     ["恋愛スタイル", "恋愛価値観", "恋愛タイプ", "恋愛"],
  "恋愛心理":     ["恋愛タイプ", "恋愛スタイル", "愛情表現"],
  "恋愛価値観":   ["愛情表現", "恋愛スタイル", "恋愛"],
  "恋愛":         ["愛情表現", "恋愛価値観", "恋愛スタイル"],
};

// 結果キーワードから性格傾向を読み取り、関連カテゴリへのブーストを付加
const KEYWORD_BOOSTS: Array<{ keywords: string[]; categories: string[] }> = [
  {
    keywords: ["不安", "依存", "メンヘラ", "病む", "重め", "繊細", "センサー", "耐性"],
    categories: ["恋愛メンタル", "恋愛傾向"],
  },
  {
    keywords: ["自立", "冷静", "観察", "強がり", "理性", "切り替え", "最強"],
    categories: ["恋愛スタイル", "恋愛スキル", "恋愛タイプ"],
  },
  {
    keywords: ["ロマンチスト", "思い出", "言葉", "サプライズ", "記念", "感じる"],
    categories: ["愛情表現", "恋愛価値観"],
  },
  {
    keywords: ["嫉妬", "独占", "地雷", "信頼"],
    categories: ["嫉妬・独占欲", "恋愛傾向"],
  },
  {
    keywords: ["元恋人", "忘れ", "逃げた", "別れ"],
    categories: ["元恋人"],
  },
  {
    keywords: ["沼", "武器", "才能", "惹きつ"],
    categories: ["恋愛スキル", "恋愛タイプ"],
  },
];

function getRecommendedTests(
  currentTest: LoveTest,
  choice: LoveTestChoice,
  otherTests: LoveTest[]
): LoveTest[] {
  const related = CATEGORY_AFFINITY[currentTest.category] ?? [];
  const boostText = choice.resultTitle + choice.resultDescription;

  const boostedCategories = new Set<string>();
  for (const { keywords, categories } of KEYWORD_BOOSTS) {
    if (keywords.some((k) => boostText.includes(k))) {
      categories.forEach((c) => boostedCategories.add(c));
    }
  }

  const scored = otherTests.map((t) => {
    let score = 0;
    if (t.category === currentTest.category) score += 4;
    if (related.includes(t.category)) score += 2;
    if (boostedCategories.has(t.category)) score += 1;
    return { test: t, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 4).map((s) => s.test);
}

export default function LoveTestClient({ test, otherTests }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const choice = selected !== null ? test.choices[selected] : null;

  const handleShare = async () => {
    if (!choice) return;
    const text = `${choice.shareText}\n\n#Koitype #恋愛診断`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <div className="mx-auto max-w-lg px-4 pb-16">

      {choice === null ? (
        /* ── Question view ── */
        <div
          className="overflow-hidden rounded-3xl"
          style={{ boxShadow: "0 4px 24px rgba(254,108,158,0.12), 0 1px 4px rgba(0,0,0,0.05)" }}
        >
          {/* Question */}
          <div
            className="px-6 pb-6 pt-7 text-center sm:px-8"
            style={{ background: `linear-gradient(160deg, ${test.color}10, ${test.color}04)` }}
          >
            <p
              className="mb-1 text-xs font-black tracking-[.2em]"
              style={{ color: test.color }}
            >
              Q U E S T I O N
            </p>
            <p className="whitespace-pre-line font-heading text-base font-bold leading-relaxed text-text-main sm:text-lg">
              {test.question}
            </p>
          </div>

          {/* Choices */}
          <div className="bg-white px-4 pb-5 pt-3 sm:px-6">
            <div className="space-y-2.5">
              {test.choices.map((c, i) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setSelected(i)}
                  className="flex w-full items-center gap-3 rounded-2xl border-2 border-pink-100 bg-white px-4 py-4 text-left transition-all duration-150 hover:border-pink-200 hover:shadow-sm active:scale-[0.98]"
                  style={{ minHeight: 56 }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black"
                    style={{ backgroundColor: LABEL_BG[c.label], color: "#5C4033" }}
                  >
                    {c.label}
                  </span>
                  <span className="text-sm font-medium leading-snug sm:text-base" style={{ color: "#5C4033" }}>
                    {c.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── Result view ── */
        <div
          className="overflow-hidden rounded-3xl"
          style={{
            boxShadow: "0 8px 32px rgba(254,108,158,0.18), 0 2px 8px rgba(0,0,0,0.06)",
            animation: "fadeUp 0.35s ease-out",
          }}
        >
          {/* Result header */}
          <div
            className="px-6 pb-8 pt-8 text-center sm:px-8"
            style={{ background: `linear-gradient(145deg, ${test.color}, ${test.color}bb)` }}
          >
            <p className="mb-1 text-xs font-bold tracking-[.2em] text-white/70">
              {choice.label} を選んだあなたは…
            </p>
            <h2 className="font-heading text-xl font-black leading-snug text-white sm:text-2xl">
              {choice.resultTitle}
            </h2>
            <p className="mt-2.5 text-sm italic leading-relaxed text-white/90 sm:text-base">
              「{choice.catchCopy}」
            </p>
          </div>

          {/* Description */}
          <div className="bg-white px-6 py-5 sm:px-8">
            <p className="whitespace-pre-line text-sm leading-loose sm:text-base" style={{ color: "#5C4033" }}>
              {choice.resultDescription}
            </p>
          </div>

          {/* Advice */}
          <div
            className="px-6 py-5 sm:px-8"
            style={{ background: `${test.color}0c` }}
          >
            <p className="mb-2 flex items-center gap-1.5 text-xs font-black tracking-wide" style={{ color: test.color }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              一言
            </p>
            <p className="whitespace-pre-line text-sm leading-loose sm:text-base" style={{ color: "#5C4033" }}>
              {choice.advice}
            </p>
          </div>

          {/* Share text */}
          <div className="bg-white px-6 py-4 sm:px-8">
            <p className="mb-1.5 text-[11px] font-bold" style={{ color: test.color }}>
              シェアしたくなる一言
            </p>
            <div
              className="rounded-2xl border px-4 py-3 text-sm leading-relaxed"
              style={{ borderColor: `${test.color}30`, background: `${test.color}06`, color: "#4a3040" }}
            >
              {choice.shareText}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 bg-white px-6 pb-6 pt-2 sm:px-8">
            <button
              type="button"
              onClick={handleShare}
              className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${test.color}, ${test.color}cc)` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              {copied ? "コピーしました！" : "シェアする"}
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border-2 py-3.5 text-sm font-bold transition-colors hover:bg-pink-50 active:scale-[0.98]"
                style={{ borderColor: test.color, color: test.color }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                もう一度診断する
              </button>

              <Link
                href="/tests"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border-2 border-pink-200 py-3.5 text-sm font-bold text-sm transition-colors hover:bg-pink-50 active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-pink-300">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                他の診断も見る
              </Link>
            </div>
          </div>

          {/* Other tests */}
          {otherTests.length > 0 && (
            <div className="mt-6 px-6 pb-6 sm:px-8">
              <p className="mb-3 text-center text-xs font-bold tracking-wide" style={{ color: "#5C4033" }}>
                他の心理テストも試してみて♡
              </p>
              <div className="space-y-2">
                {getRecommendedTests(test, choice, otherTests).map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tests/${t.slug}`}
                    className="flex items-center gap-3 rounded-2xl border-2 border-pink-100 bg-white px-4 py-3 transition-all hover:border-pink-200 hover:shadow-sm active:scale-[0.99]"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${t.color}14` }}
                    >
                      <LoveTestIcon id={t.icon} color={t.color} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold" style={{ color: "#5C4033" }}>{t.title}</p>
                      <p className="text-[11px]" style={{ color: "#5C4033" }}>#{t.category}</p>
                    </div>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" style={{ color: "#F067A6" }}>
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
