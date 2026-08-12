"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "@/lib/api/review.api";
import { ReviewPayload, ReviewUpdatePayload } from "@/types/review.types";

export const reviewKeys = {
  all: ["reviews"] as const,
  detail: (id: string) => ["reviews", id] as const,
};

export function useReviews() {
  return useQuery({ queryKey: reviewKeys.all, queryFn: reviewApi.getAll });
}

export function useReview(id: string) {
  return useQuery({
    queryKey: reviewKeys.detail(id),
    queryFn: () => reviewApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ReviewPayload) => reviewApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: reviewKeys.all }),
  });
}

// id + payload passed as mutation variables (not hook arg) — needed for
// updating any row in a list (e.g. a review list on a product page, or
// the admin reviews table) without creating one hook instance per row
export function useUpdateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ReviewUpdatePayload }) =>
      reviewApi.update(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
      queryClient.invalidateQueries({ queryKey: reviewKeys.detail(variables.id) });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: reviewKeys.all }),
  });
}