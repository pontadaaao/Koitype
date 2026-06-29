import type { ReactNode } from "react";

interface ResultSectionProps {
  title: string;
  variant?: "blue" | "pink";
  children: ReactNode;
  className?: string;
  waveTo?: "blue" | "pink" | null;
}

const VARIANT_BG = {
  blue: "#00B7CE",
  pink: "#F067A6",
} as const;

const WAVE_FILL = {
  blue: "#00B7CE",
  pink: "#F067A6",
} as const;

function SectionWave({ fill }: { fill: string }) {
  return (
    <svg
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      className="block h-9 w-full sm:h-11"
      aria-hidden
    >
      <path
        d="M0,24 C200,48 400,0 600,24 C800,48 1000,0 1200,24 V48 H0 Z"
        fill={fill}
      />
    </svg>
  );
}

export default function ResultSection({
  title,
  variant = "blue",
  children,
  className = "",
  waveTo = null,
}: ResultSectionProps) {
  return (
    <section className={className} style={{ backgroundColor: VARIANT_BG[variant] }}>
      <div className="px-5 py-10 text-center sm:px-8 sm:py-12">
        <div className="mb-3 flex justify-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
          <span className="inline-block h-2 w-2 rounded-full bg-white/75" />
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
        </div>
        <h3 className="font-heading text-xl font-bold text-result-text sm:text-2xl">
          【{title}】
        </h3>
        <div className="mx-auto mt-3 mb-6 h-0.5 w-14 rounded-full bg-white/40" />
        {children}
      </div>
      {waveTo && <SectionWave fill={WAVE_FILL[waveTo]} />}
    </section>
  );
}
