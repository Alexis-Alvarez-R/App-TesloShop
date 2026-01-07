import type { User } from "@/interface/user";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.action";

type AuthStatus = "aunthenticated" | "not-aunthenticated" | "checking";

type AuthState = {
  //Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  //getters

  isAdmin: () => boolean;

  //Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  register: (email: string, password: string, fulName: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Implementacion del store
  user: null,
  token: null,
  authStatus: "checking",

  //getters

  isAdmin: () => {
    const roles = get().user?.roles || [];

    return roles.includes("admin");
  },

  //actions
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, authStatus: "aunthenticated" });

      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-aunthenticated" });

      console.log(error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-aunthenticated" });
  },

  register: async (email: string, password: string, fullName: string) => {
    try {
      const data = await registerAction(email, password, fullName);
      localStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, authStatus: "aunthenticated" });

      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-aunthenticated" });

      console.log(error);
      return false;
    }
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();

      set({
        user: user,
        token: token,
        authStatus: "aunthenticated",
      });

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-aunthenticated",
      });

      return false;
    }
  },
}));
