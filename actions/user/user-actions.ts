"use server";

import {
  updateProfileSchema,
  UpdateProfileSchemaType,
  User,
} from "@/schemas/third-party-api-schemas";
import { extendedFetchServer } from "@/src/lib/serverUtils";
import { getTokenAccess } from "../authActions";
import { ApiResponse } from "../types";

export async function profileShow() {
  const res = await extendedFetchServer<User>("/profile", {
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
    updateProfileSchema
  );
  return res;
}
