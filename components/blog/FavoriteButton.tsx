"use client";

import { useEffect, useState } from "react";
import {
  FAVORITES_CHANGED_EVENT,
  isFavorite,
  toggleFavorite,
} from "@/components/blog/favorites";

interface FavoriteButtonProps {
  slug: string;
  /** "card" = 記事カード内の小さいボタン / "detail" = 記事詳細の大きめボタン */
  variant?: "card" | "detail";
  className?: string;
}

/**
 * 星型のお気に入りボタン。
 * - localStorage に保存（ページを閉じても保持）
 * - SSR 時は未登録状態で描画し、マウント後に実際の状態へ同期
 * - 他の場所での変更にもイベントで追従
 */
export default function FavoriteButton({
  slug,
  variant = "card",
  className = "",
}: FavoriteButtonProps) {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setActive(isFavorite(slug));
    const sync = () => setActive(isFavorite(slug));
    window.addEventListener(FAVORITES_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAVORITES_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  const handleClick = (e: React.MouseEvent) => {
    // カード全体がリンクの場合に遷移させない
    e.preventDefault();
    e.stopPropagation();
    setActive(toggleFavorite(slug));
  };

  const isDetail = variant === "detail";
  const label = active ? "お気に入りから削除" : "お気に入りに追加";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={mounted ? active : undefined}
      aria-label={label}
      title={label}
      className={[
        "inline-flex items-center justify-center gap-1.5 rounded-full transition-all duration-200 active:scale-90",
        isDetail
          ? "border px-4 py-2 text-sm font-bold"
          : "h-8 w-8 shrink-0",
        active
          ? isDetail
            ? "border-accent bg-pink-pale text-accent"
            : "text-accent"
          : isDetail
          ? "border-pink-light bg-white text-text-sub hover:border-accent/50 hover:text-accent"
          : "text-text-sub/50 hover:text-accent",
        className,
      ].join(" ")}
    >
      <svg
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isDetail ? "h-4 w-4" : "h-5 w-5"}
        aria-hidden="true"
      >
        <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.8l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94z" />
      </svg>
      {isDetail && <span>{active ? "お気に入り済み" : "お気に入り"}</span>}
    </button>
  );
}
