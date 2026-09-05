import type { MetadataRoute } from "next";
import { SITE_DEFAULT_URL } from "@/lib/site";

// robots.txt はこのファイルだけで生成する。
// （以前は public/robots.txt と二重管理で、静的ファイル側が優先されるため
//   このルートの内容が本番に反映されていなかった）
//
// 診断結果の共有URL（?result=...）は robots.txt では止めない。
// ブロックすると Google がページ側の noindex を読めず、URL だけが
// 検索結果に残ってしまうため、クロールは許可して noindex に任せる。
export default function robots(): MetadataRoute.Robots {
  const base = SITE_DEFAULT_URL.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        // /api/og は OGP 画像の配信に使うのでクロールを許可する
        allow: ["/", "/api/og"],
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
