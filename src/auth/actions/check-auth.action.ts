import { tesloShopApi } from "@/api/tesloShopApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("token not found");

  try {
    const { data } = await tesloShopApi.get<AuthResponse>("/auth/check-status");

    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    localStorage.removeItem("token");

    console.log(error);
    throw new Error("Token expired or not valid");
  }
};
