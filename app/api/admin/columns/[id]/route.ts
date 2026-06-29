import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  adminGetColumnById,
  adminUpdateColumn,
  adminDeleteColumn,
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

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const authError = assertAuth();
  if (authError) return authError;

  const column = await adminGetColumnById(params.id);
  if (!column) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ column });
}

export async function PUT(request: Request, { params }: RouteContext) {
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

    const exists = await adminCheckSlugExists(values.slug, params.id);
    if (exists) {
      return NextResponse.json({ error: "このスラッグはすでに使われています" }, { status: 400 });
    }

    const column = await adminUpdateColumn(params.id, values);
    return NextResponse.json({ column });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const authError = assertAuth();
  if (authError) return authError;

  try {
    await adminDeleteColumn(params.id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
