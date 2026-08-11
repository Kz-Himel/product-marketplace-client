import apiClient from "../api/client.api";
import { ApiResponse } from "@/types/common.types";
import {
  Review,
  ReviewPayload,
  ReviewUpdatePayload,
} from "@/types/review.types";

export const reviewApi = {
  getAll: async () => {
    const res = await apiClient.get<ApiResponse<Review[]>>("/reviews");
    return res.data.data;
  },

  getById: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Review>>(`/reviews/${id}`);
    return res.data.data;
  },

  create: async (payload: ReviewPayload) => {
    const res = await apiClient.post<ApiResponse<Review>>(
      "/reviews",
      payload
    );
    return res.data.data;
  },

  update: async (id: string, payload: ReviewUpdatePayload) => {
    const res = await apiClient.patch<ApiResponse<Review>>(
      `/reviews/${id}`,
      payload
    );
    return res.data.data;
  },

  delete: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<Review>>(
      `/reviews/${id}`
    );
    return res.data.data;
  },
};