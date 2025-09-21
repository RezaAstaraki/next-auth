"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { resetUserState } from "../redux/features/customer/userSlice";
import { useSession } from "next-auth/react";
import { ApiError, ApiResponse } from "@/actions/types";

export const userAuthChecker = <
  T extends (...args: any[]) => Promise<ApiResponse<any>>,
>(
  action: T
) => {
  const dispatch = useAppDispatch();
  const userSate = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { data, status, update } = useSession();

  const isUserLoggedIN = async () => {
    if (userSate.expirationTime > Date.now()) {
      return true;
    } else {
      const state = await update("need Update");
      console.log("return from update", { state });
      //   if(status === "authenticated"){

      // }
    }
  };

  const loadingRef = useRef(userSate.loading);

  useEffect(() => {
    loadingRef.current = userSate.loading;
  }, [userSate.loading]);

  const waitForLoadingToFinish = async () => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (!loadingRef.current) {
          clearInterval(interval);
          resolve();
        }
      }, 500); // Check every 50ms
    });
  };

  const executeAction = async (
    ...args: Parameters<T>
  ): Promise<ApiResponse<T> | null> => {
    setLoading(true);
    try {
      // Wait until the Redux loading state becomes false
      if (userSate.loading || status === "loading") {
        await waitForLoadingToFinish();
      }
      if (!userSate.isLoggedIn) {
        dispatch(resetUserState());
        // dispatch(showCustomerLoginModal());
        const response: ApiError = {
          ok: false,
          message: "user is not Logged in",
          status: 402,
        };
        return response;
      }

      const result = await action(...args);

      if (result?.status === 402) {
        const isLoginState = await isUserLoggedIN();
        if (!isLoginState) {
          dispatch(resetUserState());
          // dispatch(showCustomerLoginModal());
          return null;
        }
        return await action(...args);
      }

      return result;
    } catch (error) {
      console.error("Error executing action:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, executeAction };
};
