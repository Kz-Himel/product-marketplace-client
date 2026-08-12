"use client";

import { useState } from "react";
import { FiStar, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useReviews, useUpdateReview, useDeleteReview } from "@/hooks/useReviews";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function AdminReviewsPage() {
  const { data: reviews, isLoading } = useReviews();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleStatus = async (id: string, current: string) => {
    setActiveId(id);
    try {
      await updateReview.mutateAsync({
        id,
        payload: { status: current === "PUBLISHED" ? "HIDDEN" : "PUBLISHED" },
      });
    } finally {
      setActiveId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    await deleteReview.mutateAsync(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold">Reviews</h1>

      {isLoading && <LoadingSpinner />}
      {reviews && reviews.length === 0 && <EmptyState icon={<FiStar />} title="No reviews yet" />}

      {reviews && reviews.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-secondary text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Comment</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-t border-border">
                  <td className="px-4 py-3">{review.product?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{review.user?.name ?? "—"}</td>
                  <td className="px-4 py-3 font-mono">{review.rating}/5</td>
                  <td className="max-w-xs truncate px-4 py-3 text-muted">{review.comment}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        review.status === "PUBLISHED" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        isDisabled={activeId === review.id}
                        onPress={() => toggleStatus(review.id, review.status)}
                      >
                        {review.status === "PUBLISHED" ? <FiEyeOff /> : <FiEye />}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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