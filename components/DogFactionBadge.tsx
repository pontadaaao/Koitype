import Image from "next/image";
import { DOG_FACTION_IMAGE } from "@/lib/dog-cat-diagnosis";

interface DogFactionBadgeProps {
  className?: string;
  priority?: boolean;
}

export default function DogFactionBadge({
  className = "",
  priority = false,
}: DogFactionBadgeProps) {
  return (
    <div className={`faction-badge mx-auto w-full max-w-[300px] ${className}`}>
      <Image
        src={DOG_FACTION_IMAGE}
        alt="犬系派"
        width={1024}
        height={682}
        className="faction-badge-image h-auto w-full object-contain"
        unoptimized
        priority={priority}
      />
    </div>
  );
}
