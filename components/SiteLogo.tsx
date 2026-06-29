import Image from "next/image";
import { SITE_NAME } from "@/lib/site";

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 474;

interface SiteLogoProps {
  className?: string;
  priority?: boolean;
}

export default function SiteLogo({
  className = "",
  priority = false,
}: SiteLogoProps) {
  return (
    <span
      className={`relative inline-block h-9 w-[78px] shrink-0 sm:h-10 sm:w-[86px] ${className}`}
      style={{ aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}` }}
    >
      <Image
        src="/logo.png"
        alt={`${SITE_NAME} Logo`}
        fill
        className="object-contain object-left"
        priority={priority}
        unoptimized
        sizes="86px"
      />
    </span>
  );
}
