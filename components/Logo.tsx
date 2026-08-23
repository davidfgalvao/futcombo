type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className = "w-40 h-40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label="FutCombo">
      <defs>
        <radialGradient id="ballShine" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="118" r="72" fill="none" stroke="#F5C518" strokeWidth="6" />
      <circle cx="100" cy="118" r="58" fill="url(#ballShine)" stroke="#2a2a2a" strokeWidth="2" />
      <path
        d="M100 78 L118 92 L111 113 H89 L82 92 Z"
        fill="#1a1a1a"
        stroke="#F5C518"
        strokeWidth="2"
      />
      <path d="M118 92 L148 98 L128 122 L111 113 Z" fill="#111" stroke="#F5C518" strokeWidth="1.6" />
      <path d="M82 92 L52 98 L72 122 L89 113 Z" fill="#111" stroke="#F5C518" strokeWidth="1.6" />
      <path d="M111 113 L128 122 L100 156 L72 122 L89 113 Z" fill="#0d0d0d" stroke="#F5C518" strokeWidth="1.6" />
      <path
        d="M68 46 H132 L140 62 H60 Z"
        fill="#F5C518"
      />
      <path d="M60 62 H140 L128 78 H72 Z" fill="#D4A017" />
      <rect x="86" y="34" width="28" height="14" rx="2" fill="#F5C518" />
      <circle cx="74" cy="54" r="3" fill="#111" />
      <circle cx="100" cy="54" r="3" fill="#111" />
      <circle cx="126" cy="54" r="3" fill="#111" />
    </svg>
  );
}

export function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {!compact && <BrandMark className="h-9 w-8 shrink-0" />}
      <span className="font-display text-[1.7rem] font-extrabold italic leading-none tracking-tight text-gold sm:text-[2rem]">
        FUTCOMBO
      </span>
    </span>
  );
}
