"use client";

import { useRef, type ReactNode } from "react";

// Scroll-snap carousel with arrow buttons; scrolls by one card width + gap.
export default function Carousel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".card");
    const step = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <>
      <div className="lineup-head">
        <h2>{title}</h2>
        <div className="lineup-nav">
          <button className="car-btn" aria-label="Previous" onClick={() => scrollByCard(-1)}>
            ‹
          </button>
          <button className="car-btn" aria-label="Next" onClick={() => scrollByCard(1)}>
            ›
          </button>
        </div>
      </div>
      <div className="carousel" ref={scroller}>
        {children}
      </div>
    </>
  );
}
