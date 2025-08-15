"use client";

import { Provider } from "react-redux";
import ProgressbarC from "./progress bar/ProgressbarC";
import { Suspense } from "react";
import { store } from "@/src/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProviderProps {
  children: React.ReactNode;
}

const ReduxProvider = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <Suspense fallback={null}>
          <ProgressbarC />
        </Suspense>
        {children}
      </ReduxProvider>
    </QueryClientProvider>
  );
}
