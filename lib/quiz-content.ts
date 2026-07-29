import type { QuizContentProps, QuizContentType, QuizRelatedLink } from "@/components/QuizContent";
import type { Diagnosis } from "@/lib/types";
import type { LoveTest } from "@/lib/love-tests";
import type { CatTypeResult } from "@/lib/cat-type-diagnosis";
import type { SukinaHitoResult } from "@/lib/sukina-hito-diagnosis";
import type { DogLoverResult, DogCatResult } from "@/lib/types";

const COMMON_RELATED: QuizRelatedLink[] = [
  { href: "/love-diagnosis", label: "恋愛診断一覧" },
  { href: "/tests", label: "恋愛心理テスト" },
  { href: "/blog/category/column", label: "恋愛コラム" },
];

/** タイトル等を種にした安定ハッシュ（導入文のバリエーション選択用）。 */
function seedFrom(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

/** seed に応じて配列から1つ選ぶ（負のseedでも安全・ページごとに安定）。 */
function pick<T>(seed: number, arr: T[]): T {
  const i = ((Math.trunc(seed) % arr.length) + arr.length) % arr.length;
  return arr[i];
}

function baseFaq(
  title: string,
  names: string[],
  timeAnswer: string,
  mechanism: string,
) {
  const typeList = names.length
    ? `「${names.slice(0, 4).join("」「")}」${names.length > 4 ? "など" : ""}の${names.length}タイプ`
    : "複数のタイプ";
  return [
    {
      q: `${title}では何がわかりますか？`,
      a: `${title}では、あなたが${typeList}のどれに当てはまるかがわかります。タイプごとに恋愛傾向や特徴、アドバイスまで解説するので、自分の恋愛のクセを知るヒントになります。`,
    },
    {
      q: `${title}は無料で診断できますか？`,
      a: `はい。${title}は会員登録もアプリのインストールも不要で、何度でも無料で診断できます。`,
    },
    {
      q: "診断にはどのくらい時間がかかりますか？",
      a: timeAnswer,
    },
    {
      q: `${title}の結果は当たりますか？`,
      a: `${title}は恋愛心理の一般的な傾向をもとにした診断で、医学的・科学的なものではありません。当たる・当たらないというより、自分の恋愛を見つめ直すきっかけとして気軽に楽しんでください。`,
    },
    {
      q: `${title}はどんな仕組みですか？`,
      a: mechanism,
    },
    {
      q: "診断結果はシェアできますか？",
      a: `はい。結果画面から、${title}の結果をXやLINEなどのSNSにそのままシェアできます。友だちと結果を見せ合うのも楽しみ方のひとつです。`,
    },
  ];
}

/** Main Diagnosis type (used by /diagnosis/[id]). */
export function buildDiagnosisContent(diagnosis: Diagnosis): QuizContentProps {
  const names = diagnosis.results.map((r) => r.name);
  const typeCount = names.length;

  const types: QuizContentType[] = diagnosis.results.map((r) => ({
    name: r.name,
    description: r.desc,
    points: r.aru,
    tags: r.tags,
    notes: [
      r.detail ? { label: r.detailTitle ?? "特徴", text: r.detail } : null,
      r.advice ? { label: r.adviceTitle ?? "アドバイス", text: r.advice } : null,
    ].filter((n): n is { label: string; text: string } => n !== null),
  }));

  return {
    title: diagnosis.title,
    accentColor: "#F067A6",
    aboutHeading: `${diagnosis.title}とは？`,
    intro: [
      diagnosis.description,
      pick(seedFrom(diagnosis.title), [
        `${diagnosis.title}では、あなたの回答から恋愛傾向を読み解き、「${names.join("」「")}」の${typeCount}タイプのいずれかを判定します。`,
        `選んだ答えのパターンから、あなたが「${names.join("」「")}」という${typeCount}タイプのどれに近いかを${diagnosis.title}が診断します。`,
        `${diagnosis.title}は、質問への答えをもとに、あなたを「${names.join("」「")}」の${typeCount}タイプに分類する恋愛診断です。`,
      ]),
      pick(seedFrom(diagnosis.title) >>> 3, [
        `全${diagnosis.questionCount}問・約${diagnosis.durationMinutes}分、登録不要で何度でも無料。結果ではタイプごとの性格や恋愛のクセ、アドバイスまで詳しく紹介します。`,
        `所要時間は約${diagnosis.durationMinutes}分（全${diagnosis.questionCount}問）。アプリ不要・無料で、結果画面では各タイプの特徴や相性、恋愛のヒントまで読めます。`,
        `質問は全${diagnosis.questionCount}問、約${diagnosis.durationMinutes}分で完了します。無料・登録不要で、診断後はあなたのタイプの詳しい解説とアドバイスをチェックできます。`,
      ]),
    ],
    typesHeading: `${diagnosis.title}でわかる${typeCount}つのタイプ`,
    types,
    faq: baseFaq(
      diagnosis.title,
      names,
      `全${diagnosis.questionCount}問で、約${diagnosis.durationMinutes}分で完了します。スキマ時間に気軽に楽しめます。`,
      `恋愛心理の傾向をもとに、選んだ回答からあなたを${typeCount}タイプのいずれかに分類する診断です。結果は娯楽としてお楽しみください。`,
    ),
    related: COMMON_RELATED,
  };
}

/** LoveTest type (used by /tests/[slug]). */
export function buildLoveTestContent(test: LoveTest): QuizContentProps {
  const names = test.choices.map((c) => c.resultTitle);
  const typeCount = names.length;

  const types: QuizContentType[] = test.choices.map((c) => ({
    name: c.resultTitle,
    tagline: c.catchCopy,
    description: c.resultDescription,
    notes: c.advice ? [{ label: "アドバイス", text: c.advice }] : undefined,
  }));

  return {
    title: test.title,
    accentColor: test.color,
    aboutHeading: `${test.title}とは？`,
    intro: [
      test.description,
      pick(seedFrom(test.title), [
        `「${test.question}」に答えるだけで、あなたが「${names.join("」「")}」の${typeCount}タイプのどれかがわかります。`,
        `${test.title}は、質問「${test.question}」への答えから、「${names.join("」「")}」の${typeCount}タイプを診断します。`,
        `シンプルな質問「${test.question}」に答えると、「${names.join("」「")}」の${typeCount}タイプからあなたのタイプを判定します。`,
      ]),
      pick(seedFrom(test.title) >>> 3, [
        "登録不要・無料で、10秒ほどで結果がわかる恋愛心理テストです。",
        "アプリのインストールも登録も不要。ちょっとした空き時間に、無料で気軽に楽しめます。",
        "質問はたった1問。何度でも無料で試せる、手軽な恋愛心理テストです。",
      ]),
    ],
    typesHeading: `診断でわかる${typeCount}タイプ`,
    types,
    faq: baseFaq(
      test.title,
      names,
      "質問は1問だけなので、10秒ほどですぐに診断できます。",
      `選んだ回答をもとに、あなたを${typeCount}タイプのいずれかに分類する恋愛心理テストです。結果は娯楽としてお楽しみください。`,
    ),
    related: COMMON_RELATED,
  };
}

/** 猫系診断 (dedicated route). */
export function buildCatTypeContent(
  results: Record<string, CatTypeResult>,
): QuizContentProps {
  const list = Object.values(results);
  const names = list.map((r) => r.name);

  const types: QuizContentType[] = list.map((r) => ({
    name: r.name,
    tagline: r.catch,
    points: r.traits,
    notes: [{ label: "相性の良いタイプ", text: r.compat }],
  }));

  const title = "猫系診断";
  return {
    title,
    accentColor: "#9b6fd4",
    aboutHeading: "猫系診断とは？",
    intro: [
      "猫系診断は、8つの質問に答えるだけで、あなたの恋愛における「猫タイプ」がわかる無料診断です。",
      `結果は「${names.join("」「")}」の${names.length}タイプ。恋愛での距離感やアプローチのクセ、相性の良いタイプまで詳しくわかります。`,
    ],
    typesHeading: `猫系診断でわかる${names.length}つのタイプ`,
    types,
    faq: baseFaq(
      title,
      names,
      "全8問で、約1〜2分で完了します。",
      `恋愛での価値観や距離感の傾向から、あなたを${names.length}タイプのいずれかに分類する診断です。結果は娯楽としてお楽しみください。`,
    ),
    related: COMMON_RELATED,
  };
}

/** 好きな人からどう思われてる診断 (dedicated route). */
export function buildSukinaHitoContent(
  results: Record<string, SukinaHitoResult>,
): QuizContentProps {
  const list = Object.values(results);
  const names = list.map((r) => r.name);

  const types: QuizContentType[] = list.map((r) => ({
    name: r.name,
    points: r.features,
    notes: [
      { label: "相手の本音", text: r.honesty.join(" ") },
      { label: "相性の良いタイプ", text: r.compat },
    ],
  }));

  const title = "好きな人からどう思われてる診断";
  return {
    title,
    accentColor: "#F067A6",
    aboutHeading: `${title}とは？`,
    intro: [
      "いくつかの質問に答えるだけで、あなたが好きな人からどう見られているかがわかる無料診断です。",
      `結果は「${names.join("」「")}」の${names.length}タイプ。相手が抱いている印象や本音、距離を縮めるヒントがわかります。`,
    ],
    typesHeading: `診断でわかる${names.length}つのタイプ`,
    types,
    faq: baseFaq(
      title,
      names,
      "数問に答えるだけで、1分ほどで完了します。",
      `回答の傾向から、相手が抱いている印象を${names.length}タイプのいずれかに分類する診断です。結果は娯楽としてお楽しみください。`,
    ),
    related: COMMON_RELATED,
  };
}

/** 犬系診断 (dedicated route). */
export function buildDogLoverContent(results: DogLoverResult[]): QuizContentProps {
  const names = results.map((r) => r.name);

  const types: QuizContentType[] = results.map((r) => ({
    name: r.name,
    tagline: r.title,
    points: r.traits,
    tags: r.tags,
    notes: [
      { label: "相性の良いタイプ", text: r.partner },
      { label: "アドバイス", text: r.advice },
    ],
  }));

  const title = "犬系診断";
  return {
    title,
    accentColor: "#4a90d9",
    aboutHeading: "犬系診断とは？",
    intro: [
      "犬系診断は、質問に答えるだけであなたの恋愛における「犬タイプ」がわかる無料診断です。",
      `結果は「${names.join("」「")}」の${names.length}タイプ。愛情表現のスタイルや相性の良いタイプ、長続きのコツまで詳しくわかります。`,
    ],
    typesHeading: `犬系診断でわかる${names.length}つのタイプ`,
    types,
    faq: baseFaq(
      title,
      names,
      "数問に答えるだけで、1〜2分で完了します。",
      `恋愛での愛情表現の傾向から、あなたを${names.length}タイプのいずれかに分類する診断です。結果は娯楽としてお楽しみください。`,
    ),
    related: COMMON_RELATED,
  };
}

/** 犬派・猫派診断 (dedicated route). */
export function buildDogCatContent(results: DogCatResult[]): QuizContentProps {
  const names = results.map((r) => r.name);

  const types: QuizContentType[] = results.map((r) => ({
    name: r.name,
    tagline: r.subtitle,
    description: r.catch,
    tags: r.tags,
    points: r.traits.map((t) => `${t.label}：${t.value}`),
    notes: [
      ...r.compat.map((c) => ({ label: c.strong, text: c.text })),
      { label: "アドバイス", text: r.advice },
    ],
  }));

  const title = "犬系・猫系診断";
  return {
    title,
    accentColor: "#F067A6",
    aboutHeading: `${title}とは？`,
    intro: [
      "犬系・猫系診断は、質問に答えるだけであなたが恋愛で犬系タイプか猫系タイプかがわかる無料診断です。",
      `結果は「${names.join("」「")}」などのタイプに分かれ、恋愛でのアプローチや愛情表現、相性の良い相手まで詳しくわかります。`,
    ],
    typesHeading: "診断でわかるタイプ",
    types,
    faq: baseFaq(
      title,
      names,
      "数問に答えるだけで、1〜2分で完了します。",
      "恋愛での行動や価値観の傾向から、犬系・猫系のタイプに分類する診断です。結果は娯楽としてお楽しみください。",
    ),
    related: COMMON_RELATED,
  };
}
