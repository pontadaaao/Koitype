"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { IconMenu2, IconUserHeart, IconX } from "@tabler/icons-react";
import { useLanguage } from "@/components/LanguageProvider";
import SiteLogo from "@/components/SiteLogo";
import HeaderNavTabs from "@/components/HeaderNavTabs";
import SiteSearch from "@/components/SiteSearch";
import AppIcon from "@/components/AppIcon";
import { navItems } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site";
import {
  aggregate,
  buildAllEntries,
  getUnreadCount,
  NOTIFICATIONS_LS_KEY,
  type BlogNotifEntry,
} from "@/app/notifications/data";
import {
  FAVORITES_CHANGED_EVENT,
  getFavorites,
} from "@/components/blog/favorites";

interface SiteHeaderProps {
  backHref?: string;
  backLabel?: string;
  showBack?: boolean;
  showNavTabs?: boolean;
  showSearch?: boolean;
  solidBg?: boolean;
}

export default function SiteHeader({
  backHref = "/",
  backLabel,
  showBack = true,
  showNavTabs = true,
  showSearch = true,
  solidBg = false,
}: SiteHeaderProps) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let blogEntries: BlogNotifEntry[] = [];
    const recompute = () => {
      const lastVisited = localStorage.getItem(NOTIFICATIONS_LS_KEY);
      const items = aggregate(buildAllEntries(blogEntries));
      setUnreadCount(getUnreadCount(items, lastVisited));
    };
    // まずコード内データ（診断・心理テスト等）で即時算出
    recompute();
    // 恋愛ブログの新着を取り込んで再算出
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data?.blog)) {
          blogEntries = data.blog as BlogNotifEntry[];
          recompute();
        }
      })
      .catch(() => {});
    window.addEventListener("notifications-visited", recompute);
    return () => {
      cancelled = true;
      window.removeEventListener("notifications-visited", recompute);
    };
  }, []);

  // お気に入り登録件数（localStorage）を同期
  useEffect(() => {
    const sync = () => setFavCount(getFavorites().length);
    sync();
    window.addEventListener(FAVORITES_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAVORITES_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const resolvedBackLabel = backLabel ?? t.header.backToList;

  return (
    <>
      <div className={`sticky top-0 z-30 ${solidBg ? "bg-base" : "bg-base/95 backdrop-blur-sm"}`}>
        <header>
          <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-3 px-4 py-3.5">
            <Link
              href="/"
              className="shrink-0 transition-opacity hover:opacity-80"
              onClick={() => setMenuOpen(false)}
              aria-label={`${SITE_NAME} ホーム`}
            >
              <SiteLogo priority />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              {showBack && (
                <Link
                  href={backHref}
                  className="hidden rounded-full px-3 py-1.5 text-sm text-text-sub transition-colors hover:text-accent sm:inline"
                >
                  {resolvedBackLabel}
                </Link>
              )}
              <Link
                href="/notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-pink-pale"
                aria-label="お知らせ"
              >
                <span className="animate-bell-swing inline-flex">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#5C4033" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C10.9 2 10 2.9 10 4C10 4.04 10 4.08 10.01 4.12C7.1 4.82 5 7.47 5 10.5V17L3 19V20H21V19L19 17V10.5C19 7.47 16.9 4.82 13.99 4.12C14 4.08 14 4.04 14 4C14 2.9 13.1 2 12 2ZM10 21C10 22.1 10.9 23 12 23C13.1 23 14 22.1 14 21H10Z"/>
                  </svg>
                </span>
                {unreadCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>
              <Link
                href="/blog?favorites=1"
                className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-pink-pale"
                aria-label={
                  favCount > 0
                    ? `${t.nav.favorites}（${favCount}件）`
                    : t.nav.favorites
                }
                title={t.nav.favorites}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill={favCount > 0 ? "#F067A6" : "none"}
                  stroke={favCount > 0 ? "#F067A6" : "#5C4033"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.8l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94z" />
                </svg>
                {favCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                    {favCount > 99 ? "99+" : favCount}
                  </span>
                )}
              </Link>
              <Link
                href="/mypage"
                className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-pink-pale"
                aria-label="マイページ（診断結果）"
                title="マイページ"
              >
                <IconUserHeart size={23} stroke={1.8} color="#5C4033" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 transition-colors hover:bg-gray-50 sm:hidden"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? t.header.closeMenu : t.header.menu}
              >
                {menuOpen ? (
                  <IconX size={20} stroke={1.75} />
                ) : (
                  <IconMenu2 size={20} stroke={1.75} />
                )}
              </button>
            </div>
          </div>
        </header>
        {showSearch && <SiteSearch />}
        {showSearch && showNavTabs && <div className="pt-2" />}
        {showNavTabs && <HeaderNavTabs />}
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-text-main/20 backdrop-blur-[1px] sm:hidden"
            aria-label={t.header.closeMenu}
            onClick={() => setMenuOpen(false)}
          />

          <aside className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,280px)] flex-col border-l border-pink-light bg-base shadow-xl sm:hidden">
            <div className="flex items-center justify-between px-4 py-4 shadow-sm">
              <SiteLogo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-sub transition-colors hover:bg-pink-pale hover:text-accent"
                aria-label={t.header.closeMenu}
              >
                <IconX size={18} stroke={1.75} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="list-none space-y-1">
                {navItems.map((item) => (
                  <Fragment key={item.href}>
                    <li>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text-main transition-colors hover:text-accent"
                      >
                        <AppIcon
                          name={item.icon}
                          size={18}
                          className="shrink-0 text-text-sub transition-colors group-hover:text-accent"
                        />
                        {t.nav[item.key]}
                      </Link>
                    </li>
                    {item.key === "home" && (
                      <li>
                        <Link
                          href="/blog?favorites=1"
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text-main transition-colors hover:text-accent"
                        >
                          <AppIcon
                            name="star"
                            size={18}
                            className="shrink-0 text-text-sub transition-colors group-hover:text-accent"
                          />
                          {t.nav.favorites}
                        </Link>
                      </li>
                    )}
                    {item.key === "home" && (
                      <li>
                        <Link
                          href="/mypage"
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text-main transition-colors hover:text-accent"
                        >
                          <IconUserHeart
                            size={18}
                            stroke={1.75}
                            className="shrink-0 text-text-sub transition-colors group-hover:text-accent"
                          />
                          マイページ
                        </Link>
                      </li>
                    )}
                  </Fragment>
                ))}
                {showBack && (
                  <li className="border-t border-pink-light pt-2 sm:hidden">
                    <Link
                      href={backHref}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-3 text-sm font-medium text-text-sub transition-colors hover:bg-pink-pale hover:text-accent"
                    >
                      {resolvedBackLabel}
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

          </aside>
        </>
      )}
    </>
  );
}
