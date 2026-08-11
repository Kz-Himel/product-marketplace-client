import { FiPackage } from "react-icons/fi";
import { Product } from "@/types/product.types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<FiPackage />}
        title="No products found"
        description="Try a different category or check back later."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}