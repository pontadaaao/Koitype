import type { ReactNode } from "react";
import ResultSection from "@/components/ResultSection";

interface ResultStickerCardProps {
  title: string;
  variant?: "blue" | "pink";
  children: ReactNode;
  className?: string;
  waveTo?: "blue" | "pink" | null;
}

export default function ResultStickerCard({
  title,
  variant = "blue",
  children,
  className = "",
  waveTo = null,
}: ResultStickerCardProps) {
  return (
    <ResultSection
      title={title}
      variant={variant}
      className={className}
      waveTo={waveTo}
    >
      {children}
    </ResultSection>
  );
}

interface ResultTypeHeaderProps {
  label: string;
  title: string;
  subtitle: string;
}

export function ResultTypeHeader({
  label,
  title,
  subtitle,
}: ResultTypeHeaderProps) {
  return (
    <header className="mb-2 text-center">
      <p className="text-sm font-bold text-text-main sm:text-base">{label}</p>
      <h2 className="font-heading mt-1 break-words text-2xl font-bold text-result-title sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 break-words text-sm font-medium leading-relaxed text-text-main sm:text-base">
        {subtitle}
      </p>
    </header>
  );
}
