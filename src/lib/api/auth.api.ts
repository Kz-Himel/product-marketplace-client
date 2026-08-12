import apiClient from "../api/client.api";
import { ApiResponse } from "@/types/common.types";
import {
  AuthUser,
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
} from "@/types/auth.types";

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const res = await apiClient.post<ApiResponse<AuthUser>>(
      "/auth/register",
      payload
    );
    return res.data.data;
  },

  login: async (payload: LoginPayload) => {
    const res = await apiClient.post<ApiResponse<LoginResponseData>>(
      "/auth/login",
      payload
    );
    return res.data.data;
  },
};