"use client";

import { useState } from "react";
import AppIcon from "@/components/AppIcon";
import { useLanguage } from "@/components/LanguageProvider";
import ElementBadge from "@/components/ElementBadge";
import MetricBars from "@/components/MetricBars";
import ScoreRing from "@/components/ScoreRing";
import { getAdvice, type CompatibilityResult } from "@/lib/compatibility";
import { LIFE_PATH_DESC } from "@/lib/numerology";
import { SITE_TAG, siteUrl } from "@/lib/site";

interface CompatibilityShareButtonsProps {
  result: CompatibilityResult;
  shareUrl: string;
}

export function CompatibilityShareButtons({
  result,
  shareUrl,
}: CompatibilityShareButtonsProps) {
  const [toast, setToast] = useState<string | null>(null);
  const { t } = useLanguage();
  const { s1, s2, total, rank } = result;

  const shareText = `${s1.name}×${s2.name}の相性は…\n${total}点「${rank.rank}」\n誕生日で占う相性診断 ${SITE_TAG} #相性診断`;

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <p className="mb-3 text-center text-sm font-medium text-text-sub">
        {t.compat.shareResult}
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
            )
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-[#1da1f2] px-3 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          <AppIcon name="brand-x" size={18} />
          X
        </button>
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`
            )
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-[#06c755] px-3 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          <AppIcon name="brand-line" size={18} />
          LINE
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
              showToast(t.compat.copied);
            } catch {
              showToast(t.compat.copyFailed);
            }
          }}
          className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-accent bg-base px-3 py-3 text-sm font-medium text-accent transition-colors hover:border-accent/70 active:scale-[0.98]"
        >
          <AppIcon name="link" size={18} />
          {t.compat.copyLink}
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

interface ResultViewProps {
  result: CompatibilityResult;
  shareUrl: string;
  onRetry: () => void;
}

export default function ResultView({ result, shareUrl, onRetry }: ResultViewProps) {
  const { t } = useLanguage();
  const advice = getAdvice(result);

  return (
    <div className="space-y-5 opacity-100 transition-opacity duration-500">
      <div className="card p-5 text-center">
        <div className="flex items-center justify-center gap-3 text-lg font-bold text-text-main">
          <span>{result.s1.name}</span>
          <AppIcon name="heart-filled" size={20} className="text-accent" />
          <span>{result.s2.name}</span>
        </div>

        <div className="my-5">
          <ScoreRing score={result.total} />
        </div>

        <p className="flex items-center justify-center gap-2 font-heading text-xl font-bold text-text-main">
          <AppIcon name={result.rank.icon} size={22} className="text-accent" />
          {result.rank.rank}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-sub">
          {result.rank.catch}
        </p>
      </div>

      <div className="card p-5">
        <h2 className="section-title mb-4">{t.compat.breakdown}</h2>
        <MetricBars
          metrics={[
            { label: t.compat.passion, icon: "flame", value: result.passion },
            { label: t.compat.trust, icon: "handshake", value: result.trust },
            { label: t.compat.future, icon: "ring", value: result.future },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[result.s1, result.s2].map((sign, i) => {
          const lp = i === 0 ? result.lp1 : result.lp2;
          const label = i === 0 ? t.compat.you : t.compat.partner;
          return (
            <div key={label} className="card p-4">
              <p className="text-xs font-medium text-log-hint">{label}</p>
              <p className="mt-1 font-heading text-base font-bold text-text-main">
                {sign.name}
              </p>
              <p className="mt-1">
                <ElementBadge element={sign.element} />
              </p>
              <p className="mt-2 text-xs leading-relaxed text-text-sub">
                {t.compat.lifePathNumber} {lp}
                <br />
                {LIFE_PATH_DESC[lp] ?? ""}
              </p>
            </div>
          );
        })}
      </div>

      <div className="card p-5">
        <h2 className="section-title mb-3">{t.compat.advice}</h2>
        <p className="text-sm leading-relaxed text-text-sub">{advice}</p>
      </div>

      <div className="card p-5">
        <CompatibilityShareButtons result={result} shareUrl={shareUrl} />
      </div>

      <button type="button" onClick={onRetry} className="btn-secondary">
        {t.compat.retry}
      </button>
    </div>
  );
}
