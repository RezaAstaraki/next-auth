"use client";
import { signInOtp, test } from "@/actions/authActions";
import { useQuery } from "@tanstack/react-query";
import type { OtpSchemaType } from "@/schemas/authSchemas";

import { useForm } from "react-hook-form";

export default function Home() {
  //  const query = useQuery({ queryKey: ["ss"], queryFn: test });

  const { handleSubmit, register } = useForm<OtpSchemaType>();

  const onSubmit = async (data: OtpSchemaType) => {
    console.log(data);
    await signInOtp(data);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {/*   <pre>{JSON.stringify(query, null, 4)}</pre> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("otp")} type="text" />

        <button type="submit">login</button>
      </form>
    </section>
  );
}
