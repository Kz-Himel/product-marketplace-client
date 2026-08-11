import Link from "next/link";
import { FiBox, FiImage } from "react-icons/fi";
import { Product } from "../../types/products.types";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative flex h-40 items-center justify-center bg-surface-secondary">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <FiImage className="text-3xl text-muted" />
        )}
        <span className="absolute right-2 top-2 rounded-full bg-price px-2.5 py-0.5 font-mono text-xs font-semibold text-price-foreground">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold group-hover:text-accent">
            {product.name}
          </h3>
          <StatusBadge status={product.status} />
        </div>

        {product.category && (
          <span className="text-xs text-muted">{product.category.name}</span>
        )}

        <p className="line-clamp-2 text-sm text-muted">{product.description}</p>

        <div className="mt-auto flex items-center gap-1 pt-2 text-xs text-muted">
          <FiBox /> {product.stock} in stock
        </div>
      </div>
    </Link>
  );
}