"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FiBox, FiShoppingCart, FiTag } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useProduct } from "@/hooks/useProducts";
import { useAuth } from "@/lib/auth/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewForm } from "@/components/reviews/ReviewForm";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-success/15 text-success",
  INACTIVE: "bg-danger/15 text-danger",
  OUT_OF_STOCK: "bg-warning/15 text-warning",
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id);
  const { isAuthenticated } = useAuth();

  if (isLoading) return <LoadingSpinner label="Loading product..." />;
  if (!product) return null;

  const canOrder = product.status === "ACTIVE" && product.stock > 0;

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-secondary">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <FiBox className="text-4xl text-muted" />
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm text-muted">
              <FiTag /> {product.category?.name ?? "Uncategorized"}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[product.status]}`}>
              {product.status.replace("_", " ")}
            </span>
          </div>

          <h1 className="font-display text-3xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-muted">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="rounded-full bg-price/25 px-4 py-2 font-mono text-xl font-semibold text-price-foreground">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted">{product.stock} in stock</span>
          </div>

          <div className="mt-8">
            {canOrder ? (
              <Link href={`/orders/new?productId=${product.id}`}>
                <Button>
                  <FiShoppingCart className="mr-1" /> Order now
                </Button>
              </Link>
            ) : (
              <Button isDisabled>
                {product.status === "OUT_OF_STOCK" ? "Out of stock" : "Not available"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-4 font-display text-2xl font-semibold">Reviews</h2>
        {isAuthenticated && (
          <div className="mb-8">
            <ReviewForm productId={product.id} />
          </div>
        )}
        <ReviewList productId={product.id} reviews={product.reviews ?? []} />
      </div>
    </div>
  );
}