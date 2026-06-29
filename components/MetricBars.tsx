"use client";

import { useEffect, useState } from "react";
import AppIcon from "@/components/AppIcon";
import type { IconKey } from "@/lib/icon-keys";

interface Metric {
  label: string;
  icon: IconKey;
  value: number;
}

interface MetricBarsProps {
  metrics: Metric[];
}

export default function MetricBars({ metrics }: MetricBarsProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(timer);
  }, [metrics]);

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 font-medium text-text-main">
              <AppIcon name={metric.icon} size={16} className="text-accent" />
              {metric.label}
            </span>
            <span className="tabular-nums text-text-sub">{metric.value}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full border border-pink-light bg-base">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-light to-accent transition-all duration-1000 ease-out"
              style={{
                width: animated ? `${metric.value}%` : "0%",
                minWidth: animated && metric.value > 0 ? "4px" : 0,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
