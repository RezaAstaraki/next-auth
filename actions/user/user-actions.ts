"use server";


import { extendedFetchServer } from "@/src/lib/serverUtils";
import { ApiResponse } from "../types";
import { UpdateProfileSchemaType, User } from "@/schemas/authSchemas";

export async function profileShow() {
  const res = await extendedFetchServer<User>("/profile", {
    options: {
      method: "GET",
    },
  });
  return res;
}
export async function profileUpdate(
  data: UpdateProfileSchemaType
): Promise<ApiResponse<User>> {
  const res = await extendedFetchServer<User>(
    "/profile",
    {
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
    },
  );
  return res;
}
