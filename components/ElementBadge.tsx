import type { Element } from "@/lib/astrology";

const ELEMENT_STYLES: Record<Element, { bg: string; text: string }> = {
  火: { bg: "bg-orange-50", text: "text-orange-600" },
  地: { bg: "bg-amber-50", text: "text-amber-700" },
  風: { bg: "bg-sky-50", text: "text-sky-600" },
  水: { bg: "bg-blue-50", text: "text-blue-600" },
};

interface ElementBadgeProps {
  element: Element;
  className?: string;
}

export default function ElementBadge({ element, className = "" }: ElementBadgeProps) {
  const style = ELEMENT_STYLES[element];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${className}`}
    >
      {element}
    </span>
  );
}
