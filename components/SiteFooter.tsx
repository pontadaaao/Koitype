"use client";

import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { useLanguage } from "@/components/LanguageProvider";
import SiteLogo from "@/components/SiteLogo";

export default function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="ft__inner">
        <nav aria-label="footer navigation">
          <ul className="ft__nav">
            <li>
              <Link href="/terms">{t.footer.terms}</Link>
            </li>
            <li>
              <Link href="/privacy-policy">{t.footer.privacyPolicy}</Link>
            </li>
            <li>
              <Link href="/contact">{t.footer.contact}</Link>
            </li>
          </ul>
        </nav>
        <div className="ft__copyright">
          © {year} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
