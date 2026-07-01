export const SITE_NAME = "Koitype";

export const SITE_TAG = "#Koitype";

export const SITE_DESCRIPTION =
  "あなたの恋愛タイプや相性を診断。Koitypeで、もっと自分の恋愛を知ろう。";

export const SITE_DEFAULT_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://koitype.com";

export function siteTitle(suffix?: string) {
  return suffix ? `${suffix} | ${SITE_NAME}` : `${SITE_NAME} | 恋愛診断サイト`;
}

export function siteUrl(path = ""): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  return `${SITE_DEFAULT_URL}${path}`;
}
