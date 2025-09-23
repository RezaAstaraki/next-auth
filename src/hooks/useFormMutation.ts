import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

type ToastContent = "all" | "main" | (string & {});

type UseFormMutationExtra = {
  hookForm?: Pick<UseFormReturn<any>, "setError" | "getValues">;
  toaster?: boolean;
  toastContent: ToastContent;
  onSuccessToastMessage?: string;
};

export function useFormMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  baseOptions: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "onSuccess"
  >,
  extra?: UseFormMutationExtra
): UseMutationResult<TData, TError, TVariables, TContext> {
  const {
    hookForm,
    toaster = true,
    toastContent = "main",
    onSuccessToastMessage,
  } = extra ?? {};

  return useMutation({
    ...baseOptions,
    onSuccess: (data: any) => {
      if (!data.ok) {
        if (hookForm) {
          if (data.status === 422 && data.errors) {
            Object.entries(data.errors).forEach(([field, messages]) => {
              if (Array.isArray(messages) && messages.length > 0) {
                if (toastContent === "all") {
                  toast.error(`${field}: ${messages.join(", ")}`);
                }
                if (field in hookForm.getValues()) {
                  hookForm.setError(field as any, {
                    type: "manual",
                    message: messages.join(", "),
                  });
                }
              }
            });
          }
        }

        // Show toaster messages
        if (toaster && data) {
          switch (toastContent) {
            case "main":
              if (data.message) toast.error(data.message);
              break;
            case "all":
              if (data.status !== 422 && data.message) {
                toast.error(data.message);
              }
              break;

            default:
              if (toastContent.length > 0) {
                toast.error(toastContent);
              }
              break;
          }
        }

        // stop further success handling if validation failed
        if (data.status === 422) {
          // throw new Error(data.message ?? "Validation failed");
        }
      } else {
        if (onSuccessToastMessage) toast.success(onSuccessToastMessage);
      }
    },
  });
}
