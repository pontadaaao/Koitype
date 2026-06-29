import { supabase, createAdminClient } from "@/lib/supabase";
import type { Column, ColumnSummary, ColumnFormValues } from "@/lib/column-types";

const SUMMARY_FIELDS =
  "id, title, slug, category, eyecatch_url, status, seo_description, published_at, created_at, updated_at";

const PAGE_SIZE = 12;

// ── 公開ページ用（publishedのみ） ─────────────────────────────

export async function getPublishedColumns(page = 1, category?: string) {
  let query = supabase
    .from("columns")
    .select(SUMMARY_FIELDS, { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { columns: (data ?? []) as ColumnSummary[], total: count ?? 0, pageSize: PAGE_SIZE };
}

export async function getColumnBySlug(slug: string): Promise<Column | null> {
  const { data, error } = await supabase
    .from("columns")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as Column;
}

export async function getRelatedDiagnosisId(column: Column): Promise<string | null> {
  return column.related_diagnosis ?? null;
}

// ── 管理画面用（全件） ────────────────────────────────────────

export async function adminGetColumns() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("columns")
    .select(SUMMARY_FIELDS)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ColumnSummary[];
}

export async function adminGetColumnById(id: string): Promise<Column | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("columns")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Column;
}

export async function adminCreateColumn(values: ColumnFormValues): Promise<Column> {
  const admin = createAdminClient();
  const now = new Date().toISOString();
  const payload = {
    title: values.title,
    slug: values.slug,
    category: values.category,
    eyecatch_url: values.eyecatch_url || null,
    content: values.content,
    status: values.status,
    seo_title: values.seo_title || null,
    seo_description: values.seo_description || null,
    related_diagnosis: values.related_diagnosis || null,
    published_at: values.status === "published" ? now : null,
    updated_at: now,
  };
  const { data, error } = await admin.from("columns").insert(payload).select().single();
  if (error) throw error;
  return data as Column;
}

export async function adminUpdateColumn(id: string, values: ColumnFormValues): Promise<Column> {
  const admin = createAdminClient();
  const now = new Date().toISOString();

  const existing = await adminGetColumnById(id);
  const publishedAt =
    values.status === "published" && existing?.published_at == null ? now : existing?.published_at ?? null;

  const payload = {
    title: values.title,
    slug: values.slug,
    category: values.category,
    eyecatch_url: values.eyecatch_url || null,
    content: values.content,
    status: values.status,
    seo_title: values.seo_title || null,
    seo_description: values.seo_description || null,
    related_diagnosis: values.related_diagnosis || null,
    published_at: publishedAt,
    updated_at: now,
  };

  const { data, error } = await admin
    .from("columns")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Column;
}

export async function adminDeleteColumn(id: string): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin.from("columns").delete().eq("id", id);
  if (error) throw error;
}

export async function adminCheckSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const admin = createAdminClient();
  let query = admin.from("columns").select("id").eq("slug", slug);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { data } = await query;
  return (data?.length ?? 0) > 0;
}
