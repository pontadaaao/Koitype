import type { DogCatQuestion, DogCatResult, DogCatScore } from "./types";

export const DOG_CAT_DIAGNOSIS_ID = "dog-cat";

export const DOG_FACTION_IMAGE = "/dog-faction.png";
export const CAT_FACTION_IMAGE = "/cat-faction.png";
export const DOG_CAT_COMPARISON_HERO = "/dog-cat-comparison-hero.png";
export const CAT_FACTION_COMPARISON_HERO = "/cat-comparison-hero.png";

const RESULT_HERO_IMAGES: Partial<Record<string, string>> = {
  dog: DOG_CAT_COMPARISON_HERO,
  catdog: DOG_CAT_COMPARISON_HERO,
  cat: CAT_FACTION_COMPARISON_HERO,
  dogcat: CAT_FACTION_COMPARISON_HERO,
};

const RESULT_HERO_ALTS: Partial<Record<string, string>> = {
  dog: "犬系 or 猫寄りな犬系",
  catdog: "犬系 or 猫寄りな犬系",
  cat: "猫系恋愛スタイル診断",
  dogcat: "猫系恋愛スタイル診断",
};

export function getResultHeroImage(resultId: string): string | null {
  return RESULT_HERO_IMAGES[resultId] ?? null;
}

export function getResultHeroAlt(resultId: string): string {
  return RESULT_HERO_ALTS[resultId] ?? "診断結果";
}

export function isDogFaction(dogPct: number): boolean {
  return dogPct >= 50;
}

export function isCatFaction(dogPct: number): boolean {
  return dogPct < 50;
}

export const questions: DogCatQuestion[] = [
  {
    text: "好きな人ができたとき、最初にとる行動は？",
    choices: [
      "すぐ近くに行って話しかける",
      "さりげなく目が合うのを待つ",
      "共通の友達を通じて仲良くなる",
      "遠くからひっそり観察する",
    ],
    dog: [3, 1, 2, 0],
    note: [
      "積極的にアクションを起こす犬系らしさが出ています",
      "自分からは動かず相手を待つ、猫系の余裕を感じます",
      "人を介して距離を縮める、バランス型の行動です",
      "観察重視の慎重派。猫系の冷静さがうかがえます",
    ],
  },
  {
    text: "デート中、相手が少し黙り込んだ。どうする？",
    choices: [
      "「どうしたの？」と真っすぐ聞く",
      "そっとしておいて、自分も静かにする",
      "話題を変えて場を和ませようとする",
      "気づいていないふりをする",
    ],
    dog: [3, 1, 2, 0],
    note: [
      "正直に向き合うストレートさは犬系の特徴です",
      "静寂を共有できる。猫系らしい落ち着きがあります",
      "空気を読んで動く、社交的な一面が光ります",
      "あえて触れないのは、独特の猫系距離感かも",
    ],
  },
  {
    text: "好きな人からLINEが来た。返信のタイミングは？",
    choices: [
      "気づいたら即レス。待たせるのが嫌",
      "少し時間をおいてから返す",
      "内容によって変える",
      "既読はつけるけど、タイミングが合ったときに返す",
    ],
    dog: [3, 1, 2, 0],
    note: [
      "即レスは「あなたが大事」という犬系メッセージです",
      "間を置くことで自分のペースを守る猫系スタイル",
      "TPOで使い分けられる柔軟さが強みです",
      "マイペースに返す。猫系の余裕とも言えます",
    ],
  },
  {
    text: "付き合い始めの頃、あなたはどんなタイプ？",
    choices: [
      "毎日でも会いたくてそわそわする",
      "会えなくても平気。自分の時間も大事",
      "相手のペースに合わせて距離を縮める",
      "好きだけど、なかなか素直になれない",
    ],
    dog: [3, 0, 2, 1],
    note: [
      "全力で気持ちを向ける犬系の一途さが炸裂します",
      "自立した関係を好む、猫系の自由人スタイルです",
      "相手に合わせる優しさと柔軟性が光ります",
      "素直になれないのは猫系あるある。でも愛情は深い",
    ],
  },
  {
    text: "相手が落ち込んでいるとき、あなたは？",
    choices: [
      "すぐ飛んでいって「大丈夫？」と全力でそばにいる",
      "「何かあれば言って」と一言だけ伝えて見守る",
      "話を聞きながら、一緒に解決策を考える",
      "特に何も言わないが、さりげなく気にかける",
    ],
    dog: [3, 1, 2, 0],
    note: [
      "真っ先に駆けつける。犬系の献身性が光ります",
      "見守る余裕は猫系。でも心でしっかり寄り添っています",
      "問題解決型の思いやり。バランスのいい対応です",
      "無言でそっとそばにいる。猫系ならではの気遣いです",
    ],
  },
  {
    text: "恋人に「今日かわいいね」と言われたら？",
    choices: [
      "「ありがとう！嬉しい！」と素直に喜ぶ",
      "照れて「そんなことないよ」と否定してしまう",
      "「ありがとう、あなたもね」とさらっと返す",
      "黙ってちょっと顔をそらす",
    ],
    dog: [3, 1, 2, 0],
    note: [
      "全力で喜びを表現できる素直さは犬系の魅力です",
      "照れ隠しの否定は猫系あるある。本当は嬉しいはず",
      "クールな返しができる。大人の余裕を感じます",
      "無言でそらす、これぞ猫系の照れ隠しの極み",
    ],
  },
  {
    text: "恋人とのケンカ後、仲直りのきっかけは？",
    choices: [
      "我慢できなくて自分から謝りに行く",
      "相手が来るのをじっと待つ",
      "時間をおいて、冷静になってから話し合う",
      "ケンカしたことをなかったかのように普通に接する",
    ],
    dog: [3, 0, 2, 1],
    note: [
      "自分から動ける潔さ。犬系の素直さの表れです",
      "待てる忍耐力は猫系。プライドも少しあるかも？",
      "冷静に話し合える。成熟したコミュニケーション力です",
      "自然に流す独自スタイル。でも心は早く仲直りしたいはず",
    ],
  },
  {
    text: "週末、恋人と過ごすなら？",
    choices: [
      "にぎやかな場所でたくさん思い出をつくりたい",
      "家でのんびり、静かに一緒にいるだけでいい",
      "どちらでも相手が楽しければOK",
      "ひとりの時間も欲しいので、半日くらいがちょうどいい",
    ],
    dog: [3, 1, 2, 0],
    note: [
      "アクティブに楽しむ。犬系のエネルギッシュさです",
      "静かな時間を共有する。猫系の内向きな幸せスタイル",
      "相手中心に動ける。思いやりある柔軟タイプです",
      "自分時間も大切にする。猫系の自立性が出ています",
    ],
  },
  {
    text: "恋人からの「好き」という言葉、どれくらい必要？",
    choices: [
      "毎日言ってほしい。言葉で確認したい",
      "特に言葉はいらない。態度で伝わればいい",
      "たまに言ってくれると嬉しい、くらいのバランスが好き",
      "言葉より行動で示してほしいタイプ",
    ],
    dog: [3, 0, 2, 1],
    note: [
      "言葉で愛を確認したい。犬系の素直な甘えん坊です",
      "言葉より気持ちを感じたい。猫系の深い感受性です",
      "バランス感覚がある。安定した恋愛ができそうです",
      "行動で示してほしいのは、愛情の重さを知っているから",
    ],
  },
  {
    text: "新しい恋の始まり、どんなパターンが多い？",
    choices: [
      "気づいたら「好き！」と気持ちが爆発している",
      "じわじわと、気づいたら好きになっていた",
      "友達から恋人に発展するパターンが多い",
      "好きかどうか、自分でもよくわからないまま進む",
    ],
    dog: [3, 1, 2, 0],
    note: [
      "一瞬で燃え上がる。犬系の情熱的な恋愛スタイルです",
      "じわじわ型は猫系。深く静かに愛情が根付いていきます",
      "友情から愛情へ。信頼を基盤にした安定した恋愛です",
      "自分の気持ちを掴みにくい。猫系の複雑な内面性かも",
    ],
  },
  {
    text: "恋人が突然「少し距離を置きたい」と言ってきたら？",
    choices: [
      "理由を聞いてすぐ話し合いたい",
      "「わかった」と言ってそっとしておく",
      "不安だけど、相手の気持ちを尊重して待つ",
      "平静を装いつつ、内心はかなりグルグルする",
    ],
    dog: [3, 1, 2, 0],
    note: [
      "正面から向き合おうとする。犬系の誠実さが出ています",
      "受け入れて待てる。猫系の凛とした強さがあります",
      "尊重しながら不安も感じる。正直で繊細なバランスです",
      "外には出さない。猫系の見せない感情の深さを感じます",
    ],
  },
  {
    text: "理想の恋愛関係を一言で表すと？",
    choices: [
      "いつでもそばにいて、何でも話せる関係",
      "お互いの世界を持ちながら、自然と引き合う関係",
      "一緒にいると安心できて、笑いが絶えない関係",
      "言葉がなくてもわかり合える、静かで深い関係",
    ],
    dog: [3, 0, 2, 1],
    note: [
      "密着した関係が理想。犬系の愛情深さの象徴です",
      "自立しながら引き合う。猫系の理想の距離感です",
      "安心と笑い。温かい関係を大切にするタイプです",
      "言葉不要の絆。猫系の深くて静かな愛の形です",
    ],
  },
];

export const results: DogCatResult[] = [
  {
    id: "dog",
    icon: "dog",
    name: "純粋な犬系",
    subtitle: "愛情表現全力の甘え上手",
    catch:
      "全力で愛情表現、まっすぐ一途タイプ。好きな人のそばにいたくて、気持ちを隠せない愛情深い性格です。",
    tags: ["一途", "積極的", "全力愛情"],
    parameters: [
      { label: "積極性", score: 6 },
      { label: "独占欲", score: 5 },
      { label: "甘え度", score: 6 },
      { label: "一途度", score: 6 },
    ],
    traits: [
      { label: "アプローチ", value: "直球・即行動" },
      { label: "愛情表現", value: "言葉と行動で全力" },
      { label: "デートスタイル", value: "にぎやかに一緒に" },
      { label: "ケンカ後", value: "自分から謝れる" },
    ],
    compat: [
      {
        icon: "stars",
        strong: "相性◎",
        text: "猫系パートナーとは「追いかけ役」と「マイペース役」のバランスが生まれ、長続きするカップルになりやすいです。",
      },
      {
        icon: "rainbow",
        strong: "気をつけたいこと",
        text: "相手が必要以上に距離を感じると重さになることも。「好き」の気持ちを少しセーブする意識も大切。",
      },
    ],
    advice:
      "あなたの愛情は本物です。その真っすぐさを大切にしつつ、相手のペースを少し意識するともっとうまくいきます。",
  },
  {
    id: "dogcat",
    icon: "dog",
    name: "犬寄りの猫系",
    subtitle: "欲しい時だけ甘えるバランス型",
    catch:
      "基本は甘えたいけど、自分の時間も大事。積極的に見えて、実は自分のペースを崩したくないタイプです。",
    tags: ["甘えたい", "自分時間も大事", "バランス型"],
    parameters: [
      { label: "積極性", score: 4 },
      { label: "独占欲", score: 3 },
      { label: "甘え度", score: 4 },
      { label: "一途度", score: 4 },
    ],
    traits: [
      { label: "アプローチ", value: "積極的だが慎重" },
      { label: "愛情表現", value: "TPOで使い分ける" },
      { label: "デートスタイル", value: "相手に合わせつつ楽しむ" },
      { label: "ケンカ後", value: "冷静になってから話す" },
    ],
    compat: [
      {
        icon: "stars",
        strong: "相性◎",
        text: "どちらのタイプとも程よく合わせられる万能型。特に安定志向のパートナーとは長続きしやすいです。",
      },
      {
        icon: "rainbow",
        strong: "気をつけたいこと",
        text: "「甘えたい」と「自由でいたい」が同居するため、自分の本音を伝えないと相手が戸惑うことも。",
      },
    ],
    advice:
      "あなたの柔軟性は大きな強みです。自分の気持ちを正直に伝えることで、より深い関係が築けます。",
  },
  {
    id: "catdog",
    icon: "cat",
    name: "猫寄りの犬系",
    subtitle: "クールで一途なツンデレ",
    catch:
      "クールに見えて、実は誰より愛情深い。素直になれないだけで、好きな人への気持ちは誰にも負けません。",
    tags: ["ツンデレ", "深い愛情", "クール外見"],
    parameters: [
      { label: "積極性", score: 3 },
      { label: "独占欲", score: 4 },
      { label: "甘え度", score: 3 },
      { label: "一途度", score: 5 },
    ],
    traits: [
      { label: "アプローチ", value: "遠回しだが気にかける" },
      { label: "愛情表現", value: "行動で示すタイプ" },
      { label: "デートスタイル", value: "静かに共に過ごす" },
      { label: "ケンカ後", value: "待つかさらっと流す" },
    ],
    compat: [
      {
        icon: "stars",
        strong: "相性◎",
        text: "積極的な犬系パートナーにリードしてもらうと、素直な自分が引き出されやすくなります。",
      },
      {
        icon: "rainbow",
        strong: "気をつけたいこと",
        text: "気持ちを察してもらうことを期待しすぎると、すれ違いに。言葉で伝える練習も少しずつしてみて。",
      },
    ],
    advice:
      "あなたの愛情は静かで深いです。「好き」を言葉にすることを少し意識するだけで、関係がぐっと変わります。",
  },
  {
    id: "cat",
    icon: "cat",
    name: "純粋な猫系",
    subtitle: "マイペースで深い愛",
    catch:
      "マイペースで自立。でも懐いた相手には一途。自分の世界を大切にしながら、深く愛せるタイプです。",
    tags: ["マイペース", "自立系", "深い絆"],
    parameters: [
      { label: "積極性", score: 1 },
      { label: "独占欲", score: 2 },
      { label: "甘え度", score: 2 },
      { label: "一途度", score: 4 },
    ],
    traits: [
      { label: "アプローチ", value: "待ちスタイル" },
      { label: "愛情表現", value: "態度と沈黙で示す" },
      { label: "デートスタイル", value: "静かにふたりの時間" },
      { label: "ケンカ後", value: "相手が来るのを待つ" },
    ],
    compat: [
      {
        icon: "stars",
        strong: "相性◎",
        text: "犬系パートナーが追いかけ、猫系が受け止める関係は意外とバランスが良く長続きしやすいです。",
      },
      {
        icon: "rainbow",
        strong: "気をつけたいこと",
        text: "自分のペースを大切にするあまり、相手が孤独を感じることも。たまには自分からアクションを。",
      },
    ],
    advice:
      "あなたの落ち着いた魅力は唯一無二です。少し歩み寄る勇気を持つと、相手はもっとあなたを好きになります。",
  },
];

const MAX_DOG_POINTS = questions.reduce(
  (sum, q) => sum + Math.max(...q.dog),
  0
);

export function getResultById(resultId: string): DogCatResult | undefined {
  return results.find((r) => r.id === resultId) ?? results[0];
}

export function calculateDogCatScore(answers: number[]): DogCatScore {
  const totalDogPoints = answers.reduce((sum, choiceIndex, qIndex) => {
    const question = questions[qIndex];
    return sum + (question?.dog[choiceIndex] ?? 0);
  }, 0);

  const dogPct = Math.round((totalDogPoints / MAX_DOG_POINTS) * 100);
  const catPct = 100 - dogPct;

  let result: DogCatResult;
  if (dogPct >= 75) {
    result = results[0];
  } else if (dogPct >= 50) {
    result = results[1];
  } else if (dogPct >= 25) {
    result = results[2];
  } else {
    result = results[3];
  }

  return { result, dogPct, catPct, totalDogPoints, maxDogPoints: MAX_DOG_POINTS };
}

export function defaultDogPctForResult(resultId: string): number {
  switch (resultId) {
    case "dog":
      return 88;
    case "dogcat":
      return 62;
    case "catdog":
      return 38;
    case "cat":
      return 12;
    default:
      return 50;
  }
}

export function isDogCatResultId(resultId: string): boolean {
  return results.some((r) => r.id === resultId);
}
