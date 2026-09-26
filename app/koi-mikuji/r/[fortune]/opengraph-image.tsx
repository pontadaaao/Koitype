import { ImageResponse } from "next/og";
import { Heart } from "@/lib/og-layout";
import { loadOgFont } from "@/lib/og-font";
import {
  KOI_MIKUJI_FORTUNES,
  getKoiMikujiFortune,
  koiMikujiInk,
} from "@/lib/koi-mikuji";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `恋みくじの結果 | ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return KOI_MIKUJI_FORTUNES.map((f) => ({ fortune: f.slug }));
}

// 結果画面の札は極太なので、使う文字だけを Noto Sans JP Black でサブセット取得する。
// 取れなければ共通フォント（Regular）で描く（ビルドを外部取得の失敗で止めないため）。
async function loadBlackSubset(text: string): Promise<ArrayBuffer | null> {
  try {
    // User-Agent を付けないと TrueType（satori が読める形式）で返る
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&text=${encodeURIComponent(text)}`
    ).then((res) => res.text());
    const url = css.match(/src: url\(([^)]+)\) format\('truetype'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.arrayBuffer();
    const sig = new Uint8Array(data.slice(0, 4)).join(",");
    return sig === "0,1,0,0" || sig === "79,84,84,79" ? data : null;
  } catch {
    return null;
  }
}

const RARE_GRADIENT = "linear-gradient(120deg, #ff5e8a, #ffb340, #5ec5e8, #b97bf0)";

// 結果画面の「おみくじ札」(.omikuji-slip) を 1200x630 に描き直したもの。
// ♡ はフォント外グリフのため SVG で描く（lib/og-layout.tsx の注記参照）。
export default async function Image({ params }: { params: { fortune: string } }) {
  const fortune = getKoiMikujiFortune(params.fortune) ?? KOI_MIKUJI_FORTUNES[0];
  const [fontData, blackData] = await Promise.all([
    loadOgFont(),
    loadBlackSubset(`恋みくじ第番koitype.com${fortune.key}${fortune.no}${fortune.lines.join("")}`),
  ]);
  const accent = fortune.accent;
  const slipBg = fortune.rare ? RARE_GRADIENT : accent;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffaf8",
          fontFamily: "Noto Sans JP",
        }}
      >
        <div
          style={{
            width: 1060,
            display: "flex",
            position: "relative",
            flexDirection: "column",
            background: slipBg,
            borderRadius: 18,
            padding: "0 22px 22px",
            boxShadow: "0 20px 44px rgba(120,60,100,.18)",
          }}
        >
          {/* 札の頭：ブランド・運勢・番号 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: "26px 16px 0",
              color: "#fff",
              height: 110,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 36, fontWeight: 700, letterSpacing: 5, paddingTop: 8, width: 280 }}>
              <Heart size={34} color="#fff" />
              恋みくじ
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 36, fontWeight: 700, letterSpacing: 5, paddingTop: 8, width: 280 }}>
              第{fortune.no}番
            </div>
          </div>

          {/* 本文 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              background: "#fff",
              borderRadius: 8,
              height: 380,
              marginTop: 6,
              paddingTop: 30,
              color: koiMikujiInk(accent),
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {fortune.lines.map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
            <div style={{ position: "absolute", right: 28, bottom: 18, display: "flex", fontSize: 26, color: "#c9b9c3", letterSpacing: 2, fontWeight: 400 }}>
              koitype.com
            </div>
          </div>

          {/* 運勢タブ（本文より後に置いて手前に描く） */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                background: fortune.rare ? "#ff2e93" : accent,
                color: "#fff",
                fontSize: fortune.rare ? 64 : 84,
                fontWeight: 700,
                lineHeight: 1,
                padding: fortune.rare ? "28px 56px 34px" : "18px 64px 30px",
                borderRadius: "0 0 50% 50% / 0 0 45% 45%",
              }}
            >
              {fortune.key}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans JP", data: fontData, style: "normal", weight: 400 },
        { name: "Noto Sans JP", data: blackData ?? fontData, style: "normal", weight: 700 },
      ],
    }
  );
}
