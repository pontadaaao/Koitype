"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import AppIcon from "@/components/AppIcon";
import { useLanguage } from "@/components/LanguageProvider";
import { searchSite, type SearchItem } from "@/lib/site-search";

export default function SiteSearch() {
  const { t } = useLanguage();
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setResults(searchSite(query));
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  const handleSelect = () => {
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  const showResults = open && query.trim().length > 0;

  return (
    <div
      ref={containerRef}
      className="px-4 pb-0 pt-2"
    >
      <div className="relative mx-auto max-w-[1080px]">
        <label htmlFor="site-search" className="sr-only">
          {t.header.searchLabel}
        </label>
        <IconSearch
          size={18}
          stroke={1.75}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-sub"
          aria-hidden
        />
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={t.header.searchPlaceholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={showResults}
          aria-controls={showResults ? listboxId : undefined}
          className="w-full rounded-full border border-transparent bg-gray-100 py-2.5 pl-10 pr-10 text-sm text-text-main placeholder:text-text-sub/70 focus:border-accent/30 focus:bg-base focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-text-sub transition-colors hover:bg-pink-pale hover:text-accent"
            aria-label={t.header.searchClear}
          >
            <IconX size={16} stroke={1.75} />
          </button>
        )}

        {showResults && (
          <div
            id={listboxId}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-pink-light bg-base shadow-lg"
          >
            {results.length > 0 ? (
              <ul className="max-h-72 list-none overflow-y-auto py-1">
                {results.map((item) => {
                  const resultClassName =
                    "flex items-start gap-3 px-4 py-3 transition-colors hover:bg-pink-pale";
                  const resultContent = (
                    <>
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-light bg-base text-accent">
                        <AppIcon name={item.icon} size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-text-main">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-text-sub">
                          {item.description}
                        </span>
                        <span className="mt-1 inline-block rounded-full bg-pink-pale px-2 py-0.5 text-[10px] font-medium text-tag-text">
                          {item.category}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.id} role="option" aria-selected={false}>
                      {item.href.endsWith(".html") ? (
                        <a href={item.href} onClick={handleSelect} className={resultClassName}>
                          {resultContent}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={handleSelect}
                          className={resultClassName}
                        >
                          {resultContent}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-4 py-6 text-center text-sm text-text-sub">
                {t.header.searchEmpty}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
