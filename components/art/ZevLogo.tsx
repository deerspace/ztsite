// ZEV wordmark, typeset in the site's Inter face. The letters use currentColor
// so the mark adapts to the dark/light nav; the red accent bar is the one fixed
// brand element. The wrapping link carries the accessible name, so this is
// decorative.
export default function ZevLogo() {
  return (
    <span className="zev-wordmark" aria-hidden="true">
      ZEV<span className="zev-accent" />
    </span>
  );
}
