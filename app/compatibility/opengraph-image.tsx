import { ImageResponse } from "next/og";
import { getSignByName } from "@/lib/astrology";
import { loadOgFont } from "@/lib/og-font";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} 相性診断`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  searchParams: {
    s1?: string;
    s2?: string;
    score?: string;
    rank?: string;
  };
}

export default async function Image({ searchParams }: Props) {
  const s1Name = searchParams?.s1 ?? "牡羊座";
  const s2Name = searchParams?.s2 ?? "蟹座";
  const score = searchParams?.score ?? "82";
  const rank = searchParams?.rank ?? "とても良い相性";

  const s1 = getSignByName(s1Name) ?? { name: s1Name, element: "火" as const };
  const s2 = getSignByName(s2Name) ?? { name: s2Name, element: "水" as const };

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
            fontSize: 36,
            fontWeight: 700,
            color: "#2a1a22",
            marginBottom: 20,
          }}
        >
          {s1.name} × {s2.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#F067A6",
            marginBottom: 12,
          }}
        >
          {score}点
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 700,
            color: "#2a1a22",
            marginBottom: 16,
          }}
        >
          {rank}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#7a5568",
          }}
        >
          相性診断
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#F067A6",
            marginTop: 32,
          }}
        >
          誕生日で占う相性診断
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
