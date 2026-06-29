import type { TablerIcon } from "@tabler/icons-react";
import {
  IconBrandInstagram,
  IconBrandX,
  IconBulb,
  IconCat,
  IconClipboard,
  IconDog,
  IconFlame,
  IconFlower,
  IconHeart,
  IconHeartHandshake,
  IconHeartFilled,
  IconHearts,
  IconLeaf,
  IconLink,
  IconMail,
  IconMessageCircle,
  IconNote,
  IconPaw,
  IconRainbow,
  IconSparkles,
  IconStars,
  IconDiamond,
} from "@tabler/icons-react";
import type { IconKey } from "@/lib/icon-keys";

interface AppIconProps {
  name: IconKey;
  size?: number;
  className?: string;
  stroke?: number;
}

const ICONS: Record<IconKey, TablerIcon> = {
  heart: IconHeart,
  "heart-filled": IconHeartFilled,
  hearts: IconHearts,
  leaf: IconLeaf,
  sparkle: IconSparkles,
  flower: IconFlower,
  paw: IconPaw,
  dog: IconDog,
  cat: IconCat,
  stars: IconStars,
  rainbow: IconRainbow,
  flame: IconFlame,
  handshake: IconHeartHandshake,
  ring: IconDiamond,
  message: IconMessageCircle,
  mail: IconMail,
  note: IconNote,
  bulb: IconBulb,
  link: IconLink,
  "brand-x": IconBrandX,
  "brand-line": IconMessageCircle,
  "brand-instagram": IconBrandInstagram,
  "heart-rate": IconHeartHandshake,
  clipboard: IconClipboard,
};

export default function AppIcon({
  name,
  size = 20,
  className,
  stroke = 1.75,
}: AppIconProps) {
  const Icon = ICONS[name];
  return <Icon size={size} className={className} stroke={stroke} aria-hidden />;
}

export function IconBadge({
  name,
  size = 40,
  className = "text-accent",
}: {
  name: IconKey;
  size?: number;
  className?: string;
}) {
  return (
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-pink-light bg-base shadow-sm">
      <AppIcon name={name} size={size} className={className} />
    </div>
  );
}
