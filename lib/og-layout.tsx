/**
 * Shared OGP base layout for use inside Next.js ImageResponse.
 * Uses only inline styles — no Tailwind or browser APIs.
 */

export type OgLayoutProps = {
  title: string;
  subtitle?: string;
  category?: string;
  date?: string;
  accent?: string;
};

/**
 * 装飾用のハート/星は @vercel/og がフォント外グリフの動的DL(Googleフォント)を
 * 試みてビルドが失敗し得るため、フォント非依存のインラインSVGで描画する。
 */
function Heart({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "flex" }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Sparkle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "flex" }}>
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
    </svg>
  );
}

export function OgLayout({
  title,
  subtitle,
  category,
  date,
  accent = "#F067A6",
}: OgLayoutProps) {
  // Accent-derived palette
  const accentLight = `${accent}18`;
  const purple = "#9B6FD4";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #fff4f9 0%, #fdf0ff 45%, #f8f4ff 100%)",
        fontFamily: "Noto Sans JP",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(240, 103, 166, 0.10)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "rgba(155, 111, 212, 0.10)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 200,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(255, 183, 213, 0.07)",
          display: "flex",
        }}
      />

      {/* Main content area */}
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          padding: "0 72px",
          gap: 0,
        }}
      >
        {/* Left: Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: 190,
            marginRight: 8,
          }}
        >
          {/* Heart + brand name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <Heart size={30} color={accent} />
            <span
              style={{
                display: "flex",
                fontSize: 34,
                fontWeight: 700,
                color: accent,
                letterSpacing: "-0.5px",
              }}
            >
              Koitype
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 15,
              color: purple,
              fontWeight: 400,
              marginLeft: 2,
            }}
          >
            恋愛診断サイト
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: 2,
            height: 110,
            background:
              "linear-gradient(to bottom, transparent, rgba(240,103,166,0.35), transparent)",
            marginRight: 56,
            flexShrink: 0,
            display: "flex",
          }}
        />

        {/* Center: Page content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Category badge */}
          {category && (
            <div
              style={{
                display: "flex",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  display: "flex",
                  background: accentLight,
                  color: accent,
                  fontSize: 17,
                  fontWeight: 700,
                  padding: "4px 18px",
                  borderRadius: 999,
                  border: `1.5px solid ${accent}30`,
                }}
              >
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 20 ? 40 : title.length > 14 ? 46 : 52,
              fontWeight: 700,
              color: "#2a1a22",
              lineHeight: 1.28,
              maxWidth: 620,
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                display: "flex",
                fontSize: 21,
                color: "#7a5568",
                marginTop: 16,
                lineHeight: 1.5,
                maxWidth: 580,
                flexWrap: "wrap",
              }}
            >
              {subtitle.length > 40 ? subtitle.slice(0, 38) + "…" : subtitle}
            </div>
          )}

          {/* Date */}
          {date && (
            <div
              style={{
                display: "flex",
                fontSize: 16,
                color: "#b08090",
                marginTop: 12,
              }}
            >
              {new Date(date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              公開
            </div>
          )}
        </div>

        {/* Right: Decorative hearts & sparkles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: 40,
            gap: 6,
            opacity: 0.85,
          }}
        >
          <div style={{ display: "flex" }}><Heart size={44} color={accent} /></div>
          <div style={{ display: "flex", marginLeft: 20 }}><Sparkle size={22} color={purple} /></div>
          <div style={{ display: "flex", marginLeft: -10 }}><Heart size={32} color="#FFB7D5" /></div>
          <div style={{ display: "flex", marginLeft: 24 }}><Sparkle size={18} color={accent} /></div>
          <div style={{ display: "flex", marginLeft: 4 }}><Heart size={28} color={purple} /></div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 72px",
          borderTop: "1.5px solid rgba(240, 103, 166, 0.18)",
          background: "rgba(255, 255, 255, 0.55)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 18,
            color: accent,
            fontWeight: 700,
          }}
        >
          <Heart size={18} color={accent} />
          <span style={{ display: "flex" }}>koitype.com</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 17,
            color: purple,
            fontWeight: 400,
          }}
        >
          恋愛診断・心理テスト・恋みくじ
        </div>
      </div>
    </div>
  );
}
