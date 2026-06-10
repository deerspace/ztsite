import { useId } from "react";

// Hypercomp slide profile with glowing vent-port plumes.
export default function HypercompSlide() {
  const uid = useId();
  const steel = `${uid}-steel`;
  const vent = `${uid}-vent`;

  return (
    <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={steel} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#454549" />
          <stop offset=".5" stopColor="#1f1f22" />
          <stop offset="1" stopColor="#0d0d0f" />
        </linearGradient>
        <linearGradient id={vent} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e0312e" stopOpacity=".75" />
          <stop offset="1" stopColor="#e0312e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g>
        <path d="M560 128 L548 30 L596 30 L584 128 Z" fill={`url(#${vent})`} />
        <path d="M620 128 L610 44 L652 44 L642 128 Z" fill={`url(#${vent})`} opacity=".85" />
        <path d="M676 128 L668 58 L704 58 L696 128 Z" fill={`url(#${vent})`} opacity=".7" />
        <path d="M728 128 L722 70 L752 70 L746 128 Z" fill={`url(#${vent})`} opacity=".55" />
      </g>
      <path
        d="M120 132 L760 132 Q772 132 780 142 L798 164 L798 206 Q798 212 792 212 L128 212 Q116 212 116 200 L116 138 Q116 132 120 132 Z"
        fill={`url(#${steel})`}
        stroke="#4a4a52"
        strokeWidth="1.5"
      />
      <g fill="#070708" stroke="#3a3a40">
        <rect x="556" y="132" width="32" height="12" />
        <rect x="614" y="132" width="30" height="12" />
        <rect x="672" y="132" width="28" height="12" />
        <rect x="724" y="132" width="26" height="12" />
      </g>
      <g stroke="#0d0d0f" strokeWidth="5">
        <line x1="148" y1="142" x2="140" y2="204" />
        <line x1="164" y1="142" x2="156" y2="204" />
        <line x1="180" y1="142" x2="172" y2="204" />
        <line x1="196" y1="142" x2="188" y2="204" />
      </g>
      <path d="M248 140 L340 140 L336 176 L252 176 Z" fill="#0a0a0b" stroke="#3a3a40" />
      <text x="430" y="200" className="slide-mark">
        HYPERCOMP
      </text>
    </svg>
  );
}
