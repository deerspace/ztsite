"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Subtle route cross-fade. Keying the wrapper by pathname re-mounts the
// page content on navigation, which replays the fade-in. The CSS honors
// prefers-reduced-motion. (Next's experimental View Transitions flag does
// not auto-animate client navigations, so this is the reliable approach.)
export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-fade">
      {children}
    </div>
  );
}
