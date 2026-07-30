import type { ColumnCategory } from "./column-types";

export type StaticColumn = {
  slug: string;
  title: string;
  category: ColumnCategory;
  publishedAt: string;
  seoDescription: string;
  content: string;
  eyecatchUrl?: string;
};

export const staticColumns: StaticColumn[] = [
];

const PAGE_SIZE = 10;

export function getStaticColumnBySlug(slug: string): StaticColumn | undefined {
  return staticColumns.find((c) => c.slug === slug);
}

export function getStaticColumns(
  page = 1,
  category?: ColumnCategory
): { columns: StaticColumn[]; total: number; totalPages: number } {
  const filtered = category
    ? staticColumns.filter((c) => c.category === category)
    : staticColumns;

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = sorted.length;
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  const start = (page - 1) * PAGE_SIZE;
  const columns = sorted.slice(start, start + PAGE_SIZE);

  return { columns, total, totalPages };
}
