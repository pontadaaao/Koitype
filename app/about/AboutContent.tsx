"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutContent() {
  const { t } = useLanguage();
  const ab = t.about;
  return (
    <main className="pp">
      <h1 className="pp__title">{ab.title}</h1>
      <p className="pp__updated">{ab.updated}</p>

      <p>{ab.intro}</p>

      <h2 className="pp__h2">{ab.missionTitle}</h2>
      <p>{ab.mission}</p>

      <h2 className="pp__h2">{ab.contentTitle}</h2>
      <p>{ab.contentNote}</p>

      <h2 className="pp__h2">{ab.infoTitle}</h2>
      <ul>
        <li>{ab.siteName}</li>
        <li>{ab.operator}</li>
        <li>
          {ab.contactLabel}
          <Link href="/contact">{ab.contactLink}</Link>
        </li>
      </ul>
    </main>
  );
}
