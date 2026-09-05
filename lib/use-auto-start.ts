"use client";

import { useEffect, useState } from "react";

/**
 * 診断カード等からの「イントロを飛ばしてすぐ開始」フラグ。
 *
 * 以前は `?start=1` というクエリパラメータで渡していたが、Google から見ると
 * これは正規URLとは別のURLで、内部リンクから大量にクロールされていた。
 * その結果「代替ページ(canonical)」「noindexで除外」「リダイレクトエラー」が
 * Search Console に積み上がり、本来の診断ページのクロール予算を食っていた。
 *
 * ハッシュ (#start) はサーバーに送られず Google もURLの一部として扱わないため、
 * 同じUXのままインデックス上のノイズだけを消せる。
 */
export function useAutoStart(): boolean {
  const [autoStart, setAutoStart] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#start") return;

    setAutoStart(true);
    // 履歴を増やさずにハッシュだけ落として、共有時に #start が付かないようにする
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }, []);

  return autoStart;
}

/** 診断/相性ページへの「すぐ開始」リンクURLを作る */
export function autoStartHref(base: string): string {
  return `${base}#start`;
}
