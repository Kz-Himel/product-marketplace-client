"use client";

import { useState } from "react";
import { FiStar, FiTrash2, FiEdit2 } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useAuth } from "@/lib/auth/useAuth";
import { useDeleteReview, useUpdateReview } from "@/hooks/useReviews";
import { ProductReviewRef } from "../../types/products.types";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";

export function ReviewList({
  reviews,
}: {
  productId: string;
  reviews: ProductReviewRef[];
}) {
  const { user, isAdmin } = useAuth();
  const deleteReview = useDeleteReview();
  const updateReview = useUpdateReview();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState("");

  if (reviews.length === 0) {
    return <EmptyState icon={<FiStar />} title="No reviews yet" description="Be the first to review this product." />;
  }

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    await deleteReview.mutateAsync(pendingDeleteId);
    setPendingDeleteId(null);
  };

  const startEdit = (review: ProductReviewRef) => {
    setEditingId(review.id);
    setEditComment(review.comment);
  };

  const saveEdit = async (id: string) => {
    await updateReview.mutateAsync({ id, payload: { comment: editComment } });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const canManage = isAdmin || review.user?.id === user?.id;

        return (
          <div key={review.id} className="rounded-2xl border border-border bg-surface p-4">
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.user?.name ?? "Anonymous"}</span>
                <span className="flex items-center gap-0.5 text-price-foreground">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FiStar key={i} className="fill-price" />
                  ))}
                </span>
              </div>
              {canManage && (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onPress={() => startEdit(review)}>
                    <FiEdit2 />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-danger"
                    onPress={() => setPendingDeleteId(review.id)}
                  >
                    <FiTrash2 />
                  </Button>
                </div>
              )}
            </div>

            {editingId === review.id ? (
              <div className="mt-2 space-y-2">
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                />
                <div className="flex gap-2">
                  <Button size="sm" isDisabled={updateReview.isPending} onPress={() => saveEdit(review.id)}>
                    {updateReview.isPending ? "Saving..." : "Save"}
                  </Button>
                  <Button size="sm" variant="ghost" onPress={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-sm text-muted">{review.comment}</p>
            )}

            <p className="mt-2 font-mono text-xs text-muted">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
      })}

      <ConfirmDialog
        isOpen={!!pendingDeleteId}
        title="Delete this review?"
        description="This will soft-delete the review."
        isLoading={deleteReview.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}