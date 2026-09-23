"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconChartRadar,
  IconChevronDown,
  IconTrash,
  IconUserHeart,
} from "@tabler/icons-react";
import RadarChart, { type RadarSeries } from "@/components/RadarChart";
import {
  clearDiagnosisHistory,
  DIAGNOSIS_HISTORY_CHANGED_EVENT,
  getDiagnosisHistory,
  removeDiagnosisHistoryEntry,
  type DiagnosisHistoryEntry,
  type RadarPoint,
} from "@/lib/diagnosis-history";

type ChartKind = "parameters" | "distribution";

const CHART_LABELS: Record<ChartKind, string> = {
  parameters: "結果パラメータ",
  distribution: "回答の傾向",
};

const CURRENT_COLOR = "#F067A6";
const PREVIOUS_COLOR = "#8B5CF6";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function chartPoints(entry: DiagnosisHistoryEntry, kind: ChartKind): RadarPoint[] {
  const points = kind === "parameters" ? entry.parameters : entry.distribution;
  return points && points.length >= 3 ? points : [];
}

function sameAxes(a: RadarPoint[], b: RadarPoint[]): boolean {
  return a.length === b.length && a.every((p, i) => p.label === b[i].label);
}

/** 診断ごとの最新結果カード。 */
function DiagnosisGroupCard({ entries }: { entries: DiagnosisHistoryEntry[] }) {
  const latest = entries[0];
  const previous = entries[1];
  const kinds = (["parameters", "distribution"] as const).filter(
    (k) => chartPoints(latest, k).length > 0
  );
  const [kind, setKind] = useState<ChartKind | undefined>(kinds[0]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const series: RadarSeries[] = [];
  let max = 100;
  if (kind) {
    const current = chartPoints(latest, kind);
    series.push({ label: "今回", points: current, color: CURRENT_COLOR });
    // 同じ軸のときだけ前回の結果を重ねて比較する
    const prev = previous ? chartPoints(previous, kind) : [];
    if (prev.length > 0 && sameAxes(current, prev)) {
      series.push({ label: "前回", points: prev, color: PREVIOUS_COLOR, dashed: true });
    }
    if (kind === "distribution") {
      // 割合は100%に届きにくいので、最大値に合わせて見やすく拡大する
      const top = Math.max(...series.flatMap((s) => s.points.map((p) => p.value)));
      max = Math.min(100, Math.max(50, Math.ceil(top / 10) * 10));
    }
  }

  return (
    <article className="card overflow-hidden">
      <div className="flex items-start gap-3 p-4 sm:p-5">
        {latest.thumbnail && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-pink-pale sm:h-20 sm:w-20">
            <Image
              src={latest.thumbnail}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-text-sub">{latest.diagnosisTitle}</p>
          <h2 className="mt-0.5 text-lg font-bold leading-snug text-text-main">
            {latest.resultName}
          </h2>
          <p className="mt-1 text-xs text-text-sub">
            {formatDate(latest.savedAt)}
            {entries.length > 1 && (
              <span className="ml-2 rounded-full bg-pink-pale px-2 py-0.5 font-medium text-accent">
                {entries.length}回診断
              </span>
            )}
          </p>
        </div>
      </div>

      {latest.summary && (
        <p className="line-clamp-3 px-4 text-sm leading-relaxed text-text-sub sm:px-5">
          {latest.summary}
        </p>
      )}

      {kind && (
        <div className="mt-4 border-t border-pink-light/70 px-4 pb-2 pt-4 sm:px-5">
          {kinds.length > 1 && (
            <div className="mb-2 flex justify-center gap-1.5" role="tablist">
              {kinds.map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={kind === k}
                  onClick={() => setKind(k)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    kind === k
                      ? "bg-accent text-white"
                      : "bg-pink-pale text-text-sub hover:text-accent"
                  }`}
                >
                  {CHART_LABELS[k]}
                </button>
              ))}
            </div>
          )}
          {kinds.length === 1 && (
            <p className="mb-1 text-center text-xs font-medium text-text-sub">
              {CHART_LABELS[kind]}
            </p>
          )}
          <RadarChart
            series={series}
            max={max}
            ariaLabel={`${latest.diagnosisTitle}の${CHART_LABELS[kind]}`}
          />
          {kind === "distribution" && (
            <p className="text-center text-[11px] text-text-sub">
              各タイプに当てはまる回答をした割合（%）
            </p>
          )}
          {series.length > 1 && (
            <div className="mt-2 flex justify-center gap-4 text-xs text-text-sub">
              {series.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-1.5">
                  <span
                    className="inline-block h-0.5 w-4"
                    style={{
                      background: s.dashed
                        ? `repeating-linear-gradient(90deg, ${s.color} 0 4px, transparent 4px 7px)`
                        : s.color,
                    }}
                  />
                  {s.label}
                  {s.label === "前回" && previous ? `（${previous.resultName}）` : ""}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 p-4 sm:px-5">
        <Link
          href={latest.href}
          className="rounded-xl bg-accent px-3 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          結果を詳しく見る
        </Link>
        <Link
          href={`${latest.href.split("?")[0]}#start`}
          className="rounded-xl border border-accent px-3 py-2.5 text-center text-sm font-medium text-accent transition-colors hover:bg-pink-pale"
        >
          もう一度診断
        </Link>
      </div>

      <div className="border-t border-pink-light/70">
        <button
          type="button"
          onClick={() => setHistoryOpen((v) => !v)}
          aria-expanded={historyOpen}
          className="flex w-full items-center justify-between px-4 py-3 text-xs font-medium text-text-sub transition-colors hover:text-accent sm:px-5"
        >
          診断履歴（{entries.length}件）
          <IconChevronDown
            size={16}
            className={`transition-transform ${historyOpen ? "rotate-180" : ""}`}
          />
        </button>
        {historyOpen && (
          <ul className="list-none space-y-1 px-4 pb-4 sm:px-5">
            {entries.map((e) => (
              <li
                key={e.id}
                className="flex items-center gap-2 rounded-lg bg-pink-pale/60 px-3 py-2 text-sm"
              >
                <Link href={e.href} className="min-w-0 flex-1 hover:text-accent">
                  <span className="block truncate font-medium text-text-main">{e.resultName}</span>
                  <span className="text-[11px] text-text-sub">{formatDate(e.savedAt)}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => removeDiagnosisHistoryEntry(e.id)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-sub transition-colors hover:bg-white hover:text-accent"
                  aria-label={`${formatDate(e.savedAt)}の「${e.resultName}」を削除`}
                >
                  <IconTrash size={16} stroke={1.75} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function MyPageContent() {
  const [history, setHistory] = useState<DiagnosisHistoryEntry[] | null>(null);

  useEffect(() => {
    const sync = () => setHistory(getDiagnosisHistory());
    sync();
    window.addEventListener(DIAGNOSIS_HISTORY_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(DIAGNOSIS_HISTORY_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // 診断ごとにまとめる（最新の診断順）
  const groups = useMemo(() => {
    const map = new Map<string, DiagnosisHistoryEntry[]>();
    for (const entry of history ?? []) {
      const list = map.get(entry.diagnosisId);
      if (list) list.push(entry);
      else map.set(entry.diagnosisId, [entry]);
    }
    return Array.from(map.values());
  }, [history]);

  const handleClear = () => {
    if (window.confirm("保存されている診断結果をすべて削除します。よろしいですか？")) {
      clearDiagnosisHistory();
    }
  };

  return (
    <main className="mx-auto max-w-[680px] px-4 py-10 sm:py-14">
      <div className="mb-6">
        <p className="mb-1 text-xs font-bold tracking-widest text-accent">MY PAGE</p>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center text-accent">
            <IconUserHeart size={24} stroke={1.75} />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-text-main">マイページ</h1>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-text-sub">
          これまでの恋愛診断の結果をまとめて見返せます。ログインは不要で、結果はこのブラウザにだけ保存されます。
        </p>
      </div>

      {history === null ? (
        <div className="card h-40 animate-pulse bg-pink-pale/40" aria-hidden />
      ) : groups.length === 0 ? (
        <div className="card px-6 py-12 text-center">
          <IconChartRadar size={40} stroke={1.5} className="mx-auto text-accent" />
          <p className="mt-4 font-bold text-text-main">まだ診断結果がありません</p>
          <p className="mt-2 text-sm leading-relaxed text-text-sub">
            恋愛診断を最後まで回答すると、結果が自動でここに保存され、
            <br className="hidden sm:inline" />
            レーダーチャートで見返せるようになります。
          </p>
          <Link href="/love-diagnosis" className="btn-primary mx-auto mt-6 max-w-xs">
            恋愛診断を受けてみる
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="card px-4 py-3 text-center">
              <p className="text-xs text-text-sub">受けた診断</p>
              <p className="mt-0.5 text-2xl font-bold text-accent">
                {groups.length}
                <span className="ml-0.5 text-sm font-medium text-text-sub">種類</span>
              </p>
            </div>
            <div className="card px-4 py-3 text-center">
              <p className="text-xs text-text-sub">保存した結果</p>
              <p className="mt-0.5 text-2xl font-bold text-accent">
                {history.length}
                <span className="ml-0.5 text-sm font-medium text-text-sub">件</span>
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {groups.map((entries) => (
              <DiagnosisGroupCard
                // 最新の結果が変わったらチャートの選択状態をリセット
                key={`${entries[0].diagnosisId}-${entries[0].id}`}
                entries={entries}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="/love-diagnosis" className="btn-primary max-w-xs">
              ほかの恋愛診断も受けてみる
            </Link>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 text-xs text-text-sub underline-offset-2 hover:text-accent hover:underline"
            >
              <IconTrash size={14} stroke={1.75} />
              保存した結果をすべて削除
            </button>
          </div>
        </>
      )}
    </main>
  );
}
