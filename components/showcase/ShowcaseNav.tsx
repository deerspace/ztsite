"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Anchor {
  label: string;
  href: string;
}

// Apple-style local product sub-nav: appears once the hero scrolls away,
// pinned under the global nav, with the product name, section anchors, and a
// persistent Buy button.
export default function ShowcaseNav({
  name,
  buyHref,
  anchors = [],
}: {
  name: string;
  buyHref: string;
  anchors?: Anchor[];
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 460);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`subnav${shown ? " shown" : ""}`} aria-hidden={!shown}>
      <div className="subnav-inner">
        <span className="subnav-name">{name}</span>
        <div className="subnav-right">
          <div className="subnav-anchors">
            {anchors.map((a) => (
              <Link key={a.label} href={a.href}>{a.label}</Link>
            ))}
          </div>
          <Link className="btn btn-primary btn-sm" href={buyHref}>Buy</Link>
        </div>
      </div>
    </div>
  );
}
