"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export const ADSENSE_CLIENT_ID = "ca-pub-4709100652775310";

/**
 * AdSense の広告配信スクリプト。
 *
 * ・本番環境のみ読み込む（プレビュー/開発で無効な広告リクエストを出さないため）。
 * ・管理画面 `/admin/*` では読み込まない。パスワード保護された入力専用画面であり、
 *   閲覧者向けコンテンツが無いページに広告を配信しないため。
 *
 * サイト所有権の確認に使う `<meta name="google-adsense-account">` は
 * app/layout.tsx の metadata 側にあり、このコンポーネントとは独立している
 * （審査前の所有権確認が、広告配信フラグの都合で消えないようにするため）。
 */
export default function AdSenseScript() {
  const pathname = usePathname();

  if (process.env.NODE_ENV !== "production") return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    <Script
      id="adsbygoogle-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
