import { ImageResponse } from "next/og";
import { OgLayout } from "@/lib/og-layout";
import { loadOgFont } from "@/lib/og-font";
import { getStaticColumnBySlug, staticColumns } from "@/lib/static-columns";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return staticColumns.map((col) => ({ slug: col.slug }));
}

export default async function Image({ params }: Props) {
  const column = getStaticColumnBySlug(params.slug);
  const fontData = await loadOgFont();

  const title = column?.title ?? "恋愛コラム";
  const subtitle = column?.seoDescription;
  const category = column?.category;
  const date = column?.publishedAt;

  return new ImageResponse(
    <OgLayout
      title={title}
      subtitle={subtitle}
      category={category}
      date={date}
    />,
    {
      ...size,
      fonts: [
        { name: "Noto Sans JP", data: fontData, style: "normal", weight: 400 },
        { name: "Noto Sans JP", data: fontData, style: "normal", weight: 700 },
      ],
    }
  );
}

export function generateAlt({ params }: Props) {
  const column = getStaticColumnBySlug(params.slug);
  return column ? `${column.title} | ${SITE_NAME}` : `恋愛コラム | ${SITE_NAME}`;
}
