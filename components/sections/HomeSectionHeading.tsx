interface HomeSectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

export default function HomeSectionHeading({
  title,
  subtitle,
  description,
  titleClassName,
  subtitleClassName,
  className,
}: HomeSectionHeadingProps) {
  return (
    <div className={`mb-7 text-center${className ? ` ${className}` : ""}`}>
      {subtitle && (
        <p className={`mb-1 font-cormorant text-sm italic tracking-widest ${subtitleClassName ?? "text-accent/70"}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`font-heading text-2xl font-bold sm:text-3xl ${titleClassName ?? "text-accent"}`}>
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-xs text-text-main">{description}</p>
      )}
    </div>
  );
}
