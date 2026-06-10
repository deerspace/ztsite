"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Lightweight scroll parallax: translates the child by a fraction of its
// distance from viewport center. rAF-throttled, only runs while visible, and
// disabled under prefers-reduced-motion. Pair with an overflow-hidden parent
// and a slightly scaled image so edges never show.
export default function Parallax({
  children,
  amount = 40,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let visible = false;

    const apply = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.transform = `translate3d(0, ${(-progress * amount).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(apply); };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) apply();
      },
      { threshold: 0 },
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
