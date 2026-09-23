import type { QuizContentProps, QuizContentType, QuizRelatedLink } from "@/components/QuizContent";
import type { Diagnosis } from "@/lib/types";
import type { LoveTest } from "@/lib/love-tests";
import type { CatTypeResult } from "@/lib/cat-type-diagnosis";
import type { SukinaHitoResult } from "@/lib/sukina-hito-diagnosis";
import type { DogLoverResult, DogCatResult } from "@/lib/types";
import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";
import { getDiagnosisEditorial } from "@/lib/diagnosis-editorial";
import { getLoveTestEditorial } from "@/lib/love-test-editorial";
import { getLoveTestResultDetails } from "@/lib/love-test-results";

const BLOG_LINK: QuizRelatedLink = { href: "/blog", label: "恋愛ブログ" };

/** 同じカテゴリーの別の診断を最大 n 件。ページごとに違う導線になるようにする。 */
function siblingDiagnosisLinks(current: Diagnosis | null, n = 3): QuizRelatedLink[] {
  const pool = diagnoses.filter(
    (d) =>
      d.id !== current?.id &&
      d.questions.length > 0 &&
      d.results.length > 0 &&
      d.id !== "compatibility",
  );
  const sameCategory = current
    ? pool.filter((d) => d.category === current.category)
    : pool;
  const ordered = [...sameCategory, ...pool.filter((d) => !sameCategory.includes(d))];
  return ordered.slice(0, n).map((d) => ({
    href: `/diagnosis/${d.id}`,
    label: d.title,
  }));
}

/** 同じカテゴリーの別の心理テストを最大 n 件。 */
function siblingTestLinks(current: LoveTest | null, n = 3): QuizRelatedLink[] {
  const pool = loveTests.filter((t) => t.slug !== current?.slug);
  const sameCategory = current
    ? pool.filter((t) => t.category === current.category)
    : pool;
  const ordered = [...sameCategory, ...pool.filter((t) => !sameCategory.includes(t))];
  return ordered.slice(0, n).map((t) => ({
    href: `/tests/${t.slug}`,
    label: t.title,
  }));
}

const DIAGNOSIS_ANSWER_METHOD =
  "各質問で、いちばん近いと感じた選択肢を1つ選ぶだけです。迷ったときは直感で選んでかまいません。回答はブラウザの中だけで処理され、送信も保存もされません。";

/** Main Diagnosis type (used by /diagnosis/[id]). */
export function buildDiagnosisContent(diagnosis: Diagnosis): QuizContentProps {
  const ed = getDiagnosisEditorial(diagnosis.id);
  const names = diagnosis.results.map((r) => r.name.replace(/\s*\n\s*/g, " "));
  const typeCount = names.length;

  const types: QuizContentType[] = diagnosis.results.map((r) => ({
    name: r.name,
    tagline: r.catchCopy,
    description: r.desc,
    points: r.aru,
    tags: r.tags,
    notes: [
      r.detail ? { label: r.detailTitle ?? "特徴", text: r.detail } : null,
      r.advice ? { label: r.adviceTitle ?? "アドバイス", text: r.advice } : null,
    ].filter((n): n is { label: string; text: string } => n !== null),
    compat: r.compat,
    manual: r.manual,
    closing: r.prescription,
  }));

  // 導入文は診断ごとの書き下ろし（lib/diagnosis-editorial.ts）を優先する。
  // 用意が無いものだけ、データから最小限の説明を組み立てる。
  const intro =
    ed?.summary ??
    [
      diagnosis.description,
      typeCount > 0
        ? `結果は「${names.join("」「")}」の${typeCount}タイプに分かれます。下に全タイプの解説を掲載しているので、診断する前に読んでも構いません。`
        : "",
    ].filter(Boolean);

  return {
    title: diagnosis.title,
    accentColor: "#F067A6",
    aboutHeading: `${diagnosis.title}でわかること`,
    intro,
    howTo: {
      questionCount: diagnosis.questionCount,
      durationMinutes: diagnosis.durationMinutes,
      answerMethod: DIAGNOSIS_ANSWER_METHOD,
    },
    forWhom: ed?.forWhom,
    axes: ed?.axes,
    typesHeading:
      typeCount > 0 ? `結果の${typeCount}タイプと、その読み方` : "結果のタイプ",
    types,
    howToRead: ed?.howToRead,
    faq: diagnosis.faq ?? ed?.faq ?? [],
    related: [...siblingDiagnosisLinks(diagnosis), BLOG_LINK],
  };
}

/** LoveTest type (used by /tests/[slug]). */
export function buildLoveTestContent(test: LoveTest): QuizContentProps {
  const ed = getLoveTestEditorial(test.slug);
  const names = test.choices.map((c) => c.resultTitle);
  const typeCount = names.length;

  const details = getLoveTestResultDetails(test.slug);

  const types: QuizContentType[] = test.choices.map((c) => {
    const d = details[c.label];
    return {
      name: c.resultTitle,
      tagline: c.catchCopy,
      description: d ? `${c.resultDescription}${d.deepDive}` : c.resultDescription,
      notes: [
        { label: "選んだ答え", text: `${c.label}「${c.text}」` },
        ...(d
          ? [
              { label: "強み", text: d.strength },
              { label: "つまずきやすいところ", text: d.caution },
              { label: "相手からの見え方", text: d.partnerView },
            ]
          : []),
        ...(c.advice ? [{ label: "アドバイス", text: c.advice }] : []),
      ],
      pointsLabel: d ? "今日からできること" : undefined,
      points: d?.actions,
    };
  });

  const intro = ed
    ? [ed.whatItAsks, ed.whyItSplits]
    : [
        test.description,
        `「${test.question}」への答えから、「${names.join("」「")}」の${typeCount}タイプを判定します。`,
      ];

  return {
    title: test.title,
    accentColor: test.color,
    aboutHeading: `${test.title}でわかること`,
    intro,
    howTo: {
      questionCount: 1,
      answerMethod: `質問は「${test.question.replace(/\n/g, " ")}」の1問だけです。A〜Dの中から、いちばん自分に近いものを選んでください。回答は送信も保存もされません。`,
    },
    forWhom: ed?.forWhom,
    typesHeading: `4つの答えでわかる${typeCount}タイプ`,
    types,
    howToRead:
      ed?.howToRead ??
      "1問だけの心理テストなので、性格をきちんと測るものではありません。選んだ答えに表れやすい傾向を、ひとつの見方として紹介しているだけです。当てはまらないと感じた部分は流してください。",
    faq: test.faq ?? ed?.faq ?? [],
    related: [
      ...siblingTestLinks(test),
      { href: "/love-diagnosis", label: "もっと詳しい恋愛診断" },
      BLOG_LINK,
    ],
  };
}

/** 猫系診断 (dedicated route). */
export function buildCatTypeContent(
  results: Record<string, CatTypeResult>,
): QuizContentProps {
  const ed = getDiagnosisEditorial("cat-type");
  const list = Object.values(results);

  const types: QuizContentType[] = list.map((r) => ({
    name: r.name,
    tagline: r.catch,
    points: r.traits,
    notes: [{ label: "相性の良いタイプ", text: r.compat }],
  }));

  return {
    title: "恋愛猫タイプ診断",
    accentColor: "#9b6fd4",
    aboutHeading: "恋愛猫タイプ診断でわかること",
    intro: ed?.summary ?? [],
    howTo: {
      questionCount: 8,
      durationMinutes: 3,
      answerMethod: DIAGNOSIS_ANSWER_METHOD,
    },
    forWhom: ed?.forWhom,
    axes: ed?.axes,
    typesHeading: `結果の${list.length}タイプと、その読み方`,
    types,
    howToRead: ed?.howToRead,
    faq: ed?.faq ?? [],
    related: [
      { href: "/diagnosis/dog-lover", label: "恋愛犬タイプ診断" },
      { href: "/diagnosis/dog-cat", label: "犬系？猫系？恋愛スタイル診断" },
      { href: "/love-diagnosis", label: "恋愛診断一覧" },
      BLOG_LINK,
    ],
  };
}

/** 好きな人からどう思われてる診断 (dedicated route). */
export function buildSukinaHitoContent(
  results: Record<string, SukinaHitoResult>,
): QuizContentProps {
  const ed = getDiagnosisEditorial("sukina-hito");
  const list = Object.values(results);

  const types: QuizContentType[] = list.map((r) => ({
    name: r.name,
    points: r.features,
    notes: [
      { label: "相手の本音", text: r.honesty.join(" ") },
      { label: "相性の良いタイプ", text: r.compat },
    ],
  }));

  return {
    title: "好きな人から見たあなた診断",
    accentColor: "#F067A6",
    aboutHeading: "好きな人から見たあなた診断でわかること",
    intro: ed?.summary ?? [],
    howTo: {
      questionCount: 8,
      durationMinutes: 3,
      answerMethod: DIAGNOSIS_ANSWER_METHOD,
    },
    forWhom: ed?.forWhom,
    axes: ed?.axes,
    typesHeading: `結果の${list.length}タイプと、その読み方`,
    types,
    howToRead: ed?.howToRead,
    faq: ed?.faq ?? [],
    related: [
      { href: "/diagnosis/how-guys-see-you", label: "男子から見たあなた診断" },
      { href: "/diagnosis/how-girls-see-you", label: "女子から見たあなた診断" },
      { href: "/love-diagnosis", label: "恋愛診断一覧" },
      BLOG_LINK,
    ],
  };
}

/** 犬系診断 (dedicated route). */
export function buildDogLoverContent(results: DogLoverResult[]): QuizContentProps {
  const ed = getDiagnosisEditorial("dog-lover");

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

  return {
    title: "恋愛犬タイプ診断",
    accentColor: "#4a90d9",
    aboutHeading: "恋愛犬タイプ診断でわかること",
    intro: ed?.summary ?? [],
    howTo: {
      questionCount: 8,
      durationMinutes: 3,
      answerMethod: DIAGNOSIS_ANSWER_METHOD,
    },
    forWhom: ed?.forWhom,
    axes: ed?.axes,
    typesHeading: `結果の${results.length}タイプと、その読み方`,
    types,
    howToRead: ed?.howToRead,
    faq: ed?.faq ?? [],
    related: [
      { href: "/diagnosis/cat-type", label: "恋愛猫タイプ診断" },
      { href: "/diagnosis/dog-cat", label: "犬系？猫系？恋愛スタイル診断" },
      { href: "/love-diagnosis", label: "恋愛診断一覧" },
      BLOG_LINK,
    ],
  };
}

/** 犬派・猫派診断 (dedicated route). */
export function buildDogCatContent(results: DogCatResult[]): QuizContentProps {
  const ed = getDiagnosisEditorial("dog-cat");

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

  return {
    title: "犬系？猫系？恋愛スタイル診断",
    accentColor: "#F067A6",
    aboutHeading: "犬系？猫系？恋愛スタイル診断でわかること",
    intro: ed?.summary ?? [],
    howTo: {
      questionCount: 12,
      durationMinutes: 4,
      answerMethod: DIAGNOSIS_ANSWER_METHOD,
    },
    forWhom: ed?.forWhom,
    axes: ed?.axes,
    typesHeading: "結果のタイプと、その読み方",
    types,
    howToRead: ed?.howToRead,
    faq: ed?.faq ?? [],
    related: [
      { href: "/diagnosis/cat-type", label: "恋愛猫タイプ診断" },
      { href: "/diagnosis/dog-lover", label: "恋愛犬タイプ診断" },
      { href: "/love-diagnosis", label: "恋愛診断一覧" },
      BLOG_LINK,
    ],
  };
}
