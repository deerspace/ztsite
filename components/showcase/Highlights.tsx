"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// The track's snap line: its left padding edge, which lines up with the
// "See it in action" heading text. The focused tile aligns its left edge here.
const snapLine = (el: HTMLDivElement) =>
  el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);

export interface Highlight {
  kind: "image" | "product" | "statement";
  eyebrow: string;
  stat: string;
  sub?: string;
  img?: string;
  alt?: string;
}

// apple.com "Get the highlights" reel: one large card in focus with the next
// ones peeking on the right, the active card's caption fading in at the top and
// its image very slowly zooming. The focused card's left edge lines up with the
// heading. Click/tap any card (or the paddles) to bring it into focus.
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
  const raf = useRef(0);
  const [active, setActive] = useState(0);

  // The active card is the one whose left edge sits nearest the track's snap
  // line — the left padding, which lines up with the "See it in action" heading.
  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const els = el.querySelectorAll<HTMLElement>(".hl-card");
    const line = snapLine(el);
    let best = 0;
    let bestDist = Infinity;
    els.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.left - line);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const centerCard = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>(".hl-card")[i];
    if (!card) return;
    const r = card.getBoundingClientRect();
    el.scrollTo({ left: el.scrollLeft + (r.left - snapLine(el)), behavior: "smooth" });
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
          <button className="hl-btn" aria-label="Previous highlight" disabled={active === 0} onClick={() => centerCard(active - 1)}>‹</button>
          <button className="hl-btn" aria-label="Next highlight" disabled={active === cards.length - 1} onClick={() => centerCard(active + 1)}>›</button>
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
          <article
            className={`hl-card hl-card--${c.kind}${i === active ? " is-active" : ""}`}
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`${c.eyebrow}: ${c.stat}`}
            aria-current={i === active}
            onClick={() => centerCard(i)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); centerCard(i); } }}
          >
            {c.kind === "image" && c.img && (
              <Image src={c.img} alt={c.alt ?? ""} fill sizes="(max-width: 740px) 84vw, 900px" style={{ objectFit: "cover" }} />
            )}
            <div className="hl-cap">
              <span className="hl-eyebrow">{c.eyebrow}</span>
              <p className="hl-stat">{c.stat}</p>
              {c.sub && <p className="hl-sub">{c.sub}</p>}
            </div>
            {c.kind === "product" && c.img && (
              <div className="hl-pic">
                <Image src={c.img} alt={c.alt ?? ""} fill sizes="(max-width: 740px) 84vw, 900px" style={{ objectFit: "contain" }} />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
