"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { diagnoses } from "@/lib/diagnoses";
import type { Diagnosis } from "@/lib/types";

const STORAGE_KEY = "diagnosisClickCounts";

function getClickCounts(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function trackClick(id: string) {
  const counts = getClickCounts();
  counts[id] = (counts[id] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
}

function diagnosisHref(d: Diagnosis): string {
  const base = d.href ?? `/diagnosis/${d.id}`;
  return base.includes("?") ? `${base}&start=1` : `${base}?start=1`;
}

export default function DiagnosisSlider() {
  const [slides, setSlides] = useState<Diagnosis[]>([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const counts = getClickCounts();
    const pool = diagnoses.filter(
      (d) => d.category === "恋愛タイプ診断" && d.thumbnail
    );
    const sorted = [...pool].sort((a, b) => {
      const diff = (counts[b.id] || 0) - (counts[a.id] || 0);
      return diff !== 0 ? diff : Math.random() - 0.5;
    });
    setSlides(sorted.slice(0, 5));
  }, []);

  const startTimer = (slideCount: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 3000);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    startTimer(slides.length);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides]);

  if (slides.length === 0) return null;

  const goTo = (index: number) => {
    setCurrent(index);
    startTimer(slides.length);
  };

  return (
    <div className="mb-5">
      <div className="relative">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((d) => (
              <Link
                key={d.id}
                href={diagnosisHref(d)}
                className="relative w-full shrink-0"
                onClick={() => trackClick(d.id)}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-pink-pale via-pink-light/80 to-accent/15">
                  {d.thumbnail && (
                    <Image
                      src={d.thumbnail}
                      alt={d.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 736px, 992px"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-4 py-3">
                    <p className="font-heading text-sm font-bold leading-snug text-white drop-shadow">
                      {d.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-accent" : "w-1.5 bg-pink-strong/60"
            }`}
            aria-label={`スライド ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
