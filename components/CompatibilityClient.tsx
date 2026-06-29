"use client";

import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CompatibilitySection from "@/components/sections/CompatibilitySection";

function SectionFallback() {
  return (
    <div className="rounded-2xl border border-pink-light px-4 py-8 text-center text-sm text-text-sub">
      読み込み中...
    </div>
  );
}

export default function CompatibilityClient() {
  return (
    <div className="min-h-screen bg-base">
      <SiteHeader showBack={false} />
      <main className="mx-auto max-w-[600px] px-4 py-6 sm:py-8">
        <Suspense fallback={<SectionFallback />}>
          <CompatibilitySection />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
