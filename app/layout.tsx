import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Ribbon from "@/components/layout/Ribbon";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/cart/CartProvider";
import MiniCart from "@/components/cart/MiniCart";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ZEV Technologies — Performance Defined",
    template: "%s — ZEV Technologies",
  },
  description:
    "ZEV Technologies designs and machines the world's finest performance firearm components. Pistols, slides, triggers, and barrels — built in the USA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <CartProvider>
          <Ribbon />
          <Nav />
          <main>{children}</main>
          <Footer />
          <MiniCart />
        </CartProvider>
      </body>
    </html>
  );
}
