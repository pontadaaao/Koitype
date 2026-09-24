"use client";

import RadarChart from "@/components/RadarChart";
import type { RadarPoint } from "@/lib/diagnosis-history";

interface ResultRadarProps {
  points: RadarPoint[];
  title?: string;
  /** チャートと見出しの色（既定はサイトのピンク） */
  color?: string;
  className?: string;
}

/** 診断結果ページ上部に置くレーダーチャートのカード。3項目未満なら何も出さない。 */
export default function ResultRadar({
  points,
  title = "ラブパラメーター",
  color = "#F067A6",
  className = "",
}: ResultRadarProps) {
  if (points.length < 3) return null;

  return (
    <div
      className={`mx-auto w-full max-w-sm rounded-3xl bg-white px-3 pb-3 pt-4 ${className}`}
      style={{ boxShadow: "0 8px 30px rgba(192, 38, 110, 0.18)" }}
    >
      <p className="text-center text-xs font-bold tracking-[.2em]" style={{ color }}>
        {title}
      </p>
      <RadarChart
        series={[{ label: "あなた", points, color }]}
        ariaLabel={`${title}のレーダーチャート：${points
          .map((p) => `${p.label}${p.value}`)
          .join("、")}`}
      />
    </div>
  );
}
