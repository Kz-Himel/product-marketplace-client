import apiClient from "../api/client.api";
import { ApiResponse } from "@/types/common.types";
import { Category, CategoryPayload } from "@/types/category.types";

export const categoryApi = {
  getAll: async () => {
    const res = await apiClient.get<ApiResponse<Category[]>>("/categories");
    return res.data.data;
  },

  getById: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Category>>(
      `/categories/${id}`
    );
    return res.data.data;
  },

  create: async (payload: CategoryPayload) => {
    const res = await apiClient.post<ApiResponse<Category>>(
      "/categories",
      payload
    );
    return res.data.data;
  },

  update: async (id: string, payload: Partial<CategoryPayload>) => {
    const res = await apiClient.patch<ApiResponse<Category>>(
      `/categories/${id}`,
      payload
    );
    return res.data.data;
  },

  delete: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<Category>>(
      `/categories/${id}`
    );
    return res.data.data;
  },
};