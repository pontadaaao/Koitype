import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="パンくずリスト" className={`mb-4 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1 text-xs text-text-sub">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="text-text-sub/40">
                ›
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="hover:text-accent transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-main line-clamp-1" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
