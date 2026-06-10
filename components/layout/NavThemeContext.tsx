"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";

type Mode = "dark" | "light";

interface NavThemeValue {
  theme: Mode;
  // Override the nav chrome for the current page; null clears it → light default.
  setNavTheme: (t: Mode | null) => void;
}

// useLayoutEffect on the client, useEffect on the server (avoids the SSR warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const NavThemeCtx = createContext<NavThemeValue>({
  theme: "light",
  setNavTheme: () => {},
});

// The nav-chrome standard for the site:
//   • Light is the default — the site is white-first, so most pages' top region
//     is light and need declare nothing.
//   • A page whose top region is dark declares it with <NavTheme value="dark" />
//     (showcase pages get this automatically via ShowcaseNav).
//   • A page with a photographic hero detects it from the image with
//     useDetectHeroTheme(src): a dark photo → dark chrome, a light photo → light.
export function NavThemeProvider({ children }: { children: React.ReactNode }) {
  const [override, setOverride] = useState<Mode | null>(null);
  const setNavTheme = useCallback((t: Mode | null) => setOverride(t), []);
  return (
    <NavThemeCtx.Provider value={{ theme: override ?? "light", setNavTheme }}>
      {children}
    </NavThemeCtx.Provider>
  );
}

export const useNavTheme = () => useContext(NavThemeCtx);

// Declarative marker: drop <NavTheme value="dark" /> at the top of any page whose
// top region is dark. Sets the chrome on mount (before paint, so the page never
// flashes the light default) and clears it on unmount.
export function NavTheme({ value }: { value: Mode }) {
  const { setNavTheme } = useNavTheme();
  useIsoLayoutEffect(() => {
    setNavTheme(value);
    return () => setNavTheme(null);
  }, [value, setNavTheme]);
  return null;
}

// Sample the top band of a hero image (the region behind the nav + headline) and
// set the chrome from its brightness: a light photo → light nav + dark copy, a
// dark photo → dark nav. Clears the override on unmount → light default.
export function useDetectHeroTheme(src: string, threshold = 140) {
  const { setNavTheme } = useNavTheme();
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
        if (!cancelled) setNavTheme(lum > threshold ? "light" : "dark");
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
      setNavTheme(null);
    };
  }, [src, threshold, setNavTheme]);
}
