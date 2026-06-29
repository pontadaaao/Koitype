// ライフパスナンバー：生年月日の全桁を一桁になるまで足す。
// ただし 11 / 22 / 33 はマスターナンバーとして残す。
export function lifePathNumber(
  year: number,
  month: number,
  day: number
): number {
  const sum = String(year) + String(month) + String(day);
  let n = sum.split("").reduce((a, c) => a + Number(c), 0);
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split("")
      .reduce((a, c) => a + Number(c), 0);
  }
  return n;
}

export const LIFE_PATH_DESC: Record<number, string> = {
  1: "リーダー気質・行動派",
  2: "協調的・サポート上手",
  3: "明るく社交的",
  4: "堅実・誠実",
  5: "自由奔放・好奇心旺盛",
  6: "愛情深い・面倒見がいい",
  7: "探究心・神秘的",
  8: "情熱的・現実的",
  9: "博愛・包容力",
  11: "直感的・感受性豊か",
  22: "大きな夢を持つ実現者",
  33: "無償の愛・癒し系",
};
