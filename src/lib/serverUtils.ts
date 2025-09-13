"server only";

import { ApiResponse } from "@/actions/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ZodSchema } from "zod/v3";
import { parseData } from "./utils";

const cookieName = process.env.COOKIE_NAME as string;

type FetchOptions = {
  options?: RequestInit;
  headers?: HeadersInit;
  cacheTime?: number;
  revalidateTags?: string[] | string;
  delayTime?: number;
  retries?: number;
};

export const adminAuthorizedHeader = async () => {
  const cookie = await cookies();
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookie.get("aact")?.value}`,
  };
};

export const ServerUrlMaker = (endPoint: string) => {
  const baseUrl = process.env.SERVER_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API URL is not defined");
  }
  return `${baseUrl}${endPoint}`;
};

export type ApiError = {
  ok: false;
  message: string;
  errors?: Record<string, string[]>;
  status: number;
};

export async function fetchWithRetryServer<T>(
  url: string,
  {
    options = {},
    headers,
    cacheTime = 0,
    revalidateTags,
    delayTime = 500,
    retries = 3,
  }: FetchOptions = {},
  schema?: ZodSchema
): Promise<ApiResponse<T>> {
  // if (schema && options.body) {
  //   const parsed = parseData(options?.body, schema);
  //   if (parsed) {
  //     return parsed;
  //   }
  // }
  const internalHeader: HeadersInit =
    headers ?? (await adminAuthorizedHeader());

  for (let i = 0; i < retries; i++) {
    console.warn({ retry: i + 1, url });

    try {
      const userDefinedCache = "cache" in options || "next" in options;

      const fetchOptions: RequestInit = {
        ...options,
        headers: internalHeader,
        ...(!userDefinedCache &&
          (cacheTime
            ? { next: { revalidate: cacheTime } }
            : { cache: "no-store" })),
      };

      const res = await fetch(ServerUrlMaker(url), fetchOptions);
      return await serverHandleResponse<T>(res, revalidateTags);
    } catch (e) {
      console.warn(`Retrying... (${i + 1}/${retries})`, e);

      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      } else {
        return {
          ok: false,
          message: e instanceof Error ? e.message : "Unknown error",
          status: 500,
        };
      }
    }
  }

  return {
    ok: false,
    message: "Unexpected error",
    status: 500,
  };
}

export async function serverHandleResponse<T>(
  res: Response,
  revalidateTags?: string | string[]
): Promise<ApiResponse<T>> {
  try {
    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        message: data.message ?? "Request failed",
        errors: data.errors ?? undefined,
        status: res.status ?? 500,
      };
    }

    if (revalidateTags) {
      const tags = Array.isArray(revalidateTags)
        ? revalidateTags
        : [revalidateTags];
      tags.forEach((tag) => {
        revalidateTag(tag); // assume this exists
      });
    }

    return {
      ok: true,
      status: res.status,
      body: data as T,
    };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Failed to parse response",
      status: 500,
    };
  }
}
