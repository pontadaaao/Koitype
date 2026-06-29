import Image from "next/image";
import { CAT_FACTION_IMAGE } from "@/lib/dog-cat-diagnosis";

interface CatFactionBadgeProps {
  className?: string;
  priority?: boolean;
}

export default function CatFactionBadge({
  className = "",
  priority = false,
}: CatFactionBadgeProps) {
  return (
    <div className={`faction-badge mx-auto w-full max-w-[300px] ${className}`}>
      <Image
        src={CAT_FACTION_IMAGE}
        alt="猫系派"
        width={1024}
        height={682}
        className="faction-badge-image h-auto w-full object-contain"
        unoptimized
        priority={priority}
      />
    </div>
  );
}
