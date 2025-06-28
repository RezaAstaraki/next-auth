"use client";



import { Provider } from "react-redux";
import ProgressbarC from "./progress bar/ProgressbarC";
import { Suspense } from "react";
import { store } from "@/src/redux/store";

interface ProviderProps {
  children: React.ReactNode;
}

const ReduxProvider = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ReduxProvider>
        <Suspense fallback={null}>
          <ProgressbarC />
        </Suspense>
        {children}
      </ReduxProvider>
  );
}
