"use client";

import { useState } from "react";
import {
  IconBell,
  IconClipboardHeart,
  IconBrain,
  IconNotes,
  IconRocket,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";
import { staticColumns } from "@/lib/static-columns";
import { specialEntries, type NotificationCategory } from "./data";

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
    label: "恋愛コラム",
    icon: IconNotes,
    color: "text-orange-400",
    bg: "bg-orange-50",
  },
};

type RawEntry = { date: string; category: NotificationCategory; title: string };
type AggregatedItem = { key: string; date: string; category: NotificationCategory; titles: string[] };

function toDisplayDate(iso: string): string {
  return iso.replace(/-/g, ".");
}

function buildAllEntries(): RawEntry[] {
  return [
    ...specialEntries,
    ...diagnoses
      .filter((d) => d.publishedAt)
      .map((d) => ({ date: toDisplayDate(d.publishedAt!), category: "love-diagnosis" as const, title: d.title })),
    ...loveTests
      .filter((t) => t.publishedAt)
      .map((t) => ({ date: toDisplayDate(t.publishedAt!), category: "psychology-test" as const, title: t.title })),
    ...staticColumns.map((c) => ({
      date: toDisplayDate(c.publishedAt),
      category: "love-column" as const,
      title: c.title,
    })),
  ];
}

function aggregate(entries: RawEntry[]): AggregatedItem[] {
  const map = new Map<string, AggregatedItem>();
  for (const e of entries) {
    const key = `${e.date}__${e.category}`;
    const existing = map.get(key);
    if (existing) {
      existing.titles.push(e.title);
    } else {
      map.set(key, { key, date: e.date, category: e.category, titles: [e.title] });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
}

function buildTitle(item: AggregatedItem): string {
  const cfg = categoryConfig[item.category];
  if (item.category === "launch") return item.titles[0];
  if (item.titles.length === 1) return `「${item.titles[0]}」を追加しました`;
  return `${cfg.label}を${item.titles.length}件追加しました`;
}

export default function NotificationsContent() {
  const [page, setPage] = useState(1);
  const all = aggregate(buildAllEntries());
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
              const cfg = categoryConfig[item.category];
              const Icon = cfg.icon;
              return (
                <li
                  key={item.key}
                  className="rounded-2xl border border-pink-light bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.color} ${cfg.bg}`}>
                      <Icon size={13} stroke={2} />
                      {cfg.label}
                    </span>
                    <time className="text-xs text-text-sub">{item.date}</time>
                  </div>
                  <p className="font-semibold text-text-main">{buildTitle(item)}</p>
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
