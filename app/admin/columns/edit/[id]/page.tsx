import Link from "next/link";
import { notFound } from "next/navigation";
import { adminGetColumnById } from "@/lib/columns";
import ColumnForm from "../../ColumnForm";
import type { ColumnFormValues } from "@/lib/column-types";

interface EditPageProps {
  params: { id: string };
}

export default async function AdminColumnEditPage({ params }: EditPageProps) {
  const column = await adminGetColumnById(params.id);
  if (!column) notFound();

  const initialValues: ColumnFormValues = {
    title: column.title,
    slug: column.slug,
    category: column.category,
    tags: (column.tags ?? []).join(", "),
    eyecatch_url: column.eyecatch_url ?? "",
    content: column.content,
    status: column.status,
    seo_title: column.seo_title ?? "",
    seo_description: column.seo_description ?? "",
    related_diagnosis: column.related_diagnosis ?? "",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin/columns" className="text-sm text-text-sub hover:text-accent">
          ← コラム一覧
        </Link>
        <span className="text-text-sub">/</span>
        <h1 className="font-heading text-xl font-bold text-text-main line-clamp-1">
          {column.title}
        </h1>
        {column.status === "published" && (
          <Link
            href={`/columns/${column.slug}`}
            target="_blank"
            className="rounded-full border border-pink-light px-3 py-0.5 text-xs text-text-sub transition-colors hover:border-accent/40 hover:text-accent"
          >
            公開ページを見る →
          </Link>
        )}
      </div>
      <ColumnForm mode="edit" columnId={params.id} initialValues={initialValues} />
    </div>
  );
}
