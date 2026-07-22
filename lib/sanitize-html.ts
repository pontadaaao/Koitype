// ============================================================
// 記事本文HTMLのサニタイズ（XSS対策）
// ------------------------------------------------------------
// microCMS の本文はサイト運営者が入力する信頼済みコンテンツだが、
// 多層防御として dangerouslySetInnerHTML で描画する前に危険な要素を除去する。
// - <script> / <style> / <iframe> / <object> 等のタグを除去
// - on* イベントハンドラ属性を除去
// - href/src の javascript: 等の危険スキームを無効化
// 依存ライブラリを追加せず、サーバー側で正規表現ベースで処理する。
// ============================================================

const DANGEROUS_TAGS = [
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "form",
  "input",
  "button",
  "textarea",
  "link",
  "meta",
  "base",
];

/** 危険なタグ（開始〜終了、内容ごと）を除去。 */
function stripDangerousTags(html: string): string {
  let out = html;
  for (const tag of DANGEROUS_TAGS) {
    const paired = new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
    out = out.replace(paired, "");
    const single = new RegExp(`<\\/?${tag}\\b[^>]*>`, "gi");
    out = out.replace(single, "");
  }
  return out;
}

/** on〜 イベントハンドラ属性を除去（onclick, onerror など）。 */
function stripEventHandlers(html: string): string {
  return html
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "");
}

/** href / src の危険スキーム（javascript:, vbscript:, data:text/html）を無効化。 */
function neutralizeDangerousUrls(html: string): string {
  return html.replace(
    /\s(href|src|xlink:href)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi,
    (match, attr, _raw, dq, sq, uq) => {
      const value = (dq ?? sq ?? uq ?? "").trim();
      // 空白・制御文字を除去してからスキーム判定（java\tscript: 等の回避対策）
      const scheme = value.replace(/\s+/g, "").toLowerCase();
      if (
        scheme.startsWith("javascript:") ||
        scheme.startsWith("vbscript:") ||
        scheme.startsWith("data:text/html")
      ) {
        return ` ${attr}="#"`;
      }
      return match;
    }
  );
}

/**
 * 本文中の絵文字を「表示させない」ための正規化。
 * - 丸数字（①〜⑳）→ アクセントカラーの番号バッジ（.num-badge）でアイコン化
 * - 顔文字・ピクトグラム・記号系絵文字・異体字セレクタ → 除去
 * 通常の矢印（→ 等）や一般記号はそのまま残す。
 * ※ 絵文字・丸数字はタグ/属性内には現れないため、HTML文字列への一括置換で安全。
 */
function normalizeEmoji(html: string): string {
  // 丸数字 ①(U+2460)〜⑳(U+2473) → 番号バッジ
  let out = html.replace(/[①-⑳]/g, (ch) => {
    const n = ch.charCodeAt(0) - 0x2460 + 1;
    return `<span class="num-badge" aria-hidden="true">${n}</span>`;
  });
  // 絵文字を除去。矢印（→ 等, U+2190-21FF）や一般記号は保持。
  // - サロゲートペア: 追加面の絵文字（U+1F000〜, 国旗記号を含む）
  // - BMP: 記号・装飾記号・異体字セレクタ・囲みキーキャップ結合子
  out = out.replace(
    /[\uD83C-\uD83E][\uDC00-\uDFFF]|[☀-➿⬀-⯿️⃣]/g,
    ""
  );
  return out;
}

/** 記事本文HTMLをサニタイズして返す。 */
export function sanitizeArticleHtml(html: string): string {
  if (!html) return "";
  let out = stripDangerousTags(html);
  out = stripEventHandlers(out);
  out = neutralizeDangerousUrls(out);
  out = normalizeEmoji(out);
  return out;
}

// ---- 目次（見出し）関連 ----------------------------------------------------

export interface Heading {
  id: string;
  text: string;
  level: number; // 2 or 3
}

/** 本文HTMLから h2/h3 見出しを抽出。id は重複しない連番。 */
export function extractHeadings(html: string): Heading[] {
  const regex = /<h([23])\b[^>]*>([\s\S]*?)<\/h[23]>/gi;
  const results: Heading[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, "").trim();
    if (!text) continue;
    results.push({ id: `heading-${i++}`, text, level: parseInt(m[1], 10) });
  }
  return results;
}

/** h2/h3 見出しに重複しない id を付与（抽出と同じ順序・採番）。 */
export function injectHeadingIds(html: string): string {
  let i = 0;
  return html.replace(
    /<h([23])\b([^>]*)>([\s\S]*?)<\/h[23]>/gi,
    (_match, level, attrs, content) => {
      const text = content.replace(/<[^>]+>/g, "").trim();
      if (!text) return `<h${level}${attrs}>${content}</h${level}>`;
      const cleanedAttrs = String(attrs).replace(
        /\sid\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
        ""
      );
      const id = `heading-${i++}`;
      return `<h${level}${cleanedAttrs} id="${id}">${content}</h${level}>`;
    }
  );
}
