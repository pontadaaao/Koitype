import { ImageResponse } from "next/og";
import { OgLayout } from "@/lib/og-layout";
import { loadOgFont } from "@/lib/og-font";
import { getBlogArticleBySlug } from "@/lib/blog-data";

export const runtime = "nodejs";
export const alt = "恋愛ブログ | Koitype";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { slug: string };
}

// 記事のアイキャッチ(microCMS上の画像)をそのままOGP画像として返す。
// アイキャッチが無い記事は、サイト共通レイアウトに記事タイトルを載せて生成する。
export default async function Image({ params }: Props) {
  const article = await getBlogArticleBySlug(params.slug);
  const eyecatchUrl = article?.eyecatch?.url;

  if (eyecatchUrl) {
    try {
      const res = await fetch(eyecatchUrl);
      if (res.ok) {
        const contentType = res.headers.get("content-type") ?? "image/png";
        const buffer = await res.arrayBuffer();
        return new Response(buffer, {
          headers: { "Content-Type": contentType },
        });
      }
    } catch {
      // 画像取得に失敗した場合は下のフォールバックへ
    }
  }

  const fontData = await loadOgFont();
  return new ImageResponse(
    (
      <OgLayout
        title={article?.title ?? "恋愛ブログ"}
        subtitle="Koitype 恋愛ブログ"
      />
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans JP", data: fontData, style: "normal", weight: 400 },
        { name: "Noto Sans JP", data: fontData, style: "normal", weight: 700 },
      ],
    }
  );
}
