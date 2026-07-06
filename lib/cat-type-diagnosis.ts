export type CatTypeId = "black" | "moody" | "sweet" | "azato";

export interface CatTypeQuestion {
  text: string;
  choices: [string, string, string, string]; // A, B, C, D
}

export interface CatTypeResult {
  id: CatTypeId;
  name: string;
  catch: string;
  traits: string[];
  compat: string;
  compatId: CatTypeId;
}

export const questions: CatTypeQuestion[] = [
  {
    text: "休日の過ごし方は？",
    choices: [
      "一人でのんびり過ごす",
      "気分で予定を決める",
      "仲のいい人と遊ぶ",
      "外へ出かけたい",
    ],
  },
  {
    text: "好きな人から急に連絡が来たら？",
    choices: [
      "少し焦らして返信",
      "気分ならすぐ返す",
      "すぐ返信する",
      "ノリよく返す",
    ],
  },
  {
    text: "友達からよく言われるのは？",
    choices: [
      "ミステリアス",
      "マイペース",
      "優しい",
      "明るい",
    ],
  },
  {
    text: "恋愛で一番大切なのは？",
    choices: [
      "自分の時間",
      "ドキドキ",
      "安心感",
      "一緒に楽しめること",
    ],
  },
  {
    text: "褒められると？",
    choices: [
      "照れてしまう",
      "平然を装う",
      "素直に喜ぶ",
      "もっと話したくなる",
    ],
  },
  {
    text: "嫉妬すると？",
    choices: [
      "隠す",
      "少し距離を置く",
      "不安を伝える",
      "冗談っぽく聞く",
    ],
  },
  {
    text: "初対面では？",
    choices: [
      "人見知りする",
      "相手次第",
      "穏やかに話す",
      "自分から話しかける",
    ],
  },
  {
    text: "理想の恋愛は？",
    choices: [
      "程よい距離感",
      "自由な恋",
      "ずっと一緒",
      "毎日楽しい恋",
    ],
  },
];

export const results: Record<CatTypeId, CatTypeResult> = {
  black: {
    id: "black",
    name: "デレ隠し黒猫",
    catch: "好きなのに素直になれない。",
    traits: [
      "本当は寂しがり",
      "恋愛ではかなり一途",
      "追われる恋に弱い",
      "甘えるのは好きな人限定",
    ],
    compat: "甘え上手にゃんこ",
    compatId: "sweet",
  },
  moody: {
    id: "moody",
    name: "気分屋にゃんこ",
    catch: "自由こそ恋のルール。",
    traits: [
      "束縛が苦手",
      "恋はフィーリング",
      "気分屋だけど愛嬌抜群",
      "自然体で付き合いたい",
    ],
    compat: "あざと猫",
    compatId: "azato",
  },
  sweet: {
    id: "sweet",
    name: "甘え上手にゃんこ",
    catch: "好きな人には全力で甘える。",
    traits: [
      "愛情表現が得意",
      "安心感重視",
      "尽くすタイプ",
      "恋人を最優先しがち",
    ],
    compat: "デレ隠し黒猫",
    compatId: "black",
  },
  azato: {
    id: "azato",
    name: "あざと猫",
    catch: "無意識に人を沼らせる。",
    traits: [
      "距離感が上手",
      "男女問わず人気",
      "甘え上手",
      "恋愛経験が豊富そうに見られる",
    ],
    compat: "気分屋にゃんこ",
    compatId: "moody",
  },
};

const CAT_TYPE_IDS: CatTypeId[] = ["black", "moody", "sweet", "azato"];

export function calculateCatType(answers: number[]): CatTypeResult {
  const counts = [0, 0, 0, 0]; // A, B, C, D
  for (const answer of answers) {
    if (answer >= 0 && answer <= 3) counts[answer]++;
  }
  const maxCount = Math.max(...counts);
  const winnerIndex = counts.indexOf(maxCount); // first match wins on tie
  return results[CAT_TYPE_IDS[winnerIndex]];
}

export function getCatResultById(id: string): CatTypeResult | undefined {
  return results[id as CatTypeId];
}

export function isCatTypeId(id: string): id is CatTypeId {
  return CAT_TYPE_IDS.includes(id as CatTypeId);
}
