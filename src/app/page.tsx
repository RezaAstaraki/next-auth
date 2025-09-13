"use client";
import { getDecodedToken, signoutAction } from "@/actions/authActions";
import { useQuery } from "@tanstack/react-query";
import { otpSchema, type OtpSchemaType } from "@/schemas/authSchemas";

import { useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServerSignOut } from "@/auth_setup/next_auth";
import { useSession } from "next-auth/react";
import OtpLogin from "../components/otp_login/OtpLogin";
import { useFormMutation } from "../hooks/useFormMutation";
import { profileShow } from "@/actions/user/user-actions";
import { useEffect } from "react";
import UpdateProfile from "../components/auth_cmp/update_profile/UpdateProfile";

export default function Home() {
  //  const query = useQuery({ queryKey: ["ss"], queryFn: test });

  const showProfileQuery = useQuery({
    queryFn: profileShow,
    queryKey: ["showProfile"],
    enabled: false,
  });

  useEffect(() => {
    const ss = showProfileQuery.data?.ok
      ? showProfileQuery.data.body
      : showProfileQuery.data?.message;

    console.log("data", ss);
  }, [showProfileQuery.isFetching]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {/*   <pre>{JSON.stringify(query, null, 4)}</pre> */}

      <Button
        onPress={async () => {
          await signoutAction();
        }}
      >
        logout
      </Button>
      <Button
        onPress={async () => {
          const res = await getDecodedToken();
        }}
      >
        get session
      </Button>
      {/* <pre>{JSON.stringify(showProfileQuery,null,2)}</pre> */}
      <Button
        isLoading={showProfileQuery.isFetching}
        onPress={() => {
          showProfileQuery.refetch();
        }}
      >
        get profile
      </Button>

      {/* <pre>{JSON.stringify({ session, status }, null, 2)}</pre> */}

      <OtpLogin stepRender="MobileStep" />

      <UpdateProfile />
    </section>
  );
}
