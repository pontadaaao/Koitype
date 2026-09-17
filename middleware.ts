import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "koitype_admin_auth";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 旧「すぐ開始」フラグ ?start=1 は正規URLへ 301 で集約する。
  // Google にクロール済みの ?start=1 URL が「noindex タグによって除外」等に
  // 残り続けるのを防ぎ、評価を正規URLへ寄せる（現在の内部リンクは #start）。
  if (searchParams.has("start")) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("start");
    return NextResponse.redirect(url, 301);
  }

  // 以前の構造化データ(WebSite SearchAction)由来の /?q={search_term_string} が
  // クロールされ「代替ページ（適切な canonical タグあり）」に残るため、トップへ 301。
  // トップページは q を使っていない。
  if (pathname === "/" && searchParams.has("q")) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("q");
    return NextResponse.redirect(url, 301);
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // ログインページは認証不要
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const auth = request.cookies.get(ADMIN_COOKIE);
  if (auth?.value === "1") {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/", "/admin/:path*", "/diagnosis/:path*", "/compatibility/:path*", "/tests/:path*"],
};
