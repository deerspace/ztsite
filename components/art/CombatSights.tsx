import { useId } from "react";

// Shooter's-eye sight picture: rear notch posts + fiber-dot front post.
export default function CombatSights() {
  const uid = useId();
  const fiber = `${uid}-fiber`;

  return (
    <svg viewBox="0 0 460 180" className="grid-art" aria-hidden="true">
      <defs>
        <radialGradient id={fiber} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ff6b5e" />
          <stop offset=".55" stopColor="#e0312e" />
          <stop offset="1" stopColor="#e0312e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M124 70 Q124 62 132 62 L196 62 L196 142 L124 142 Z" fill="#1c1c1f" stroke="#3a3a40" strokeWidth="2" />
      <path d="M264 62 L328 62 Q336 62 336 70 L336 142 L264 142 Z" fill="#1c1c1f" stroke="#3a3a40" strokeWidth="2" />
      <rect x="216" y="76" width="28" height="66" rx="3" fill="#19191c" stroke="#3a3a40" strokeWidth="2" />
      <circle cx="230" cy="96" r="16" fill={`url(#${fiber})`} />
      <circle cx="230" cy="96" r="6.5" fill="#ff8a3d" />
      <line x1="96" y1="142" x2="364" y2="142" stroke="#3a3a40" strokeWidth="2" />
    </svg>
  );
}
