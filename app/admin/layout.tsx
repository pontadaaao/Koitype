import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "管理画面 | Koitype",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sub-bg">
      <header className="sticky top-0 z-30 border-b border-pink-light bg-base shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin" className="font-heading text-base font-bold text-text-main">
            <span className="text-accent">Koitype</span>{" "}
            <span className="text-text-sub text-sm font-normal">管理画面</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/admin/columns"
              className="rounded-full px-3 py-1.5 text-sm text-text-sub transition-colors hover:text-accent"
            >
              コラム
            </Link>
            <Link
              href="/"
              className="rounded-full border border-pink-light px-3 py-1.5 text-sm text-text-sub transition-colors hover:border-accent/40 hover:text-accent"
              target="_blank"
            >
              サイトを見る
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
