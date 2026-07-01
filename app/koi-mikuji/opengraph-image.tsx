import { ImageResponse } from "next/og";
import { OgLayout } from "@/lib/og-layout";
import { loadOgFont } from "@/lib/og-font";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `恋みくじ | ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = await loadOgFont();

  return new ImageResponse(
    <OgLayout
      title="恋みくじ"
      subtitle="今日の恋愛運をおみくじで占おう"
      accent="#9B6FD4"
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
