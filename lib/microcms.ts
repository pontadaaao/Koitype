// ============================================================
// microCMS 連携（恋愛ブログ）共通処理
// ------------------------------------------------------------
// - サービスドメイン / API キーは環境変数から取得
//   MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY
// - 取得失敗・未設定でもサイトが壊れないよう、常に安全な値を返す
// - 記事本文(HTML)は表示前にサニタイズする（lib/sanitize-html.ts）
// ============================================================

import { sanitizeArticleHtml } from "@/lib/sanitize-html";

// ---- 環境変数 --------------------------------------------------------------

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

// microCMS の API 名（エンドポイント）。既定は "blog"。
const ENDPOINT = process.env.MICROCMS_BLOG_ENDPOINT ?? "blog";

/** microCMS が利用可能かどうか（環境変数が揃っているか）。 */
export function isMicroCmsConfigured(): boolean {
  return Boolean(SERVICE_DOMAIN && API_KEY);
}

// ---- カテゴリー定義 --------------------------------------------------------

/** URL 用のカテゴリースラッグ。 */
export type BlogCategorySlug = "column" | "blog";

export const BLOG_CATEGORY_SLUGS: BlogCategorySlug[] = ["column", "blog"];

/** カテゴリースラッグ → 日本語表示名。 */
export const BLOG_CATEGORY_LABEL: Record<BlogCategorySlug, string> = {
  column: "恋愛コラム",
  blog: "恋愛ブログ",
};

/** 日本語表示名 → スラッグ（正規化用）。 */
const LABEL_TO_SLUG: Record<string, BlogCategorySlug> = {
  恋愛コラム: "column",
  コラム: "column",
  column: "column",
  恋愛ブログ: "blog",
  ブログ: "blog",
  blog: "blog",
};

/**
 * microCMS の category フィールドは環境により
 * 文字列 / 配列 / 参照オブジェクトのいずれにもなり得るため、
 * それらを吸収してスラッグに正規化する。設定なしの場合は null。
 */
export function normalizeCategory(raw: unknown): BlogCategorySlug | null {
  if (!raw) return null;

  let value: unknown = raw;
  if (Array.isArray(value)) value = value[0];
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    value = obj.name ?? obj.label ?? obj.value ?? obj.id ?? obj.fieldId;
  }
  if (typeof value !== "string") return null;

  const key = value.trim();
  if (key in LABEL_TO_SLUG) return LABEL_TO_SLUG[key];
  return null;
}

/** スラッグを表示名へ。未設定カテゴリーは「恋愛ブログ」を既定表示にする。 */
export function categoryLabel(slug: BlogCategorySlug | null): string {
  if (!slug) return BLOG_CATEGORY_LABEL.blog;
  return BLOG_CATEGORY_LABEL[slug];
}

/**
 * category フィールドから表示用の名前を取り出す（例: "実際の体験談"）。
 * 参照オブジェクト / 文字列 / 配列いずれにも対応。無ければ null。
 */
export function extractCategoryName(raw: unknown): string | null {
  if (!raw) return null;
  let value: unknown = raw;
  if (Array.isArray(value)) value = value[0];
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const v = obj.name ?? obj.label ?? obj.value;
    return typeof v === "string" && v.trim() ? v.trim() : null;
  }
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

// ---- 型定義 ----------------------------------------------------------------

/** microCMS の画像フィールド。 */
export interface MicroCmsImage {
  url: string;
  width?: number;
  height?: number;
}

/** microCMS から取得する生データ（フィールドは任意）。 */
interface RawBlogArticle {
  id: string;
  slug?: string;
  title?: string;
  eyecatch?: MicroCmsImage | null;
  category?: unknown;
  content?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: unknown;
  // 「おすすめ」判定用（microCMS のフィールド名は環境により異なるため複数受ける）
  recommended?: unknown;
  featured?: unknown;
  osusume?: unknown;
  pickup?: unknown;
  publishedAt?: string;
  revisedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** サイト側で扱う正規化済みの記事データ。 */
export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  eyecatch: MicroCmsImage | null;
  categorySlug: BlogCategorySlug | null;
  categoryLabel: string;
  /** 生の本文HTML（未サニタイズ）。表示には sanitizedContent を使う。 */
  contentHtml: string;
  excerpt: string;
  metaTitle: string | null;
  metaDescription: string | null;
  tags: string[];
  /** microCMS で「おすすめ」指定された記事か。 */
  recommended: boolean;
  publishedAt: string;
  revisedAt: string | null;
  readingMinutes: number;
}

interface MicroCmsListResponse {
  contents: RawBlogArticle[];
  totalCount: number;
  offset: number;
  limit: number;
}

// ---- ユーティリティ --------------------------------------------------------

/** HTML タグ・空白を除去してプレーンテキスト化。 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** 読了時間（分）。日本語は約500文字/分で概算。最低1分。 */
export function estimateReadingMinutes(html: string): number {
  const text = stripHtml(html);
  const chars = text.length;
  return Math.max(1, Math.ceil(chars / 500));
}

/** 抜粋を決定。excerpt があれば優先、無ければ本文から抽出。 */
function resolveExcerpt(raw: RawBlogArticle, fallbackLen = 120): string {
  const explicit = raw.excerpt?.trim();
  if (explicit) return explicit;
  const text = stripHtml(raw.content ?? "");
  if (!text) return "";
  return text.length > fallbackLen ? `${text.slice(0, fallbackLen)}…` : text;
}

/** tags フィールドを文字列配列へ正規化（文字列/配列/参照を吸収）。 */
function normalizeTags(raw: unknown): string[] {
  if (!raw) return [];
  const arr = Array.isArray(raw) ? raw : [raw];
  const out: string[] = [];
  for (const item of arr) {
    if (typeof item === "string") {
      const v = item.trim();
      if (v) out.push(v);
    } else if (item && typeof item === "object") {
      const obj = item as Record<string, unknown>;
      const v = obj.name ?? obj.label ?? obj.value ?? obj.tag;
      if (typeof v === "string" && v.trim()) out.push(v.trim());
    }
  }
  return out;
}

// 「おすすめ」を表しうるフィールド名（microCMS のブール/セレクト等）。
const RECOMMEND_FIELD_KEYS = [
  "recommended",
  "featured",
  "osusume",
  "pickup",
] as const;
// タグで「おすすめ」を表す場合の判定パターン。
const RECOMMEND_TAG_RE = /^(おすすめ(記事)?|オススメ(記事)?|recommend(ed)?|featured|pick[\s-]?up)$/i;

/** 任意の値が「おすすめ ON」を意味するか（真偽値/文字列/配列/参照を吸収）。 */
function isTruthyFlag(v: unknown): boolean {
  if (v === true) return true;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "true" || s === "yes" || s === "on" || s === "1") return true;
    if (v.includes("おすすめ") || v.includes("オススメ")) return true;
    if (s === "recommended" || s === "featured" || s === "pickup") return true;
    return false;
  }
  if (Array.isArray(v)) return v.some(isTruthyFlag);
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    return isTruthyFlag(o.name ?? o.label ?? o.value ?? o.id);
  }
  return false;
}

/** microCMS で「おすすめ」指定されているか（専用フィールド or タグ）。 */
function detectRecommended(raw: RawBlogArticle, tags: string[]): boolean {
  const rec = raw as unknown as Record<string, unknown>;
  for (const key of RECOMMEND_FIELD_KEYS) {
    if (key in rec && isTruthyFlag(rec[key])) {
      return true;
    }
  }
  return tags.some((t) => RECOMMEND_TAG_RE.test(t.trim()));
}

/** 生データを正規化。slug が無いものは id をフォールバックに使う。 */
function normalizeArticle(raw: RawBlogArticle): BlogArticle {
  // microCMS の記事はすべて「恋愛ブログ」カテゴリに属する。
  // ただし category に "恋愛コラム" 等が明示されていればそちらを優先。
  const knownSlug = normalizeCategory(raw.category);
  const categorySlug: BlogCategorySlug = knownSlug ?? "blog";
  const contentHtml = raw.content ?? "";

  // 参照カテゴリの名前（例: "実際の体験談"）はタグとして保持（検索・関連記事に活用）
  const baseTags = normalizeTags(raw.tags);
  const catName = extractCategoryName(raw.category);
  const tags =
    catName && !(catName in LABEL_TO_SLUG) && !baseTags.includes(catName)
      ? [catName, ...baseTags]
      : baseTags;

  return {
    id: raw.id,
    slug: (raw.slug && raw.slug.trim()) || raw.id,
    title: raw.title?.trim() || "無題の記事",
    eyecatch: raw.eyecatch && raw.eyecatch.url ? raw.eyecatch : null,
    categorySlug,
    categoryLabel: categoryLabel(categorySlug),
    contentHtml,
    excerpt: resolveExcerpt(raw),
    metaTitle: raw.metaTitle?.trim() || null,
    metaDescription: raw.metaDescription?.trim() || null,
    tags,
    recommended: detectRecommended(raw, tags),
    publishedAt: raw.publishedAt || raw.createdAt || new Date(0).toISOString(),
    revisedAt: raw.revisedAt || raw.updatedAt || null,
    readingMinutes: estimateReadingMinutes(contentHtml),
  };
}

/** 表示用にサニタイズ済み本文を返す。 */
export function getSanitizedContent(article: BlogArticle): string {
  return sanitizeArticleHtml(article.contentHtml);
}

// ---- microCMS フェッチ -----------------------------------------------------

interface FetchParams {
  [key: string]: string | number | undefined;
}

/** microCMS API を叩く共通関数。失敗時は null を返す（呼び出し側で処理）。 */
async function microcmsFetch(
  params: FetchParams = {},
  revalidate = 60
): Promise<MicroCmsListResponse | null> {
  if (!isMicroCmsConfigured()) return null;

  const url = new URL(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${ENDPOINT}`
  );
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }

  try {
    const res = await fetch(url.toString(), {
      headers: { "X-MICROCMS-API-KEY": API_KEY as string },
      next: { revalidate },
    });
    if (!res.ok) {
      console.error(`microCMS fetch failed: ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as MicroCmsListResponse;
  } catch (err) {
    console.error("microCMS fetch error:", err);
    return null;
  }
}

/**
 * 全記事を公開日の新しい順で取得（最大 limit 件）。
 * 記事数が少ない前提でフロント側フィルタ/検索に利用する。
 * 取得失敗時は空配列を返す（サイトは壊れない）。
 */
export async function getAllArticles(limit = 100): Promise<BlogArticle[]> {
  const res = await microcmsFetch({ limit, orders: "-publishedAt" });
  if (!res || !Array.isArray(res.contents)) return [];
  return res.contents.map(normalizeArticle);
}

/** slug で1記事を取得。存在しなければ null。 */
export async function getArticleBySlug(
  slug: string
): Promise<BlogArticle | null> {
  if (!slug) return null;

  // slug フィールドで検索。カスタムフィールドのため filters を使用。
  const res = await microcmsFetch({
    filters: `slug[equals]${slug}`,
    limit: 1,
  });

  if (res && Array.isArray(res.contents) && res.contents.length > 0) {
    return normalizeArticle(res.contents[0]);
  }

  // slug フィールド未使用で、コンテンツ ID が slug の場合のフォールバック。
  const byId = await microcmsFetch({ ids: slug, limit: 1 });
  if (byId && Array.isArray(byId.contents) && byId.contents.length > 0) {
    return normalizeArticle(byId.contents[0]);
  }

  return null;
}

/** 指定カテゴリーの記事のみ取得。 */
export async function getArticlesByCategory(
  slug: BlogCategorySlug
): Promise<BlogArticle[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.categorySlug === slug);
}

/** クライアント用の軽量カードデータへ変換（本文HTMLを除外）。 */
export function toCardData(a: BlogArticle) {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    eyecatchUrl: a.eyecatch?.url ?? null,
    eyecatchWidth: a.eyecatch?.width ?? null,
    eyecatchHeight: a.eyecatch?.height ?? null,
    categorySlug: a.categorySlug,
    categoryLabel: a.categoryLabel,
    tags: a.tags,
    recommended: a.recommended,
    publishedAt: a.publishedAt,
    readingMinutes: a.readingMinutes,
  };
}

/** sitemap 用に全 slug と更新日を取得。 */
export async function getAllArticleSlugs(): Promise<
  { slug: string; revisedAt: string | null; publishedAt: string }[]
> {
  const all = await getAllArticles();
  return all.map((a) => ({
    slug: a.slug,
    revisedAt: a.revisedAt,
    publishedAt: a.publishedAt,
  }));
}
