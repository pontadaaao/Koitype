// ============================================================
// 恋愛ブログ記事 → 診断/テスト の相互リンク（回遊の輪）
// ------------------------------------------------------------
// 記事のタグ（自動ハッシュタグ含む [[project_microcms_blog]]）と、
// 診断・心理テストのタイトル/説明/カテゴリの一致度でスコアリングし、
// 記事内容に合った診断を数件返す。サーバー専用（大きなデータを読むため）。
// ============================================================

import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";

export interface CrossLinkItem {
  href: string;
  title: string;
  description: string;
  thumbnail: string | null;
  kind: "diagnosis" | "test";
  /** マッチング用の検索対象文字列（タイトル+説明+カテゴリ等） */
  haystack: string;
  /** フォールバック時の優先度（人気診断を先に出す） */
  popular: boolean;
}

const CANDIDATES: CrossLinkItem[] = [
  ...diagnoses.map((d) => ({
    href: `/diagnosis/${d.id}?start=1`,
    title: d.title,
    description: d.description,
    thumbnail: d.thumbnail ?? null,
    kind: "diagnosis" as const,
    haystack: `${d.title} ${d.description} ${d.category} ${d.tag ?? ""}`,
    popular: Boolean(d.popular),
  })),
  ...loveTests.map((t) => ({
    href: `/tests/${t.slug}`,
    title: t.title,
    description: t.description,
    thumbnail: null,
    kind: "test" as const,
    haystack: `${t.title} ${t.description} ${t.category}`,
    popular: false,
  })),
];

// マッチが無いときのフォールバック（人気診断優先、無ければ先頭の診断）。
const FALLBACK: CrossLinkItem[] = (() => {
  const popular = CANDIDATES.filter((c) => c.kind === "diagnosis" && c.popular);
  const base = popular.length > 0 ? popular : CANDIDATES.filter((c) => c.kind === "diagnosis");
  return base;
})();

/**
 * 記事に合った診断/テストを n 件返す。
 * タグ（記事の自動ハッシュタグ）が候補の検索文字列に含まれる数でスコアリング。
 * 一致0なら人気診断でフォールバックし、必ず導線を作る。
 */
export function pickDiagnosesForArticle(
  tags: string[],
  title: string,
  n = 2
): CrossLinkItem[] {
  const text = `${title} ${tags.join(" ")}`;
  const scored = CANDIDATES.map((c) => {
    // 記事タグが候補に含まれる数 + 候補タイトル語が記事テキストに含まれる分
    const tagHits = tags.reduce(
      (acc, tag) => (tag && c.haystack.includes(tag) ? acc + 1 : acc),
      0
    );
    const titleHit = c.title && text.includes(c.title) ? 1 : 0;
    return { item: c, score: tagHits + titleHit };
  });
  scored.sort((a, b) => b.score - a.score);

  const picked = scored.slice(0, n);
  if (picked.every((s) => s.score === 0)) {
    return FALLBACK.slice(0, n);
  }
  return picked.map((s) => s.item);
}
