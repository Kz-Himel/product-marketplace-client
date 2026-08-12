import apiClient from "./client.api";
import { ApiResponse } from "@/types/common.types";
import { User, UserRole } from "@/types/auth.types";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

export const userApi = {
  getAll: async () => {
    const res = await apiClient.get<ApiResponse<User[]>>("/users");
    return res.data.data;
  },
  create: async (payload: CreateUserPayload) => {
    const res = await apiClient.post<ApiResponse<User>>("/users", payload);
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return res.data.data;
  },
  update: async (id: string, payload: UpdateUserPayload) => {
    const res = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, payload);
    return res.data.data;
  },
  delete: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<User>>(`/users/${id}`);
    return res.data.data;
  },
};