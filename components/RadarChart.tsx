"use client";

import type { RadarPoint } from "@/lib/diagnosis-history";

export interface RadarSeries {
  label: string;
  points: RadarPoint[];
  color: string;
  /** 破線で描く（前回の結果など） */
  dashed?: boolean;
}

interface RadarChartProps {
  series: RadarSeries[];
  /** 軸の最大値（既定 100） */
  max?: number;
  /** SVG の一辺（px） */
  size?: number;
  ariaLabel?: string;
}

const LEVELS = 4;

/** 長いラベルは2行に折り返す。 */
function splitLabel(label: string): string[] {
  if (label.length <= 6) return [label];
  const mid = Math.ceil(label.length / 2);
  return [label.slice(0, mid), label.slice(mid)];
}

export default function RadarChart({
  series,
  max = 100,
  size = 280,
  ariaLabel = "レーダーチャート",
}: RadarChartProps) {
  const axes = series[0]?.points.map((p) => p.label) ?? [];
  const n = axes.length;
  if (n < 3) return null;

  // 軸ラベル分の余白（pad）を四方に確保する。
  const pad = 84;
  const view = size + pad * 2;
  const c = view / 2;
  const r = size / 2 - 8;

  const angle = (i: number) => -Math.PI / 2 + (2 * Math.PI * i) / n;
  const pos = (i: number, ratio: number) => ({
    x: c + Math.cos(angle(i)) * r * ratio,
    y: c + Math.sin(angle(i)) * r * ratio,
  });
  const clamp = (v: number) => Math.max(0, Math.min(1, v / max));
  const polygon = (ratios: number[]) =>
    ratios
      .map((ratio, i) => {
        const p = pos(i, ratio);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <svg
      viewBox={`0 0 ${view} ${view}`}
      className="mx-auto block h-auto w-full max-w-[380px]"
      role="img"
      aria-label={ariaLabel}
    >
      {/* グリッド */}
      {Array.from({ length: LEVELS }, (_, l) => (
        <polygon
          key={l}
          points={polygon(axes.map(() => (l + 1) / LEVELS))}
          fill={l === LEVELS - 1 ? "#FFF5FA" : "none"}
          stroke="#FFD6EC"
          strokeWidth={1}
        />
      ))}
      {axes.map((_, i) => {
        const p = pos(i, 1);
        return (
          <line key={i} x1={c} y1={c} x2={p.x} y2={p.y} stroke="#FFD6EC" strokeWidth={1} />
        );
      })}

      {/* データ */}
      {series.map((s) => {
        const ratios = axes.map((label) =>
          clamp(s.points.find((p) => p.label === label)?.value ?? 0)
        );
        return (
          <g key={s.label}>
            <polygon
              points={polygon(ratios)}
              fill={s.color}
              fillOpacity={s.dashed ? 0.06 : 0.22}
              stroke={s.color}
              strokeWidth={2}
              strokeDasharray={s.dashed ? "5 4" : undefined}
              strokeLinejoin="round"
            />
            {!s.dashed &&
              ratios.map((ratio, i) => {
                const p = pos(i, ratio);
                return <circle key={i} cx={p.x} cy={p.y} r={4} fill={s.color} />;
              })}
          </g>
        );
      })}

      {/* 軸ラベル */}
      {axes.map((label, i) => {
        const p = pos(i, 1.08);
        const cos = Math.cos(angle(i));
        const anchor = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
        const lines = splitLabel(label);
        const value = series[0].points[i]?.value;
        // 上側の軸は上に、下側の軸は下に積み、チャートと重ならないようにする。
        const blockH = lines.length * 20;
        const sin = Math.sin(angle(i));
        const offsetY = sin > 0.2 ? 6 : sin < -0.2 ? -blockH - 6 : -blockH / 2;
        return (
          <text
            key={label}
            x={p.x}
            y={p.y + offsetY}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={18}
            fill="#5C4033"
            fontWeight={600}
          >
            {lines.map((line, j) => (
              <tspan key={j} x={p.x} dy={j === 0 ? 0 : 20}>
                {line}
              </tspan>
            ))}
            {value !== undefined && (
              <tspan x={p.x} dy={20} fontSize={16} fill="#F067A6" fontWeight={700}>
                {value}
              </tspan>
            )}
          </text>
        );
      })}
    </svg>
  );
}
