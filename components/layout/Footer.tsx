import Link from "next/link";

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
          <p>
            Copyright © 2026 ZEV Technologies, Inc. All rights reserved. Concept redesign — not
            affiliated with or endorsed by ZEV Technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
