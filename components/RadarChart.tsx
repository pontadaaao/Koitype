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

/** 長いラベルは1行6文字程度で、行の長さが揃うように折り返す。 */
const MAX_CHARS_PER_LINE = 6;
const MAX_LATIN_CHARS_PER_LINE = 11;
function splitLabel(label: string): string[] {
  // 英語などスペース区切りの言語は単語単位で折り返す
  if (/\s/.test(label.trim())) {
    const lines: string[] = [];
    for (const word of label.trim().split(/\s+/)) {
      const last = lines[lines.length - 1];
      if (last && last.length + 1 + word.length <= MAX_LATIN_CHARS_PER_LINE) {
        lines[lines.length - 1] = `${last} ${word}`;
      } else {
        lines.push(word);
      }
    }
    return lines;
  }
  const chars = Array.from(label);
  if (chars.length <= MAX_CHARS_PER_LINE) return [label];
  // 「情熱・ときめき」のような語は中黒の位置で区切る
  const dot = label.indexOf("・");
  if (dot > 0 && dot < label.length - 1) {
    const head = label.slice(0, dot + 1);
    const tail = label.slice(dot + 1);
    if (head.length <= MAX_CHARS_PER_LINE && tail.length <= MAX_CHARS_PER_LINE) {
      return [head, tail];
    }
  }
  const lineCount = Math.ceil(chars.length / MAX_CHARS_PER_LINE);
  const perLine = Math.ceil(chars.length / lineCount);
  const lines: string[] = [];
  for (let i = 0; i < chars.length; i += perLine) {
    lines.push(chars.slice(i, i + perLine).join(""));
  }
  return lines;
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

  // 軸ラベル分の余白を確保する（横書きラベルが長いので左右を広めに）。
  const padX = 124;
  const padY = 100;
  const viewW = size + padX * 2;
  const viewH = size + padY * 2;
  const cx = viewW / 2;
  const cy = viewH / 2;
  const r = size / 2 - 8;

  const angle = (i: number) => -Math.PI / 2 + (2 * Math.PI * i) / n;
  const pos = (i: number, ratio: number) => ({
    x: cx + Math.cos(angle(i)) * r * ratio,
    y: cy + Math.sin(angle(i)) * r * ratio,
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
      viewBox={`0 0 ${viewW} ${viewH}`}
      className="mx-auto block h-auto w-full max-w-[420px]"
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
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#FFD6EC" strokeWidth={1} />
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
        const blockH = lines.length * 23;
        const sin = Math.sin(angle(i));
        const offsetY = sin > 0.2 ? 6 : sin < -0.2 ? -blockH - 6 : -blockH / 2;
        return (
          <text
            key={label}
            x={p.x}
            y={p.y + offsetY}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={21}
            fill="#5C4033"
            fontWeight={600}
          >
            {lines.map((line, j) => (
              <tspan key={j} x={p.x} dy={j === 0 ? 0 : 23}>
                {line}
              </tspan>
            ))}
            {value !== undefined && (
              <tspan x={p.x} dy={23} fontSize={18} fill={series[0].color} fontWeight={700}>
                {value}
              </tspan>
            )}
          </text>
        );
      })}
    </svg>
  );
}
