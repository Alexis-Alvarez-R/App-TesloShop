import { RouterProvider } from "react-router";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "sonner";

import { AppRouter } from "./routes/app.route";
import type { PropsWithChildren } from "react";
import { useAuthStore } from "./auth/store/auth.store";
import { CustomFullscreenLoading } from "./components/custom/CustomFullscreenLoading";

const queryClient = new QueryClient();

const CheckAuthProvide = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CustomFullscreenLoading></CustomFullscreenLoading>;

  return children;
};

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster></Toaster>
      <CheckAuthProvide>
        <RouterProvider router={AppRouter}></RouterProvider>
      </CheckAuthProvide>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
