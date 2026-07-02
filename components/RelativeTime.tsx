"use client";

import { useEffect, useState } from "react";
import { toRelativeTime } from "@/lib/relative-time";

interface RelativeTimeProps {
  createdAt: string;
  className?: string;
}

export default function RelativeTime({ createdAt, className }: RelativeTimeProps) {
  const [label, setLabel] = useState(() => toRelativeTime(createdAt));

  useEffect(() => {
    setLabel(toRelativeTime(createdAt));
    const id = setInterval(() => setLabel(toRelativeTime(createdAt)), 60_000);
    return () => clearInterval(id);
  }, [createdAt]);

  return <span className={className}>{label}</span>;
}
