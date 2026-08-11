"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { FiImage, FiBox, FiShoppingCart } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useProduct } from "@/hooks/useProducts";
import { useReviews, useCreateReview, useUpdateReview, useDeleteReview } from "@/hooks/useReviews";
import { useCreateOrder } from "@/hooks/useOrders";
import { useAuth } from "@/lib/auth/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { Review } from "@/types/review.types";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { data: product, isLoading } = useProduct(id);
  const { data: allReviews } = useReviews();
  const createReview = useCreateReview();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();
  const createOrder = useCreateOrder();

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);

  if (isLoading) return <LoadingSpinner label="Loading product..." />;
  if (!product) return <p className="text-danger">Product not found.</p>;

  const reviews = (allReviews ?? []).filter((r) => r.productId === id);

  const handleOrder = () => {
    setOrderMessage(null);
    createOrder.mutate(
      { productId: id, quantity },
      {
        onSuccess: () => setOrderMessage("Order placed successfully!"),
        onError: (err: any) => setOrderMessage(err.message || "Order failed"),
      }
    );
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-secondary">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <FiImage className="text-4xl text-muted" />
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <StatusBadge status={product.status} />
          {product.category && (
            <span className="text-xs text-muted">{product.category.name}</span>
          )}
        </div>
        <h1 className="font-display text-3xl font-semibold">{product.name}</h1>
        <p className="mt-3 font-mono text-2xl font-semibold text-price-foreground">
          <span className="rounded-md bg-price px-2 py-1">${product.price.toFixed(2)}</span>
        </p>
        <p className="mt-4 text-muted">{product.description}</p>
        <p className="mt-3 flex items-center gap-1 text-sm text-muted">
          <FiBox /> {product.stock} in stock
        </p>

        {isAuthenticated ? (
          <div className="mt-6 flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            />
            <Button
              onPress={handleOrder}
              isDisabled={createOrder.isPending || product.stock === 0}
            >
              <FiShoppingCart className="mr-1" />
              {createOrder.isPending ? "Placing order..." : "Order now"}
            </Button>
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">
            <a href="/login" className="text-accent hover:underline">Log in</a> to place an order
          </p>
        )}

        {orderMessage && (
          <p className="mt-3 text-sm text-accent">{orderMessage}</p>
        )}

        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Reviews</h2>
            {isAuthenticated && !showReviewForm && (
              <Button size="sm" variant="ghost" onPress={() => setShowReviewForm(true)}>
                Write a review
              </Button>
            )}
          </div>

          {showReviewForm && (
            <div className="mb-4">
              <ReviewForm
                isSubmitting={createReview.isPending}
                onSubmit={(data) =>
                  createReview.mutate(
                    { ...data, productId: id },
                    { onSuccess: () => setShowReviewForm(false) }
                  )
                }
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          )}

          {editingReview && (
            <div className="mb-4">
              <ReviewForm
                initialData={editingReview}
                isSubmitting={updateReview.isPending}
                onSubmit={(data) =>
                  updateReview.mutate(
                    { id: editingReview.id, payload: data },
                    { onSuccess: () => setEditingReview(null) }
                  )
                }
                onCancel={() => setEditingReview(null)}
              />
            </div>
          )}

          <ReviewList
            reviews={reviews}
            onEdit={setEditingReview}
            onDelete={(reviewId) => deleteReview.mutate(reviewId)}
          />
        </div>
      </div>
    </div>
  );
}