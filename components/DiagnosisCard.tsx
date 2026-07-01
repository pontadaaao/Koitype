import Image from "next/image";
import Link from "next/link";
import type { Diagnosis } from "@/lib/types";

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
  hideThumbnail?: boolean;
}

function diagnosisHref(diagnosis: Diagnosis): string {
  const base = diagnosis.href ?? `/diagnosis/${diagnosis.id}`;
  return base.includes("?") ? `${base}&start=1` : `${base}?start=1`;
}

export default function DiagnosisCard({ diagnosis, hideThumbnail = false }: DiagnosisCardProps) {
  return (
    <Link
      href={diagnosisHref(diagnosis)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-pink-light bg-base shadow-sm transition-all hover:border-accent/40 hover:shadow-md active:scale-[0.99]"
    >
      {!hideThumbnail && (
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-pink-pale via-pink-light/80 to-accent/15">
          {diagnosis.thumbnail ? (
            <Image
              src={diagnosis.thumbnail}
              alt={diagnosis.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : null}
        </div>
      )}
      <div className="p-3">
        <h3 className="line-clamp-2 font-heading text-sm font-bold leading-snug group-hover:text-accent" style={{ color: "#5C4033" }}>
          {diagnosis.title}
        </h3>
      </div>
    </Link>
  );
}
