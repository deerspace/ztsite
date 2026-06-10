// Reusable assurance row for purchase surfaces (buy + cart).
const ITEMS = [
  {
    label: "Lifetime warranty",
    sub: "On every ZEV component",
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M14 3l9 3v6c0 5.5-3.8 9.8-9 11-5.2-1.2-9-5.5-9-11V6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M10 14l3 3 5-6" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Ships to your FFL",
    sub: "Secure, compliant transfer",
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M4 10l10-5 10 5v9l-10 5-10-5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M4 10l10 5 10-5M14 15v9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Built in the USA",
    sub: "Machined in Washington",
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M4 18L14 5l10 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 18v5h12v-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="14" cy="16" r="2" fill="var(--accent)" />
      </svg>
    ),
  },
];

export default function TrustRow() {
  return (
    <div className="trust-row">
      {ITEMS.map((it) => (
        <div className="trust-item" key={it.label}>
          <span className="trust-icon">{it.icon}</span>
          <span className="trust-text">
            <span className="trust-label">{it.label}</span>
            <span className="trust-sub">{it.sub}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
