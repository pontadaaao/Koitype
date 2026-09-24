// ============================================================
// 恋愛診断の結果履歴（localStorage）
// ------------------------------------------------------------
// - ログイン不要。診断を最後まで回答した時点の結果をブラウザに保存し、
//   マイページ（/mypage）でまとめて見返せるようにする。
// - Cookie は容量(4KB)が小さくサーバーにも毎回送信されるため、
//   お気に入り記事と同じく localStorage を使う。
// - マイページ側で巨大な診断データを読み込まずに済むよう、表示に必要な
//   情報（タイトル・結果名・レーダーチャート用の値）をスナップショットで保存する。
// - SSR 安全（window 参照は関数内でガード）。
// ============================================================

const LS_KEY = "koitype_diagnosis_history";
export const DIAGNOSIS_HISTORY_CHANGED_EVENT = "koitype-diagnosis-history-changed";

/** 保存件数の上限（古いものから削除）。 */
const MAX_ENTRIES = 100;

export interface RadarPoint {
  label: string;
  /** 0〜100 */
  value: number;
}

export interface DiagnosisHistoryEntry {
  /** 保存ごとの一意ID */
  id: string;
  diagnosisId: string;
  diagnosisTitle: string;
  resultId: string;
  resultName: string;
  /** 結果の短い説明（任意） */
  summary?: string;
  /** 結果ページへのURL */
  href: string;
  thumbnail?: string;
  /** 結果パラメータ（0〜100）。レーダーチャートに使う。 */
  parameters?: RadarPoint[];
  /** 回答がどのタイプにどれだけ寄ったか（0〜100）。 */
  distribution?: RadarPoint[];
  /** ISO 8601 */
  savedAt: string;
}

export type NewDiagnosisHistoryEntry = Omit<DiagnosisHistoryEntry, "id" | "savedAt">;

function isEntry(v: unknown): v is DiagnosisHistoryEntry {
  if (!v || typeof v !== "object") return false;
  const e = v as Record<string, unknown>;
  return (
    typeof e.id === "string" &&
    typeof e.diagnosisId === "string" &&
    typeof e.diagnosisTitle === "string" &&
    typeof e.resultId === "string" &&
    typeof e.resultName === "string" &&
    typeof e.href === "string" &&
    typeof e.savedAt === "string"
  );
}

function read(): DiagnosisHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isEntry) : [];
  } catch {
    return [];
  }
}

function write(entries: DiagnosisHistoryEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(entries));
    window.dispatchEvent(new CustomEvent(DIAGNOSIS_HISTORY_CHANGED_EVENT));
  } catch {
    // ストレージ不可（プライベートモード等）でも致命的にしない
  }
}

/** 保存済みの診断結果を新しい順で取得。 */
export function getDiagnosisHistory(): DiagnosisHistoryEntry[] {
  return read().sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

/** 診断結果を保存する。 */
export function saveDiagnosisResult(entry: NewDiagnosisHistoryEntry): void {
  const now = new Date();
  const current = getDiagnosisHistory();
  // 最後の回答ボタンの連打などで同じ結果が二重に保存されるのを防ぐ
  const latest = current[0];
  if (
    latest &&
    latest.diagnosisId === entry.diagnosisId &&
    latest.resultId === entry.resultId &&
    now.getTime() - new Date(latest.savedAt).getTime() < 3000
  ) {
    return;
  }
  const next: DiagnosisHistoryEntry = {
    ...entry,
    id: `${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: now.toISOString(),
  };
  write([next, ...current].slice(0, MAX_ENTRIES));
}

/** 1件削除。 */
export function removeDiagnosisHistoryEntry(id: string): void {
  write(read().filter((e) => e.id !== id));
}

/** すべて削除。 */
export function clearDiagnosisHistory(): void {
  write([]);
}

/**
 * 回答（選択肢インデックス）を各タイプへの寄り具合（%）に変換する。
 * 選択肢インデックス i が labels[i] のタイプに1票入る診断向け。
 */
export function answersToDistribution(
  answers: number[],
  labels: string[]
): RadarPoint[] {
  const counts = labels.map(() => 0);
  answers.forEach((i) => {
    if (i >= 0 && i < counts.length) counts[i]++;
  });
  const total = answers.length || 1;
  return labels.map((label, i) => ({
    label,
    value: Math.round((counts[i] / total) * 100),
  }));
}
