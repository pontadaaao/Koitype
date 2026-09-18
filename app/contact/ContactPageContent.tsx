"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import ContactForm from "./ContactForm";
import { getContactIntro } from "./intro";

export default function ContactPageContent() {
  const { t, locale } = useLanguage();
  const intro = getContactIntro(locale);

  return (
    <main className="mx-auto max-w-lg px-6 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-accent">
          {t.contact.title}
        </h1>
        <div className="mt-2 h-1 w-10 rounded-full bg-pink-strong" />
      </div>

      {/*
        以前はフォームだけで、何を送ってよいのか・どう扱われるのかが
        書かれていなかった。送信先が外部サービスであることを含めて説明する。
      */}
      <div className="mb-8 space-y-4 text-sm leading-relaxed text-text-sub">
        <p>{intro.lead}</p>
        <div>
          <p className="font-bold text-text-main">{intro.topicsTitle}</p>
          <ul className="mt-2 space-y-1.5">
            {intro.topics.map((topic) => (
              <li key={topic} className="flex gap-2">
                <span aria-hidden className="text-accent">
                  ♡
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
        <p>{intro.reply}</p>
        <p>
          {intro.privacyBefore}
          <Link href="/privacy-policy" className="text-accent underline underline-offset-2">
            {intro.privacyLink}
          </Link>
          {intro.privacyAfter}
        </p>
      </div>

      <ContactForm />
    </main>
  );
}
