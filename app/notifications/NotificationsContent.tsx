"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconBell,
  IconClipboardHeart,
  IconBrain,
  IconNotes,
  IconRocket,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";
import {
  buildAllEntries,
  aggregate,
  NOTIFICATIONS_LS_KEY,
  type BlogNotifEntry,
  type NotificationCategory,
} from "./data";

const PAGE_SIZE = 10;

const categoryConfig: Record<NotificationCategory, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  launch: {
    label: "リリース",
    icon: IconRocket,
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  "love-diagnosis": {
    label: "恋愛診断",
    icon: IconClipboardHeart,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  "psychology-test": {
    label: "心理テスト",
    icon: IconBrain,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  "love-column": {
    label: "恋愛ブログ",
    icon: IconNotes,
    color: "text-orange-400",
    bg: "bg-orange-50",
  },
};

type AggItem = ReturnType<typeof aggregate>[number];

function summaryText(item: AggItem): string {
  const cfg = categoryConfig[item.category];
  if (item.category === "launch") return item.items[0].title;
  if (item.items.length === 1) return `「${item.items[0].title}」を追加しました`;
  return `${cfg.label}を${item.items.length}件追加しました`;
}

/** カテゴリーチップ + 日付。 */
function Meta({ item }: { item: AggItem }) {
  const cfg = categoryConfig[item.category];
  const Icon = cfg.icon;
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2">
      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.color} ${cfg.bg}`}>
        <Icon size={13} stroke={2} />
        {cfg.label}
      </span>
      <time className="text-xs text-text-sub">{item.date}</time>
    </div>
  );
}

export default function NotificationsContent() {
  const [page, setPage] = useState(1);
  const [blog, setBlog] = useState<BlogNotifEntry[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = (key: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  // 訪問時点で既読化（ベルのカウントをリセット）
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(NOTIFICATIONS_LS_KEY, today);
    window.dispatchEvent(new Event("notifications-visited"));
  }, []);

  // 恋愛ブログの新着を取得して一覧に反映
  useEffect(() => {
    let cancelled = false;
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data?.blog)) setBlog(data.blog as BlogNotifEntry[]);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const all = aggregate(buildAllEntries(blog));
  const totalPages = Math.ceil(all.length / PAGE_SIZE);
  const items = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="mx-auto max-w-[680px] px-4 py-10 sm:py-14">
      <div className="mb-8">
        <p className="mb-1 text-xs font-bold tracking-widest text-accent">NEWS</p>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center text-accent">
            <IconBell size={22} stroke={1.75} />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-text-main">お知らせ</h1>
        </div>
        <p className="mt-2 text-sm text-text-sub">【随時更新中】新しい更新はこちらに表示されます！</p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-pink-light bg-pink-pale/30 px-6 py-10 text-center text-sm text-text-sub">
          現在お知らせはありません
        </p>
      ) : (
        <>
          <ul className="list-none space-y-4">
            {items.map((item) => {
              const isBatch = item.items.length > 1;
              const single = item.items.length === 1 ? item.items[0] : null;
              const open = expanded.has(item.key);
              return (
                <li
                  key={item.key}
                  className="rounded-2xl border border-pink-light bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {isBatch ? (
                    <>
                      {/* 押すと個別の更新リストを展開 */}
                      <button
                        type="button"
                        onClick={() => toggleExpanded(item.key)}
                        aria-expanded={open}
                        className="w-full text-left"
                      >
                        <Meta item={item} />
                        <p className="flex items-center justify-between gap-2 font-semibold text-text-main">
                          <span>{summaryText(item)}</span>
                          <IconChevronDown
                            size={18}
                            stroke={2}
                            className={`shrink-0 text-text-sub transition-transform ${open ? "rotate-180" : ""}`}
                          />
                        </p>
                      </button>

                      {open && (
                        <ul className="mt-3 list-none space-y-1 border-t border-pink-light/60 pt-3">
                          {item.items.map((it, i) =>
                            it.href ? (
                              <li key={i}>
                                <Link
                                  href={it.href}
                                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-text-main transition-colors hover:bg-pink-pale/50 hover:text-accent"
                                >
                                  <span className="text-accent">・</span>
                                  <span className="min-w-0 flex-1 truncate">{it.title}</span>
                                  <IconChevronRight size={14} stroke={2} className="shrink-0 text-text-sub/50" />
                                </Link>
                              </li>
                            ) : (
                              <li key={i} className="flex items-center gap-2 px-2 py-1.5 text-sm text-text-main">
                                <span className="text-accent">・</span>
                                <span className="min-w-0 flex-1 truncate">{it.title}</span>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </>
                  ) : single?.href ? (
                    <Link href={single.href} className="block transition-colors hover:text-accent">
                      <Meta item={item} />
                      <p className="flex items-center justify-between gap-2 font-semibold text-text-main">
                        <span>{summaryText(item)}</span>
                        <IconChevronRight size={16} stroke={2} className="shrink-0 text-text-sub/50" />
                      </p>
                    </Link>
                  ) : (
                    <>
                      <Meta item={item} />
                      <p className="font-semibold text-text-main">{summaryText(item)}</p>
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => { setPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-light text-text-sub transition-colors hover:bg-pink-pale hover:text-accent disabled:opacity-30 disabled:pointer-events-none"
                aria-label="前のページ"
              >
                <IconChevronLeft size={18} stroke={1.75} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-accent text-white"
                      : "border border-pink-light text-text-sub hover:bg-pink-pale hover:text-accent"
                  }`}
                  aria-label={`${p}ページ目`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={page === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-light text-text-sub transition-colors hover:bg-pink-pale hover:text-accent disabled:opacity-30 disabled:pointer-events-none"
                aria-label="次のページ"
              >
                <IconChevronRight size={18} stroke={1.75} />
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
