"use client";


import {
  MobileSchemaType,
  OtpSchemaType,
  sendMobileSchema,
} from "@/schemas/authSchemas";
import { useFormMutation } from "@/src/hooks/useFormMutation";
import { useCountDownTimer } from "@/src/hooks/useCountDownTimer";
import {
  clientUrlMaker,
  handleFetchResponseClient,
} from "@/src/lib/clientUtils";
import {
  resetOtp,
  setOtp,
  setStep,
} from "@/src/redux/features/loginotp/loginOtpSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { InputOtp, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect,} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInOtpAction } from "@/actions/authActions";
type StepType = "MobileStep" | "SendOtpStep";
type Props = {
  stepRender?: StepType;
  uiStepOne?: React.ReactNode;
  uiStepTwo?: React.ReactNode;
};
export default function OtpLogin({
  stepRender,
  uiStepOne = MobileStep(),
  uiStepTwo = SendOtpStep(),
}: Props) {
  const step = useAppSelector((state) => state.otp.step);
  return (
    <div className="border p-3 rounded ">
      {step === "MobileStep" && uiStepOne}
      {step === "SendOtpStep" && uiStepTwo}
    </div>
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
    const response = await handleFetchResponseClient(
      res,
      mobileForm,
    );
    return response;
  };

  const dispatch = useAppDispatch();
  const submitMobile = (data: MobileSchemaType) => {
    sendMobileMutate.mutate(data);
  };

  const sendMobileMutate = useMutation({
    mutationFn: sendMobile,
    // retry: 3,
    onSuccess: (data) => {
      toast.success("کد به شما ارسال شد");
      dispatch(
        setOtp({
          step: "SendOtpStep",
          expires_at: data.expires_at,
          request_id: data.request_id,
          mobile: mobileForm.getValues("mobile"),
        })
      );
    },
    onError: (ee) => {
      console.error("eeee", ee);
      toast.error(ee.message ?? "خطا در ارسال کد");
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={mobileForm.handleSubmit(submitMobile)}
    >
      <div className="flex flex-col items-center justify-center gap-4 py-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            id="phone"
            type="tel"
            label="شماره موبایل"
            labelPlacement="outside"
            {...mobileForm.register("mobile")}
            placeholder="شماره موبایل خود را وارد کنید"
            className="col-span-3 font-bold"
            classNames={{
              inputWrapper: "text-right dir-rtl",
              input: "text-right dir-rtl",
            }}
            errorMessage={errors.mobile?.message}
            isInvalid={!!errors.mobile}
            maxLength={11}
            onInput={(e) => {
              const input = e.currentTarget;
              input.value = input.value.replace(/[^0-9۰-۹]/g, "");
            }}
          />
        </div>
      </div>
      <Button
        color="primary"
        type="submit"
        className="px-20"
        isDisabled={sendMobileMutate.isPending}
      >
        {sendMobileMutate.isPending ? (
          <>
            <Spinner color="default" size="sm" /> در حال ارسال
          </>
        ) : (
          "دریافت کد"
        )}
      </Button>
    </form>
  );
};

const SendOtpStep = () => {
  const otpForm = useForm<OtpSchemaType>();
  const dispatch = useAppDispatch();
  const otpState = useAppSelector((state) => state.otp);

  // const mutateOtp = useMutation({
  //   mutationFn: signInOtp,
  //   mutationKey: ["otpLogin"],

  //   onSuccess: (data) => {
  //     if(!data.ok){
  //   throw new Error (data.message)
  //  }
  //   },
  //   onError: (error) => {
  //     toast.error(error.message ?? "خطا در ارسال کد");

  //     console.error(error);
  //     throw new Error("eooooo");
  //   },
  // });

  const mutateOtp = useFormMutation({mutationFn:signInOtpAction,mutationKey:['signInOtp']},{hookForm:otpForm,toastContent:'all'})
  // const mutateOtp = useMutation({mutationFn:signInOtp,mutationKey:['signInOtp']})


  const isExpired =
    !otpState.expires_at ||
    new Date(otpState.expires_at).getTime() <= Date.now();

  const submitOtpForm = async (data: OtpSchemaType) => {
   const res =await mutateOtp.mutateAsync({...data,mobile:otpState.mobile,request_id:otpState.request_id});
   console.log('res of op submit ',res)
  };

  const { time } = useCountDownTimer(otpState.expires_at);

  const handleEditPhoneNumber = () => {
    dispatch(resetOtp());
  };

  const canResend = true;


  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 text-center text-sm text-gray-600">
        کد تأیید به شماره <span className="font-bold">{otpState.mobile}</span>{" "}
        ارسال شد.
        <br />
        اگر شماره اشتباه است{" "}
        <button
          type="button"
          onClick={() => {
            dispatch(resetOtp());
          }}
          className="ml-1 text-blue-500 hover:underline"
        >
          ویرایش کنید
        </button>
      </div>
      <form onSubmit={otpForm.handleSubmit(submitOtpForm)}>
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div dir="ltr">
            {/* OTP Input Field */}

            <InputOtp
              className="direction-ltr mx-auto text-center text-black"
              variant="faded"
              size="lg"
              autoFocus
              {...otpForm.register("code")}
              type="tel"
              length={6}
              isRequired={false}
              // validate={()=>true}
              errorMessage={otpForm.formState.errors.code?.message}
              isInvalid={!!otpForm.formState.errors.code}
              // onComplete={handleComplete}
              isDisabled={otpForm.formState.isSubmitting}
              // validationBehavior="aria"
              // formNoValidate={false}
              validationBehavior="aria"
              minLength={undefined}
            />
          </div>

          <div className="text-center">
            <p className="text-gray-500">
              {canResend ? (
                <>
                  کد ورود دریافت نکرده‌اید؟
                  <button
                    type="button"
                    // onClick={sendOTP}
                    className="ml-1 mr-2 font-medium text-blue-600 transition-colors hover:text-blue-800"
                  >
                    ارسال مجدد کد
                  </button>
                </>
              ) : (
                <>
                  ارسال مجدد تا{" "}
                  <span className="font-medium text-blue-600">{time}</span> دیگر
                </>
              )}
            </p>
          </div>
        </div>

        <Button
          color="primary"
          type="submit"
          className="px-20"
          isDisabled={otpForm.formState.isSubmitting}
        >
          {otpForm.formState.isSubmitting ? (
            <>
              <Spinner color="default" size="sm" /> در حال ارسال
            </>
          ) : (
            "تایید"
          )}
        </Button>
      </form>
    </div>
  );
};
