"use client";
import {
  getTokenAction,
  signInOtp,
  signoutAction,
  test,
} from "@/actions/authActions";
import { useQuery } from "@tanstack/react-query";
import { otpSchema, type OtpSchemaType } from "@/schemas/authSchemas";

import { useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServerSignOut } from "@/auth_setup/next_auth";
import { useSession } from "next-auth/react";
import OtpLogin from "../components/otp_login/OtpLogin";

export default function Home() {
  //  const query = useQuery({ queryKey: ["ss"], queryFn: test });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OtpSchemaType>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpSchemaType) => {
    console.log(data);
    await signInOtp(data);
  };

  // const { data: session, status, update } = useSession();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {/*   <pre>{JSON.stringify(query, null, 4)}</pre> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("otpCode")}
          type="text"
          errorMessage={errors.otpCode?.message}
          isInvalid={!!errors.otpCode}
        />

        <Button type="submit">login</Button>
      </form>
      <Button
        onPress={async () => {
          await signoutAction();
        }}
      >
        logout
      </Button>

      <Button
        onPress={async () => {
          const res = await getTokenAction();
          console.log(res);
        }}
      >
        get session
      </Button>
      {/* <pre>{JSON.stringify({ session, status }, null, 2)}</pre> */}


      <OtpLogin stepRender="MobileStep"/>
    </section>
  );
}
