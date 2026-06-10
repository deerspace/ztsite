import Link from "next/link";
import Reveal from "@/components/ux/Reveal";

// Shared showcase building blocks. Heroes and feature bands are authored
// per-page (distinct layouts); these are the repeated bottom-of-page pieces.

export function SpecStrip({
  items,
  className = "",
}: {
  items: { value: string; unit?: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={`specs ${className}`.trim()}>
      {items.map((s) => (
        <Reveal key={s.label}>
          <div className="spec-num">
            {s.value}
            {s.unit && <small>{s.unit}</small>}
          </div>
          <div className="spec-label">{s.label}</div>
        </Reveal>
      ))}
    </div>
  );
}

export function ShowcaseCTA({
  title,
  buyHref,
  buyLabel = "Buy",
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  buyHref: string;
  buyLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="show-cta">
      <Reveal>
        <h2>{title}</h2>
        <div className="cta-row">
          <Link className="btn btn-primary btn-lg" href={buyHref}>{buyLabel}</Link>
          {secondaryHref && (
            <Link className="link-arrow" href={secondaryHref}>{secondaryLabel} <span>›</span></Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
