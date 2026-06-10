"use client";

import { useEffect, useRef } from "react";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Stat counter: counts 0 → target over 1.4s once ~40% visible.
export default function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = String(Math.round(easeOut(p) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-num">
      0
    </span>
  );
}
