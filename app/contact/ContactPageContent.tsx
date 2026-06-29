"use client";

import { useLanguage } from "@/components/LanguageProvider";
import ContactForm from "./ContactForm";

export default function ContactPageContent() {
  const { t } = useLanguage();
  return (
    <main className="mx-auto max-w-lg px-6 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-accent">
          {t.contact.title}
        </h1>
        <div className="mt-2 h-1 w-10 rounded-full bg-pink-strong" />
      </div>
      <ContactForm />
    </main>
  );
}
