import type { User } from "@/interface/user";

// login, register, checkstatus

export interface AuthResponse {
  user: User;
  token: string;
}
