import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, type, content } = body;

    if (!name || !email || !type || !content) {
      return NextResponse.json({ error: "必須項目が入力されていません" }, { status: 400 });
    }

    // TODO: ここでメール送信サービス（Resend, SendGrid など）に連携する
    console.log("Contact form submission:", { name, email, type, content });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
