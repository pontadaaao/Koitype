import { ImageResponse } from "next/og";
import { getDiagnosisById } from "@/lib/diagnoses";
import { loadOgFont } from "@/lib/og-font";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} 診断`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { id: string };
}

export default async function Image({ params }: Props) {
  const diagnosis = getDiagnosisById(params.id);
  const title = diagnosis?.title ?? "恋愛診断";

  const fontData = await loadOgFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff0f5",
          fontFamily: "Noto Sans JP",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#F067A6",
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 700,
            color: "#2a1a22",
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#F067A6",
            marginTop: 40,
          }}
        >
          {SITE_NAME} で診断する
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
