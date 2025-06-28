"server only";

import { clearAllCookies } from "@/app/actions/authActions";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SERVER_BASE_URL } from "./environment";

const cookieName = process.env.COOKIENAME as string;

export function getAccessCookie() {
  return cookies().has(cookieName);
}

export const setCookies = (value: string) => {
  cookies().set({ name: cookieName, value, httpOnly: true, path: "/" });
};

export const ServerUrlMaker = (endPoint: string) => {
  const baseUrl = ADMIN_SERVER_BASE_URL;
  if (!baseUrl) {
    throw new Error("API URL is not defined");
  }
  return `${baseUrl}${endPoint}`;
};

export const userHeader = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export const adminAuthorizedHeaderFormData = () => {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${getAdminAccess()}`,
  };
};
export const adminAuthorizedHeader = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies().get("aact")?.value}`,
  };
};
export function getAdminAccess() {
  return cookies().get("aact")?.value;
}
export const frontHeader = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};
export const customerRefreshTokens = async () => {
  const cookiesStore = cookies();
  const a = cookiesStore.get("cact")?.value;
  const f = cookiesStore.get("cret")?.value;
  const res = await fetch("http://localhost:3000/api/customerRefresh", {
    cache: "no-cache",
    credentials: "include",
    headers: {
      Cookie: `cact=${a}; cret=${f}`,
    },
  });
  return res.ok;
};
