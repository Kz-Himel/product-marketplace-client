import apiClient from "./client";
import { ApiResponse } from "@/types/common.types";
import { User } from "@/types/auth.types";

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: "USER" | "ADMIN";
}

export const userApi = {
  // ADMIN only
  getAll: async () => {
    const res = await apiClient.get<ApiResponse<User[]>>("/users");
    return res.data.data;
  },

  // any logged-in user (own id) or admin (any id)
  getById: async (id: string) => {
    const res = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return res.data.data;
  },

  update: async (id: string, payload: UpdateUserPayload) => {
    const res = await apiClient.patch<ApiResponse<User>>(
      `/users/${id}`,
      payload
    );
    return res.data.data;
  },

  // ADMIN only
  delete: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<User>>(`/users/${id}`);
    return res.data.data;
  },
};