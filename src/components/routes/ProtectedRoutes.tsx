import { useAuthStore } from "@/auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "checking") return null;
  if (authStatus === "not-aunthenticated") return <Navigate to="/auth/login"></Navigate>;
  return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "checking") return null;
  if (authStatus === "aunthenticated") return <Navigate to="/"></Navigate>;
  return children;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { authStatus, isAdmin } = useAuthStore();

  if (authStatus === "checking") return null;
  if (authStatus === "not-aunthenticated") return <Navigate to="/auth/login"></Navigate>;
  if (!isAdmin()) return <Navigate to="/"></Navigate>;
  return children;
};
