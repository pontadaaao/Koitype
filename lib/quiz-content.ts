import type { QuizContentProps, QuizContentType, QuizRelatedLink } from "@/components/QuizContent";
import type { Diagnosis } from "@/lib/types";
import type { LoveTest } from "@/lib/love-tests";
import type { CatTypeResult } from "@/lib/cat-type-diagnosis";
import type { SukinaHitoResult } from "@/lib/sukina-hito-diagnosis";
import type { DogLoverResult, DogCatResult } from "@/lib/types";

const COMMON_RELATED: QuizRelatedLink[] = [
  { href: "/love-diagnosis", label: "恋愛診断一覧" },
  { href: "/tests", label: "恋愛心理テスト" },
  { href: "/columns", label: "恋愛コラム" },
];

function baseFaq(title: string, timeAnswer: string, mechanism: string) {
  return [
    {
      q: `${title}は無料で診断できますか？`,
      a: "はい。会員登録やアプリのインストールは不要で、何度でも無料で診断できます。",
    },
    {
      q: "診断にはどのくらい時間がかかりますか？",
      a: timeAnswer,
    },
    {
      q: "診断結果はシェアできますか？",
      a: "はい。結果画面からX（旧Twitter）やLINEなどのSNSにそのままシェアできます。",
    },
    {
      q: `${title}はどんな仕組みですか？`,
      a: mechanism,
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
      `${diagnosis.title}は登録不要・完全無料。全${diagnosis.questionCount}問、約${diagnosis.durationMinutes}分で診断できます。結果は「${names.join("」「")}」の${typeCount}タイプに分かれ、それぞれの恋愛傾向・特徴・アドバイスまで詳しく解説します。`,
    ],
    typesHeading: `${diagnosis.title}でわかる${typeCount}つのタイプ`,
    types,
    faq: baseFaq(
      diagnosis.title,
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
      `「${test.question}」という質問に答えるだけで、「${names.join("」「")}」の${typeCount}タイプを診断します。登録不要・無料で何度でも楽しめる恋愛心理テストです。`,
    ],
    typesHeading: `診断でわかる${typeCount}タイプ`,
    types,
    faq: baseFaq(
      test.title,
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
      "数問に答えるだけで、1〜2分で完了します。",
      "恋愛での行動や価値観の傾向から、犬系・猫系のタイプに分類する診断です。結果は娯楽としてお楽しみください。",
    ),
    related: COMMON_RELATED,
  };
}
