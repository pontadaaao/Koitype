import Link from "next/link";
import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";
import { staticColumns } from "@/lib/static-columns";

/**
 * Server-rendered link index for the homepage.
 *
 * The interactive homepage (HomePageClient) loads its test list via a
 * useEffect, so those links are absent from the initial HTML and the page
 * ships few crawlable internal links. This section renders the full set of
 * diagnosis / test / column links server-side, giving crawlers the complete
 * internal link graph from the site's most authoritative page so pages are
 * discovered and prioritised for indexing (not found via the sitemap alone).
 */
export default function HomeContentIndex() {
  const diagnosisLinks = diagnoses.filter((d) => d.id !== "compatibility");
  const recentColumns = staticColumns
    .slice()
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  const pill =
    "rounded-full border border-pink-light bg-base px-3 py-1.5 text-xs text-text-sub transition-colors hover:bg-pink-pale hover:text-accent";

  return (
    <section className="border-t border-pink-light bg-sub-bg px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-lg font-bold text-text-main sm:text-xl">
          診断・心理テストをさがす
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-sub">
          Koitypeのすべての恋愛診断・心理テスト・コラムの一覧です。気になるものを選んで、あなたの恋愛タイプや相性、今日の恋愛運をチェックしてみましょう。
        </p>

        {/* Diagnoses */}
        <h3 className="mt-8 font-heading text-base font-bold text-text-main">
          恋愛診断（{diagnosisLinks.length}種類）
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {diagnosisLinks.map((d) => (
            <li key={d.id}>
              <Link href={`/diagnosis/${d.id}`} className={pill}>
                {d.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/compatibility" className={pill}>
              相性診断
            </Link>
          </li>
          <li>
            <Link href="/koi-mikuji" className={pill}>
              恋みくじ
            </Link>
          </li>
        </ul>

        {/* Tests */}
        <h3 className="mt-8 font-heading text-base font-bold text-text-main">
          恋愛心理テスト（{loveTests.length}種類）
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {loveTests.map((t) => (
            <li key={t.slug}>
              <Link href={`/tests/${t.slug}`} className={pill}>
                {t.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Columns & hubs */}
        <h3 className="mt-8 font-heading text-base font-bold text-text-main">
          恋愛コラム・その他
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          <li>
            <Link href="/love-diagnosis" className={pill}>
              恋愛診断一覧
            </Link>
          </li>
          <li>
            <Link href="/tests" className={pill}>
              心理テスト一覧
            </Link>
          </li>
          <li>
            <Link href="/columns" className={pill}>
              恋愛コラム一覧
            </Link>
          </li>
          <li>
            <Link href="/log" className={pill}>
              恋ログ
            </Link>
          </li>
          {recentColumns.map((c) => (
            <li key={c.slug}>
              <Link href={`/columns/${c.slug}`} className={pill}>
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
