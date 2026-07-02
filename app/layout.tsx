import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SITE_DEFAULT_URL, SITE_DESCRIPTION, SITE_NAME, siteTitle } from "@/lib/site";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const OG_IMAGE = `${SITE_DEFAULT_URL}/og-default.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DEFAULT_URL),
  title: { default: siteTitle(), template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "1080x1080", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: siteTitle(),
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "ja_JP",
    url: SITE_DEFAULT_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} - 恋愛診断サイト` }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle(),
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: { canonical: SITE_DEFAULT_URL },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_DEFAULT_URL,
  logo: `${SITE_DEFAULT_URL}/logo.png`,
  description: SITE_DESCRIPTION,
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_DEFAULT_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_DEFAULT_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body
        className={`${notoSans.variable} bg-base font-body text-text-main antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
      {process.env.NODE_ENV === "production" && (
        <>
          <GoogleAnalytics gaId="G-4F88R7GYT2" />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4709100652775310"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </>
      )}
    </html>
  );
}
