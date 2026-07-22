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
      className={`relative inline-block h-11 w-[95px] shrink-0 sm:h-12 sm:w-[104px] ${className}`}
      style={{ aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}` }}
    >
      <Image
        src="/logo.png"
        alt={`${SITE_NAME} Logo`}
        fill
        className="object-contain object-left"
        priority={priority}
        unoptimized
        sizes="104px"
      />
    </span>
  );
}
