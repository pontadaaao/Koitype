interface ProgressBarProps {
  current: number;
  total: number;
  variant?: "default" | "dog-cat";
}

export default function ProgressBar({
  current,
  total,
  variant = "default",
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  const fillClass =
    variant === "dog-cat"
      ? "bg-gradient-to-r from-dog to-cat"
      : "bg-accent";

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-text-sub">
        <span className="font-medium">
          質問 {current} / {total}
        </span>
        <span className="tabular-nums">{percentage}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full border border-pink-light bg-base">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${fillClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
