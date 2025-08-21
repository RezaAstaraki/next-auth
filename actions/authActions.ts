"use server";

import {
  LoginSchema,
  LoginSchemaType,
  OtpSchemaType,
} from "@/schemas/authSchemas";
import { ApiResponse } from "./types";
import { ServerSignIn } from "@/auth_setup/next_auth";

type CaptchaType = {
  img: string;
  cpCode: string;
};

export async function getCaptcha(): Promise<ApiResponse<CaptchaType>> {
  try {
    const res = await fetch("https://customerapi.tavanastore.ir/v1/Captcha", {
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
      },
    });

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return {
      isSuccess: false,
      errors: ["some thing went run server action"],
      value: null,
    };
  }
}

export async function sendSms(
  data: LoginSchemaType,
): Promise<ApiResponse<any>> {
  const parsedData = LoginSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      isSuccess: false,
      errors: parsedData.error.errors.map((e) => e.message),
      value: null,
    };
  }

  console.log(parsedData);

  try {
    const res = await fetch(
      "https://customerapi.tavanastore.ir/v1/Auth/SendSms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData.data),
      },
    );

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("error", error);
    // return a valid UnSuccessResponse object
    return {
      isSuccess: false,
      errors: ["some thing went run server action"],
      value: null,
    };
  }
}

export const test = async () => {
  return { hello: "world" };
  // throw new Error("test error");
};

export const signInOtp = async (data: OtpSchemaType) => {
  //  const fromData = new FormData(data)

  await ServerSignIn("otp", data);
};
