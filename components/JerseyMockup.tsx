import type { JerseyPattern, Product } from "@/lib/types";

const BODY =
  "M88 78 C88 70 96 64 108 64 H172 C184 64 192 70 192 78 L226 80 C248 88 248 110 248 110 V230 C248 250 230 250 230 250 H50 C50 250 32 250 32 230 V110 C32 110 32 88 54 80 Z";

function PatternDefs({
  id,
  pattern,
  colors,
}: {
  id: string;
  pattern: JerseyPattern;
  colors: Product["colors"];
}) {
  if (pattern === "stripes") {
    return (
      <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill={colors.primary} />
        <rect width="8" height="16" fill={colors.secondary} />
      </pattern>
    );
  }

  if (pattern === "hoops") {
    return (
      <pattern id={id} width="16" height="18" patternUnits="userSpaceOnUse">
        <rect width="16" height="18" fill={colors.primary} />
        <rect y="9" width="16" height="9" fill={colors.secondary} />
      </pattern>
    );
  }

  if (pattern === "check") {
    return (
      <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill={colors.primary} />
        <rect width="10" height="10" fill={colors.secondary} />
        <rect x="10" y="10" width="10" height="10" fill={colors.secondary} />
      </pattern>
    );
  }

  return null;
}

function bodyFill(pattern: JerseyPattern, colors: Product["colors"], patternId: string) {
  if (pattern === "stripes" || pattern === "hoops" || pattern === "check") {
    return `url(#${patternId})`;
  }
  return colors.primary;
}

export function JerseyMockup({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { colors, pattern, team } = product;
  const uid = product.id.replace(/[^a-zA-Z0-9-]/g, "");
  const patternId = `p-${uid}`;
  const shadowId = `s-${uid}`;

  return (
    <svg
      viewBox="0 0 280 320"
      className={className}
      role="img"
      aria-label={`Camisa ${team}`}
    >
      <defs>
        <linearGradient id={shadowId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        <PatternDefs id={patternId} pattern={pattern} colors={colors} />
      </defs>
      <path d={BODY} fill={bodyFill(pattern, colors, patternId)} />
      {pattern === "sash" && (
        <path d="M70 70 L200 210 L170 230 L40 90 Z" fill={colors.secondary} opacity="0.9" />
      )}
      {pattern === "halves" && (
        <path
          d="M140 78 V250 H230 Q248 250 248 230 V110 Q248 88 226 80 Z"
          fill={colors.secondary}
        />
      )}
      {pattern === "panel" && (
        <>
          <path d="M78 92 V236 Q78 248 96 248 H108 V88 Z" fill={colors.secondary} opacity="0.85" />
          <path d="M202 88 V248 H214 Q232 248 232 236 V96 Z" fill={colors.secondary} opacity="0.85" />
        </>
      )}
      <path d={BODY} fill={`url(#${shadowId})`} />
      <path
        d="M108 64 C120 86 160 86 172 64"
        fill="none"
        stroke={colors.accent}
        strokeWidth="7"
      />
      <path
        d="M54 80 L32 48 L62 36 L88 78"
        fill={colors.secondary}
        stroke={colors.accent}
        strokeWidth="2"
      />
      <path
        d="M226 80 L248 48 L218 36 L192 78"
        fill={colors.secondary}
        stroke={colors.accent}
        strokeWidth="2"
      />
      <circle cx="140" cy="128" r="18" fill={colors.accent} opacity="0.9" />
      <circle cx="140" cy="128" r="12" fill={colors.primary} />
      <text
        x="140"
        y="196"
        textAnchor="middle"
        fontFamily="Barlow Condensed, sans-serif"
        fontSize="42"
        fontWeight="800"
        fill={colors.accent}
      >
        {product.version === "nba" ? "24" : "10"}
      </text>
    </svg>
  );
}
