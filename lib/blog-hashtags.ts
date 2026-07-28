// ============================================================
// 恋愛ブログ ハッシュタグ自動付与
// ------------------------------------------------------------
// 記事のタイトル・本文・抜粋から内容に合ったハッシュタグを抽出し、
// 既存タグ（microCMS の tags / カテゴリ名など）にマージする。
// - 全記事（microCMS・静的コラム・今後の記事）へ自動で付与される
// - タグは既存のタグ一覧ページ(/blog/tag/[tag])でそのまま横断できる
// - microCMS 等で手動タグを付けた場合はそれも保持し併用する
//
// ルールは上から順に評価し、キーワードが1つでも本文に含まれれば付与。
// より汎用的・重要なものを上に置き、1記事あたり最大 MAX_DERIVED 個まで。
// ============================================================

import { stripHtml, type BlogArticle } from "@/lib/microcms";

/** 1記事に自動付与するハッシュタグの最大数。 */
const MAX_DERIVED = 5;

interface HashtagRule {
  /** 付与するハッシュタグ名（表示・URL に使われる）。 */
  tag: string;
  /** このいずれかが本文に含まれれば付与するキーワード。 */
  keywords: string[];
}

// 恋愛ブログのテーマに沿ったハッシュタグ辞書。
// 具体的・特徴的なトピックを上位に、汎用的なものを下位に配置する。
const HASHTAG_RULES: HashtagRule[] = [
  { tag: "マッチングアプリ", keywords: ["マッチングアプリ", "マッチング", "ペアーズ", "タップル", "with", "Tinder"] },
  { tag: "復縁", keywords: ["復縁", "よりを戻", "元カレ", "元カノ", "元彼", "元カ"] },
  { tag: "遠距離恋愛", keywords: ["遠距離"] },
  { tag: "婚活", keywords: ["婚活", "お見合い", "結婚相談所"] },
  { tag: "結婚", keywords: ["結婚", "プロポーズ", "入籍", "婚約", "結婚したい"] },
  { tag: "失恋", keywords: ["失恋", "振られ", "フラれ", "ふられ"] },
  { tag: "別れ", keywords: ["別れ", "破局", "別れたい", "別れる"] },
  { tag: "告白", keywords: ["告白", "コクる", "好きですと", "気持ちを伝え"] },
  { tag: "片思い", keywords: ["片思い", "片想い"] },
  { tag: "両思い", keywords: ["両思い", "両想い"] },
  { tag: "デート", keywords: ["デート", "初デート", "デートスポット"] },
  { tag: "LINE", keywords: ["LINE", "ライン", "既読", "未読", "メッセージ", "スタンプ"] },
  { tag: "脈あり", keywords: ["脈あり", "脈なし", "脈アリ", "脈ナシ", "脈"] },
  { tag: "駆け引き", keywords: ["駆け引き", "かけひき", "焦らし"] },
  { tag: "浮気", keywords: ["浮気", "不倫", "二股", "二又"] },
  { tag: "職場恋愛", keywords: ["職場恋愛", "社内恋愛", "職場の"] },
  { tag: "年の差", keywords: ["年の差", "年上", "年下"] },
  { tag: "同棲", keywords: ["同棲", "半同棲"] },
  { tag: "友達以上恋人未満", keywords: ["友達以上", "曖昧な関係", "セフレ", "友達から恋人"] },
  { tag: "自分磨き", keywords: ["自分磨き", "垢抜け", "あか抜け", "モテる方法"] },
  { tag: "モテ", keywords: ["モテ", "モテる", "モテたい"] },
  { tag: "恋愛心理", keywords: ["心理", "男性心理", "女性心理", "心理学"] },
  { tag: "初対面", keywords: ["初対面", "第一印象", "出会い"] },
  { tag: "カップル", keywords: ["カップル", "付き合う", "付き合い", "交際", "恋人"] },
  { tag: "好きな人", keywords: ["好きな人", "気になる人", "本命"] },
  { tag: "恋活", keywords: ["恋活", "彼氏がほしい", "彼女がほしい", "恋人がほしい"] },
];

/**
 * テキストから内容に合ったハッシュタグを抽出する（最大 max 個）。
 * text はタイトル・本文・抜粋などを連結したもの（プレーンテキスト想定）。
 */
export function deriveHashtags(text: string, max = MAX_DERIVED): string[] {
  if (!text) return [];
  const out: string[] = [];
  for (const rule of HASHTAG_RULES) {
    if (rule.keywords.some((k) => text.includes(k))) {
      out.push(rule.tag);
      if (out.length >= max) break;
    }
  }
  return out;
}

/**
 * 記事に内容ベースのハッシュタグを付与した新しい記事を返す。
 * 既存タグ（手動タグ・カテゴリ名）は保持し、重複は除外する。
 * 付与すべきタグが無ければ元の記事をそのまま返す。
 */
export function withHashtags(article: BlogArticle): BlogArticle {
  const haystack = `${article.title} ${article.excerpt} ${stripHtml(
    article.contentHtml
  )}`;
  const derived = deriveHashtags(haystack);
  if (derived.length === 0) return article;

  const merged = [...article.tags];
  for (const tag of derived) {
    if (!merged.includes(tag)) merged.push(tag);
  }
  if (merged.length === article.tags.length) return article;
  return { ...article, tags: merged };
}
