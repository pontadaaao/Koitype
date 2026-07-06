import { ImageResponse } from "next/og";
import { getSukinaHitoResultById } from "@/lib/sukina-hito-diagnosis";
import { loadOgFont } from "@/lib/og-font";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} 好きな人から見たあなた診断`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  searchParams: { result?: string };
}

const TYPE_COLORS: Record<
  string,
  { bg: string; accent: string; topGrad: string }
> = {
  healing: {
    bg: "#fff0f5",
    accent: "#f067a6",
    topGrad: "#C84B9E",
  },
  protect: {
    bg: "#faf5ff",
    accent: "#9b6fd4",
    topGrad: "#7e22ce",
  },
  curious: {
    bg: "#f5f3ff",
    accent: "#7c3aed",
    topGrad: "#5b21b6",
  },
  chase: {
    bg: "#fff0f5",
    accent: "#e11d77",
    topGrad: "#9f1239",
  },
};

const DEFAULT_COLORS = {
  bg: "#fff0f5",
  accent: "#f067a6",
  topGrad: "#C84B9E",
};

export default async function Image({ searchParams }: Props) {
  const resultId = searchParams?.result ?? "";
  const result = getSukinaHitoResultById(resultId);
  const colors = TYPE_COLORS[resultId] ?? DEFAULT_COLORS;
  const isDefault = !result;
  const fontData = await loadOgFont();

  const textMain = "#2a1a22";
  const textSub = "#7a5568";

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
          backgroundColor: colors.bg,
          fontFamily: "Noto Sans JP",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: `${colors.accent}18`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -40,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: `${colors.accent}12`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "55%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `${colors.topGrad}10`,
            display: "flex",
          }}
        />

        {/* Site name */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 26,
            fontWeight: 700,
            color: colors.accent,
          }}
        >
          <span style={{ display: "flex" }}>♡</span>
          <span style={{ display: "flex" }}>{SITE_NAME}</span>
        </div>

        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 60,
            display: "flex",
            fontSize: 18,
            fontWeight: 700,
            color: colors.accent,
            background: `${colors.accent}15`,
            padding: "6px 20px",
            borderRadius: 999,
            border: `1.5px solid ${colors.accent}30`,
          }}
        >
          好きな人から見たあなた診断
        </div>

        {isDefault ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 48,
                fontWeight: 700,
                color: textMain,
                textAlign: "center",
              }}
            >
              好きな人から見た私は？
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: textSub,
                textAlign: "center",
              }}
            >
              8つの質問で相手から見えているあなたの魅力を診断
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              padding: "0 60px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                color: colors.accent,
                fontWeight: 400,
                opacity: 0.85,
              }}
            >
              好きな人から見たあなたは
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 48,
                fontWeight: 700,
                color: textMain,
                lineHeight: 1.2,
              }}
            >
              {result.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: colors.accent,
                fontStyle: "italic",
              }}
            >
              「{result.honesty[0]}」
            </div>
            {/* Feature preview tags */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 8,
                marginTop: 6,
              }}
            >
              {result.features.slice(0, 2).map((feat) => (
                <div
                  key={feat}
                  style={{
                    display: "flex",
                    background: `${colors.accent}15`,
                    color: colors.accent,
                    padding: "6px 16px",
                    borderRadius: 999,
                    fontSize: 16,
                    border: `1px solid ${colors.accent}30`,
                    maxWidth: 400,
                  }}
                >
                  ♡ {feat.length > 22 ? feat.slice(0, 22) + "…" : feat}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 60px",
            borderTop: `1.5px solid ${colors.accent}20`,
            background: "rgba(255,255,255,0.6)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: colors.accent,
              fontWeight: 700,
            }}
          >
            ♡ koitype.com
          </div>
          <div style={{ display: "flex", fontSize: 17, color: textSub }}>
            恋愛診断・心理テスト・恋みくじ
          </div>
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
