import { UseFormReturn } from "react-hook-form";
import z, { ZodObject } from "zod";

export const clientUrlMaker = (endPoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API URL is not defined");
  }
  return `${baseUrl}${endPoint}`;
};

export const unAuthorizeHeader = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export async function handleFetchResponseClient(
  fetchResult: Response,
  fromHook?: UseFormReturn<any>,
  schema?: ZodObject<any>
) {
  try {
    const response = await fetchResult.json();
    if (fetchResult.ok) {
      return response;
    } else {
      const validationErrors = response.errors
        ? Object.entries(response.errors).flatMap(([key, messages]) =>
            (messages as string[]).map(
              (message: string) => `${key}: ${message}`
            )
          )
        : [];

      if (schema) {
        if (fetchResult.ok) {
          const response = await fetchResult.json();
          return response;
        } else {
          const response = await fetchResult.json();

          if (fetchResult.status === 422 && response.errors) {
            // Loop through all errors
            Object.entries(response.errors).forEach(([field, messages]) => {
              if (Array.isArray(messages) && messages.length > 0 && fromHook) {
                fromHook.setError(field, {
                  type: "manual",
                  message: messages.join(", "), // join if multiple messages
                });
              }
            });

            throw new Error(response.message);
          }

          throw new Error(fetchResult.statusText);
        }
      }

      return {
        isSuccess: false,
        Errors:
          validationErrors.length > 0
            ? validationErrors
            : response.Errors || ["An unknown error occurred."],
      };
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e?.message);
    } else {
      throw new Error("something when wrong");
    }
  }
}
