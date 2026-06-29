"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { headerNavTabs, isHeaderNavTabActive } from "@/lib/header-nav";
import { useLanguage } from "@/components/LanguageProvider";

function isStaticPageHref(href: string): boolean {
  return href.endsWith(".html");
}

const NAV_TAB_KEY: Record<string, keyof ReturnType<typeof import("@/lib/i18n").getTranslations>["navTabs"]> = {
  top: "top",
  "love-diagnosis": "loveDiagnosis",
  "shinri-test": "shinriTest",
  columns: "columns",
  "koi-mikuji": "koiMikuji",
  log: "log",
};

export default function HeaderNavTabs() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const handleTabClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname !== "/" || !href.startsWith("/#")) return;

      event.preventDefault();
      const targetId = href.slice(2);
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
      setHash(`#${targetId}`);
    },
    [pathname]
  );

  const handleTopClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") return;

      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      setHash("");
    },
    [pathname]
  );

  return (
    <nav
      aria-label="サイト内ナビゲーション"
      className="mx-auto max-w-[1080px] border-b border-pink-light/60 bg-base"
    >
      <ul className="flex list-none gap-5 overflow-x-auto px-4 scrollbar-hide sm:gap-6">
        {headerNavTabs.map((tab) => {
            const active = isHeaderNavTabActive(pathname, hash, tab.id);

            const tabClassName = `relative block whitespace-nowrap pb-2.5 pt-1 text-base transition-colors ${
              active
                ? "font-bold text-text-main"
                : "font-normal text-text-sub hover:text-text-main"
            }`;
            const tabOnClick =
              tab.id === "top"
                ? handleTopClick
                : (event: React.MouseEvent<HTMLAnchorElement>) =>
                    handleTabClick(event, tab.href);

            return (
              <li key={tab.id} className="shrink-0">
                {isStaticPageHref(tab.href) ? (
                  <a
                    href={tab.href}
                    aria-current={active ? "page" : undefined}
                    className={tabClassName}
                  >
                    {t.navTabs[NAV_TAB_KEY[tab.id]]}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </a>
                ) : (
                  <Link
                    href={tab.href}
                    onClick={tabOnClick}
                    aria-current={active ? "page" : undefined}
                    className={tabClassName}
                  >
                    {t.navTabs[NAV_TAB_KEY[tab.id]]}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
    </nav>
  );
}
