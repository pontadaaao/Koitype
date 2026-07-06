import type { DogLoverQuestion, DogLoverResult } from "./types";

export const DOG_LOVER_DIAGNOSIS_ID = "dog-lover";

export const questions: DogLoverQuestion[] = [
  {
    text: "好きな人から返信が来たら？",
    choices: [
      "すぐ返信する",
      "少し落ち着いて返す",
      "相手のペースに合わせる",
      "用件だけ返す",
    ],
  },
  {
    text: "デートの約束は？",
    choices: [
      "自分からどんどん誘う",
      "相手と半々くらい",
      "誘われたら行く",
      "あまり気にしない",
    ],
  },
  {
    text: "恋人が落ち込んでいたら？",
    choices: [
      "ずっとそばにいる",
      "話を聞く",
      "少し距離を置いて見守る",
      "元気になるまで待つ",
    ],
  },
  {
    text: "恋人と会えない日は？",
    choices: [
      "寂しくて連絡したくなる",
      "少し寂しい",
      "趣味を楽しむ",
      "あまり気にならない",
    ],
  },
  {
    text: "恋人が他の異性と仲良くしていたら？",
    choices: [
      "かなり嫉妬する",
      "少し気になる",
      "信じる",
      "全く気にならない",
    ],
  },
  {
    text: "恋愛で一番大切なのは？",
    choices: [
      "一緒にいる時間",
      "信頼",
      "自由",
      "刺激",
    ],
  },
  {
    text: "恋人に甘えるなら？",
    choices: [
      "いつでも甘えたい",
      "時々甘える",
      "甘えられる方が多い",
      "あまり甘えない",
    ],
  },
  {
    text: "好きな人を見つけたら？",
    choices: [
      "猛アプローチ",
      "少しずつ距離を縮める",
      "相手の様子を見る",
      "相手から来るのを待つ",
    ],
  },
];

export const results: DogLoverResult[] = [
  {
    id: "loyal-dog",
    name: "忠犬タイプ",
    title: "好きになったら一直線！",
    traits: [
      "恋人を最優先に考える",
      "愛情表現がとてもストレート",
      "一途で浮気をしにくい",
      "好きな人のためなら頑張れる",
      "寂しがり屋な一面も",
    ],
    partner: "猫系・ツンデレタイプ",
    advice: "相手にも一人の時間を作ってあげると、さらに長続きします。",
    tags: ["一途", "積極的", "愛情深い"],
  },
  {
    id: "sweet-dog",
    name: "甘えんぼ犬タイプ",
    title: "愛され上手な癒し系",
    traits: [
      "甘えるのも甘えられるのも好き",
      "連絡頻度は多め",
      "スキンシップ重視",
      "素直に好きと言える",
      "一緒にいるだけで安心感を与える",
    ],
    partner: "包容力のあるタイプ",
    advice: "相手に依存しすぎない距離感も大切です。",
    tags: ["甘えん坊", "癒し系", "スキンシップ重視"],
  },
  {
    id: "balance-dog",
    name: "バランス犬タイプ",
    title: "理想的な恋愛バランス",
    traits: [
      "尽くしすぎない",
      "放置もしない",
      "相手を尊重できる",
      "自然体で付き合える",
      "長続きしやすい恋愛をする",
    ],
    partner: "どのタイプとも相性◎",
    advice: "時には自分から甘えてみると、さらに距離が縮まります。",
    tags: ["バランス型", "安定", "自然体"],
  },
  {
    id: "wolf-dog",
    name: "オオカミ寄り犬タイプ",
    title: "自由も恋愛も大切",
    traits: [
      "自分の時間を大切にする",
      "ベタベタは苦手",
      "必要な時はしっかり支える",
      "精神的に自立している",
      "落ち着いた恋愛が得意",
    ],
    partner: "自立しているタイプ",
    advice: "たまには素直な愛情表現をすると、相手はもっと安心できます。",
    tags: ["自立系", "クール", "自由奔放"],
  },
];

// A=index 0 → 1pt, B=index 1 → 2pt, C=index 2 → 3pt, D=index 3 → 4pt
export function calculateScore(answers: number[]): number {
  return answers.reduce((sum, idx) => sum + (idx + 1), 0);
}

export function getResultByScore(score: number): DogLoverResult {
  if (score <= 12) return results[0];
  if (score <= 18) return results[1];
  if (score <= 24) return results[2];
  return results[3];
}

export function getResultById(id: string): DogLoverResult | undefined {
  return results.find((r) => r.id === id);
}

export function defaultScoreForResult(resultId: string): number {
  switch (resultId) {
    case "loyal-dog":   return 10;
    case "sweet-dog":   return 15;
    case "balance-dog": return 21;
    case "wolf-dog":    return 28;
    default:            return 20;
  }
}
