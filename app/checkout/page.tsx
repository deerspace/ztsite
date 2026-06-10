import type { Metadata } from "next";
import CheckoutStub from "@/components/cart/CheckoutStub";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <CheckoutStub />;
}
