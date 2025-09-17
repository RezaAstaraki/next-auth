"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import OtpLogin from "../components/auth_cmp/otp_login/OtpLogin";
import { otpres } from "@/test";
import { jwtDecode } from "jwt-decode";
import {
  callAuth,
  getDecodedToken,
} from "@/actions/authActions";
import { profileShow } from "@/actions/user/user-actions";
import { ref } from "process";
import UpdateProfile from "../components/auth_cmp/update_profile/UpdateProfile";

export default function HomePage() {
  const { data: session, update ,status} = useSession()
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 py-8 md:py-10">
      <OtpLogin />
      <Button
        onPress={async () => {
          const res = await getDecodedToken(true);
          if (res) console.log(res);
        }}
      >
        decode
      </Button>
      <Button
        onPress={async () => {
          const res = await profileShow();
          console.log(res);
        }}
      >
        show profile
      </Button>
      <button
        onClick={async () => {
          console.log("Before update:", session,{status});
          await update("update");
        }}
      >
        Trigger update
      </button>
      <Button
        onPress={async () => {
          console.log({session},{status})

        }}
      >
        show session
      </Button>
      <Button
        onPress={async () => {
          //  const ss = await getDecodedToken();
          //  const reff = ss?.user.refreshToken
          //  console.log({reff})
          //  if(reff){
          //    const newtokens =await refreshTokens(reff)
          //    console.log({newtokens})
          //    if( newtokens.ok){
          //      const ers =  setNewTokens(newtokens.body)
          //    }
          //  }
          // refre()

          const res  =await callAuth()
          console.log(res)
        }}
      >
        call auth
      </Button>
      <UpdateProfile />
    </section>
  );
}
