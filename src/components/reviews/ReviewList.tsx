"use client";

import { FiStar, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "@heroui/react";
import { Review } from "@/types/review.types";
import { useAuth } from "@/lib/auth/useAuth";

interface ReviewListProps {
  reviews: Review[];
  onEdit: (review: Review) => void;
  onDelete: (id: string) => void;
}

export function ReviewList({ reviews, onEdit, onDelete }: ReviewListProps) {
  const { user, isAdmin } = useAuth();

  if (reviews.length === 0) {
    return <p className="text-sm text-muted">No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const canManage = isAdmin || review.userId === user?.id;
        return (
          <div
            key={review.id}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{review.user?.name ?? "Anonymous"}</p>
                <div className="mt-0.5 flex items-center gap-0.5 text-price">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={i < review.rating ? "fill-current" : "opacity-30"}
                    />
                  ))}
                </div>
              </div>
              {canManage && (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" isIconOnly onPress={() => onEdit(review)}>
                    <FiEdit2 className="text-sm" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onPress={() => onDelete(review.id)}
                  >
                    <FiTrash2 className="text-sm text-danger" />
                  </Button>
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-muted">{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
}