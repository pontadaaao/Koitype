import AppIcon from "@/components/AppIcon";
import type { IconKey } from "@/lib/icon-keys";

interface HomeSectionHeadingProps {
  title: string;
  description?: string;
  subtext?: string;
  icon?: IconKey;
  titleClassName?: string;
}

export default function HomeSectionHeading({
  title,
  description,
  subtext,
  icon,
  titleClassName,
}: HomeSectionHeadingProps) {
  return (
    <div className="mb-4 text-center">
      <h2 className={`flex items-center justify-center gap-2 font-heading text-2xl font-black sm:text-3xl ${titleClassName ?? "text-accent"}`}>
        {icon && <AppIcon name={icon} size={24} className="text-accent" stroke={2.5} />}
        {title}
      </h2>
      {description && (
        <div className="mt-1.5 inline-block rounded bg-accent px-3 py-1">
          <p className="text-xs font-bold leading-tight text-white">{description}</p>
        </div>
      )}
      {subtext && (
        <p className="mt-2 text-sm leading-relaxed text-text-sub">{subtext}</p>
      )}
    </div>
  );
}
