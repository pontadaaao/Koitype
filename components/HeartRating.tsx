import AppIcon from "@/components/AppIcon";

interface HeartRatingProps {
  score: number;
  max?: number;
}

export default function HeartRating({ score, max = 6 }: HeartRatingProps) {
  return (
    <span className="inline-flex shrink-0 items-center gap-px">
      {Array.from({ length: max }, (_, index) =>
        index < score ? (
          <AppIcon
            key={index}
            name="heart-filled"
            size={13}
            className="text-text-main"
          />
        ) : (
          <span
            key={index}
            className="inline-flex h-[13px] w-[13px] items-center justify-center text-[11px] leading-none text-text-main/30"
          >
            •
          </span>
        )
      )}
    </span>
  );
}
