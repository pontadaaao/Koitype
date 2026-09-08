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
    faq: diagnosis.faq ?? [],
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
    faq: test.faq ?? [],
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
    faq: [
      {
        q: "恋愛における猫系と犬系の違いは何ですか？",
        a: "猫系は自分のペースや一人の時間を大切にし、好意をストレートに出さない傾向があります。対して犬系は感情表現がわかりやすく、相手と一緒にいる時間そのものを喜びます。どちらが良い悪いではなく、愛情の示し方が違うだけです。",
      },
      {
        q: "猫系は恋愛で冷たいと思われがちですが本当ですか？",
        a: "冷たいというより、好意の伝え方が控えめなだけであることがほとんどです。猫系は好きな相手ほど態度に出すのを恥ずかしがったり、距離感を測りすぎたりします。実際には一途で、心を許した相手には深く懐くタイプも少なくありません。",
      },
      {
        q: "猫系タイプの人と親しくなるにはどうすればいいですか？",
        a: "追いかけすぎないことが何より大切です。猫系は自分のペースを崩されると距離を取りたくなります。連絡の頻度を相手に合わせ、会えない時間を責めないこと。相手から近づいてきたタイミングを逃さず受け止めると、少しずつ心を開いてくれます。",
      },
    ],
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
    faq: [
      {
        q: "好きな人から見た自分の印象は、後から変えられますか？",
        a: "変えられます。第一印象は会話量と接触回数で上書きされていくため、関係が浅い段階ほど変化しやすいです。ただし無理にキャラクターを作ると不自然さが伝わります。今の印象を土台にして、見せられていない一面を少しずつ出していくほうが自然に伝わります。",
      },
      {
        q: "相手が本当はどう思っているか知る方法はありますか？",
        a: "言葉より、相手からの働きかけの量に注目してください。自分から質問してくる、予定を合わせようとする、返事が早いといった行動は好意のサインになりやすいです。逆にこちらからの発信にだけ反応が返る状態が続く場合は、まだ関心が育っていない可能性があります。",
      },
      {
        q: "診断結果が思っていた印象と違いました。",
        a: "自己認識と他者から見た印象がずれるのはよくあることです。特に緊張しやすい人は、本人が思うより「クールに見えている」ことが多くあります。結果は答え合わせというより、自分では気づきにくい見え方を知るきっかけとして受け取ってみてください。",
      },
    ],
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
    faq: [
      {
        q: "犬系の愛情表現は重いと思われませんか？",
        a: "受け取る相手によります。同じ熱量を返せる相手には安心材料になりますが、一人の時間を重視する相手には負担になることもあります。重さの正体は愛情の量ではなく、相手のペースを確認しないまま渡し続けることです。返ってくる反応を見ながら調整できれば、犬系の素直さは強い魅力になります。",
      },
      {
        q: "犬系でも駆け引きをしたほうがいいですか？",
        a: "無理に駆け引きをする必要はありません。犬系の強みは、相手に「好かれている」という安心感を与えられることです。駆け引きを覚えるより、自分の予定や好きなことを大切にする時間を確保するほうが、結果として健全な距離感につながります。",
      },
      {
        q: "犬系タイプは相手に尽くしすぎてしまいます。",
        a: "尽くすこと自体は悪くありませんが、見返りを期待した我慢が積み重なると苦しくなります。相手のために動く前に、自分がそれを負担なくできるかを一度確認してみてください。断ることができる関係のほうが、結果的に長く続きやすくなります。",
      },
    ],
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
    faq: [
      {
        q: "犬系と猫系はどちらがモテますか？",
        a: "どちらが有利ということはありません。犬系はわかりやすい好意で安心感を与え、猫系は簡単に心を開かない分だけ特別感を持たれやすくなります。モテを左右するのはタイプそのものより、相手との相性と距離の取り方です。",
      },
      {
        q: "犬系と猫系のカップルはうまくいきますか？",
        a: "相性としては噛み合いやすい組み合わせです。犬系が愛情を示し、猫系がそれを受け取る形で関係が安定しやすくなります。注意点は連絡頻度のずれで、犬系が返信の遅さを冷たさと受け取ると擦れ違いが起きます。お互いの基準を最初に話しておくと安心です。",
      },
      {
        q: "診断結果は時期によって変わりますか？",
        a: "変わることがあります。犬系・猫系の傾向は生まれ持った性格だけでなく、そのときの相手や恋愛の状況にも左右されるためです。好きな相手の前では猫系寄りになる人もいます。時間を空けて試すと、自分の変化が見えて面白いかもしれません。",
      },
    ],
    related: COMMON_RELATED,
  };
}
