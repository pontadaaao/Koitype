"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { useLanguage } from "@/components/LanguageProvider";
import { localeFlags, localeLabels, locales, type Locale } from "@/lib/i18n";

// 言語切り替え（フッター用）。ページ最下部に置くため選択肢は上方向に開く。
export default function LanguageSwitcher() {
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

  return (
    <div className="relative" ref={ref} role="group" aria-label={t.header.language}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-pink-light bg-base px-3 py-1.5 text-xs text-text-main transition-colors hover:border-accent/40"
        aria-expanded={open}
        aria-label={t.header.language}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>{localeLabels[locale]}</span>
        <IconChevronDown
          size={13}
          stroke={2}
          className={`text-text-sub transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full left-1/2 z-50 mb-1.5 min-w-[140px] -translate-x-1/2 overflow-hidden rounded-2xl border border-pink-light bg-base text-left shadow-lg">
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setLocale(code as Locale);
                setOpen(false);
              }}
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
