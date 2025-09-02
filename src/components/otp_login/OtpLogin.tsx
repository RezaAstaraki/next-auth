"use client";

import { MobileSchemaType, sendMobileSchema } from "@/schemas/authSchemas";
import {
  clientUrlMaker,
  handleFetchResponseClient,
} from "@/src/lib/clientUtils";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type StepType = "MobileStep" | "SendOtpStep";

type Props = {
  stepRender: StepType;
  uiStepOne?: React.ReactNode;
  uiStepTwo?: React.ReactNode;
};

export default function OtpLogin({
  stepRender,
  uiStepOne = MobileStep(),
  uiStepTwo = SendOtpStep(),
}: Props) {
  const [step, setStep] = useState<StepType>(stepRender);
  return (
    <>
      {step === "MobileStep" && uiStepOne}
      {step === "SendOtpStep" && uiStepTwo}
    </>
  );
}

const MobileStep = () => {
  const {
    formState: { errors },
    ...mobileForm
  } = useForm<MobileSchemaType>({ resolver: zodResolver(sendMobileSchema) });

  const sendMobile = async (data: MobileSchemaType) => {
    const res = await fetch(clientUrlMaker("/auth/request-otp"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("res", res);

    const response = await handleFetchResponseClient(
      res,
      mobileForm,
      sendMobileSchema,
    );

    console.log(response)
  };

  const submitMobile = (data: MobileSchemaType) => {
    sendMobileMutate.mutate(data);
  };

  const sendMobileMutate = useMutation({
    mutationFn: sendMobile,
    // retry: 3,
    onSuccess: (data) => {
      toast.success("کد به شما ارسال شد");
      console.log(data);
    },
    onError: (ee) => {
      console.log("eeee", ee);
      toast.error(ee.message ?? "خطا در ارسال کد");
    },
  });

  return (
    <form onSubmit={mobileForm.handleSubmit(submitMobile)}>
      <Input
        {...mobileForm.register("mobile")}
        type="text"
        errorMessage={errors.mobile?.message}
        isInvalid={!!errors.mobile}
      />
      <Button isLoading={sendMobileMutate.isPending} type="submit">
        ارسال کد
      </Button>
    </form>
  );
};

const SendOtpStep = () => {
  const otpForm = useForm();
  const submitOtpFrom = (data:any) => {
    console.log(data);
  };
  return (
    <form onSubmit={otpForm.handleSubmit(submitOtpFrom)}>
      <Button>ورود</Button>
    </form>
  );
};
