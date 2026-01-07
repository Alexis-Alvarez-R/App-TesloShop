import { tesloShopApi } from "@/api/tesloShopApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data } = await tesloShopApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return data;
  } catch (error) {
    console.log({ error });

    throw error;
  }
};
