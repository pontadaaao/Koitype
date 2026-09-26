/**
 * 恋みくじのシェア用データ。
 * 本体のロジックは public/koi-mikuji/script.js（静的ページ）にあり、
 * ここはシェアページ /koi-mikuji/r/[fortune] と OG 画像で使う表示用の写し。
 * script.js の FORTUNES / RARE の key・no・lines・accent を変えたらここも揃える。
 * slug は script.js の各運勢の icon と同じ値。
 */
export type KoiMikujiFortune = {
  slug: string;
  key: string;
  no: string;
  lines: string[];
  accent: string;
  rare?: boolean;
};

export const KOI_MIKUJI_FORTUNES: KoiMikujiFortune[] = [
  { slug: "daikichi", key: "超大吉", no: "一", lines: ["今日、", "恋が動く日。"], accent: "#ff2e93" },
  { slug: "chukichi", key: "中吉", no: "七", lines: ["ゆっくり育つ", "恋の流れ。"], accent: "#ff7eb6" },
  { slug: "shokichi", key: "小吉", no: "十二", lines: ["実はモテ期の", "入口かも。"], accent: "#3fb6e6" },
  { slug: "suekichi", key: "末吉", no: "二十", lines: ["考えすぎ", "注意報。"], accent: "#b97bf0" },
  { slug: "kyo", key: "凶", no: "十五", lines: ["追いLINE、", "今日は我慢。"], accent: "#7f95c4" },
  { slug: "rare", key: "超激レア", no: "八十八", lines: ["運命の恋、", "接近中。"], accent: "#ff2e93", rare: true },
];

export function getKoiMikujiFortune(slug: string): KoiMikujiFortune | undefined {
  return KOI_MIKUJI_FORTUNES.find((f) => f.slug === slug);
}

/** 札の本文色（CSS の color-mix(accent 88%, #000) 相当） */
export function koiMikujiInk(accent: string): string {
  const n = parseInt(accent.slice(1), 16);
  const ch = (shift: number) => Math.round(((n >> shift) & 0xff) * 0.88);
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
}
