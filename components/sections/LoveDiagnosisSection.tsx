"use client";

import { useState } from "react";
import DiagnosisCard from "@/components/DiagnosisCard";
import { diagnoses } from "@/lib/diagnoses";
import type { DiagnosisTag } from "@/lib/types";

interface Props {
  topOnly?: boolean;
}

const TAGS: { label: string; value: DiagnosisTag | null }[] = [
  { label: "恋愛", value: null },
  { label: "闇", value: "闇系" },
  { label: "ネタ", value: "ネタ系" },
  { label: "キャラ", value: "キャラ系" },
];

const PAGE_SIZE = 10;

function getPageNumbers(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.min(Math.max(currentPage - 1, 1), totalPages - 2);
  return [start, start + 1, start + 2];
}

export default function LoveDiagnosisSection({ topOnly = false }: Props) {
  const [activeTag, setActiveTag] = useState<DiagnosisTag | null>(null);
  const [page, setPage] = useState(1);

  const loveDiagnoses = diagnoses.filter(
    (d) =>
      d.category === "恋愛タイプ診断" &&
      (!topOnly || d.showOnTop !== false) &&
      (activeTag === null || d.tag === activeTag)
  );

  const totalPages = Math.ceil(loveDiagnoses.length / PAGE_SIZE);
  const paged = loveDiagnoses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleTagChange(value: DiagnosisTag | null) {
    setActiveTag((prev) => (prev === value ? null : value));
    setPage(1);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {TAGS.map(({ label, value }) => {
          const isActive = activeTag === value;
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleTagChange(value)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? "bg-accent text-white shadow-sm"
                  : "border border-pink-light bg-base text-text-sub hover:border-accent/50 hover:text-accent"
              }`}
            >
              #{label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {paged.map((diagnosis) => (
          <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-6 flex items-center justify-center gap-2" aria-label="ページ">
          {/* First */}
          <button
            type="button"
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-30"
            style={{ color: "#F067A6" }}
            aria-label="最初のページ"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M17 18l-6-6 6-6" /><path d="M11 18l-6-6 6-6" />
            </svg>
          </button>
          {/* Prev */}
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-30"
            style={{ color: "#F067A6" }}
            aria-label="前のページ"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          {/* Page numbers */}
          {getPageNumbers(page, totalPages).map((p) =>
            p === page ? (
              <span
                key={p}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                style={{ background: "linear-gradient(135deg, #F067A6, #F067A6cc)" }}
                aria-current="page"
              >
                {p}
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 text-xs font-normal transition-colors hover:bg-pink-50"
                style={{ color: "#5C4033" }}
              >
                {p}
              </button>
            )
          )}
          {/* Next */}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-30"
            style={{ color: "#F067A6" }}
            aria-label="次のページ"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          {/* Last */}
          <button
            type="button"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-30"
            style={{ color: "#F067A6" }}
            aria-label="最後のページ"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M7 18l6-6-6-6" /><path d="M13 18l6-6-6-6" />
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
}
