import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Pistols", href: "/category/pistols" },
      { label: "Slides", href: "/category/slides" },
      { label: "Triggers", href: "/category/triggers" },
      { label: "Barrels", href: "/category/barrels" },
      { label: "Sights", href: "/category/sights" },
      { label: "Shop all", href: "/shop" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Warranty", href: "#" },
      { label: "Manuals", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "FFL Transfers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About ZEV", href: "#" },
      { label: "Dealers", href: "#" },
      { label: "Newsroom", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Prop 65 Notice", href: "#" },
      { label: "Export Compliance", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <NewsletterSignup />
        <div className="footer-cols">
          {COLUMNS.map((col) => (
            <div className="footer-col" key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-legal">
          <p>
            You must be 21 years or older to purchase firearms, and 18 or older to purchase parts
            and accessories. All firearm sales ship to a licensed FFL dealer. Please confirm
            legality in your state before ordering.
          </p>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2026 ZEV Technologies, Inc. Concept redesign — not affiliated with or endorsed by ZEV Technologies.</p>
          <div className="footer-meta">
            <div className="footer-social" aria-label="Social">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 20 20" width="18" height="18"><rect x="3" y="3" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="14.2" cy="5.8" r="1" fill="currentColor"/></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 20 20" width="18" height="18"><rect x="2" y="5" width="16" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M8.5 7.5l4 2.5-4 2.5z" fill="currentColor"/></svg>
              </a>
              <a href="#" aria-label="X">
                <svg viewBox="0 0 20 20" width="16" height="16"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </a>
            </div>
            <span className="footer-locale">United States</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
