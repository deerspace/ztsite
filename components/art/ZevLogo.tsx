export default function ZevLogo({ width = 60, height = 16 }: { width?: number; height?: number }) {
  return (
    <svg viewBox="0 0 92 24" width={width} height={height} aria-hidden="true">
      <path d="M2 3h22l-14 14h14v4H2l14-14H2z" fill="currentColor" />
      <path d="M32 3h16v4H37v3h10v4H37v3h11v4H32z" fill="currentColor" />
      <path d="M52 3h5l5.5 12L68 3h5l-9 18h-3z" fill="currentColor" />
      <rect x="78" y="3" width="3" height="18" rx="1.5" fill="#e0312e" />
    </svg>
  );
}
