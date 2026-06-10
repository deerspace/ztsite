"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type NavTheme = "dark" | "light";

interface NavThemeValue {
  theme: NavTheme;
  // null clears any hero override → the chrome falls back to the dark default.
  setHeroTheme: (t: NavTheme | null) => void;
}

const NavThemeCtx = createContext<NavThemeValue>({
  theme: "dark",
  setHeroTheme: () => {},
});

export function NavThemeProvider({ children }: { children: React.ReactNode }) {
  const [heroTheme, setHero] = useState<NavTheme | null>(null);
  const setHeroTheme = useCallback((t: NavTheme | null) => setHero(t), []);
  return (
    <NavThemeCtx.Provider value={{ theme: heroTheme ?? "dark", setHeroTheme }}>
      {children}
    </NavThemeCtx.Provider>
  );
}

export const useNavTheme = () => useContext(NavThemeCtx);

// Sample the top band of a hero image (the region that sits behind the nav and
// the headline) and report whether the chrome should run light or dark. A light
// photo → white nav + dark copy; a dark photo → the default dark chrome.
// Clears the override on unmount so other routes get the dark default back.
export function useDetectHeroTheme(src: string, threshold = 140) {
  const { setHeroTheme } = useNavTheme();
  useEffect(() => {
    let cancelled = false;
    const img = new Image();

    const run = () => {
      try {
        if (!img.naturalWidth) return;
        const cw = 48;
        const ch = 12;
        const canvas = document.createElement("canvas");
        canvas.width = cw;
        canvas.height = ch;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        // Top ~28% of the image — what renders behind the nav + hero copy.
        const sh = Math.max(1, Math.round(img.naturalHeight * 0.28));
        ctx.drawImage(img, 0, 0, img.naturalWidth, sh, 0, 0, cw, ch);
        const { data } = ctx.getImageData(0, 0, cw, ch);
        let sum = 0;
        for (let i = 0; i < data.length; i += 4) {
          // Rec. 601 luma — perceptual brightness, 0–255.
          sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        }
        const lum = sum / (data.length / 4);
        if (!cancelled) setHeroTheme(lum > threshold ? "light" : "dark");
      } catch {
        // Tainted/blocked canvas — keep whatever the default chrome is.
      }
    };

    img.src = src;
    if (img.complete && img.naturalWidth) run();
    else img.addEventListener("load", run);

    return () => {
      cancelled = true;
      img.removeEventListener("load", run);
      setHeroTheme(null);
    };
  }, [src, threshold, setHeroTheme]);
}
