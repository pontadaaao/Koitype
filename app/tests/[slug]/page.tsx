import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LoveTestClient from "@/components/LoveTestClient";
import { loveTests, getLoveTestBySlug } from "@/lib/love-tests";
import LoveTestIcon from "@/components/LoveTestIcon";
import { siteTitle } from "@/lib/site";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return loveTests.map((test) => ({ slug: test.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const test = getLoveTestBySlug(params.slug);
  if (!test) return { title: siteTitle("心理テスト") };
  return {
    title: siteTitle(test.title),
    description: test.description,
  };
}

export default function LoveTestPage({ params }: Props) {
  const test = getLoveTestBySlug(params.slug);
  if (!test) notFound();

  const otherTests = loveTests.filter((t) => t.slug !== test.slug);

  return (
    <>
      <div className="min-h-screen bg-base">
        <SiteHeader backHref="/tests" backLabel="心理テスト一覧" solidBg />

        <main>
          {/* Hero */}
          <div
            className="px-4 pb-7 pt-8 text-center sm:pb-8 sm:pt-10"
            style={{ background: `linear-gradient(160deg, ${test.color}12 0%, ${test.color}04 100%)` }}
          >
            <div className="mx-auto max-w-lg">
              {/* Icon */}
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl"
                style={{
                  background: `${test.color}18`,
                  boxShadow: `0 0 0 8px ${test.color}0a`,
                }}
              >
                <LoveTestIcon id={test.icon} color={test.color} className="h-8 w-8" />
              </div>

              {/* Category */}
              <span
                className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold"
                style={{ backgroundColor: `${test.color}18`, color: test.color }}
              >
                #{test.category}
              </span>

              {/* Title */}
              <h1 className="font-heading text-xl font-black leading-snug sm:text-2xl" style={{ color: "#5C4033" }}>
                {test.title}
              </h1>

              {/* Description */}
              <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "#5C4033" }}>
                {test.description}
              </p>

              {/* Divider */}
              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="h-px w-10 rounded-full" style={{ backgroundColor: `${test.color}30` }} />
                <svg viewBox="0 0 24 24" fill={test.color} className="h-3.5 w-3.5 opacity-50">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="h-px w-10 rounded-full" style={{ backgroundColor: `${test.color}30` }} />
              </div>
            </div>
          </div>

          {/* Interactive test */}
          <div className="pt-6">
            <LoveTestClient test={test} otherTests={otherTests} />
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
