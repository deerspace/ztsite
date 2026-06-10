import type { Metadata } from "next";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Product Registration",
  description: "Register your ZEV firearm or component to speed up warranty service.",
};

export default function RegisterPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Support</p>
        <h1>Product Registration</h1>
        <p className="lede">Register your ZEV product. Optional, but it makes warranty service faster.</p>
      </div>
      <div className="info-wrap">
        <RegisterForm />
      </div>
    </>
  );
}
