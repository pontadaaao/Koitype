"use client";

import { StampIcon, STAMP_ICON_COLORS } from "@/components/StampIcon";
import { STAMPS, getStampLabel, type StampKey } from "@/lib/posts";

interface ReactionChipsProps {
  reacts: Partial<Record<StampKey, number>>;
  userReacts: StampKey[];
  onToggle: (stampKey: StampKey) => void;
}

export default function ReactionChips({
  reacts,
  userReacts,
  onToggle,
}: ReactionChipsProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {STAMPS.map((stamp) => {
        const count = reacts[stamp.key] ?? 0;
        const isActive = userReacts.includes(stamp.key);
        const color = STAMP_ICON_COLORS[stamp.key];

        const label = getStampLabel(stamp.key);

        return (
          <button
            key={stamp.key}
            type="button"
            aria-pressed={isActive}
            aria-label={`${label}（${count}件）`}
            onClick={() => onToggle(stamp.key)}
            className={`inline-flex items-center gap-0.5 rounded-full border ${stamp.key === "分かる" || stamp.key === "泣いた" ? "pl-1 pr-1.5" : "px-1.5"} py-0.5 text-xs transition-colors hover:opacity-90 active:scale-95 ${
              isActive ? "" : "border-log-border bg-base text-text-sub"
            }`}
            style={
              isActive
                ? {
                    borderColor: color,
                    backgroundColor: `${color}18`,
                    color: color,
                  }
                : undefined
            }
          >
            <StampIcon stampKey={stamp.key} size={16} />
            <span>{label}</span>
            <span className="font-medium tabular-nums">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
