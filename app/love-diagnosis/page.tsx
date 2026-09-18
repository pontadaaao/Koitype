import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import LoveDiagnosisSection from "@/components/sections/LoveDiagnosisSection";
import DiagnosisSlider from "@/components/DiagnosisSlider";
import { SITE_DEFAULT_URL, SITE_NAME, siteTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: siteTitle("恋愛診断"),
  description: "あなたの恋愛タイプやスタイルがわかる無料の恋愛診断一覧です。恋愛スタイル・犬系猫系・束縛度など多彩な診断で自分を知ろう。",
  alternates: { canonical: `${SITE_DEFAULT_URL}/love-diagnosis` },
  openGraph: {
    title: `恋愛診断 | ${SITE_NAME}`,
    description: "あなたの恋愛タイプやスタイルがわかる無料の恋愛診断一覧。",
    url: `${SITE_DEFAULT_URL}/love-diagnosis`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `恋愛診断 | ${SITE_NAME}`,
    description: "あなたの恋愛タイプやスタイルがわかる無料の恋愛診断一覧。",
  },
};

const DIAGNOSIS_GUIDE = [
  {
    want: "自分の恋愛のクセを知りたい",
    pick: "愛着スタイル診断・恋愛スタイル診断・恋愛弱点診断。不安になったときや対立したときの反応から、繰り返しやすいパターンを整理します。",
  },
  {
    want: "相手からどう見えているか知りたい",
    pick: "好きな人から見たあなた診断・男子から見たあなた診断・女子から見たあなた診断。自己認識とのずれが出やすい診断です。",
  },
  {
    want: "距離感や愛情表現を確かめたい",
    pick: "犬系？猫系？恋愛スタイル診断・恋愛猫タイプ診断・恋愛犬タイプ診断・束縛度診断・重女度診断。",
  },
  {
    want: "同じ失敗を繰り返す理由を知りたい",
    pick: "歴代の恋人に共通する地雷診断・元彼が逃げる理由診断・元彼に言われがちな一言診断。",
  },
  {
    want: "軽く楽しみたい・友達と盛り上がりたい",
    pick: "恋愛キャッチコピー診断・前世の恋人診断・恋愛黒歴史診断・恋愛ポンコツ度診断。",
  },
];

const RELATED_LINKS = [
  { href: "/tests", label: "1問でわかる恋愛心理テスト" },
  { href: "/compatibility", label: "誕生日でわかる相性診断" },
  { href: "/blog", label: "恋愛ブログ" },
  { href: "/about", label: "診断の作り方について" },
];

export default function LoveDiagnosisPage() {
  return (
    <>
      <div className="min-h-screen bg-base">
        <SiteHeader showBack={false} />

        <main className="mx-auto max-w-xl px-4 pb-6 pt-4 sm:max-w-3xl sm:pt-6 lg:max-w-5xl">
          <div className="mb-8 text-center">
            <p className="mb-1 font-cormorant text-sm italic tracking-widest text-accent/70">
              Diagnosis
            </p>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl" style={{ color: "#5C4033" }}>
              恋愛診断
            </h1>
            <p className="mt-2 text-xs text-text-main">
              恋愛タイプがわかる診断一覧
            </p>
          </div>
          <DiagnosisSlider />
          <LoveDiagnosisSection />

          {/*
            以前このページはカードのタイトルが並ぶだけで、
            ページ自体が何を提供しているのかを説明する文章が無かった。
            一覧ページとしての説明をサーバー側で出す。
          */}
          <section className="mx-auto mt-14 max-w-2xl space-y-9">
            <div>
              <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
                Koitypeの恋愛診断について
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                このページでは、Koitype編集部が制作した恋愛診断をまとめています。
                いずれも登録不要・無料で、スマートフォンのブラウザだけで受けられます。
                1つの診断は5〜12問程度で、所要時間は2〜4分ほどです。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                質問への回答はお使いのブラウザの中だけで処理され、
                サーバーに送信・保存されることはありません。
                結果は何度でも受け直せるので、気になった診断から順に試してみてください。
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
                どの診断を選べばいい？
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                知りたいことによって、向いている診断が変わります。
              </p>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-text-sub">
                {DIAGNOSIS_GUIDE.map((row) => (
                  <li key={row.want} className="flex flex-col gap-0.5">
                    <span className="font-bold text-text-main">{row.want}</span>
                    <span>{row.pick}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
                結果の読み方
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                各診断は、恋愛でよく見られる行動や考え方のパターンを編集部が整理して分類したものです。
                心理学の一般的な考え方を参考にした設問はありますが、学術的な検査を再現したものではなく、
                精度の検証や専門家による監修は行っていません。
                結果は「自分を説明する正解」ではなく、自分の傾向を言葉にして眺めるきっかけとしてお使いください。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-sub">
                本サイトのコンテンツは、医学的・心理学的な診断や治療の代わりにはなりません。
                気分の落ち込みが続く、日常生活に支障が出ているといった場合は、
                医療機関や公的な相談窓口にご相談ください。
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {RELATED_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-pink-light bg-pink-pale px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-pink-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      <SiteFooter />
    </>
  );
}
