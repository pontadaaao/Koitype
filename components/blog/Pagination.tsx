"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/** 表示するページ番号（多い場合は省略記号を挟む）。 */
function pageWindow(page: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const out: (number | "…")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

/** 記事一覧用のページネーション（クライアント）。totalPages<=1 なら非表示。 */
export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const nums = pageWindow(page, totalPages);

  const arrowBase =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors";

  return (
    <nav
      aria-label="ページ送り"
      className="mt-8 flex items-center justify-center gap-1.5 sm:gap-2"
    >
      {/* 前へ */}
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="前のページ"
        className={`${arrowBase} ${
          page === 1
            ? "cursor-not-allowed border-pink-light/60 text-text-sub/30"
            : "border-pink-light text-accent hover:bg-pink-pale"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* ページ番号 */}
      {nums.map((n, i) =>
        n === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-9 w-6 items-center justify-center text-sm text-text-sub/50"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n}ページ目`}
            aria-current={n === page ? "page" : undefined}
            className={`flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-medium transition-colors ${
              n === page
                ? "bg-accent text-white shadow-sm"
                : "border border-pink-light bg-white text-text-sub hover:border-accent/50 hover:text-accent"
            }`}
          >
            {n}
          </button>
        )
      )}

      {/* 次へ */}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="次のページ"
        className={`${arrowBase} ${
          page === totalPages
            ? "cursor-not-allowed border-pink-light/60 text-text-sub/30"
            : "border-pink-light text-accent hover:bg-pink-pale"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}
