import Link from "next/link";

export default function Ribbon() {
  return (
    <div className="ribbon">
      <p>
        Free shipping on orders over $99. Every ZEV component is backed by a lifetime warranty.{" "}
        <Link href="/shop">Shop the lineup&nbsp;›</Link>
      </p>
    </div>
  );
}
