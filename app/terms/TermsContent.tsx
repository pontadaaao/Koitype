"use client";

import { useLanguage } from "@/components/LanguageProvider";
import LegalPageContent from "@/components/LegalPageContent";
import { getTermsContent } from "./content";

export default function TermsContent() {
  const { locale } = useLanguage();
  const c = getTermsContent(locale);
  return <LegalPageContent {...c} />;
}
