// ============================================================
// 心理テストの「結果ごと」の深掘り解説
// ------------------------------------------------------------
// lib/love-tests.ts の結果データは2〜3文の説明と一言アドバイスだけで、
// 結果画面が薄くなっていた。ここでは結果（A〜D）ごとに、
// なぜそうなるのか・強み・気をつけたいこと・相手からの見え方・
// 今日からできることを書き下ろしている。共通テンプレートは使わない。
// ============================================================

export type LoveTestResultDetail = {
  /** その答えを選ぶ人の心の動きの深掘り。 */
  deepDive: string;
  /** このタイプの強み。 */
  strength: string;
  /** つまずきやすいところ。 */
  caution: string;
  /** 恋人・好きな人からどう見えているか。 */
  partnerView: string;
  /** 今日からできる具体的な行動。 */
  actions: string[];
};

export type LoveTestResultDetails = Partial<
  Record<"A" | "B" | "C" | "D", LoveTestResultDetail>
>;

/** データ記述を短くするためのヘルパー。 */
export function r(
  deepDive: string,
  strength: string,
  caution: string,
  partnerView: string,
  actions: string[],
): LoveTestResultDetail {
  return { deepDive, strength, caution, partnerView, actions };
}
