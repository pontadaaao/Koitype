// ============================================================
// お気に入り記事（localStorage）
// ------------------------------------------------------------
// - ログイン不要。slug の配列を localStorage に保存。
// - SSR 安全（window 参照は関数内でガード）。
// - 変更時にカスタムイベントを発火し、ボタンと一覧を同期。
// - microCMS から記事が削除されても slug が残るだけで壊れない。
// ============================================================

const LS_KEY = "koitype_blog_favorites";
export const FAVORITES_CHANGED_EVENT = "koitype-blog-favorites-changed";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(slugs));
    window.dispatchEvent(new CustomEvent(FAVORITES_CHANGED_EVENT));
  } catch {
    // ストレージ不可（プライベートモード等）でも致命的にしない
  }
}

/** お気に入り slug の一覧を取得。 */
export function getFavorites(): string[] {
  return read();
}

/** 指定 slug がお気に入りか。 */
export function isFavorite(slug: string): boolean {
  return read().includes(slug);
}

/** お気に入りを切り替え、切替後の状態(true=登録)を返す。 */
export function toggleFavorite(slug: string): boolean {
  const current = read();
  const exists = current.includes(slug);
  const next = exists
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  write(next);
  return !exists;
}
