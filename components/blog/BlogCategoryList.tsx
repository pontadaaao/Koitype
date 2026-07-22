"use client";

import { useRef, useState } from "react";
import ArticleCard from "@/components/blog/ArticleCard";
import Pagination from "@/components/blog/Pagination";
import type { BlogCardData } from "@/components/blog/types";

const PAGE_SIZE = 10;

/** カテゴリー別一覧の記事グリッド（10件ごとにページ分割）。 */
export default function BlogCategoryList({ articles }: { articles: BlogCardData[] }) {
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const shown = articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (next: number) => {
    setPage(next);
    if (topRef.current) {
      const top =
        topRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div ref={topRef} className="scroll-mt-20">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {shown.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <Pagination page={currentPage} totalPages={totalPages} onChange={goToPage} />
    </div>
  );
}
