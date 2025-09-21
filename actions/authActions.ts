"use server";

import { decode, getToken } from "next-auth/jwt";

import { AuthWithOTPRequestSchemaType } from "@/schemas/authSchemas";

import { auth, ServerSignIn, ServerSignOut } from "@/auth_setup/next_auth";
import { cookies } from "next/headers";
import {
  VerifyOtpResponseJwtType,
  VerifyOtpResponseType,
} from "./types/BackendApiResponseTypes";
import { errorResponse } from "@/src/lib/constants/constants";
import { authorizedHeader, extendedFetchServer } from "@/src/lib/serverUtils";
import { User } from "@/schemas/third-party-api-schemas";
import { jwtDecode } from "jwt-decode";
import { ApiResponse } from "./types";

// type JWTType = {
//   user: User & { token: string };
//   email: string | null;
//   exp: number;
//   iat: number;
//   jti: string;
//   sub: string;
// };

export type JWTType = {
  aud: string;
  exp: number;
  iat: number;
  jti: string;
  nbf: number;
  scopes: any[];
  sub: string;
  user: User & {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: number;
  };
  email?: string | null;
};

type RefreshResponseType = {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: string;
};

// ====================================get Captcha dot net version=============================== //
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

// ====================================simple otp version=============================== //
// export async function signInOtpAction(
//   data: AuthWithOTPRequestSchemaType
// ): Promise<any> {
//   try {
//     const res = await extendedFetchServer<VerifyOtpResponseType>(
//       "/auth/verify-otp",
//       {
//         options: {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         },
//         retries: 3,
//         delayTime: 500,
//       }
//     );
//     console.log('res in server action verify otp',res)
//     if (res.ok) {
//       const credentials = {
//         user: JSON.stringify(res.body.user),
//         action: res.body.action,
//         token: res.body.token,
//         token_type: res.body.token_type,
//       };

//       await ServerSignIn("otp", credentials);
//     }
//     return res;
//   } catch (e) {
//     console.error("signInOtp error:", e);
//     throw new Error(errorResponse.message);
//     return errorResponse;
//   }
// }

// ====================================jwt otp version=============================== //

export async function signInOtpAction(
  data: AuthWithOTPRequestSchemaType
): Promise<ApiResponse<any>> {
  let exp
  try {
    const res = await extendedFetchServer<VerifyOtpResponseJwtType>(
      "/auth/verify-otp",
      {
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
        retries: 3,
        delayTime: 500,
        needUpdateToken: false,
      }
    );
   
    if (res.ok) {
      const decodedJwt: JWTType = jwtDecode(res.body.access_token);
      const credentials = {
        user: JSON.stringify(decodedJwt.user),
        token_type: res.body.token_type,
        expireIn: res.body.expires_in,
        refreshToken: res.body.refresh_token,
        accessToken: res.body.access_token,
        accessTokenExpiration: decodedJwt.exp,
        // accessTokenExpiration: decodedJwt.exp - 3550,
      };
      exp = decodedJwt.exp
      //should remove

      await ServerSignIn("otp", credentials);
    }
    return res;
  } catch (e: any) {
    console.error("signInOtp error:", e);
    if (e.digest && e.digest.startsWith("NEXT_REDIRECT")) {
      // digest format: NEXT_REDIRECT;type;url;statusCode;
      const parts = e.digest.split(";");
      const type = parts[1]; // e.g., "push"
      const url = parts[2]; // e.g., "http://localhost:3000/"
      const statusCode = parts[3]; // e.g., "307"
      return {
        ok: true,
        status: Number(statusCode),
        body: {
          redirect: true,
          url,
          type,
          exp
        },
      };
    } else {
      return {
        ok: false,
        message: e?.message ?? "some thing wnt wrong",
        status: 500,
      };
    }
  }
}

export const signoutAction = async () => {
  await ServerSignOut({ redirect: true });
};

export const getDecodedToken = async (
  needUpdate: boolean = true
): Promise<JWTType | null> => {
  console.log({ needUpdateingetDecodedToken: needUpdate });
  if (needUpdate) await auth();
  const rawToken = (await cookies()).get("authjs.session-token")?.value;
  if (!rawToken) return null;

  const decodedToken: any = await decode({
    token: rawToken,
    secret: process.env.AUTH_SECRET || "",
    salt: "authjs.session-token",
  });
  return decodedToken as JWTType;
};

export const getTokenAccess = async (needUpdate: boolean = true) => {
  console.log({ needUpdateingetTokenAccess: needUpdate });
  // if(needUpdate) await auth()
  const jwt = await getDecodedToken(needUpdate);
  return jwt?.user?.accessToken;
};

//-------------------simple jwt------------------------------------------------
// export const getTokenAccess = async (needUpdate: boolean = false) => {
//   const jwt = await getDecodedToken(needUpdate);
//   return jwt?.user?.token;
// };

export async function refreshTokens(
  refreshToken: string
): Promise<ApiResponse<RefreshResponseType>> {
  const res = await extendedFetchServer<RefreshResponseType>("/auth/refresh", {
    options: {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
    needUpdateToken: false,
  });
  return res;
}

export async function callAuth() {
  await auth();
  return { called: true };
}

import { headers } from "next/headers";

export async function callSessionServer() {
  const cookieHeader = (await headers()).get("cookie"); // get cookies from request
  const res = await fetch("http://localhost:3000/api/auth/session", {
    method: "GET",
    headers: {
      accept: "application/json",
      cookie: cookieHeader || "", // forward cookies
    },
  });
  const data = await res.json();
  console.log("Server session:", data);
  return data;
}

// export async function setNewTokens(res:RefreshResponseType){

//   const decodedJwt: JWTType = jwtDecode(res.access_token);
//       const credentials = {
//         user: JSON.stringify(decodedJwt.user),
//         token_type: res.token_type,
//         expireIn: res.expires_in,
//         refreshToken: res.refresh_token,
//         accessToken: res.access_token,
//         accessTokenExpiration: decodedJwt.exp,
//       };
//       console.log('new credentail',credentials)
//       await ServerSignIn("otp", credentials);
// }

// export async function refre(){
//   const ss =await getDecodedToken()
//   if(!ss) return
//   const res = await refreshTokens(ss?.user.refreshToken)
//   if(res.ok){

//     setNewTokens(res.body)
//   }else{
//     console.log(res.errors)
//   }
// }
