"use cilen";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/schemas/authSchemas";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import Clo from "../../general components/client logger/Clo";
import { useQuery } from "@tanstack/react-query";
import { getCaptcha } from "@/actions/authActions";
import { useCaptcha } from "@/src/hooks/reactQueryHooks";
import { Suspense } from "react";
import Image from "next/image";

type Props = {};

export default function LoginForm({}: Props) {
  const {
    register,
    formState: { errors },
    reset,
    resetField,
    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      // email: "",
      // password: "",
    },
  });
  const onsubmit = (data: LoginSchemaType) => {
    console.log(data);
  };

  const { data, ...others } = useQuery({
    queryKey: ["getCaptchaKey"],
    queryFn: getCaptcha,
    gcTime: 6000,
    staleTime: 5000,
    // staleTime: 3 * 60 * 1000,
    // initialData: {
    //   errors: [],
    //   isSuccess: true,
    //   value: { cpCode: "ssas", img: "ddfdf" },
    // },

    // refetchInterval:1000,
    // initialDataUpdatedAt:0
  });
  // const { data } = useCaptcha();

  return (
    <>
      {/* <Suspense fallback={<p>loding ........</p>}> */}
      {/* <Clo data={{ others, ...data }} /> */}
      {/* </Suspense> */}
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col space-y-2"
      >
        <div>
          <Input
            type="text"
            {...register("mobile")}
            errorMessage={errors.mobile && errors.mobile.message}
            isInvalid={!!errors.mobile}
          />
        </div>
        <div>
          <Input
            type="mobile"
            {...register("mobile")}
            errorMessage={errors.mobile?.message}
            isInvalid={!!errors.mobile}
          />
        </div>
        {/* <div>
          <Image
            src={`data:image/png;base64,${data?.value?.img}`}
            width={100}
            height={40}
            alt="ss"
          />
          <Input
            type="text"
            {...register("code")}
            errorMessage={errors.email && errors.email.message}
            isInvalid={!!errors.email}
          />
        </div> */}
        <Button type="submit">log in</Button>
      </form>
    </>
  );
}
