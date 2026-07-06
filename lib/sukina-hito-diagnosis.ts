export type SukinaHitoTypeId = "healing" | "protect" | "curious" | "chase";

export interface SukinaHitoQuestion {
  text: string;
  choices: [string, string, string, string];
}

export interface SukinaHitoResult {
  id: SukinaHitoTypeId;
  name: string;
  features: string[];
  honesty: string[];
  compat: string;
  compatId: SukinaHitoTypeId;
}

export const questions: SukinaHitoQuestion[] = [
  {
    text: "好きな人と目が合ったら？",
    choices: ["笑顔になる", "少し照れて目をそらす", "普通を装う", "気づかないふりをする"],
  },
  {
    text: "LINEの返信が遅いと…",
    choices: ["少し気になる", "めちゃくちゃ気になる", "あまり気にしない", "自分も返信を遅らせる"],
  },
  {
    text: "好きな人の前では？",
    choices: ["よく笑う", "緊張して静かになる", "いつも通り", "少し強がってしまう"],
  },
  {
    text: "デートするなら？",
    choices: ["カフェ", "水族館", "ドライブ", "遊園地"],
  },
  {
    text: "恋愛で一番大切なのは？",
    choices: ["安心感", "ドキドキ", "信頼", "一緒に笑えること"],
  },
  {
    text: "好きな人に褒められたら？",
    choices: ["素直に喜ぶ", "照れて否定する", "冗談で返す", "内心すごく嬉しい"],
  },
  {
    text: "あなたの第一印象は？",
    choices: ["明るい", "優しい", "落ち着いている", "ミステリアス"],
  },
  {
    text: "恋愛ではどちら？",
    choices: ["積極的", "相手次第", "慎重", "駆け引きする"],
  },
];

export const results: Record<SukinaHitoTypeId, SukinaHitoResult> = {
  healing: {
    id: "healing",
    name: "一緒にいると癒される人",
    features: [
      "「一緒にいると安心する」「自然体で話せる」と思われています",
      "あなたの笑顔や優しさは相手にとって特別な癒しになっています",
      "無理をしなくても、そのままのあなたが一番魅力的です",
      "相手はあなたといるときに、自然と心が和らぐのを感じています",
    ],
    honesty: ["もっと一緒にいたい。", "素の自分でいられる。"],
    compat: "守ってあげたくなる人",
    compatId: "protect",
  },
  protect: {
    id: "protect",
    name: "守ってあげたくなる人",
    features: [
      "照れたり恥ずかしがったりする姿がとても可愛く映っています",
      "好きな人は「もっと距離を縮めたい」「笑わせたい」と思っている可能性が高いです",
      "ちょっとした仕草や表情が、相手の心を揺さぶっています",
      "あなたの素直さが、相手を夢中にさせる魅力のひとつです",
    ],
    honesty: ["もっと話したい。", "笑顔を見たい。"],
    compat: "一緒にいると癒される人",
    compatId: "healing",
  },
  curious: {
    id: "curious",
    name: "もっと知りたくなる人",
    features: [
      "落ち着いた雰囲気があり、大人っぽく見られています",
      "少しミステリアスだからこそ、好きな人はあなたのことが気になっています",
      "「何を考えているんだろう」と相手をドキドキさせる存在です",
      "近づくほどに魅力が増す、深みのある人という印象を与えています",
    ],
    honesty: ["何を考えているんだろう？", "もっと仲良くなりたい。"],
    compat: "追いかけたくなる人",
    compatId: "chase",
  },
  chase: {
    id: "chase",
    name: "追いかけたくなる人",
    features: [
      "簡単には心を見せないため、好きな人はつい意識してしまいます",
      "恋愛では追われることが多く、存在そのものが魅力になっています",
      "気づいたら目で追ってしまう—そんな存在感を放っています",
      "距離感のつかみにくさが、相手のドキドキを止められない理由です",
    ],
    honesty: ["もっと振り向いてほしい。", "気づいたら目で追ってしまう。"],
    compat: "もっと知りたくなる人",
    compatId: "curious",
  },
};

const TYPE_IDS: SukinaHitoTypeId[] = ["healing", "protect", "curious", "chase"];

export function calculateSukinaHitoType(answers: number[]): SukinaHitoResult {
  const counts = [0, 0, 0, 0];
  for (const a of answers) {
    if (a >= 0 && a <= 3) counts[a]++;
  }
  const maxCount = Math.max(...counts);
  const tied = counts.reduce<number[]>((acc, c, i) => {
    if (c === maxCount) acc.push(i);
    return acc;
  }, []);

  if (tied.length === 1) {
    return results[TYPE_IDS[tied[0]]];
  }

  // Tiebreak: last answer among tied indices wins
  for (let i = answers.length - 1; i >= 0; i--) {
    if (tied.includes(answers[i])) {
      return results[TYPE_IDS[answers[i]]];
    }
  }

  return results[TYPE_IDS[tied[0]]];
}

export function getSukinaHitoResultById(id: string): SukinaHitoResult | undefined {
  return results[id as SukinaHitoTypeId];
}

export function isSukinaHitoTypeId(id: string): id is SukinaHitoTypeId {
  return TYPE_IDS.includes(id as SukinaHitoTypeId);
}
