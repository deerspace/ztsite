"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

// Scroll-snap carousel with arrow buttons, click-drag scrubbing, and arrows
// that disable at each end.
export default function Carousel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const baseStart = useRef(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    // Container padding leaves a small resting offset; treat that as "start".
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

  const scrollByCard = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".card");
    const step = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  // Click-drag scrubbing (desktop). Native touch scrolling handles mobile.
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
  // Suppress the click that follows a drag so cards aren't accidentally opened.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; }
  };

  return (
    <>
      <div className="lineup-head">
        <h2>{title}</h2>
        <div className="lineup-nav">
          <button className="car-btn" aria-label="Previous" disabled={!canPrev} onClick={() => scrollByCard(-1)}>‹</button>
          <button className="car-btn" aria-label="Next" disabled={!canNext} onClick={() => scrollByCard(1)}>›</button>
        </div>
      </div>
      <div
        className="carousel"
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>
    </>
  );
}
