import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { FailResponse } from "./types";

import { revalidateTag } from "next/cache";
import { errorResponse } from "./constants/constants";
import { ZodSchema } from "zod/v3";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const clientHandleResponse = ({
//   res,
//   successToastMessage,
//   toaster = true,
// }: {
//   res: any;
//   successToastMessage?: string;
//   toaster?: boolean;
// }) => {
//   if (!res.ok) {
//     const response: FailResponse = res.body;
//     console.log(res);
//     if (response.Errors) {
//       if (toaster && response) {
//         Object.values(response.Errors).forEach((errorMessages) => {
//           errorMessages.forEach((error) => toast.error(error));
//         });
//       }
//     } else {
//       if (toaster && response) {
//         toast.error(response.message);
//       }
//     }
//   } else {
//     const response = res.body;
//     if (successToastMessage) {
//       toast.success(successToastMessage);
//     }
//     return response;
//   }
// };


export function parseData(data:any,schema:ZodSchema){

  const parsedData = shecma.safeParse(data);
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
}

export function formDataMaker(
  obj: Record<string, any>,
  formData = new FormData(),
  parentKey = ""
): FormData {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    } else if (value instanceof File) {
      formData.append(formKey, value);
    } else if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      value !== null
    ) {
      // Recursively handle nested objects
      formDataMaker(value, formData, formKey);
    } else if (Array.isArray(value)) {
      // For arrays, append each item with its index
      value.forEach((item, index) => {
        const arrayKey = `${formKey}[${index}]`;
        if (typeof item === "object" && !Array.isArray(item)) {
          // Recursively handle nested objects within arrays
          formDataMaker(item, formData, arrayKey);
        } else {
          formData.append(arrayKey, item);
        }
      });
    } else {
      formData.append(formKey, value);
    }
  });

  return formData;
}

export async function fetchWithRetry(
  url: string,
  headers: HeadersInit ,
  options: RequestInit = {},
  cacheTime = 0,
  revalidateTags?: string[] | string,
  delayTime = 500,
  retries: number = 3
): Promise<any> {
  for (let i = 0; i < retries; i++) {
    console.warn({ retry: i + 1, url });

    try {
      const userDefinedCache = "cache" in options || "next" in options;

      const fetchOptions: RequestInit = {
        ...options,
        headers,
        ...(!userDefinedCache &&
          (cacheTime
            ? { next: { revalidate: cacheTime } }
            : { cache: "no-store" })),
      };

      const res = await fetch(url, fetchOptions);

      return await handleFetchResponse(res, revalidateTags);
    } catch (e) {
      console.warn(`Retrying... (${i + 1}/${retries})`, e);

      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      } else {
        return errorResponse;
      }
    }
  }
}

export async function handleFetchResponse(
  fetchResult: Response,
  revalidateTags?: string[] | string
) {
  try {
    const response = await fetchResult.json();
    if (fetchResult.ok) {
      if (revalidateTags) {
        if (typeof revalidateTags === "string") {
          revalidateTag(revalidateTags);
        } else {
          revalidateTags.forEach((tag) => {
            revalidateTag(tag);
          });
        }
      }
      return response;
    } else {
      const validationErrors = response.errors
        ? Object.entries(response.errors).flatMap(([key, messages]) =>
            (messages as string[]).map(
              (message: string) => `${key}: ${message}`
            )
          )
        : [];
      return {
        isSuccess: false,
        Errors:
          validationErrors.length > 0
            ? validationErrors
            : response.Errors || ["An unknown error occurred."],
      };
    }
  } catch (e) {
    return {
      isSuccess: false,
      Errors: ["An error occurred while fetching"],
    };
  }
}
