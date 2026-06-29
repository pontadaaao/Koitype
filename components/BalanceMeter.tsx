import AppIcon from "@/components/AppIcon";

interface BalanceMeterProps {
  dogPct: number;
  catPct: number;
  size?: "sm" | "md" | "lg";
}

export default function BalanceMeter({
  dogPct,
  catPct,
  size = "md",
}: BalanceMeterProps) {
  const barHeight = size === "sm" ? "h-3" : size === "lg" ? "h-6" : "h-4";
  const labelSize = size === "sm" ? "text-xs" : "text-sm";
  const badgeSize = size === "lg" ? "px-3 py-1" : "px-2 py-0.5";

  return (
    <div>
      <div className={`mb-3 flex justify-center gap-3 ${labelSize} font-medium`}>
        <span
          className={`inline-flex items-center gap-1 rounded-full border border-pink-light bg-base ${badgeSize} text-dog`}
        >
          <AppIcon name="dog" size={14} className="text-dog" />
          犬系 {dogPct}%
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full border border-pink-light bg-base ${badgeSize} text-cat`}
        >
          <AppIcon name="cat" size={14} className="text-cat" />
          猫系 {catPct}%
        </span>
      </div>
      <div
        className={`flex overflow-hidden rounded-full border border-pink-light bg-base ${barHeight}`}
      >
        <div
          className="bg-dog transition-all duration-700 ease-out"
          style={{ width: `${dogPct}%`, minWidth: dogPct > 0 ? "4px" : 0 }}
        />
        <div
          className="bg-cat transition-all duration-700 ease-out"
          style={{ width: `${catPct}%`, minWidth: catPct > 0 ? "4px" : 0 }}
        />
      </div>
    </div>
  );
}
