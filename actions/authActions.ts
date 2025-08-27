"use server";

import { decode, getToken } from "next-auth/jwt";

import {
  LoginSchema,
  LoginSchemaType,
  OtpSchemaType,
} from "@/schemas/authSchemas";
import { ApiResponse } from "./types";
import { ServerSignIn, ServerSignOut } from "@/auth_setup/next_auth";
import { cookies } from "next/headers";

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
  data: LoginSchemaType
): Promise<ApiResponse<any>> {
  const parsedData = LoginSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      isSuccess: false,
      errors: parsedData.error.errors.map((e) => e.message),
      value: null,
    };
  }

  try {
    const res = await fetch(
      "https://customerapi.tavanastore.ir/v1/Auth/SendSms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData.data),
      }
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
  try {
    //  const fromData = new FormData(data)

    await ServerSignIn("otp", data);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const signoutAction = async () => {
  await ServerSignOut({ redirect: true });
};

export const getTokenAction = async () => {
  const to = (await cookies()).get("authjs.session-token")?.value;

  if (!to) return null;

  const ss = await decode({
    token: to,
    secret: process.env.AUTH_SECRET || "",
    salt: "authjs.session-token",
  });
  console.log("ss", JSON.stringify(ss, null, 2));

  return ss;
};
