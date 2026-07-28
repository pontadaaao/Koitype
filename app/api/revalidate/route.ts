import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// microCMS の Webhook から呼ばれ、恋愛ブログ関連ページを即時再生成する。
// - 認証: クエリ ?secret=... を MICROCMS_WEBHOOK_SECRET と照合
// - microCMS 側の Webhook URL 例:
//     https://koitype.com/api/revalidate?secret=<MICROCMS_WEBHOOK_SECRET>
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(req: NextRequest) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;

  // シークレット未設定時は無効化（誤作動・不正呼び出し防止）
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: "MICROCMS_WEBHOOK_SECRET is not set" },
      { status: 500 }
    );
  }

  const provided = req.nextUrl.searchParams.get("secret");
  if (provided !== secret) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 }
    );
  }

  // 一覧・カテゴリー・sitemap を再生成
  const paths = ["/blog", "/blog/category/column", "/blog/category/blog", "/sitemap.xml"];

  // 変更された記事の slug が Webhook 本文に含まれていれば、その詳細も再生成
  try {
    const body = (await req.json()) as
      | { contents?: { new?: { publishValue?: { slug?: string } } } }
      | undefined;
    const slug = body?.contents?.new?.publishValue?.slug;
    if (slug) paths.push(`/blog/${slug}`);
  } catch {
    // 本文なし・JSON でない場合は一覧のみ再生成
  }

  for (const path of paths) revalidatePath(path);

  return NextResponse.json({ revalidated: true, paths, now: Date.now() });
}

export async function POST(req: NextRequest) {
  return handle(req);
}

// 手動確認用（ブラウザ等からの GET でも同じ挙動）
export async function GET(req: NextRequest) {
  return handle(req);
}
