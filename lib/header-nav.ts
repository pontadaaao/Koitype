export const headerNavTabs = [
  {
    id: "top",
    label: "TOP",
    href: "/",
    hash: "",
  },
  {
    id: "love-diagnosis",
    label: "恋愛診断",
    href: "/love-diagnosis",
    hash: "#love-diagnosis",
  },
  {
    id: "shinri-test",
    label: "心理テスト",
    href: "/tests",
    hash: "",
  },
  {
    id: "columns",
    label: "恋愛コラム",
    href: "/columns",
    hash: "",
  },
  {
    id: "koi-mikuji",
    label: "恋みくじ",
    href: "/koi-mikuji/index.html",
    hash: "#koi-mikuji",
  },
  {
    id: "log",
    label: "恋ログ",
    href: "/log",
    hash: "#log",
  },
] as const;

export type HeaderNavTabId = (typeof headerNavTabs)[number]["id"];

export function isHeaderNavTabActive(
  pathname: string,
  hash: string,
  tabId: HeaderNavTabId
): boolean {
  const normalizedHash = hash || "";

  if (pathname === "/") {
    if (tabId === "top") {
      return normalizedHash === "" || normalizedHash === "#top";
    }
    if (tabId === "shinri-test") return false;
    if (tabId === "columns") return false;
    const tab = headerNavTabs.find((item) => item.id === tabId);
    return tab?.hash === normalizedHash;
  }

  if (tabId === "top") return false;

  if (tabId === "love-diagnosis") {
    return (
      pathname === "/love-diagnosis" || pathname.startsWith("/diagnosis/")
    );
  }

  if (tabId === "koi-mikuji") {
    return (
      pathname === "/koi-mikuji" ||
      pathname.startsWith("/koi-mikuji/") ||
      (pathname === "/" && normalizedHash === "#koi-mikuji")
    );
  }

  if (tabId === "shinri-test") {
    return pathname === "/tests" || pathname.startsWith("/tests/");
  }

  if (tabId === "columns") {
    return pathname === "/columns" || pathname.startsWith("/columns/");
  }

  if (tabId === "log") {
    return pathname === "/log" || pathname.startsWith("/log/");
  }

  return false;
}

export function getHeaderNavHref(tabId: HeaderNavTabId): string {
  return headerNavTabs.find((tab) => tab.id === tabId)?.href ?? "/";
}
