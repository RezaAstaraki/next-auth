import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodSchema } from "zod";
import { ApiError } from "@/actions/types";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataParser<T extends ZodSchema>(
  data: any,
  schema: T
): ApiError | z.infer<T> {
  try {
    const parsedData = schema.safeParse(JSON.parse(data));
    if (!parsedData.success) {
      const { fieldErrors, formErrors } = parsedData.error.flatten();

      return {
        ok: false,
        message: "خطا در مقادیر ارسالی",
        status: 422,
        errors: {
          ...fieldErrors,
          ...(formErrors.length ? { _form: formErrors } : {}),
        },
      };
    }
    return parsedData;
  } catch {
    return {
      ok: false,
      message: "خطا در مقادیر ارسالی",
      status: 500,
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
      formDataMaker(value, formData, formKey);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${formKey}[${index}]`;
        if (typeof item === "object" && !Array.isArray(item)) {
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
export async function delay(delayTime: number) {
  await new Promise((resolve) => setTimeout(resolve, delayTime));
}
