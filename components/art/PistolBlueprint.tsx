import { useId } from "react";

// Blueprint-style OZ9 side profile. `detailed` adds the dimension line and
// component callouts (hero usage); cards/PDP tiles pass detailed={false}.
export default function PistolBlueprint({ detailed = true }: { detailed?: boolean }) {
  const uid = useId();
  const steel = `${uid}-steel`;
  const frame = `${uid}-frame`;
  const bronze = `${uid}-bronze`;
  const glow = `${uid}-glow`;

  return (
    <svg viewBox="0 0 980 560" className="pistol-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={steel} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3e" />
          <stop offset=".45" stopColor="#1c1c1f" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
        <linearGradient id={frame} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#232326" />
          <stop offset="1" stopColor="#101012" />
        </linearGradient>
        <linearGradient id={bronze} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a5a2b" />
          <stop offset=".5" stopColor="#d9a05b" />
          <stop offset="1" stopColor="#7a4e24" />
        </linearGradient>
        <radialGradient id={glow} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#e0312e" stopOpacity=".22" />
          <stop offset="1" stopColor="#e0312e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="500" cy="300" rx="460" ry="240" fill={`url(#${glow})`} />

      {detailed && (
        <>
          <g stroke="#2a2a2e" strokeWidth="1" opacity=".5">
            <line x1="60" y1="120" x2="920" y2="120" />
            <line x1="60" y1="480" x2="920" y2="480" />
            <line x1="120" y1="60" x2="120" y2="520" />
            <line x1="860" y1="60" x2="860" y2="520" />
          </g>
          <g stroke="#48484e" strokeWidth="1" opacity=".9">
            <line x1="160" y1="96" x2="852" y2="96" strokeDasharray="3 5" />
            <line x1="160" y1="88" x2="160" y2="104" />
            <line x1="852" y1="88" x2="852" y2="104" />
          </g>
          <text x="506" y="86" className="dim-label" textAnchor="middle">
            7.45 in — slide, DLC finish
          </text>
        </>
      )}

      <g>
        {/* grip */}
        <path
          d="M268 268 L362 268 L348 420 Q346 440 326 442 L268 446 Q252 446 254 428 L262 282 Z"
          fill={`url(#${frame})`}
          stroke="#3c3c41"
          strokeWidth="1.5"
        />
        <g fill="#0a0a0b" opacity=".9">
          <rect x="276" y="300" width="64" height="6" rx="3" />
          <rect x="275" y="314" width="64" height="6" rx="3" />
          <rect x="274" y="328" width="62" height="6" rx="3" />
          <rect x="273" y="342" width="61" height="6" rx="3" />
          <rect x="272" y="356" width="60" height="6" rx="3" />
          <rect x="271" y="370" width="58" height="6" rx="3" />
          <rect x="270" y="384" width="57" height="6" rx="3" />
          <rect x="269" y="398" width="55" height="6" rx="3" />
        </g>
        {/* magwell */}
        <path
          d="M256 430 L342 426 Q352 444 332 452 L268 456 Q248 452 256 430 Z"
          fill="#161618"
          stroke="#3c3c41"
          strokeWidth="1.5"
        />
        {/* beavertail */}
        <path
          d="M236 250 Q224 252 226 264 Q228 276 244 274 L268 268 L268 250 Z"
          fill={`url(#${frame})`}
          stroke="#3c3c41"
          strokeWidth="1.5"
        />
        {/* frame rail section */}
        <path
          d="M236 246 L700 246 L700 282 L362 282 L268 268 L236 264 Z"
          fill={`url(#${frame})`}
          stroke="#3c3c41"
          strokeWidth="1.5"
        />
        <g fill="#0a0a0b">
          <rect x="500" y="272" width="14" height="10" />
          <rect x="532" y="272" width="14" height="10" />
          <rect x="564" y="272" width="14" height="10" />
          <rect x="596" y="272" width="14" height="10" />
        </g>
        {/* trigger guard */}
        <path
          d="M390 280 L390 322 Q390 352 422 352 L446 352 Q482 350 482 312 L482 280 L456 280 L456 306 Q456 326 436 326 L432 326 Q412 326 412 306 L412 280 Z"
          fill={`url(#${frame})`}
          stroke="#3c3c41"
          strokeWidth="1.5"
        />
        <path d="M436 286 Q428 304 434 322" fill="none" stroke="#e0312e" strokeWidth="9" strokeLinecap="round" />
        {/* slide */}
        <path
          d="M232 162 L756 162 Q768 162 776 172 L796 196 L796 240 Q796 246 790 246 L240 246 Q228 246 228 234 L228 168 Q228 162 232 162 Z"
          fill={`url(#${steel})`}
          stroke="#4a4a52"
          strokeWidth="1.5"
        />
        {/* optic plate + irons */}
        <rect x="250" y="150" width="74" height="12" rx="2" fill="#222226" stroke="#4a4a52" />
        <rect x="258" y="142" width="10" height="9" fill="#39393f" />
        <rect x="744" y="148" width="8" height="14" fill="#39393f" />
        {/* rear serrations */}
        <g stroke="#0d0d0f" strokeWidth="5">
          <line x1="252" y1="172" x2="244" y2="238" />
          <line x1="268" y1="172" x2="260" y2="238" />
          <line x1="284" y1="172" x2="276" y2="238" />
          <line x1="300" y1="172" x2="292" y2="238" />
          <line x1="316" y1="172" x2="308" y2="238" />
        </g>
        {/* front serrations */}
        <g stroke="#0d0d0f" strokeWidth="5">
          <line x1="688" y1="172" x2="680" y2="238" />
          <line x1="704" y1="172" x2="696" y2="238" />
          <line x1="720" y1="172" x2="712" y2="238" />
        </g>
        {/* window cuts over bronze barrel */}
        <g>
          <path d="M470 168 L560 168 L552 196 L478 196 Z" fill="#070708" />
          <path d="M580 168 L664 168 L658 196 L572 196 Z" fill="#070708" />
          <rect x="470" y="174" width="200" height="16" fill={`url(#${bronze})`} opacity=".95" />
        </g>
        {/* ejection port */}
        <path d="M352 170 L444 170 L440 204 L356 204 Z" fill="#0a0a0b" stroke="#3a3a40" strokeWidth="1" />
        {/* muzzle + threads */}
        <rect x="796" y="196" width="44" height="34" rx="4" fill={`url(#${bronze})`} />
        <g stroke="#5e3c1c" strokeWidth="2">
          <line x1="804" y1="198" x2="804" y2="228" />
          <line x1="812" y1="198" x2="812" y2="228" />
          <line x1="820" y1="198" x2="820" y2="228" />
          <line x1="828" y1="198" x2="828" y2="228" />
        </g>
        <text x="630" y="232" className="slide-mark">
          ZEV OZ9 V2
        </text>
      </g>

      {detailed && (
        <>
          <g stroke="#48484e" strokeWidth="1">
            <line x1="660" y1="182" x2="730" y2="120" strokeDasharray="3 5" />
            <circle cx="660" cy="182" r="3" fill="#d9a05b" stroke="none" />
          </g>
          <text x="736" y="116" className="dim-label">
            PRO Match barrel, bronze TiCN
          </text>
          <g stroke="#48484e" strokeWidth="1">
            <line x1="430" y1="318" x2="360" y2="392" strokeDasharray="3 5" />
            <circle cx="430" cy="318" r="3" fill="#e0312e" stroke="none" />
          </g>
          <text x="352" y="412" className="dim-label" textAnchor="end">
            PRO Curved Face Trigger
          </text>
        </>
      )}
    </svg>
  );
}
