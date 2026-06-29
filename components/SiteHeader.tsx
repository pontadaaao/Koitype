"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconMail, IconMenu2, IconX } from "@tabler/icons-react";
import { useLanguage } from "@/components/LanguageProvider";
import SiteLogo from "@/components/SiteLogo";
import HeaderNavTabs from "@/components/HeaderNavTabs";
import SiteSearch from "@/components/SiteSearch";
import AppIcon from "@/components/AppIcon";
import { localeFlags, localeLabels, locales, navItems, type Locale } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site";

interface SiteHeaderProps {
  backHref?: string;
  backLabel?: string;
  showBack?: boolean;
  showNavTabs?: boolean;
  showSearch?: boolean;
  solidBg?: boolean;
}

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!compact) {
    return (
      <div className="space-y-1" role="group" aria-label={t.header.language}>
        <p className="text-xs font-medium uppercase tracking-wide text-text-sub">
          {t.header.language}
        </p>
        <div className="flex flex-col gap-0.5">
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code as Locale)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                locale === code
                  ? "bg-pink-pale font-medium text-accent"
                  : "text-text-main hover:bg-pink-pale/60 hover:text-accent"
              }`}
              aria-pressed={locale === code}
            >
              <span className="text-base leading-none">{localeFlags[code as Locale]}</span>
              <span>{localeLabels[code as Locale]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-result-pink text-white transition-colors hover:opacity-90 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
        aria-expanded={open}
        aria-label={t.header.language}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span className="hidden sm:inline">{localeLabels[locale]}</span>
        <IconChevronDown
          size={13}
          stroke={2}
          className={`hidden transition-transform duration-200 sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 min-w-[140px] overflow-hidden rounded-2xl border border-pink-light bg-base shadow-lg">
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => { setLocale(code as Locale); setOpen(false); }}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                locale === code
                  ? "bg-pink-pale font-medium text-accent"
                  : "text-text-main hover:bg-pink-pale/60"
              }`}
              aria-pressed={locale === code}
            >
              <span className="text-base leading-none">{localeFlags[code as Locale]}</span>
              <span>{localeLabels[code as Locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
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
                href="/contact"
                className="hidden items-center gap-1.5 rounded-full border border-pink-light px-3 py-1.5 text-sm text-text-sub transition-colors hover:border-accent/40 hover:text-accent sm:inline-flex"
              >
                <IconMail size={16} stroke={1.75} />
                お問い合わせ
              </Link>
              <LanguageSwitcher compact />
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
                  <li key={item.href}>
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
