"use server";

import { decode, getToken } from "next-auth/jwt";

import {
  AuthWithOTPRequestSchema,
  AuthWithOTPRequestSchemaType,
  LoginSchema,
  LoginSchemaType,
  OtpSchemaType,
} from "@/schemas/authSchemas";
import { ApiResponse } from "./types";
import { ServerSignIn, ServerSignOut } from "@/auth_setup/next_auth";
import { cookies } from "next/headers";
import { VerifyOtpResponseType } from "./types/BackendApiResponseTypes";
import { fetchWithRetry } from "@/src/lib/utils";
import { errorResponse } from "@/src/lib/constants/constants";
import { fetchWithRetryServer } from "@/src/lib/serverUtils";

type CaptchaType = {
  img: string;
  cpCode: string;
};

// export async function getCaptcha(): Promise<ApiResponse<CaptchaType>> {
//   try {
//     const res = await fetch("https://customerapi.tavanastore.ir/v1/Captcha", {
//       headers: {
//         "Content-Type": "application/json",
//         accept: "text/plain",
//       },
//     });

//     // await new Promise((resolve) => setTimeout(resolve, 1000));

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("error", error);
//     return {
//       isSuccess: false,
//       errors: ["some thing went run server action"],
//       value: null,
//     };
//   }
// }

// export async function sendSms(
//   data: LoginSchemaType
// ): Promise<ApiResponse<any>> {
//   const parsedData = LoginSchema.safeParse(data);
//   if (!parsedData.success) {
//     return {
//       isSuccess: false,
//       errors: parsedData.error.errors.map((e) => e.message),
//       value: null,
//     };
//   }

//   try {
//     const res = await fetch(
//       "https://customerapi.tavanastore.ir/v1/Auth/SendSms",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(parsedData.data),
//       }
//     );

//     // await new Promise((resolve) => setTimeout(resolve, 1000));

//     const data = await res.json();

//     return data;
//   } catch (error) {
//     console.error("error", error);
//     // return a valid UnSuccessResponse object
//     return {
//       isSuccess: false,
//       errors: ["some thing went run server action"],
//       value: null,
//     };
//   }
// }

export const test = async () => {
  return { hello: "world" };
  // throw new Error("test error");
};

export async function signInOtp(
  data: AuthWithOTPRequestSchemaType
): Promise<any> {
  try {
    const parsed = AuthWithOTPRequestSchema.safeParse(data);

    if (!parsed.success) {
      return {
        ok: false,
        message: "مشکل در اطلاعات ورودی",
        errors: parsed.error.flatten().fieldErrors,
        status:422
      };
    }
    const res = await fetchWithRetryServer<VerifyOtpResponseType>("/auth/verify-otp", {
      options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      },
      retries: 3,
      delayTime: 500,
    });

    return res

    // console.log('res in server action',res)


    // const result = await ServerSignIn("otp", parsed.data);

   
  } catch (e) {
    console.error("signInOtp error:", e);
    return errorResponse
  }
}
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
