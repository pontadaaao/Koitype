"use client";

import { useEffect, useState } from "react";

interface ShareButtonsProps {
  title: string;
  /** 記事の絶対URL。 */
  url: string;
}

/**
 * SNS シェアボタン（X / LINE / Facebook / URLコピー）。
 * - シェアURLは encodeURIComponent で安全にエンコード
 * - コピー後はトースト通知
 * - Web Share API 対応端末では「共有」ボタンも表示
 */
export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [toast, setToast] = useState(false);
  const [canWebShare, setCanWebShare] = useState(false);

  useEffect(() => {
    setCanWebShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const showToast = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 2000);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // フォールバック
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showToast();
    } catch {
      // コピー不可でも致命的にしない
    }
  };

  const handleWebShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // ユーザーキャンセル等は無視
    }
  };

  return (
    <div className="relative">
      <p className="mb-2.5 text-xs font-bold text-text-sub">この記事をシェア</p>
      <div className="flex flex-wrap items-center gap-2">
        {/* X */}
        <a
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Xでシェア"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        {/* LINE */}
        <a
          href={shareLinks.line}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LINEでシェア"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06C755] text-white transition-transform hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.56 7.48 8.37 8.13.33.07.77.22.88.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.02.89.56 1.09-.46 5.9-3.47 8.05-5.95 1.49-1.63 2.2-3.29 2.2-5.02C22.28 5.69 17.52 2 12 2zM8.09 13.1H6.12a.52.52 0 0 1-.52-.52V8.65a.52.52 0 0 1 1.04 0v3.41h1.45a.52.52 0 0 1 0 1.04zm2.04-.52a.52.52 0 0 1-1.04 0V8.65a.52.52 0 0 1 1.04 0v3.93zm4.7 0a.52.52 0 0 1-.36.5.53.53 0 0 1-.58-.19l-2.02-2.75v2.44a.52.52 0 0 1-1.04 0V8.65a.52.52 0 0 1 .93-.32l2.03 2.76V8.65a.52.52 0 0 1 1.04 0v3.93zm3.3-2.49a.52.52 0 0 1 0 1.04h-1.45v.93h1.45a.52.52 0 0 1 0 1.04h-1.97a.52.52 0 0 1-.52-.52V8.65a.52.52 0 0 1 .52-.52h1.97a.52.52 0 0 1 0 1.04h-1.45v.93z" />
          </svg>
        </a>
        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebookでシェア"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
          </svg>
        </a>
        {/* URLコピー */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="リンクをコピー"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-light bg-white text-text-sub transition-colors hover:border-accent/50 hover:text-accent active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
        {/* Web Share API（対応端末のみ） */}
        {canWebShare && (
          <button
            type="button"
            onClick={handleWebShare}
            aria-label="共有"
            className="flex h-10 items-center gap-1.5 rounded-full border border-pink-light bg-white px-4 text-xs font-bold text-text-sub transition-colors hover:border-accent/50 hover:text-accent active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
            共有
          </button>
        )}
      </div>

      {/* トースト通知 */}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-text-main px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        リンクをコピーしました
      </div>
    </div>
  );
}
