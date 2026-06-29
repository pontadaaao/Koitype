"use client";

import { useState } from "react";
import AppIcon from "@/components/AppIcon";
import { SITE_TAG, siteUrl } from "@/lib/site";
import type { DiagnosisResult, DogCatResult } from "@/lib/types";
import { useLanguage } from "@/components/LanguageProvider";

interface ShareButtonsProps {
  diagnosisId: string;
  result: DiagnosisResult | DogCatResult;
  dogPct?: number;
  catPct?: number;
}

function isDogCatResult(
  result: DiagnosisResult | DogCatResult
): result is DogCatResult {
  return "catch" in result;
}

export default function ShareButtons({
  diagnosisId,
  result,
  dogPct,
  catPct,
}: ShareButtonsProps) {
  const [toast, setToast] = useState<string | null>(null);
  const { t } = useLanguage();

  const shareParams = new URLSearchParams({ result: result.id });
  if (isDogCatResult(result) && dogPct !== undefined) {
    shareParams.set("dogPct", String(dogPct));
  }
  const shareUrl = siteUrl(
    `/diagnosis/${diagnosisId}?${shareParams.toString()}`
  );

  const shareText = isDogCatResult(result)
    ? `私の恋愛スタイルは「${result.name}」でした\n犬系${dogPct ?? 0}% / 猫系${catPct ?? 0}%\n${result.tags.map((t) => "#" + t).join(" ")} #恋愛診断 ${SITE_TAG}`
    : `私の恋愛スタイルは「${result.name}」でした\n${result.tags.map((t) => "#" + t).join(" ")} #恋愛診断 ${SITE_TAG}`;

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const shareTwitter = () => {
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
      showToast(t.share.instagramCopied);
    } catch {
      showToast(t.share.copyFailed);
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
      showToast(t.share.linkCopied);
    } catch {
      showToast(t.share.copyFailed);
    }
  };

  return (
    <>
      <p className="mb-3 text-center text-sm font-medium text-text-sub">
        {t.share.shareResult}
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={shareTwitter}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#1da1f2] px-3 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          <AppIcon name="brand-x" size={18} />
          X
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
          className="flex items-center justify-center gap-2 rounded-xl border border-accent bg-base px-3 py-3 text-sm font-medium text-accent transition-colors hover:border-accent/70 active:scale-[0.98]"
        >
          <AppIcon name="link" size={18} />
          {t.share.copy}
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
