import { ImageResponse } from "next/og";
import { OgLayout } from "@/lib/og-layout";
import { loadOgFont } from "@/lib/og-font";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `お問い合わせ | ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = await loadOgFont();

  return new ImageResponse(
    <OgLayout
      title="お問い合わせ"
      subtitle="ご意見・ご要望はこちらから"
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
