import { ImageResponse } from "next/og";
import { OgLayout } from "@/lib/og-layout";
import { loadOgFont } from "@/lib/og-font";

export const runtime = "nodejs";
export const alt = "Koitype | 恋愛診断サイト";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = await loadOgFont();

  return new ImageResponse(
    <OgLayout
      title="恋愛診断・心理テスト・恋みくじ"
      subtitle="あなたの恋愛をもっと知ろう"
    />,
    {
      ...size,
      fonts: [
        { name: "Noto Sans JP", data: fontData, style: "normal", weight: 400 },
        { name: "Noto Sans JP", data: fontData, style: "normal", weight: 700 },
      ],
    }
  );
}
