import Image from "next/image";
import CatFactionBadge from "@/components/CatFactionBadge";
import DogFactionBadge from "@/components/DogFactionBadge";
import { getResultHeroAlt, getResultHeroImage, isDogFaction } from "@/lib/dog-cat-diagnosis";

interface ResultHeroBannerProps {
  resultId: string;
  dogPct: number;
  priority?: boolean;
  className?: string;
}

export default function ResultHeroBanner({
  resultId,
  dogPct,
  priority = false,
  className = "",
}: ResultHeroBannerProps) {
  const heroSrc = getResultHeroImage(resultId);

  if (heroSrc) {
    return (
      <div
        className={`overflow-hidden ${className}`}
      >
        <Image
          src={heroSrc}
          alt={getResultHeroAlt(resultId)}
          width={1024}
          height={576}
          className="h-auto w-full object-cover"
          unoptimized
          priority={priority}
        />
      </div>
    );
  }

  return isDogFaction(dogPct) ? (
    <DogFactionBadge priority={priority} className={className} />
  ) : (
    <CatFactionBadge priority={priority} className={className} />
  );
}
