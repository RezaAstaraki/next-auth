"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  resetUserState,
  setExpirationTime,
  setUserDetail,
} from "../redux/features/customer/userSlice";
import { useSession } from "next-auth/react";
import { ApiError, ApiResponse } from "@/actions/types";

export const userAuthChecker = <
  T extends (...args: any[]) => Promise<ApiResponse<any>>,
>(
  action: T,
  shouldUpdate: boolean = false
) => {
  const dispatch = useAppDispatch();
  const userSate = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { data, status, update } = useSession();

  const loadingRef = useRef(userSate.loading);
  useEffect(() => {
    loadingRef.current = userSate.loading;
  }, [userSate.loading]);

  const isUserLoggedIN = async () => {
    if (userSate.expirationTime > Date.now() / 1000 && !shouldUpdate) {
      return true;
    } else {
      const state = await update("need Update");
      console.log(state);
      if (status === null) {
        return false;
      } else {
        if (state?.exp) {
          dispatch(setExpirationTime(state?.exp));
          dispatch(
            setUserDetail({
              mobile: state.user.mobile,
              name: state.user.name,
              roles:state.user.roles
              
            })
          );
        }
        return true;
      }
    }
  };

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
  ): Promise<Awaited<ReturnType<T>> | ApiError | null> => {
    setLoading(true);
    try {
      // Wait until the Redux loading state becomes false
      if (userSate.loading || status === "loading") {
        await waitForLoadingToFinish();
      }
      if (!userSate.isLoggedIn) {
        dispatch(resetUserState());
        // dispatch(showCustomerLoginModal());

        return {
          ok: false,
          message: "user is not Logged in",
          status: 401,
        };
      }

      if (!(await isUserLoggedIN())) {
        console.warn("second check");
      }

      const result = await action(...args);

      if (result?.status === 401) {
        const isLoginState = await isUserLoggedIN();
        if (!isLoginState) {
          dispatch(resetUserState());
          // dispatch(showCustomerLoginModal());
          return null;
        }
        return (await action(...args)) as Awaited<ReturnType<T>>;
      }

      return result as Awaited<ReturnType<T>>;
    } catch (error) {
      console.error("Error executing action:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, executeAction };
};
