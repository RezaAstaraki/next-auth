"use server";

import { User } from "@/schemas/third-party-api-schemas";
import { fetchWithRetryServer } from "@/src/lib/serverUtils";
import { getTokenAccess } from "../authActions";

export async function profileShow() {
  const res = await fetchWithRetryServer<User>("/profile",{
    headers:{
      'Authorization':`Bearer ${(await getTokenAccess())}`
    }
  });

  return res;
}
