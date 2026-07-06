import { ImageResponse } from "next/og";
import { getCatResultById } from "@/lib/cat-type-diagnosis";
import { loadOgFont } from "@/lib/og-font";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} 恋愛猫タイプ診断`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  searchParams: { result?: string };
}

const TYPE_COLORS: Record<string, { bg: string; accent: string }> = {
  black: {
    bg: "#1a0e2e",
    accent: "#c084fc",
  },
  moody: {
    bg: "#f8f9ff",
    accent: "#7c3aed",
  },
  sweet: {
    bg: "#fff0f8",
    accent: "#f067a6",
  },
  azato: {
    bg: "#faf5ff",
    accent: "#9b6fd4",
  },
};

const DEFAULT_COLORS = {
  bg: "#fff0f8",
  accent: "#f067a6",
};

export default async function Image({ searchParams }: Props) {
  const resultId = searchParams?.result ?? "";
  const result = getCatResultById(resultId);
  const colors = TYPE_COLORS[resultId] ?? DEFAULT_COLORS;
  const isDefault = !result;
  const fontData = await loadOgFont();

  const isLight = colors.bg.startsWith("#f") || colors.bg.startsWith("#e");
  const textMain = isLight ? "#2a1a22" : "#f3e8ff";
  const textSub = isLight ? "#7a5568" : "#d8b4fe";

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
            width: 300,
            height: 300,
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
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: `${colors.accent}12`,
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
          恋愛猫タイプ診断
        </div>

        {isDefault ? (
          /* Default (no result) layout */
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
                fontSize: 52,
                fontWeight: 700,
                color: textMain,
                textAlign: "center",
              }}
            >
              あなたはどの猫系？
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: textSub,
                textAlign: "center",
              }}
            >
              8つの質問で恋愛猫タイプを診断
            </div>
          </div>
        ) : (
          /* Result layout */
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
              あなたの恋愛猫タイプは
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 52,
                fontWeight: 700,
                color: isLight ? textMain : colors.accent,
                lineHeight: 1.2,
              }}
            >
              {result.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: colors.accent,
                fontStyle: "italic",
              }}
            >
              「{result.catch}」
            </div>
            {/* Traits preview */}
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
              {result.traits.slice(0, 3).map((trait) => (
                <div
                  key={trait}
                  style={{
                    display: "flex",
                    background: `${colors.accent}15`,
                    color: colors.accent,
                    padding: "6px 16px",
                    borderRadius: 999,
                    fontSize: 18,
                    border: `1px solid ${colors.accent}30`,
                  }}
                >
                  {trait}
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
            background: isLight
              ? "rgba(255,255,255,0.6)"
              : "rgba(0,0,0,0.25)",
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
