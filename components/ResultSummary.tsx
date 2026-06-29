"use client";

import Link from "next/link";
import AppIcon from "@/components/AppIcon";
import BalanceMeter from "@/components/BalanceMeter";
import ResultHeroBanner from "@/components/ResultHeroBanner";
import HeartRating from "@/components/HeartRating";
import ResultSection from "@/components/ResultSection";
import { ResultTypeHeader } from "@/components/ResultStickerCard";
import ShareButtons from "@/components/ShareButtons";
import type { DogCatResult } from "@/lib/types";

interface ResultSummaryProps {
  result: DogCatResult;
  dogPct: number;
  catPct: number;
  onRetry: () => void;
  isVisible: boolean;
}

function ParameterList({ result }: { result: DogCatResult }) {
  const parameters = result.parameters ?? [];

  return (
    <ul className="mx-auto max-w-sm space-y-4 text-sm text-text-main sm:text-base">
      {parameters.map((param) => (
        <li
          key={param.label}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="font-medium">{param.label}</span>
          <HeartRating score={param.score} />
        </li>
      ))}
    </ul>
  );
}

export default function ResultSummary({
  result,
  dogPct,
  catPct,
  onRetry,
  isVisible,
}: ResultSummaryProps) {
  const subtitle = result.subtitle ?? result.tags.join("・");

  return (
    <div
      className={`transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-base px-0 pb-2 pt-0">
        <div className="mb-4">
          <ResultHeroBanner resultId={result.id} dogPct={dogPct} priority />
        </div>
        <ResultTypeHeader
          label="あなたの恋愛タイプは"
          title={result.name}
          subtitle={subtitle}
        />
      </div>

      <div className="-mx-4 sm:mx-0">
        <ResultSection title="特徴" variant="blue" waveTo="pink">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-text-main sm:text-base">
            {result.catch}
          </p>
        </ResultSection>

        <ResultSection title="恋愛パラメーター" variant="pink" waveTo="blue">
          <ParameterList result={result} />
        </ResultSection>

        <ResultSection title="恋愛傾向" variant="blue" waveTo="pink">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-text-main sm:text-base">
            {result.advice}
          </p>
        </ResultSection>

        <ResultSection title="恋愛特性" variant="pink" waveTo="blue">
          <div className="mx-auto flex max-w-md flex-col gap-4">
            {result.traits.map((trait) => (
              <div key={trait.label}>
                <p className="text-xs font-bold text-text-sub">{trait.label}</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-text-main">
                  {trait.value}
                </p>
              </div>
            ))}
          </div>
        </ResultSection>

        <ResultSection title="相性 & アドバイス" variant="blue" waveTo="pink">
          <div className="mx-auto max-w-md space-y-4">
            {result.compat.map((item, index) => (
              <div key={`${item.strong}-${index}`}>
                <p className="flex items-center justify-center gap-2 text-sm font-bold text-text-main">
                  <AppIcon name={item.icon} size={16} className="text-accent" />
                  {item.strong}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-main">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </ResultSection>

        <ResultSection title="犬系 / 猫系バランス" variant="pink">
          <div className="mx-auto max-w-md">
            <BalanceMeter dogPct={dogPct} catPct={catPct} size="lg" />
          </div>
        </ResultSection>
      </div>

      <div className="mt-5 space-y-5">
        <div className="card p-5">
          <ShareButtons
            diagnosisId="dog-cat"
            result={result}
            dogPct={dogPct}
            catPct={catPct}
          />
        </div>

        <div className="flex flex-col gap-3 pb-4">
          <button type="button" onClick={onRetry} className="btn-primary">
            もう一度診断する
          </button>
          <Link href="/" className="btn-ghost">
            診断一覧へ
          </Link>
        </div>
      </div>
    </div>
  );
}
