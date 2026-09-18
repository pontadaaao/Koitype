import Link from "next/link";

const FAQ = [
  {
    q: "生年月日だけで本当に相性がわかるのですか？",
    a: "占いの考え方にもとづいた結果であり、ふたりの関係を予測するものではありません。星座と数秘術という決まったルールで計算しているため、同じ誕生日の組み合わせなら常に同じ点数になります。当たる・当たらないを確かめるものというより、話のきっかけとして楽しむためのものです。",
  },
  {
    q: "点数が低く出ました。うまくいかないということですか？",
    a: "そうではありません。この診断は、ふたりの実際のやりとりや過ごした時間を一切見ていません。点数の高低より、結果と一緒に表示される「噛み合いやすい場面」「気をつけたい場面」のほうが、話す材料として使いやすいはずです。",
  },
  {
    q: "相手の誕生日を入力しても大丈夫ですか？",
    a: "入力された生年月日は、お使いのブラウザの中だけで計算に使われます。サーバーに送信されることも、保存されることもありません。ただし結果を共有するURLには入力した日付が含まれるため、SNSなどに公開する場合はご注意ください。",
  },
  {
    q: "同じ相手でも結果が変わることはありますか？",
    a: "ありません。計算方法が固定されているため、同じ生年月日の組み合わせなら何度試しても同じ結果になります。",
  },
];

/**
 * 相性診断ページの説明セクション。
 *
 * このページは入力フォームだけで、何をどう計算しているのか、
 * 入力した誕生日がどう扱われるのかがどこにも書かれていなかった。
 * 結果の有無にかかわらず常に表示する。
 */
export default function CompatibilityAbout() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const h2 = "font-heading text-lg font-bold text-text-main sm:text-xl";
  const body = "text-sm leading-relaxed text-text-sub";

  return (
    <section className="mt-12 space-y-9" aria-label="相性診断の詳しい説明">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div>
        <h2 className={h2}>誕生日でわかる ふたりの相性診断とは</h2>
        <p className={`mt-3 ${body}`}>
          ふたりの生年月日を入力するだけで、相性スコアとその内訳が出る無料の相性診断です。
          名前やメールアドレスの入力は必要なく、登録もいりません。所要時間は1分ほどです。
        </p>
        <p className={`mt-3 ${body}`}>
          結果では、総合スコアとランクのほかに、ふたりの組み合わせで噛み合いやすい部分と、
          擦れ違いが起きやすい部分を表示します。恋人どうしだけでなく、
          気になっている相手や友人との組み合わせでも試せます。
        </p>
      </div>

      <div>
        <h2 className={h2}>何をもとに計算しているか</h2>
        <p className={`mt-3 ${body}`}>
          スコアは、次の2つを組み合わせて算出しています。占いの一般的な考え方にもとづくもので、
          統計データや心理学の研究にもとづくものではありません。
        </p>
        <ul className="mt-3 space-y-2">
          <li className={`flex gap-2 ${body}`}>
            <span aria-hidden className="text-accent">
              ♡
            </span>
            <span>
              <span className="font-bold text-text-main">星座（西洋占星術）</span>
              ：生まれた月日から星座を割り出し、火・地・風・水のエレメントの組み合わせで相性を見ます。
            </span>
          </li>
          <li className={`flex gap-2 ${body}`}>
            <span aria-hidden className="text-accent">
              ♡
            </span>
            <span>
              <span className="font-bold text-text-main">数秘術</span>
              ：生年月日の数字を一定の規則で足し合わせて1桁にした「運命数」を出し、その組み合わせで相性を見ます。
            </span>
          </li>
        </ul>
        <p className={`mt-3 ${body}`}>
          計算方法は固定なので、同じ生年月日の組み合わせなら結果は常に同じになります。
        </p>
      </div>

      <div>
        <h2 className={h2}>入力した誕生日の扱い</h2>
        <p className={`mt-3 ${body}`}>
          入力された生年月日は、お使いのブラウザの中だけで計算に使われます。
          本サイトのサーバーや外部サービスに送信されることも、保存されることもありません。
        </p>
        <p className={`mt-3 ${body}`}>
          ただし、結果を共有するためのURLには入力した日付が含まれます。
          第三者の誕生日を含むURLをSNSなどに公開すると、その方の生年月日が公開されることになります。
          共有する際はご注意ください。
        </p>
      </div>

      <div>
        <h2 className={h2}>結果の読み方</h2>
        <p className={`mt-3 ${body}`}>
          この診断は娯楽として提供しているもので、ふたりの関係の良し悪しを判定するものではありません。
          実際の相性は、一緒に過ごした時間や、すれ違ったときにどう話し合えるかで決まります。
          スコアを、相手との関係を決めたり、別れる・付き合うといった判断の根拠にしたりしないでください。
        </p>
      </div>

      <div>
        <h2 className={h2}>よくある質問</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-pink-light bg-base p-5 shadow-sm"
            >
              <p className="font-bold text-text-main">Q. {item.q}</p>
              <p className={`mt-2 ${body}`}>A. {item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <Link
          href="/love-diagnosis"
          className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
        >
          恋愛診断一覧
        </Link>
        <Link
          href="/diagnosis/dog-cat"
          className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
        >
          犬系？猫系？恋愛スタイル診断
        </Link>
        <Link
          href="/koi-mikuji"
          prefetch={false}
          className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
        >
          恋みくじ
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
        >
          恋愛ブログ
        </Link>
      </div>
    </section>
  );
}
