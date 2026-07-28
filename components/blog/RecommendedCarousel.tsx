import Link from "next/link";
import Image from "next/image";
import type { BlogCardData } from "@/components/blog/types";

/**
 * 恋愛ブログ上部の「おすすめ記事」横スクロールカルーセル。
 * microCMS でおすすめ指定された新着記事を最大5件表示する。
 */
export default function RecommendedCarousel({
  articles,
}: {
  articles: BlogCardData[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="mb-8" aria-label="おすすめ記事">
      <div className="mb-3 flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-accent" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <h2 className="font-heading text-base font-bold sm:text-lg" style={{ color: "#5C4033" }}>
          おすすめ記事
        </h2>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 scrollbar-hide sm:gap-4">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/blog/${a.slug}`}
            aria-label={a.title}
            className="group flex w-[236px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-pink-light/70 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md sm:w-[264px]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-pink-pale">
              {a.eyecatchUrl ? (
                <Image
                  src={a.eyecatchUrl}
                  alt={a.title}
                  fill
                  sizes="264px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-pale to-cat-light">
                  <span className="text-3xl" aria-hidden="true">♡</span>
                </div>
              )}
              <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                おすすめ
              </span>
            </div>
            <div className="flex flex-1 flex-col p-3">
              <h3
                className="line-clamp-2 font-heading text-sm font-bold leading-snug transition-colors group-hover:text-accent"
                style={{ color: "#5C4033" }}
              >
                {a.title}
              </h3>
              <span className="mt-2 text-[11px] text-log-hint">{a.categoryName}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
