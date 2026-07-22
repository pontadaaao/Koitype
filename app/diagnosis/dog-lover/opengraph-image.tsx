import { ImageResponse } from "next/og";
import { getResultById } from "@/lib/dog-lover-diagnosis";
import { loadOgFont } from "@/lib/og-font";
import { Heart } from "@/lib/og-layout";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} 恋愛犬タイプ診断`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  searchParams: { result?: string };
}

export default async function Image({ searchParams }: Props) {
  const resultId = searchParams?.result ?? "balance-dog";
  const result = getResultById(resultId) ?? getResultById("balance-dog")!;

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
          background: "linear-gradient(135deg, #fff4f9 0%, #fdf0ff 45%, #f8f4ff 100%)",
          fontFamily: "Noto Sans JP",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(240, 103, 166, 0.10)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -50,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(155, 111, 212, 0.10)",
            display: "flex",
          }}
        />

        {/* Site name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            fontSize: 26,
            color: "#F067A6",
            fontWeight: 700,
          }}
        >
          <Heart size={24} color="#F067A6" />
          <span style={{ display: "flex" }}>{SITE_NAME}</span>
        </div>

        {/* Diagnosis category */}
        <div
          style={{
            display: "flex",
            background: "rgba(240, 103, 166, 0.12)",
            color: "#F067A6",
            fontSize: 18,
            fontWeight: 700,
            padding: "4px 20px",
            borderRadius: 999,
            border: "1.5px solid rgba(240,103,166,0.3)",
            marginBottom: 20,
          }}
        >
          恋愛犬タイプ診断
        </div>

        {/* Result name */}
        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            color: "#2a1a22",
            marginBottom: 12,
          }}
        >
          {result.name}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#F067A6",
            marginBottom: 28,
          }}
        >
          「{result.title}」
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
          {result.tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                backgroundColor: "#ffd6e7",
                color: "#8b2252",
                padding: "8px 20px",
                borderRadius: 999,
                fontSize: 20,
              }}
            >
              #{tag}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 72px",
            borderTop: "1.5px solid rgba(240, 103, 166, 0.18)",
            background: "rgba(255,255,255,0.55)",
            fontSize: 18,
            color: "#F067A6",
            fontWeight: 700,
            gap: 6,
          }}
        >
          <Heart size={16} color="#F067A6" />
          <span style={{ display: "flex" }}>koitype.com で診断する</span>
        </div>
      </div>
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
