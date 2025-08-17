"use cilen";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/schemas/authSchemas";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import Clo from "../../general components/client logger/Clo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCaptcha, sendSms } from "@/actions/authActions";
import { useCaptcha } from "@/src/hooks/reactQueryHooks";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";

type Props = {};

export default function LoginForm({}: Props) {
  const [step, setStep] = useState(1)
  const {
    register,
    formState: { errors },
    reset,
    setValue,
    resetField,

    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      // email: "",
      // password: "",
    },
  });

  const sendSMS = useMutation({
    mutationFn: sendSms,
    mutationKey: ["sendSMS"],

    onSuccess: (data) => {
      console.log("✅ SMS sent successfully:", data);
      setStep(2)
    },
    onError: (error) => {
      console.error("❌ Failed to send SMS:", error);
    },
  });

  const { data, refetch, ...others } = useQuery({
    queryKey: ["getCaptchaKey"],
    queryFn: getCaptcha,
  });

  useEffect(() => {

    console.log(data)

    if (data?.value?.cpCode) setValue("cpCode", data?.value?.cpCode);
  }, [others.isSuccess,others.isFetching]);

  const onsubmit = (data: LoginSchemaType) => {
    console.log(data);
    sendSMS.mutate(data);
  };





  return (
    <>
      {/* <Suspense fallback={<p>loding ........</p>}> */}
      {/* <Clo data={{ others, ...data }} /> */}
      {/* </Suspense> */}
      {step ===1 &&
      
      <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex flex-col space-y-2"
      >
        <div>
          <Input
            type="mobile"
            {...register("mobile")}
            errorMessage={errors.mobile?.message}
            isInvalid={!!errors.mobile}
            />
        </div>
        {
          <div className="flex ">
            <Input
              type="text"
              {...register("captcha")}
              errorMessage={errors.captcha && errors.captcha.message}
              isInvalid={!!errors.captcha}
              />
            <Image
              src={`data:image/png;base64,${data?.value?.img}`}
              width={100}
              height={40}
              alt="ss"
              />
            <button
              onClick={() => {
                refetch();
              }}
              type="button"
              >
              REfresh
            </button>
          </div>
        }
        <Button type="submit">send sms</Button>
      </form>
  }
  {step === 2 && 
        <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex flex-col space-y-2"
      >
        <div>
          <Input
            type="code"
            {...register("mobile")}
            errorMessage={errors.mobile?.message}
            isInvalid={!!errors.mobile}
            />
        </div>

        <Button type="submit">log in</Button>
      </form>
  
  }
    </>
  );
}
