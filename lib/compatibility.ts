import { getSign, type Element, type Sign } from "./astrology";
import { lifePathNumber } from "./numerology";

export type Birthday = { year: number; month: number; day: number };

import type { IconKey } from "@/lib/icon-keys";

export type Rank = { rank: string; icon: IconKey; catch: string };

export type CompatibilityResult = {
  s1: Sign;
  s2: Sign;
  lp1: number;
  lp2: number;
  total: number;
  passion: number;
  trust: number;
  future: number;
  rank: Rank;
};

const ELEMENT_COMPAT: Record<string, number> = {
  火火: 85,
  火地: 55,
  火風: 92,
  火水: 48,
  地地: 80,
  地風: 50,
  地水: 88,
  風風: 82,
  風水: 52,
  水水: 90,
};

function elementScore(a: Element, b: Element): number {
  return ELEMENT_COMPAT[a + b] ?? ELEMENT_COMPAT[b + a] ?? 60;
}

export function getRank(score: number): Rank {
  if (score >= 90) {
    return {
      rank: "運命級の相性",
      icon: "hearts",
      catch:
        "出会うべくして出会ったふたり。価値観も波長もぴったりで、自然体でいられる最高の相性です。",
    };
  }
  if (score >= 75) {
    return {
      rank: "とても良い相性",
      icon: "heart-filled",
      catch:
        "お互いを尊重し合える、バランスのいいふたり。少しの思いやりで、もっと深い関係になれます。",
    };
  }
  if (score >= 60) {
    return {
      rank: "良い相性",
      icon: "heart",
      catch:
        "違いはあるけれど、それが刺激になる関係。お互いを知る努力が、絆をぐっと強くします。",
    };
  }
  if (score >= 45) {
    return {
      rank: "努力で輝く相性",
      icon: "heart-rate",
      catch:
        "最初はすれ違いも。でも歩み寄ることで、誰よりも理解し合える特別な関係になれます。",
    };
  }
  return {
    rank: "正反対だから惹かれ合う",
    icon: "flame",
    catch:
      "まるで真逆のふたり。だからこそ刺激的で、お互いにないものを補い合える奇跡の組み合わせ。",
  };
}

const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

export function calcCompatibility(a: Birthday, b: Birthday): CompatibilityResult {
  const s1 = getSign(a.month, a.day);
  const s2 = getSign(b.month, b.day);
  const lp1 = lifePathNumber(a.year, a.month, a.day);
  const lp2 = lifePathNumber(b.year, b.month, b.day);

  const elem = elementScore(s1.element, s2.element);
  const lpDiff = Math.abs(lp1 - lp2);
  const lpScore = Math.max(40, 100 - lpDiff * 7);
  const seed = (a.month * a.day + b.month * b.day) % 18;

  let total = Math.round(elem * 0.5 + lpScore * 0.35 + seed + 8);
  total = clamp(total, 38, 99);

  const passion = clamp(
    Math.round(
      elem * 0.6 + (s1.element === "火" || s2.element === "火" ? 22 : 8) + seed
    ),
    40,
    99
  );
  const trust = clamp(
    Math.round(
      lpScore * 0.7 + (s1.element === s2.element ? 20 : 6) + (seed % 10)
    ),
    40,
    99
  );
  const future = clamp(Math.round((total + trust) / 2), 40, 99);

  return { s1, s2, lp1, lp2, total, passion, trust, future, rank: getRank(total) };
}

export function getAdvice(result: CompatibilityResult): string {
  const { s1, s2, lp1, lp2 } = result;
  const sameElement = s1.element === s2.element;
  const lpSame = lp1 === lp2;
  const lpClose = Math.abs(lp1 - lp2) <= 2;

  let advice = sameElement
    ? `${s1.element}のエレメント同士で、言葉にしなくても通じ合える居心地の良さがあります。`
    : `${s1.element}×${s2.element}の異なる感性が、お互いに新しい魅力を教え合う関係です。`;

  if (lpSame) {
    advice +=
      " 運命数も同じで、価値観や生き方の方向性が似ているため、深い理解につながりやすいです。";
  } else if (lpClose) {
    advice +=
      " 運命数の差も小さく、歩幅を合わせやすいバランス。自然体で付き合える関係です。";
  } else {
    advice +=
      " 運命数の違いは、お互いの個性を尊重し合うことで、かえって関係が豊かになります。";
  }

  return advice;
}

export function buildResultSearchParams(
  a: Birthday,
  b: Birthday,
  result: CompatibilityResult
): URLSearchParams {
  const params = new URLSearchParams({
    ay: String(a.year),
    am: String(a.month),
    ad: String(a.day),
    by: String(b.year),
    bm: String(b.month),
    bd: String(b.day),
    s1: result.s1.name,
    s2: result.s2.name,
    score: String(result.total),
    rank: result.rank.rank,
  });
  return params;
}

export function parseBirthdaysFromParams(
  params: URLSearchParams
): { a: Birthday; b: Birthday } | null {
  const ay = parseInt(params.get("ay") ?? "", 10);
  const am = parseInt(params.get("am") ?? "", 10);
  const ad = parseInt(params.get("ad") ?? "", 10);
  const by = parseInt(params.get("by") ?? "", 10);
  const bm = parseInt(params.get("bm") ?? "", 10);
  const bd = parseInt(params.get("bd") ?? "", 10);

  if (
    [ay, am, ad, by, bm, bd].some(
      (v) => !Number.isFinite(v) || v <= 0
    )
  ) {
    return null;
  }

  return {
    a: { year: ay, month: am, day: ad },
    b: { year: by, month: bm, day: bd },
  };
}
