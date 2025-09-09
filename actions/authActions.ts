"use server";

import { decode, getToken } from "next-auth/jwt";

import {
  AuthWithOTPRequestSchema,
  AuthWithOTPRequestSchemaType,
} from "@/schemas/authSchemas";

import { auth, ServerSignIn, ServerSignOut } from "@/auth_setup/next_auth";
import { cookies } from "next/headers";
import { VerifyOtpResponseType } from "./types/BackendApiResponseTypes";
import { formDataMaker } from "@/src/lib/utils";
import { errorResponse } from "@/src/lib/constants/constants";
import { fetchWithRetryServer } from "@/src/lib/serverUtils";
import { User } from "@/schemas/third-party-api-schemas";

// type CaptchaType = {
//   img: string;
//   cpCode: string;
// };

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

export async function signInOtpAction(
  data: AuthWithOTPRequestSchemaType
): Promise<any> {
  try {
    const parsed = AuthWithOTPRequestSchema.safeParse(data);

    if (!parsed.success) {
      return {
        ok: false,
        message: "مشکل در اطلاعات ورودی",
        errors: parsed.error.flatten().fieldErrors,
        status: 422,
      };
    }
    const res = await fetchWithRetryServer<VerifyOtpResponseType>(
      "/auth/verify-otp",
      {
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        },
        retries: 3,
        delayTime: 500,
      }
    );

    if (res.ok) {
      const credentials = {
        user: JSON.stringify(res.body.user),
        action: res.body.action,
        token: res.body.token,
        token_type: res.body.token_type,
      };

      await ServerSignIn("otp", credentials);
    }

    return res;

    // res

    // console.log('res in server action',res)

    // const result = await ServerSignIn("otp", parsed.data);
  } catch (e) {
    throw new Error(errorResponse.message);
    console.error("signInOtp error:", e);
    return errorResponse;
  }
}
export const signoutAction = async () => {
  await ServerSignOut({ redirect: true });
};

type JWTType = {
  user: User & { token: string };
  email: string | null;
  exp: number;
  iat: number;
  jti: string;
  sub: string;
};

export const getDecodedToken = async (
  needUpdate: boolean = false
): Promise<JWTType | null> => {
  const rawToken = (await cookies()).get("authjs.session-token")?.value;
  if (!rawToken) return null;
  if (needUpdate)await auth();

  const decodedToken: any = await decode({
    token: rawToken,
    secret: process.env.AUTH_SECRET || "",
    salt: "authjs.session-token",
  });
  return decodedToken as JWTType;
};

export const getTokenAccess = async () => {
  const jwt = await getDecodedToken();
  return jwt?.user?.token;
};
