import Link from "next/link";

export type QuizContentType = {
  name: string;
  tagline?: string;
  description?: string;
  points?: string[];
  /** points の見出し（任意）。 */
  pointsLabel?: string;
  notes?: { label: string; text: string }[];
  tags?: string[];
  /** 相性（結果データの compat）。 */
  compat?: { name: string; desc: string; score?: string }[];
  /** 関わり方のヒント（結果データの manual）。 */
  manual?: { title: string; desc: string }[];
  /** 結果のまとめ（結果データの prescription）。 */
  closing?: string;
};

export type QuizFaqItem = { q: string; a: string };

export type QuizRelatedLink = { href: string; label: string };

export interface QuizContentProps {
  title: string;
  aboutHeading: string;
  intro: string[];
  /** この診断の進め方（設問数・所要時間・回答方法）。 */
  howTo?: {
    questionCount?: number;
    durationMinutes?: number;
    /** 回答方法の説明。設問形式が違う診断があるので個別に渡す。 */
    answerMethod: string;
  };
  /** どんな人に向いているか。 */
  forWhom?: string[];
  /** 判定に使っている観点。 */
  axes?: string[];
  typesHeading: string;
  types: QuizContentType[];
  /** 結果の読み方と限界。診断ごとに書き分ける。 */
  howToRead?: string;
  faq: QuizFaqItem[];
  related?: QuizRelatedLink[];
  accentColor?: string;
}

/**
 * クイズの下に置く、サーバーレンダリングの解説セクション。
 *
 * 診断の中身（結果タイプの説明・相性・アドバイス）はすべてクライアント
 * コンポーネントの中にあり、ユーザーが回答するまで DOM に出ない。
 * このコンポーネントは同じ情報を最初から HTML として出し、
 * 「この診断が何なのか」を読んだだけで分かるようにするためのもの。
 *
 * 文章は lib/diagnosis-editorial.ts / lib/love-test-editorial.ts に
 * 診断ごとに書き下ろしたものを渡す。共通テンプレートは使わない。
 */
export default function QuizContent({
  title,
  aboutHeading,
  intro,
  howTo,
  forWhom,
  axes,
  typesHeading,
  types,
  howToRead,
  faq,
  related,
  accentColor = "#F067A6",
}: QuizContentProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const h2 = "font-heading text-lg font-bold text-text-main sm:text-xl";
  const body = "text-sm leading-relaxed text-text-sub";
  const card = "rounded-2xl border border-pink-light bg-base p-5 shadow-sm";

  return (
    <section className="bg-base px-4 pb-14 pt-2" aria-label={`${title}の詳しい解説`}>
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="mx-auto max-w-2xl space-y-10">
        {/* この診断でわかること */}
        <div>
          <h2 className={h2}>{aboutHeading}</h2>
          <div className="mt-3 space-y-3">
            {intro.map((p, i) => (
              <p key={i} className={body}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* 進め方 */}
        {howTo && (
          <div>
            <h2 className={h2}>答え方と所要時間</h2>
            <dl className={`mt-4 ${card} space-y-2.5`}>
              {typeof howTo.questionCount === "number" && howTo.questionCount > 0 && (
                <div className="flex gap-3 text-sm">
                  <dt className="w-20 shrink-0 font-bold text-text-main">質問数</dt>
                  <dd className="text-text-sub">全{howTo.questionCount}問</dd>
                </div>
              )}
              {typeof howTo.durationMinutes === "number" && howTo.durationMinutes > 0 && (
                <div className="flex gap-3 text-sm">
                  <dt className="w-20 shrink-0 font-bold text-text-main">所要時間</dt>
                  <dd className="text-text-sub">約{howTo.durationMinutes}分</dd>
                </div>
              )}
              <div className="flex gap-3 text-sm">
                <dt className="w-20 shrink-0 font-bold text-text-main">答え方</dt>
                <dd className="leading-relaxed text-text-sub">{howTo.answerMethod}</dd>
              </div>
              <div className="flex gap-3 text-sm">
                <dt className="w-20 shrink-0 font-bold text-text-main">料金</dt>
                <dd className="text-text-sub">無料・登録不要（何度でも受けられます）</dd>
              </div>
            </dl>
          </div>
        )}

        {/* こんな人に */}
        {forWhom && forWhom.length > 0 && (
          <div>
            <h2 className={h2}>こんな人におすすめ</h2>
            <ul className="mt-4 space-y-2">
              {forWhom.map((item, i) => (
                <li key={i} className={`flex gap-2 ${body}`}>
                  <span aria-hidden style={{ color: accentColor }}>
                    ♡
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 判定の観点 */}
        {axes && axes.length > 0 && (
          <div>
            <h2 className={h2}>何を見て判定しているか</h2>
            <p className={`mt-3 ${body}`}>
              設問は、次の点を確かめるために用意しています。
            </p>
            <ul className="mt-3 space-y-2">
              {axes.map((item, i) => (
                <li key={i} className={`flex gap-2 ${body}`}>
                  <span
                    aria-hidden
                    className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 結果タイプ */}
        {types.length > 0 && (
          <div>
            <h2 className={h2}>{typesHeading}</h2>
            <div className="mt-4 space-y-4">
              {types.map((type, i) => (
                <div key={i} className={card}>
                  <h3
                    className="whitespace-pre-line font-heading text-base font-bold sm:text-lg"
                    style={{ color: accentColor }}
                  >
                    {type.name}
                  </h3>
                  {type.tagline && (
                    <p className="mt-1 text-sm font-medium text-text-main">
                      {type.tagline}
                    </p>
                  )}
                  {type.tags && type.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {type.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="rounded-full border border-pink-light bg-pink-pale px-2.5 py-0.5 text-xs text-tag-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {type.description && (
                    <p className={`mt-2.5 ${body}`}>{type.description}</p>
                  )}
                  {type.points && type.points.length > 0 && type.pointsLabel && (
                    <p className="mt-2.5 text-sm font-bold text-text-main">
                      {type.pointsLabel}
                    </p>
                  )}
                  {type.points && type.points.length > 0 && (
                    <ul className="mt-2.5 space-y-1.5">
                      {type.points.map((point, j) => (
                        <li key={j} className={`flex gap-2 ${body}`}>
                          <span aria-hidden style={{ color: accentColor }}>
                            ♡
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {type.notes &&
                    type.notes.map((note, j) => (
                      <p key={j} className={`mt-2.5 ${body}`}>
                        <span className="font-bold text-text-main">
                          {note.label}：
                        </span>
                        {note.text}
                      </p>
                    ))}

                  {type.compat && type.compat.length > 0 && (
                    <div className="mt-3.5">
                      <p className="text-sm font-bold text-text-main">相性</p>
                      <ul className="mt-1.5 space-y-1.5">
                        {type.compat.map((c, j) => (
                          <li key={j} className={body}>
                            <span className="font-medium text-text-main">
                              {c.name}
                              {c.score ? `（${c.score}）` : ""}
                            </span>
                            ：{c.desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {type.manual && type.manual.length > 0 && (
                    <div className="mt-3.5">
                      <p className="text-sm font-bold text-text-main">
                        このタイプとの関わり方
                      </p>
                      <ul className="mt-1.5 space-y-1.5">
                        {type.manual.map((m, j) => (
                          <li key={j} className={body}>
                            <span className="font-medium text-text-main">
                              {m.title}
                            </span>
                            ：{m.desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {type.closing && (
                    <p className={`mt-3.5 border-t border-pink-light pt-3 ${body}`}>
                      {type.closing}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 結果の読み方 */}
        {howToRead && (
          <div>
            <h2 className={h2}>結果の読み方と注意点</h2>
            <p className={`mt-3 ${body}`}>{howToRead}</p>
          </div>
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <div>
            <h2 className={h2}>よくある質問</h2>
            <div className="mt-4 space-y-3">
              {faq.map((item, i) => (
                <div key={i} className={card}>
                  <p className="font-bold text-text-main">Q. {item.q}</p>
                  <p className={`mt-2 ${body}`}>A. {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 関連リンク */}
        {related && related.length > 0 && (
          <div>
            <h2 className={h2}>関連ページ</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {related.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
