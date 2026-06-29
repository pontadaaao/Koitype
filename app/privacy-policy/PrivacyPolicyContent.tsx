"use client";

import { useLanguage } from "@/components/LanguageProvider";
import LegalPageContent from "@/components/LegalPageContent";
import { getPrivacyPolicyContent } from "./content";

export default function PrivacyPolicyContent() {
  const { locale } = useLanguage();
  const c = getPrivacyPolicyContent(locale);
  return <LegalPageContent {...c} />;
}
