import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

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

type MinimalForm<T> = Pick<UseFormReturn<any>, "setError">;

export async function handleFetchResponseClient(
  fetchResult: Response,
  fromHook?: Pick<UseFormReturn<any>, "setError">,
  successToastMessage?: string,
  toaster: boolean = true
) {
  try {
    const response = await fetchResult.json();
    if (fetchResult.ok) {
      if (successToastMessage) {
        toast.success(successToastMessage);
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

      if (fromHook) {
        if (fetchResult.status === 422 && response.errors) {
          Object.entries(response.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0 && fromHook) {
              fromHook.setError(field, {
                type: "manual",
                message: messages.join(", "), // join if multiple messages
              });
            }
          });
          fromHook.setError("root", {
            type: "manual",
            message: response.message ?? fetchResult.statusText, // join if multiple messages
          });
          throw new Error(response.message ?? fetchResult.statusText);
        }
        fromHook.setError("root", {
          type: "manual",
          message: response.message ?? fetchResult.statusText, // join if multiple messages
        });
        throw new Error(response.message ?? fetchResult.statusText);
      }

      if (toaster && response) {
        toast.error(toast.error(response.message));
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
