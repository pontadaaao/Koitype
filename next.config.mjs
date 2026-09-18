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
      // AdSense は adsbygoogle.js だけで完結せず、広告本体・計測・不正クリック検知を
      // 別ドメインから追加ロードする。以前は pagead2 のみ許可していたため、
      // googleadservices / doubleclick / adtrafficquality が CSP で遮断され、
      // 広告が表示されない状態だった。EEA 向け同意メッセージ(Funding Choices)も
      // fundingchoicesmessages.google.com から配信されるため許可が必要。
      [
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "https://pagead2.googlesyndication.com",
        "https://*.googlesyndication.com",
        "https://partner.googleadservices.com",
        "https://*.googleadservices.com",
        "https://securepubads.g.doubleclick.net",
        "https://*.doubleclick.net",
        "https://adservice.google.com",
        "https://*.adtrafficquality.google",
        "https://fundingchoicesmessages.google.com",
        "https://www.googletagmanager.com",
        "https://www.googletagservices.com",
        "https://www.google-analytics.com",
        "https://*.google-analytics.com",
      ].join(" "),
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      [
        "img-src 'self' data: blob:",
        "https://*.supabase.co",
        "https://*.supabase.in",
        "https://images.microcms-assets.io",
        "https://*.googlesyndication.com",
        "https://*.googleadservices.com",
        "https://*.doubleclick.net",
        "https://*.adtrafficquality.google",
        "https://*.google-analytics.com",
        "https://*.gstatic.com",
        "https://www.google.com",
        "https://www.google.co.jp",
      ].join(" "),
      [
        "frame-src 'self'",
        "https://googleads.g.doubleclick.net",
        "https://*.doubleclick.net",
        "https://tpc.googlesyndication.com",
        "https://*.googlesyndication.com",
        "https://*.adtrafficquality.google",
        "https://fundingchoicesmessages.google.com",
        "https://www.google.com",
      ].join(" "),
      [
        "connect-src 'self'",
        "https://*.supabase.co",
        "https://*.supabase.in",
        "https://formspree.io",
        "https://pagead2.googlesyndication.com",
        "https://*.googlesyndication.com",
        "https://*.googleadservices.com",
        "https://*.doubleclick.net",
        "https://*.adtrafficquality.google",
        "https://fundingchoicesmessages.google.com",
        "https://www.google-analytics.com",
        "https://*.google-analytics.com",
        "https://*.analytics.google.com",
        "https://*.googletagmanager.com",
        "https://www.google.com",
      ].join(" "),
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
      // 以前 public/index.html に置いていた meta refresh 用ページの後始末。
      // 実体を削除したうえで、既にクロール済みの /index.html を 301 でトップへ集約する
      // （meta refresh のまま 200 を返すとトップの重複ページとして扱われる）。
      { source: "/index.html", destination: "/", statusCode: 301 },
      // 恋愛コラムは恋愛ブログに一本化。旧URLは 301 で /blog へ集約。
      { source: "/columns", destination: "/blog", statusCode: 301 },
      {
        source: "/columns/:slug",
        destination: "/blog/:slug",
        statusCode: 301,
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
      // www → non-www リダイレクト（SEO 正規化）
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.koitype.com" }],
        destination: "https://koitype.com/:path*",
        statusCode: 301,
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
