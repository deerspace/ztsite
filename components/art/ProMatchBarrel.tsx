import { useId } from "react";

// Bronze TiCN match barrel with threaded muzzle and crown.
export default function ProMatchBarrel() {
  const uid = useId();
  const brl = `${uid}-brl`;

  return (
    <svg viewBox="0 0 460 180" className="grid-art" aria-hidden="true">
      <defs>
        <linearGradient id={brl} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8b06a" />
          <stop offset=".5" stopColor="#a06a30" />
          <stop offset="1" stopColor="#6a4520" />
        </linearGradient>
      </defs>
      <rect x="70" y="74" width="250" height="34" rx="6" fill={`url(#${brl})`} />
      <path d="M320 70 L360 70 Q372 70 372 82 L372 100 Q372 112 360 112 L320 112 Z" fill={`url(#${brl})`} />
      <g stroke="#5e3c1c" strokeWidth="2">
        <line x1="332" y1="72" x2="332" y2="110" />
        <line x1="342" y1="72" x2="342" y2="110" />
        <line x1="352" y1="72" x2="352" y2="110" />
      </g>
      <circle cx="388" cy="91" r="13" fill="none" stroke="#3a3a40" strokeWidth="3" />
      <circle cx="388" cy="91" r="5" fill="#0c0c0e" />
      <text x="150" y="96" className="slide-mark-s" style={{ fill: "#52320f" }}>
        PRO MATCH 9MM
      </text>
    </svg>
  );
}
