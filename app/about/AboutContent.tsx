"use client";

import { useLanguage } from "@/components/LanguageProvider";
import LegalPageContent from "@/components/LegalPageContent";
import { getAboutContent } from "./content";

export default function AboutContent() {
  const { locale } = useLanguage();
  const c = getAboutContent(locale);
  return <LegalPageContent {...c} />;
}
