"use client";

import Link from "next/link";
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
        <nav aria-label="パンくずリスト" className="mb-4">
          <ol className="flex items-center gap-1 text-xs text-text-sub">
            <li className="flex items-center gap-1">
              <Link href="/" className="hover:text-accent transition-colors">
                ホーム
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <span aria-hidden="true" className="text-text-sub/40">
                ›
              </span>
              <span className="text-text-main" aria-current="page">
                相性診断
              </span>
            </li>
          </ol>
        </nav>
        <Suspense fallback={<SectionFallback />}>
          <CompatibilitySection />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
