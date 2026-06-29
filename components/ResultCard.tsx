"use client";

import { useEffect, useRef } from "react";
import type { DiagnosisResult } from "@/lib/types";
import { useLanguage } from "@/components/LanguageProvider";

interface ResultCardProps {
  result: DiagnosisResult;
}

// ---- SVG helpers ----

function HeartSVG({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CheckSVG() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ---- Wave transitions ----
// Each wave is placed at the bottom of a section, filling downward with the next section's color.

function WaveDown({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 1080 80" preserveAspectRatio="none" className="block h-14 w-full sm:h-16 -mb-px" aria-hidden>
      <path d="M0 50 C180 5 360 75 540 40 C720 8 900 65 1080 35 L1080 80 L0 80Z" fill={fill} />
    </svg>
  );
}


// ---- Score color helper ----

function scoreColor(score: string): string {
  const first = score.trimStart()[0];
  if (first === "♡" || first === "♥") return "#F067A6";
  if (first === "△" || first === "▲") return "#FF8C42";
  if (first === "×" || first === "✗" || first === "✕") return "#4A9FD4";
  return "#5C4033";
}

// ---- Medal icon ----

function MedalIcon({ rank }: { rank: number }) {
  const CONFIGS: Record<number, string> = { 1: "#F5C418", 2: "#A8A9AD", 3: "#C47A3A" };
  const color = CONFIGS[rank];

  if (!color) {
    return (
      <svg viewBox="0 0 52 56" className="h-[52px] w-[52px] shrink-0" aria-label={`${rank}位`}>
        {/* Water drop shape */}
        <path d="M26 4 C26 4 7 26 7 37 C7 47.5 15.5 52 26 52 C36.5 52 45 47.5 45 37 C45 26 26 4 26 4Z" fill="#4A9FD4" />
        {/* Number */}
        <text x="26" y="44" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">
          {rank}
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 52 50" className="h-[52px] w-[52px] shrink-0" aria-label={`${rank}位`}>
      {/* Peak dots */}
      <circle cx="11" cy="11" r="3.5" fill={color} />
      <circle cx="26" cy="5"  r="3.5" fill={color} />
      <circle cx="41" cy="11" r="3.5" fill={color} />
      {/* Crown peaks */}
      <polygon points="4,34 11,11 20,26 26,5 32,26 41,11 48,34" fill={color} />
      {/* Crown base band */}
      <rect x="4" y="32" width="44" height="16" rx="4" fill={color} />
      {/* Number */}
      <text x="26" y="45" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">
        {rank}
      </text>
    </svg>
  );
}

// ---- Section heading ----

function SectionHead({
  en,
  ja,
  color = "blue",
  colorHex,
}: {
  en: string;
  ja: string;
  color?: "blue" | "pink" | "white";
  colorHex?: string;
}) {
  const colorClass =
    colorHex ? "" :
    color === "white"
      ? "text-white"
      : color === "pink"
        ? "text-result-pink"
        : "text-result-blue";

  return (
    <div className={`mb-7 text-center ${colorClass}`} style={colorHex ? { color: colorHex } : undefined}>
      <span className="block font-cormorant text-sm italic tracking-[.18em] opacity-80">{en}</span>
      <span className="mt-1 block font-heading text-xl font-bold tracking-wide sm:text-2xl">
        {ja}
      </span>
      <div className="mt-2.5 flex items-center justify-center gap-2">
        <span className="h-px w-8 rounded-full bg-current opacity-40" />
        <HeartSVG />
        <span className="h-px w-8 rounded-full bg-current opacity-40" />
      </div>
    </div>
  );
}

// ---- Parameter bars with scroll-triggered animation ----

function ParameterBars({ parameters }: { parameters: Array<{ label: string; value: number }> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const fills = Array.from(container.querySelectorAll<HTMLDivElement>("[data-v]"));
    const observers: IntersectionObserver[] = [];
    fills.forEach((el) => {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.width = `${el.dataset.v}%`;
            io.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [parameters]);

  return (
    <div ref={containerRef} className="mx-auto max-w-lg space-y-5">
      {parameters.map((p) => (
        <div key={p.label}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-sm font-bold sm:text-base" style={{ color: "#5C4033" }}>{p.label}</span>
            <em className="font-cormorant text-2xl font-semibold not-italic text-result-pink">
              {p.value}
            </em>
          </div>
          <div
            className="relative h-3.5 rounded-full bg-pink-light"
            style={{ boxShadow: "inset 0 1px 3px rgba(255,92,147,.2)" }}
          >
            <div
              data-v={p.value}
              className="relative h-full w-0 rounded-full bg-result-pink"
              style={{ transition: "width 1.4s cubic-bezier(.22,1,.36,1)" }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 drop-shadow-sm">
                <HeartSVG className="h-8 w-8 text-purple-500" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Main component ----

export default function ResultCard({ result }: ResultCardProps) {
  const { t } = useLanguage();

  const hasDetail = Boolean(result.detail);
  const hasParameters = (result.parameters?.length ?? 0) > 0;
  const hasAru = (result.aru?.length ?? 0) > 0;
  const hasCompat = (result.compat?.length ?? 0) > 0;
  const hasManual = (result.manual?.length ?? 0) > 0;
  const hasPrescription = Boolean(result.prescription ?? result.advice);


  return (
    <div className="-mx-4 sm:mx-0">

      {/* ===== TOP ===== */}
      <section className="bg-gradient-to-b from-white to-pink-pale text-center">
        <div className="px-6 pb-12 pt-14 sm:px-8">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 shrink-0 rounded-full" style={{ backgroundColor: "#F067A6" }} />
            <span className="rounded-full px-5 py-1.5 text-xs font-bold tracking-[.3em]" style={{ backgroundColor: "#F067A6", color: "#ffffff" }}>
              {result.resultLabel ?? t.result.yourLoveType}
            </span>
            <span className="h-px w-10 shrink-0 rounded-full" style={{ backgroundColor: "#F067A6" }} />
          </div>

          {result.color ? (
            <>
              <div
                className="mx-auto mb-6 h-36 w-36 rounded-full sm:h-40 sm:w-40"
                style={{
                  backgroundColor: result.color,
                  boxShadow: `0 0 0 10px ${result.color}22, 0 8px 40px ${result.color}55`,
                }}
              />
              <h1
                className="font-heading font-black leading-tight"
                style={{
                  fontSize: "clamp(20px, 4.5vw, 32px)",
                  color: "white",
                  WebkitTextStroke: `5px ${result.color}`,
                  paintOrder: "stroke fill",
                }}
              >
                {result.name}
              </h1>
            </>
          ) : (
            <h1
              className="font-heading font-black leading-tight"
              style={{
                fontSize: "clamp(22px, 5vw, 34px)",
                color: "white",
                WebkitTextStroke: "5px #F067A6",
                paintOrder: "stroke fill",
              }}
            >
              {result.name}
            </h1>
          )}

        </div>
        <WaveDown fill="#00B7CE" />
      </section>

      {/* ===== 特徴 ===== */}
      <section style={{ background: "#00B7CE" }} className="text-center">
        <div className="px-6 py-12 sm:px-8 sm:py-14">
          <SectionHead en="Personality" ja={t.result.traits} color="white" />
          <p className="mx-auto max-w-lg text-base font-medium leading-loose text-white sm:text-lg">
            {result.desc}
          </p>
        </div>
        <WaveDown fill={hasDetail ? "#F067A6" : hasParameters ? "#fff5f8" : "#ffffff"} />
      </section>

      {/* ===== 恋愛 (optional) ===== */}
      {hasDetail && result.detail && (
        <section style={{ background: "#F067A6" }} className="text-center">
          <div className="px-6 py-12 sm:px-8 sm:py-14">
            <SectionHead
              en="In Love"
              ja={result.detailTitle ?? t.result.defaultDetailTitle}
              color="white"
            />
            <p className="mx-auto max-w-lg text-base font-medium leading-loose text-white sm:text-lg">
              {result.detail}
            </p>
          </div>
          <WaveDown fill={hasParameters ? "#fff5f8" : "#ffffff"} />
        </section>
      )}

      {/* ===== ラブパラメーター (optional) ===== */}
      {hasParameters && result.parameters && (
        <section style={{ backgroundColor: "#fff5f8" }}>
          <div className="px-6 py-12 sm:px-8 sm:py-14">
            <SectionHead en="Love Parameters" ja="ラブパラメーター" color="pink" />
            <ParameterBars parameters={result.parameters} />
          </div>
          <WaveDown fill="#ffffff" />
        </section>
      )}

      {/* ===== キーワード ===== */}
      <section className="bg-white text-center">
        <div className="px-6 py-12 sm:px-8 sm:py-14">
          <SectionHead en="Keywords" ja={t.result.loveTendency} colorHex="#9b6fd4" />
          <div className="flex flex-wrap justify-center gap-3">
            {result.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border-2 border-pink-light bg-pink-pale px-4 py-2 text-sm font-bold text-accent"
                style={{ boxShadow: "0 4px 0 #ffd6e7" }}
              >
                <span className="opacity-60">#</span>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <WaveDown fill={hasAru ? "#fff0f5" : hasCompat ? "#e0f7fa" : hasManual ? "#f3eefe" : hasPrescription ? "#F067A6" : "#ffffff"} />
      </section>

      {/* ===== あるある (optional) ===== */}
      {hasAru && result.aru && (
        <section style={{ background: "linear-gradient(to bottom, #fff0f5, #fff8fb)" }}>
          <div className="px-6 py-12 sm:px-8 sm:py-14">
            <SectionHead en="You Know It" ja="あるある" color="pink" />
            <div className="mx-auto max-w-lg space-y-3">
              {result.aru.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 sm:p-5"
                  style={{
                    boxShadow:
                      "0 5px 0 rgba(0,0,0,.04), 0 14px 22px -14px rgba(255,92,147,.45)",
                  }}
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: "#F067A6" }}>
                    <CheckSVG />
                  </div>
                  <p className="text-sm font-medium leading-relaxed sm:text-base" style={{ color: "#5C4033" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <WaveDown fill={hasCompat ? "#e0f7fa" : hasManual ? "#f3eefe" : hasPrescription ? "#F067A6" : "#ffffff"} />
        </section>
      )}

      {/* ===== 相性ランキング (optional) ===== */}
      {hasCompat && result.compat && (
        <section style={{ background: "linear-gradient(to bottom, #e0f7fa, #f0fbfd)" }}>
          <div className="px-6 py-12 sm:px-8 sm:py-14">
            <SectionHead en="Compatibility" ja="相性ランキング" color="blue" />
            <div className="mx-auto max-w-lg space-y-3">
              {result.compat.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl border-2 border-cyan-50 bg-white p-4 sm:p-5"
                  style={{ boxShadow: "0 10px 22px -16px rgba(0,183,206,.45)" }}
                >
                  <MedalIcon rank={i + 1} />
                  <div className="flex-1 min-w-0">
                    <b className="block text-sm font-black sm:text-base" style={{ color: "#5C4033" }}>
                      {item.name}
                    </b>
                    <small className="mt-1 block text-xs leading-relaxed sm:text-sm" style={{ color: "#5C4033" }}>
                      {item.desc}
                    </small>
                  </div>
                  <span className="shrink-0 font-cormorant text-sm font-semibold sm:text-base" style={{ color: scoreColor(item.score) }}>
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <WaveDown fill={hasManual ? "#f3eefe" : hasPrescription ? "#F067A6" : "#ffffff"} />
        </section>
      )}

      {/* ===== 愛のトリセツ (optional) ===== */}
      {hasManual && result.manual && (
        <section style={{ background: "linear-gradient(to bottom, #f3eefe, #faf7ff)" }}>
          <div className="px-6 py-12 sm:px-8 sm:py-14">
            <SectionHead en="User's Manual" ja="愛のトリセツ" colorHex="#9b6fd4" />
            <div className="mx-auto max-w-lg space-y-3">
              {result.manual.map((item, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl bg-white py-4 pl-14 pr-4 sm:pl-16 sm:pr-5"
                  style={{ boxShadow: "0 8px 18px -13px rgba(0,183,206,.55)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute left-3 top-1/2 h-9 w-9 -translate-y-1/2"
                    aria-hidden
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#F067A6" />
                    <text x="12" y="11" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="8" fontWeight="bold">
                      {i + 1}
                    </text>
                  </svg>
                  <b className="block text-sm font-black sm:text-base" style={{ color: "#F067A6" }}>
                    {item.title}
                  </b>
                  <p className="mt-1 text-xs leading-relaxed sm:text-sm" style={{ color: "#5C4033" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <WaveDown fill={hasPrescription ? "#F067A6" : "#ffffff"} />
        </section>
      )}

      {/* ===== 愛の処方箋 (optional) ===== */}
      {hasPrescription && (
        <section
          className="px-6 py-12 text-center sm:px-8 sm:py-14"
          style={{ background: "linear-gradient(160deg, #F067A6, #FF8FB8)" }}
        >
          <SectionHead en="Advice" ja="恋愛アドバイス" color="white" />
          <p className="mx-auto max-w-lg text-base font-medium leading-loose text-white sm:text-lg">
            {result.prescription ?? result.advice}
          </p>
        </section>
      )}
    </div>
  );
}
