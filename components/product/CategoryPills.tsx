import Link from "next/link";
import type { StoreCategory } from "@/lib/commerce";

export default function CategoryPills({
  categories,
  active,
}: {
  categories: StoreCategory[];
  active?: string;
}) {
  return (
    <nav className="pills" aria-label="Product categories">
      <Link href="/shop" className={`pill${active ? "" : " active"}`}>
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className={`pill${active === category.slug ? " active" : ""}`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
