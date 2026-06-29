import { diagnoses } from "@/lib/diagnoses";
import type { Diagnosis } from "@/lib/types";
import type { IconKey } from "@/lib/icon-keys";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  icon: IconKey;
  keywords: string[];
}

function diagnosisHref(diagnosis: Diagnosis): string {
  const base = diagnosis.href ?? `/diagnosis/${diagnosis.id}`;
  return base.includes("?") ? `${base}&start=1` : `${base}?start=1`;
}

const staticPages: SearchItem[] = [
  {
    id: "home",
    title: "ホーム",
    description: "診断一覧・恋ログ",
    href: "/",
    category: "ページ",
    icon: "flower",
    keywords: ["トップ", "home", "一覧"],
  },
  {
    id: "love-diagnosis",
    title: "恋愛診断",
    description: "恋愛タイプ診断の一覧",
    href: "/love-diagnosis",
    category: "ページ",
    icon: "heart",
    keywords: ["恋愛", "タイプ", "診断"],
  },
  {
    id: "compatibility-page",
    title: "相性診断",
    description: "誕生日でふたりの相性をチェック",
    href: "/compatibility",
    category: "ページ",
    icon: "stars",
    keywords: ["相性", "誕生日", "星座"],
  },
  {
    id: "koi-mikuji",
    title: "恋みくじ",
    description: "今日の恋愛運を占う",
    href: "/koi-mikuji/index.html",
    category: "ページ",
    icon: "sparkle",
    keywords: ["みくじ", "占い", "運勢"],
  },
  {
    id: "log",
    title: "恋ログ",
    description: "みんなの恋愛体験を読む・投稿する",
    href: "/log",
    category: "ページ",
    icon: "note",
    keywords: ["ログ", "投稿", "相談", "体験"],
  },
  {
    id: "log-new",
    title: "恋ログに投稿",
    description: "名前・内容・カテゴリーで投稿",
    href: "/log/new",
    category: "ページ",
    icon: "message",
    keywords: ["投稿", "書く", "新規"],
  },
];

const diagnosisItems: SearchItem[] = diagnoses.map((diagnosis) => ({
  id: diagnosis.id,
  title: diagnosis.title,
  description: diagnosis.description,
  href: diagnosisHref(diagnosis),
  category: diagnosis.category,
  icon: diagnosis.icon,
  keywords: [
    diagnosis.id,
    diagnosis.category,
    ...(diagnosis.id === "dog-cat" ? ["犬", "猫", "犬系", "猫系"] : []),
    ...(diagnosis.id === "compatibility" ? ["相性", "誕生日", "星座"] : []),
    ...(diagnosis.id === "love-style" ? ["恋愛", "タイプ", "スタイル"] : []),
    ...(diagnosis.id === "landmine" ? ["地雷", "恋人", "パターン", "共通"] : []),
  ],
}));

export const searchIndex: SearchItem[] = [...staticPages, ...diagnosisItems];

function matchesQuery(item: SearchItem, query: string): boolean {
  const haystack = [
    item.title,
    item.description,
    item.category,
    ...item.keywords,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function scoreItem(item: SearchItem, query: string): number {
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();

  if (title === query) return 100;
  if (title.startsWith(query)) return 80;
  if (title.includes(query)) return 60;
  if (item.category.toLowerCase().includes(query)) return 40;
  if (description.includes(query)) return 20;
  return 10;
}

export function searchSite(query: string, limit = 8): SearchItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return searchIndex
    .filter((item) => matchesQuery(item, normalized))
    .sort((a, b) => scoreItem(b, normalized) - scoreItem(a, normalized))
    .slice(0, limit);
}
