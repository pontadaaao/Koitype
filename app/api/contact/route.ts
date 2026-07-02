import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, content, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !subject || !content) {
      return NextResponse.json({ error: "必須項目が入力されていません" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;
    const from =
      process.env.RESEND_FROM_EMAIL ?? "Koitype Contact <onboarding@resend.dev>";

    if (!apiKey || !to) {
      console.error("[contact] Missing env: RESEND_API_KEY or CONTACT_EMAIL");
      return NextResponse.json({ error: "設定エラー" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `【Koitype お問い合わせ】${subject}`,
      text: [
        `お名前: ${name}`,
        `メールアドレス: ${email}`,
        `件名: ${subject}`,
        "",
        "お問い合わせ内容:",
        content,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", JSON.stringify(error));
      return NextResponse.json({ error: "メール送信失敗", detail: error.message }, { status: 500 });
    }

    console.log("[contact] Sent:", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
