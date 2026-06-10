"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface Highlight {
  kind: "image" | "product" | "statement";
  eyebrow: string;
  stat: string;
  sub?: string;
  img?: string;
  alt?: string;
}

// apple.com "Get the highlights" reel: a heading + a watch link, and a
// horizontal scroll-snap row of cards (scene photos, light product shots, and
// bold statement cards) with paddle buttons + click-drag scrubbing.
export default function Highlights({
  eyebrow,
  heading,
  watchLabel,
  watchHref,
  cards,
}: {
  eyebrow?: string;
  heading: string;
  watchLabel?: string;
  watchHref?: string;
  cards: Highlight[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const baseStart = useRef(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > baseStart.current + 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    baseStart.current = el.scrollLeft;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".hl-card");
    const step = card ? card.offsetWidth + 18 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Click-drag scrubbing on desktop; native touch scrolling handles mobile.
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || e.pointerType === "touch") return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => { drag.current.active = false; };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; }
  };

  return (
    <section className="highlights">
      <div className="hl-head">
        <div className="hl-headings">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{heading}</h2>
          {watchHref && watchLabel && (
            <Link className="hl-watch" href={watchHref}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.16" />
                <path d="M10 8.4l6.2 3.6-6.2 3.6z" fill="currentColor" />
              </svg>
              {watchLabel}
            </Link>
          )}
        </div>
        <div className="hl-nav">
          <button className="hl-btn" aria-label="Previous highlight" disabled={!canPrev} onClick={() => scrollByCard(-1)}>‹</button>
          <button className="hl-btn" aria-label="Next highlight" disabled={!canNext} onClick={() => scrollByCard(1)}>›</button>
        </div>
      </div>

      <div
        className="hl-track"
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {cards.map((c, i) => (
          <article className={`hl-card hl-card--${c.kind}`} key={i}>
            {c.img && (c.kind === "product" ? (
              <div className="hl-pic">
                <Image src={c.img} alt={c.alt ?? ""} fill sizes="(max-width: 640px) 80vw, 360px" style={{ objectFit: "contain" }} />
              </div>
            ) : (
              <Image src={c.img} alt={c.alt ?? ""} fill sizes="(max-width: 640px) 80vw, 360px" style={{ objectFit: "cover" }} />
            ))}
            <div className="hl-cap">
              <span className="hl-eyebrow">{c.eyebrow}</span>
              <p className="hl-stat">{c.stat}</p>
              {c.sub && <p className="hl-sub">{c.sub}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
