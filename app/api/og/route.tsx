import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import {
  defaultDogPctForResult,
  getResultById as getDogCatResult,
  isDogCatResultId,
} from "@/lib/dog-cat-diagnosis";
import { getSignByName } from "@/lib/astrology";
import { diagnoses, getResultById as getLoveStyleResult } from "@/lib/diagnoses";
import { loadOgFont } from "@/lib/og-font";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";

function LoveStyleOg({
  result,
}: {
  result: { name: string; tags: string[] };
}) {
  return (
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
          marginBottom: 20,
        }}
      >
        {SITE_NAME}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 52,
          fontWeight: 700,
          color: "#2a1a22",
          marginBottom: 24,
        }}
      >
        {result.name}
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
              fontSize: 22,
            }}
          >
            #{tag}
          </div>
        ))}
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
  );
}

function CompatibilityOg({
  s1Name,
  s2Name,
  score,
  rank,
}: {
  s1Name: string;
  s2Name: string;
  score: string;
  rank: string;
}) {
  return (
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
        {s1Name} × {s2Name}
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
      <div style={{ display: "flex", fontSize: 24, color: "#7a5568" }}>
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
  );
}

function DogCatOg({
  result,
  dogPct,
  catPct,
}: {
  result: { name: string; tags: string[] };
  dogPct: number;
  catPct: number;
}) {
  return (
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
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fontData = await loadOgFont();

  const fonts = [
    { name: "Noto Sans JP", data: fontData, style: "normal" as const, weight: 400 as const },
    { name: "Noto Sans JP", data: fontData, style: "normal" as const, weight: 700 as const },
  ];

  if (searchParams.get("type") === "compatibility") {
    const s1Name = searchParams.get("s1") ?? "牡羊座";
    const s2Name = searchParams.get("s2") ?? "蟹座";
    const score = searchParams.get("score") ?? "82";
    const rank = searchParams.get("rank") ?? "とても良い相性";
    const s1 = getSignByName(s1Name) ?? { name: s1Name, element: "火" as const };
    const s2 = getSignByName(s2Name) ?? { name: s2Name, element: "水" as const };

    return new ImageResponse(
      (
        <CompatibilityOg
          s1Name={s1.name}
          s2Name={s2.name}
          score={score}
          rank={rank}
        />
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  const resultId = searchParams.get("result") ?? "romantic";

  if (isDogCatResultId(resultId)) {
    const result = getDogCatResult(resultId)!;
    const dogPctParam = searchParams.get("dogPct");
    const dogPct = dogPctParam
      ? parseInt(dogPctParam, 10)
      : defaultDogPctForResult(resultId);
    const catPct = 100 - dogPct;

    return new ImageResponse(
      (
        <DogCatOg result={result} dogPct={dogPct} catPct={catPct} />
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  let result: { name: string; tags: string[] } | undefined;
  for (const diagnosis of diagnoses) {
    const found = getLoveStyleResult(diagnosis.id, resultId);
    if (found) {
      result = found;
      break;
    }
  }
  result ??= getLoveStyleResult(diagnoses[0].id, resultId) ?? diagnoses[0].results[0];

  return new ImageResponse(
    <LoveStyleOg result={result} />,
    { width: 1200, height: 630, fonts }
  );
}
