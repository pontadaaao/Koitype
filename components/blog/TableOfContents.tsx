"use client";

import { useState } from "react";
import type { Heading } from "@/lib/sanitize-html";

interface TableOfContentsProps {
  headings: Heading[];
}

/**
 * 目次。
 * - h2/h3 見出しから生成（見出しが2つ未満なら非表示）
 * - スマホでは開閉式、クリックで該当箇所へスムーススクロール
 */
export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [open, setOpen] = useState(true);

  if (headings.length < 2) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return; // 該当箇所が無ければブラウザ既定に任せる
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    // URL ハッシュも更新（履歴を汚さない）
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="目次"
      className="my-6 rounded-2xl border border-pink-light bg-sub-bg px-4 py-4 sm:my-8 sm:px-5"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-1.5 text-sm font-bold text-text-main">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-accent"
            aria-hidden="true"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          目次
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 text-text-sub transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ol className="mt-3 space-y-1.5">
          {headings.map((h, i) => (
            <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className="flex items-start gap-2 text-sm text-accent hover:underline"
              >
                <span className="mt-0.5 shrink-0 text-[10px] font-bold text-accent/60">
                  {h.level === 2 ? `${i + 1}` : "└"}
                </span>
                <span>{h.text}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
