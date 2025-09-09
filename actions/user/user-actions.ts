"use server";

import {
  updateProfileSchema,
  UpdateProfileSchemaType,
  User,
} from "@/schemas/third-party-api-schemas";
import { fetchWithRetryServer } from "@/src/lib/serverUtils";
import { getTokenAccess } from "../authActions";
import { ApiResponse } from "../types";

export async function profileShow() {
  const res = await fetchWithRetryServer<User>("/profile", {
    headers: {
      Authorization: `Bearer ${await getTokenAccess()}`,
    },
  });

  return res;
}
export async function profileUpdatePromise(
  data: UpdateProfileSchemaType
): Promise<ApiResponse<User>> {
  const parsedData = updateProfileSchema.safeParse(data);
  if (!parsedData.success) {
    const { fieldErrors, formErrors } = parsedData.error.flatten();

    return {
      ok: false,
      message:'خطا در مقادیر ارسالی',
      status: 422,
       errors: {
        ...fieldErrors,
        ...(formErrors.length ? { _form: formErrors } : {}),
      },
    };
  }

  const res = await fetchWithRetryServer<User>("/profile", {
    options: {
      method: "POST",
      body: JSON.stringify(data),
    },
    headers: {
      Authorization: `Bearer ${await getTokenAccess()}`,
    },
  });

  return res;
}
