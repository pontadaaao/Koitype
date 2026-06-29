"use client";

import type { StampKey } from "@/lib/posts";

export const STAMP_ICON_COLORS: Record<StampKey, string> = {
  分かる: "#F067A6",
  泣いた: "#4a90d9",
  推せる: "#f0a030",
  応援: "#3cb371",
};

/** @deprecated Use STAMP_ICON_COLORS instead */
export const STAMP_ICON_COLOR = STAMP_ICON_COLORS["分かる"];

interface StampIconProps {
  stampKey: StampKey;
  size?: number;
  className?: string;
}

function IconHeart({
  size,
  className,
  color,
}: {
  size: number;
  className?: string;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        fill={color}
        d="M12 20.35l-1.1-1C7.4 15.36 5 12.78 5 10.2 5 7.66 6.9 6 9 6c1.24 0 2.43.58 3 1.5.57-.92 1.76-1.5 3-1.5 2.1 0 4 1.66 4 4.2 0 2.58-2.4 5.16-5.9 9.15l-1.1 1z"
      />
    </svg>
  );
}

function IconTear({
  size,
  className,
  color,
}: {
  size: number;
  className?: string;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <g transform="translate(0 2)">
        <path
          fill={color}
          d="M12 3c-1.2 3.6-4.5 6.3-4.5 10.2A4.5 4.5 0 0012 18a4.5 4.5 0 004.5-4.8C16.5 9.3 13.2 6.6 12 3z"
        />
      </g>
    </svg>
  );
}

function IconThumbsUp({
  size,
  className,
  color,
}: {
  size: number;
  className?: string;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        fill={color}
        d="M2 20V9h4v11H2zm18-9.5c0-1.1-.9-2-2-2h-5.7l.86-4.14.03-.29c0-.37-.15-.71-.4-.96L12.2 2 6.9 7.3C6.6 7.6 6.4 8 6.4 8.5V18c0 1.1.9 2 2 2h8.1c.75 0 1.4-.45 1.67-1.1l2.73-6.37c.08-.21.12-.43.12-.65v-1.93z"
      />
    </svg>
  );
}

function IconMegaphone({
  size,
  className,
  color,
}: {
  size: number;
  className?: string;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <g transform="translate(1.5 0)">
        <path fill={color} d="M4 10v8h3v-8H4zm5 0l9-4v12l-9-4v-4z" />
      </g>
    </svg>
  );
}

const STAMP_ICON_COMPONENTS = {
  分かる: IconHeart,
  泣いた: IconTear,
  推せる: IconThumbsUp,
  応援: IconMegaphone,
} as const;

export function StampIcon({ stampKey, size = 16, className }: StampIconProps) {
  const Icon = STAMP_ICON_COMPONENTS[stampKey];
  const color = STAMP_ICON_COLORS[stampKey];

  return (
    <span className={`inline-flex items-center justify-center ${className ?? ""}`}>
      <Icon size={size} color={color} />
    </span>
  );
}

const STAMP_SVG_PATHS: Record<StampKey, string> = {
  分かる: `<path fill="{color}" d="M12 20.35l-1.1-1C7.4 15.36 5 12.78 5 10.2 5 7.66 6.9 6 9 6c1.24 0 2.43.58 3 1.5.57-.92 1.76-1.5 3-1.5 2.1 0 4 1.66 4 4.2 0 2.58-2.4 5.16-5.9 9.15l-1.1 1z"/>`,
  泣いた: `<g transform="translate(0 2)"><path fill="{color}" d="M12 3c-1.2 3.6-4.5 6.3-4.5 10.2A4.5 4.5 0 0012 18a4.5 4.5 0 004.5-4.8C16.5 9.3 13.2 6.6 12 3z"/></g>`,
  推せる: `<path fill="{color}" d="M2 20V9h4v11H2zm18-9.5c0-1.1-.9-2-2-2h-5.7l.86-4.14.03-.29c0-.37-.15-.71-.4-.96L12.2 2 6.9 7.3C6.6 7.6 6.4 8 6.4 8.5V18c0 1.1.9 2 2 2h8.1c.75 0 1.4-.45 1.67-1.1l2.73-6.37c.08-.21.12-.43.12-.65v-1.93z"/>`,
  応援: `<g transform="translate(1.5 0)"><path fill="{color}" d="M4 10v8h3v-8H4zm5 0l9-4v12l-9-4v-4z"/></g>`,
};

export function getStampSvgMarkup(key: StampKey, size = 64): string {
  const color = STAMP_ICON_COLORS[key];
  const inner = STAMP_SVG_PATHS[key].replace("{color}", color);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">${inner}</svg>`;
}
