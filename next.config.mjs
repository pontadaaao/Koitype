/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://adservice.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://images.microcms-assets.io https://pagead2.googlesyndication.com",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      "connect-src 'self' https://*.supabase.co https://*.supabase.in https://www.google-analytics.com https://formspree.io",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.supabase.in",
      },
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // 恋愛コラムは恋愛ブログに一本化。旧URLは 301 で /blog へ集約。
      { source: "/columns", destination: "/blog", permanent: true },
      {
        source: "/columns/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      // トップの旧クエリ(?category=...)はエッジでリダイレクト。
      // これによりトップページ本体は searchParams 非依存で静的化でき、遷移が高速になる。
      {
        source: "/",
        has: [{ type: "query", key: "category", value: "love-type" }],
        destination: "/love-diagnosis",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "query", key: "category", value: "compatibility" }],
        destination: "/compatibility",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return {
      // Serve the standalone static 恋みくじ page at the clean /koi-mikuji URL
      // (HTTP 200, no redirect) so it can be indexed with a self-referencing canonical.
      beforeFiles: [
        { source: "/koi-mikuji", destination: "/koi-mikuji/index.html" },
      ],
    };
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
