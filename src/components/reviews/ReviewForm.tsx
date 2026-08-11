"use client";

import { useState } from "react";
import { Form, TextArea, Label, FieldError, Button } from "@heroui/react";
import { FiStar } from "react-icons/fi";
import { Review } from "@/types/review.types";

interface ReviewFormProps {
  initialData?: Review;
  isSubmitting?: boolean;
  onSubmit: (data: { rating: number; comment: string }) => void;
  onCancel?: () => void;
}

export function ReviewForm({ initialData, isSubmitting, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(initialData?.rating ?? 5);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({ rating, comment: String(formData.get("comment") || "") });
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-surface p-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Your rating</label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setRating(i + 1)}
              className={`text-xl ${i < rating ? "text-price" : "text-border"}`}
            >
              <FiStar className={i < rating ? "fill-current" : ""} />
            </button>
          ))}
        </div>
      </div>

      <TextArea
        name="comment"
        isRequired
        minLength={3}
        defaultValue={initialData?.comment}
        placeholder="Share your experience with this product"
        rows={3}
      >
        <Label className="text-sm font-medium">Comment</Label>
        <FieldError className="text-xs text-danger" />
      </TextArea>

      <div className="flex gap-3">
        <Button type="submit" size="sm" isDisabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update review" : "Post review"}
        </Button>
        {onCancel && (
          <Button type="button" size="sm" variant="ghost" onPress={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
}