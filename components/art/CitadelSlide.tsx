import { useId } from "react";

// Optic-ready slide profile; label parameterized so other slide SKUs reuse it.
export default function CitadelSlide({ label = "CITADEL" }: { label?: string }) {
  const uid = useId();
  const steel = `${uid}-steel`;

  return (
    <svg viewBox="0 0 460 180" className="grid-art" aria-hidden="true">
      <defs>
        <linearGradient id={steel} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a5a60" />
          <stop offset=".5" stopColor="#2c2c30" />
          <stop offset="1" stopColor="#141416" />
        </linearGradient>
      </defs>
      <path
        d="M52 58 L380 58 Q390 58 396 66 L410 82 L410 116 Q410 122 404 122 L58 122 Q48 122 48 112 L48 62 Q48 58 52 58 Z"
        fill={`url(#${steel})`}
        stroke="#5e5e66"
        strokeWidth="1.5"
      />
      <rect x="64" y="48" width="52" height="10" rx="2" fill="#2a2a2e" stroke="#5e5e66" />
      <g stroke="#101012" strokeWidth="4">
        <line x1="76" y1="66" x2="70" y2="116" />
        <line x1="90" y1="66" x2="84" y2="116" />
        <line x1="104" y1="66" x2="98" y2="116" />
        <line x1="332" y1="66" x2="326" y2="116" />
        <line x1="346" y1="66" x2="340" y2="116" />
      </g>
      <path d="M150 64 L226 64 L222 92 L154 92 Z" fill="#0c0c0e" />
      <text x="290" y="108" className="slide-mark-s">
        {label}
      </text>
    </svg>
  );
}
