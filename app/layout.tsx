import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { NavThemeProvider } from "@/components/layout/NavThemeContext";
import CartProvider from "@/components/cart/CartProvider";
import MiniCart from "@/components/cart/MiniCart";
import RouteTransition from "@/components/ux/RouteTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zevtechnologies.com"),
  title: {
    default: "ZEV Technologies — Performance Defined",
    template: "%s — ZEV Technologies",
  },
  description:
    "ZEV Technologies designs and machines the world's finest performance firearm components. Pistols, slides, triggers, and barrels — built in the USA.",
  openGraph: {
    type: "website",
    siteName: "ZEV Technologies",
    title: "ZEV Technologies — Performance Defined",
    description:
      "The OZ9 modular pistol platform, the FDP, and match-grade components — designed and machined in the USA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEV Technologies — Performance Defined",
    description:
      "The OZ9 modular pistol platform, the FDP, and match-grade components — designed and machined in the USA.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <CartProvider>
          <NavThemeProvider>
            <a href="#main" className="skip-link">Skip to content</a>
            <Nav />
            <main id="main"><RouteTransition>{children}</RouteTransition></main>
            <Footer />
            <MiniCart />
          </NavThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
