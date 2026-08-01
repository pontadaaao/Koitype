"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  buildAllEntries,
  aggregate,
  type BlogNotifEntry,
  type NotificationCategory,
} from "@/app/notifications/data";

const CATEGORY_LABEL: Record<NotificationCategory, string> = {
  launch: "リリース",
  "love-diagnosis": "恋愛診断",
  "psychology-test": "心理テスト",
  "love-column": "恋愛ブログ",
};

const MAX_ITEMS = 8;

/** "YYYY.MM.DD" → "M/D"。 */
function toShortDate(display: string): string {
  const parts = display.split(".");
  if (parts.length !== 3) return display;
  return `${parseInt(parts[1], 10)}/${parseInt(parts[2], 10)}`;
}

function summaryText(item: ReturnType<typeof aggregate>[number]): string {
  if (item.category === "launch") return item.items[0].title;
  if (item.items.length === 1) return item.items[0].title;
  return `${CATEGORY_LABEL[item.category]}を${item.items.length}件追加`;
}

/**
 * TOPページのバナーに出す「最新の更新情報」横スクロールティッカー。
 * 診断・心理テスト・恋愛ブログ・リリースのお知らせ(app/notifications/data.ts と同じ集計)
 * から直近 MAX_ITEMS 件を「M/D タイトル」形式で流す。クリックでお知らせ一覧へ。
 */
export default function UpdatesTicker() {
  const [blog, setBlog] = useState<BlogNotifEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data?.blog)) {
          setBlog(data.blog as BlogNotifEntry[]);
        }
      })
      .catch(() => {
        /* 取得失敗時はコード内データのみで表示（壊れない） */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const items = aggregate(buildAllEntries(blog))
    .slice(0, MAX_ITEMS)
    .map((item) => `${toShortDate(item.date)} ${summaryText(item)}`);

  if (items.length === 0) return null;

  return (
    <Link
      href="/notifications"
      aria-label={`更新情報: ${items[0]} ほか。お知らせ一覧を見る`}
      className="group mb-2 flex max-w-full items-center gap-2 overflow-hidden rounded-full bg-accent/10 px-3 py-1.5 text-accent"
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a2 2 0 002-2H8a2 2 0 002 2z" />
      </svg>
      <span className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]">
        <span className="ticker-track flex w-max items-center gap-10 whitespace-nowrap text-[11px] font-bold">
          {[...items, ...items].map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}
