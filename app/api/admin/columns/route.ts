import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  adminGetColumns,
  adminCreateColumn,
  adminCheckSlugExists,
} from "@/lib/columns";
import type { ColumnFormValues } from "@/lib/column-types";

function assertAuth() {
  const cookieStore = cookies();
  const auth = cookieStore.get("koitype_admin_auth");
  if (auth?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const authError = assertAuth();
  if (authError) return authError;

  try {
    const columns = await adminGetColumns();
    return NextResponse.json({ columns });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = assertAuth();
  if (authError) return authError;

  try {
    const values: ColumnFormValues = await request.json();

    if (!values.title?.trim()) {
      return NextResponse.json({ error: "タイトルは必須です" }, { status: 400 });
    }
    if (!values.slug?.trim()) {
      return NextResponse.json({ error: "スラッグは必須です" }, { status: 400 });
    }
    if (!/^[a-z0-9-]+$/.test(values.slug)) {
      return NextResponse.json(
        { error: "スラッグは半角英数字とハイフンのみ使用できます" },
        { status: 400 }
      );
    }

    const exists = await adminCheckSlugExists(values.slug);
    if (exists) {
      return NextResponse.json({ error: "このスラッグはすでに使われています" }, { status: 400 });
    }

    const column = await adminCreateColumn(values);
    return NextResponse.json({ column }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
