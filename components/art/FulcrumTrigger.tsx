import { useId } from "react";

// Red trigger-shoe profile with pivot housing and travel-adjustment arc.
export default function FulcrumTrigger() {
  const uid = useId();
  const shoe = `${uid}-shoe`;

  return (
    <svg viewBox="0 0 460 180" className="grid-art" aria-hidden="true">
      <defs>
        <linearGradient id={shoe} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b22421" />
          <stop offset=".5" stopColor="#ef4a40" />
          <stop offset="1" stopColor="#9c1f1c" />
        </linearGradient>
      </defs>
      <rect x="204" y="18" width="58" height="30" rx="7" fill="#1d1d1f" stroke="#3a3a40" strokeWidth="2" />
      <circle cx="219" cy="33" r="4" fill="none" stroke="#56565c" strokeWidth="2" />
      <circle cx="247" cy="33" r="4" fill="none" stroke="#56565c" strokeWidth="2" />
      <path
        d="M218 48 C 208 78, 207 112, 220 142 Q 226 154 236 148 C 248 118, 250 80, 244 48 Z"
        fill={`url(#${shoe})`}
      />
      <path d="M228 56 C 222 84, 222 110, 230 136" fill="none" stroke="#5e100e" strokeWidth="5" strokeLinecap="round" />
      <path d="M258 64 Q 272 96 260 130" fill="none" stroke="#9a9aa2" strokeWidth="2.5" strokeDasharray="3 7" strokeLinecap="round" />
      <path d="M256 124 l4 8 8-4" fill="none" stroke="#9a9aa2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
