import { ImageResponse } from "next/og";
import {
  defaultDogPctForResult,
  getResultById,
} from "@/lib/dog-cat-diagnosis";
import { loadOgFont } from "@/lib/og-font";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} 犬系猫系診断`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  searchParams: { result?: string; dogPct?: string };
}

export default async function Image({ searchParams }: Props) {
  const resultId = searchParams?.result ?? "dog";
  const result = getResultById(resultId) ?? getResultById("dog")!;
  const dogPct = searchParams?.dogPct
    ? parseInt(searchParams.dogPct, 10)
    : defaultDogPctForResult(resultId);
  const catPct = 100 - dogPct;

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
            marginBottom: 16,
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
            marginBottom: 20,
          }}
        >
          {result.name}
        </div>
        <div
          style={{
            display: "flex",
            width: 600,
            height: 24,
            borderRadius: 999,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              width: `${dogPct}%`,
              height: "100%",
              backgroundColor: "#4a90d9",
            }}
          />
          <div
            style={{
              display: "flex",
              width: `${catPct}%`,
              height: "100%",
              backgroundColor: "#9b6fd4",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: 600,
            justifyContent: "space-between",
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          <span style={{ display: "flex", color: "#4a90d9" }}>
            犬系 {dogPct}%
          </span>
          <span style={{ display: "flex", color: "#9b6fd4" }}>
            猫系 {catPct}%
          </span>
        </div>
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
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#F067A6",
            marginTop: 32,
          }}
        >
          {SITE_NAME} で診断する
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
