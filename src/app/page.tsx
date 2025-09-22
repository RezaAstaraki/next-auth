"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import OtpLogin from "../components/auth_cmp/otp_login/OtpLogin";
import { otpres } from "@/test";
import { jwtDecode } from "jwt-decode";
import { callAuth, callSessionServer, getDecodedToken } from "@/actions/authActions";
import { profileShow } from "@/actions/user/user-actions";
import UpdateProfile from "../components/auth_cmp/update_profile/UpdateProfile";
import { userAuthChecker } from "../hooks/useAuthChecker";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setUserLoading } from "../redux/features/customer/userSlice";

const ff = async () => {
  const res = await fetch("/api/auth/session", {
    method: "GET",
    credentials: "include", // important for cookies
  });
  const data = await res.json();
  return data;
};

export default function HomePage() {
  const { executeAction } = userAuthChecker(profileShow);

  const dispatch = useAppDispatch();
  const userLoading = useAppSelector((state) => state.user.loading);

  const { data: session, update, status } = useSession();
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 py-8 md:py-10">
      <OtpLogin />
      <Button
        onPress={async () => {
          const res = await getDecodedToken();
          if (res) console.log(res);
        }}
      >
        decode
      </Button>
      <Button
        onPress={async () => {
          // const res = await profileShow();
          const res = await executeAction();
          console.log(res);
        }}
      >
        show profile
      </Button>
      <button
        onClick={async () => {
          const se = await update("updatee");
        }}
      >
        Trigger update
      </button>
      <Button
        onPress={async () => {
          console.log({ session }, { status });
        }}
      >
        show session
      </Button>
      <Button
        onPress={() => {
          dispatch(setUserLoading(!userLoading));
        }}
      >
        user Loading : {String(userLoading)}
      </Button>
      <Button
        onPress={async () => {
          const res = await callAuth();
          console.log(res);
        }}
      >
        call auth
      </Button>
      <Button
        onPress={async () => {
          const res = await callSessionServer();
          const ssss  = await ff()
          console.log(res);
          console.log({ssss});
        }}
      >
        call session
      </Button>
      <UpdateProfile />
    </section>
  );
}
